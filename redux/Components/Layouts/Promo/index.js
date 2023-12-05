import { Row, Col, Table } from 'react-bootstrap';
import React, { useEffect, useReducer } from 'react';
import Router from 'next/router';
import { Modal } from 'antd';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons';
import CreateOrEdit from './CreateOrEdit';

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
  amount:0.0,
  code:"",
  validity:"",
  stock:0
}

const initialState = {
    records: [],
    load:false,
    visible:false,
    edit:false,
    values:baseValues,
    status:"1",
    byPercentage:"0",
    selectedRecord:{},
};

const Transport = ({promoData}) => {
    const [ state, dispatch ] = useReducer(recordsReducer, initialState);
    useEffect(() => {
        dispatch({type:"toggle", fieldName:"records", payload:promoData.result})
    }, [])
    
  return (
    <div>
    <Row>
        <Col><h5>Promo Codes</h5></Col>
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
            <th>Status</th>
            <th>Amount</th>
            <th>Code</th>
            <th>Valid Till</th>
            <th>Stock</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
        {state.records.map((x, index) => {
          return (
          <tr key={index} className='f'>
            <td>{index+1} </td>
            <td>{x.name} </td>
            <td>{x.status!="1"?<span style={{color:"silver"}}>Disabled</span>:<span style={{color:"blue"}}>Active</span>} </td>
            <td>{x.byPercentage!="1"?<span >{x.amount} AED</span>:<span>{x.amount} %</span>} </td>
            <td>{x.code} </td>
            <td>{x.validity.slice(0, 10)}</td>
            <td style={{color:x.stock>0?"green":"red"}}>{x.stock} </td>
            <td>
                <EditOutlined 
                    className='modify-edit' 
                    onClick={()=>{
                        dispatch({type:'edit', payload:x})
                    }}
                />
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
      width={550} footer={false} centered={false}
    >
       <CreateOrEdit state={state} dispatch={dispatch} baseValues={baseValues} /> 
    </Modal>
    </div>
  )
}

export default Transport