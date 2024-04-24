import React, { useEffect, useReducer } from 'react';
import { Row, Col, Table, Spinner, Form } from 'react-bootstrap';
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
  load:false,
  visible:false,
  selectedRecord:{},
  to:`${moment().format("YYYY-MM-DD")}`,
  from:`${moment().subtract(7, 'days').format("YYYY-MM-DD")}`,
};

const Messagages = ({}) => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);

  const getMessages = async() => {
    dispatch({type:"set", payload:{ load:true } });
    await axios.get(process.env.NEXT_PUBLIC_GET_CONTACT_US_MESSAGES,{
      headers:{
        from:state.from,
        to:state.to
      }
    })
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

  const toggleMessage = () => {
    dispatch({type:'set', payload:{load:true, visible:false}})
    axios.post(process.env.NEXT_PUBLIC_TOGGLE_MESSAGES,{
      id:state.selectedRecord.id,
      status:state.selectedRecord.status=="1"?'0':'1',
    }).then((x)=>{
      getMessages()
    })
  }

  return (
  <>
    <Row>
      <Col md={5}>
        <h4>Contact Messages</h4>
      </Col>
      <Col md={1}>
        {state.load && <Spinner/>}
      </Col>
      <Col md={'auto'}>
        <Form.Control type={"date"} size="sm" value={state.from} onChange={(e)=>dispatch({type:"toggle", fieldName:"from", payload:e.target.value})} />
      </Col>
      <Col md={'auto'}>
        <Form.Control type={"date"} size="sm" value={state.to} onChange={(e)=>dispatch({type:"toggle", fieldName:"to", payload:e.target.value})} />
      </Col>
      <Col md={'auto'}>
        <button onClick={getMessages} className='btn-custom'>Go</button>
      </Col>
    </Row>
    <Row style={{maxHeight:'70vh',overflowY:'auto', overflowX:'hidden'}}>
      <Col md={12}>
        <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
          <Table className='tableFixHead'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {state?.records?.map((x, index) => {
            return (
            <tr key={index} className='f row-hov'
              onClick={()=> {
                // dispatch({type:"toggle", fieldName:"selectedRecord", payload:x})
                // dispatch({type:"toggle", fieldName:"visible", payload:true})
                dispatch({type:"set", payload:{
                  selectedRecord:x,
                  visible:true
                }})
              }}
            >
              <td> {index+1} </td>
              <td> {x.name} </td>
              <td> {x.email} </td>
              <td> <div style={{whiteSpace:'pre-wrap'}}>{x.msg.slice(0, 30)}...</div> </td>
              <td> {x.status=='1'?<span className='green-txt'>Done</span>:<span className='grey-txt-2'>Pending</span>} </td>
              <td> {moment(x.createdAt).format("YYYY/MMM/ddd")} </td>
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
      onOk={()=>dispatch({ type: 'modalOff' })}
      onCancel={()=>dispatch({ type: 'modalOff' })}
      title="Contact Us Message"
      centered={false}
      footer={false} 
      width={500}
    >
      <button
        className='btn-custom'
        onClick={toggleMessage}
      >
        {!state.submitLoad?"Toggle Status":<Spinner size='sm' />}
      </button> 
      <Row className='fs-17'>
        <hr className='mt-2' />
        <Col md={3}><b>Name:</b></Col>
        <Col md={9} className='text-end'>{state.selectedRecord?.name}</Col>
        <Col md={3}><b>Email:</b></Col>
        <Col md={9} className='text-end'>{state.selectedRecord?.email?.split(", ")[0]||''}</Col>
        <Col md={3}><b>Contact:</b></Col>
        <Col md={9} className='text-end'>{state.selectedRecord?.email?.split(", ")[1]||''}</Col>
        <Col md={3}><b>Dated:</b></Col>
        <Col md={9} className='text-end'>{moment(state?.selectedRecord?.createdAt).format("DD/MMMM/YYYY")}</Col>
        {/* <hr className='mt-2' /> */}
        <Col md={12}><b>Message:</b></Col>
        <hr className='my-1' />
        <Col md={12} style={{whiteSpace:'pre-wrap', color:'grey'}}>{state.selectedRecord.msg}</Col>
      </Row>
    </Modal>
  </>
  )
}

export default React.memo(Messagages)