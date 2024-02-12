import React, { useEffect, useReducer } from 'react';
import { Row, Col, Table, Spinner } from 'react-bootstrap';
import { Modal, Button, Rate } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { openNotification } from "/Components/Shared/Notification"
import axios from 'axios';
import moment from 'moment';

function recordsReducer(state, action){
  switch (action.type) {
    case 'set': { 
      return { ...state, ...action.payload } 
    }
    case 'toggle': { 
      return { ...state, [action.fieldName]: action.payload } 
    }
    case 'modalOff': {
      let returnVal = { ...state, visible: false, edit: false };
      state.edit?returnVal.selectedRecord={}:null
      return returnVal
    }
    default: return state 
  }
}

const initialState = {
  records: [],
  load:true,
  visible:false,
  selectedRecord:{}
};

const Messagages = ({}) => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  useEffect(() => {
    getMessages();
  }, [])
  
  const getMessages = async() => {
    await axios.get(process.env.NEXT_PUBLIC_GET_CONTACT_US_MESSAGES)
    .then((x)=>{
      dispatch({type:"set", 
        payload:{
          records:x.data.result,
          load:false
        }
      });
      checkNotifications()
    })
  }

  const checkNotifications = () => {
    axios.post(process.env.NEXT_PUBLIC_POST_CHECK_NOTIFICATION,{
      type:'message'
    }).then((x)=>{
      // console.log(x.data)
    })
  }

  return (
  <>
    <Row>
      <Col><h5>Contact Form Messages</h5></Col>
    </Row>
    {!state.load &&<Row style={{maxHeight:'70vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {state?.records?.map((x, index) => {
          return (
          <tr key={index} className='f row-hov'
            onClick={()=> {
              dispatch({type:"toggle", fieldName:"selectedRecord", payload:x})
              dispatch({type:"toggle", fieldName:"visible", payload:true})
            }}
          >
            <td> {index+1} </td>
            <td> {x.name} </td>
            <td> {x.email} </td>
            <td> <div style={{whiteSpace:'pre-wrap'}}>{x.msg.slice(0, 30)}...</div> </td>
            <td> {moment(x.createdAt).format("YYYY/MMM/ddd")} </td>
          </tr>
          )
        })}
        </tbody>
        </Table>
      </div>
      
    </Col>
    </Row>}
    {state.load && <div><Spinner/></div>}
    <Modal
      open={state.visible}
      onOk={()=>dispatch({ type: 'modalOff' })}
      onCancel={()=>dispatch({ type: 'modalOff' })}
      title="Contact Us Message"
      centered={false}
      footer={false} 
      width={500}
    >
      <Row className='fs-17'>
        <hr/>
        <Col md={4}><b>Name:</b></Col>
        <Col md={8} className='text-end'>{state.selectedRecord.name}</Col>
        <Col md={4}><b>Email:</b></Col>
        <Col md={8} className='text-end'>{state.selectedRecord.email}</Col>
        <Col md={4}><b>Dated:</b></Col>
        <Col md={8} className='text-end'>{moment(state.selectedRecord.createdAt).format("YYYY/MMM/ddd")}</Col>
        {/* <hr className='mt-2' /> */}
        <Col md={12}><b>Message:</b></Col>
        <Col md={12} style={{whiteSpace:'pre-wrap', color:'grey'}}>{state.selectedRecord.msg}</Col>
      </Row>
    </Modal>
  </>
  )
}

export default React.memo(Messagages)