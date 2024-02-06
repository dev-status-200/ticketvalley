import { Row, Col, Table } from 'react-bootstrap';
import React, { useEffect, useReducer } from 'react';
import Router from 'next/router';
import { Modal } from 'antd';
import CreateOrEdit from './CreateOrEdit';
import { EditOutlined, StopOutlined } from '@ant-design/icons';
import { openNotification } from "/Components/Shared/Notification"
import axios from 'axios';

function recordsReducer(state, action){
  switch (action.type) {
    case 'toggle': { 
      return { ...state, [action.fieldName]: action.payload } 
    }
    case 'create': {
      return {
          ...state,
          edit: false,
          visible: true,
      }
    }
    case 'edit': {
      return {
          ...state,
          selectedRecord:{},
          edit: true,
          visible: true,
          selectedRecord:action.payload
      }
    }
    case 'modalOff': {
      let returnVal = { ...state, visible: false, edit: false };
      state.edit?returnVal.selectedRecord={}:null
      return returnVal
    }
    default: return state 
  }
}

const baseValues = {
  //Basic Info
  id:'',
  name:"",
  price:"",
  status:"1"
}

const initialState = {
  records: [],
  load:false,
  visible:false,
  edit:false,
  values:baseValues,
  // Editing Records
  selectedRecord:{},
  oldRecord:{},
};

const Transport = ({transportData}) => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  useEffect(() => {
    dispatch({type:"toggle", fieldName:"records", payload:transportData.result})
  }, [])

  const toggle = async(data, status) => {
    let tempData = data;
    tempData.status = status?"1":"0"
    await axios.post(process.env.NEXT_PUBLIC_DISABLE_ENABLE_TRANSPORT, {data:tempData}).then((x)=>{
      if(x.data.status=='success'){
        let tempRecords = [...state.records];
        let i = tempRecords.findIndex((y=>data.id==y.id));
        tempRecords[i] = data;
        dispatch({type:'toggle', fieldName:'records', payload:tempRecords});
        openNotification('Success', `Transport Updated!`, 'green')
      } else { 
        openNotification('Error', `An Error occured Please Try Again!`, 'red') 
      }
    })
  };
    
  return (
  <>
    <Row>
      <Col><h5>Transport</h5></Col>
      <Col><button className='btn-custom right' onClick={()=>dispatch({type:'create'})}>Create</button></Col>
    </Row>
    <Row style={{maxHeight:'69vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Modify</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {state.records.map((x, index) => {
          return (
          <tr key={index} className='f'>
            <td> {index+1} </td>
            <td> {x.name} </td>
            <td> {x.price} </td>
            <td> <span> <EditOutlined className='modify-edit' onClick={()=>dispatch({type:'edit', payload:x})}/> </span> </td>
            <td 
              style={{cursor:'pointer'}} 
              onClick={()=>toggle(x,x.status=="1"?false:true)}
            > 
              {x.status=="1"?<span style={{color:'green'}} >Active</span>: <span style={{color:'crimson'}} >Disabled <StopOutlined /></span> }
            </td>
          </tr>
          )
        })}
        </tbody>
        </Table>
      </div>
    </Col>
    </Row>
    <Modal
      open={state.visible}
      onOk={()=>dispatch({ type: 'modalOff' })} onCancel={()=>dispatch({ type: 'modalOff' })}
      width={450} footer={false} centered={false}
    >
      <CreateOrEdit state={state} dispatch={dispatch} baseValues={baseValues} />
    </Modal>
  </>
  )
}

export default Transport