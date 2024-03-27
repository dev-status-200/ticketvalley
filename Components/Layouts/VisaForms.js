import React, { useEffect, useReducer } from 'react';
import { Row, Col, Table, Spinner, Form } from 'react-bootstrap';
import { Modal, Button, Rate } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { openNotification } from "/Components/Shared/Notification"
import axios from 'axios';
import moment from 'moment';
import codes from "/JSONData/codes"

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
  submitLoad:false,
  visible:false,
  edit:false,
  to:`${moment().format("YYYY-MM-DD")}`,
  from:`${moment().subtract(7, 'days').format("YYYY-MM-DD")}`,
  selectedRecord:{}
};

const HotelQueries = ({}) => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  
  const getVisas = async() => {
    dispatch({type:"set", 
      payload:{
        load:true,
      }
    })
    await axios.get(process.env.NEXT_PUBLIC_GET_ALL_VISA_FORMS,{
      headers:{
        from:state.from,
        to:state.to
      }
    })
    .then((x) => {
      dispatch({type:"set", 
        payload:{
          records:x.data.result,
          load:false,
          visible:false,
          submitLoad:false
        }
      })
      checkNotifications();
    })
  }

  const getCodeValue = (value) => {
    let result = "";
    codes.forEach(x => {
      if(x.value==value){
        result = x.label
      }
    });
    return result
  }

  const getCode = (value) => {
    let result = "";
    codes.forEach(x => {
      if(x.value==value){
        result = x.code
      }
    });
    return result
  }

  const checkNotifications = () => {
    axios.post(process.env.NEXT_PUBLIC_POST_CHECK_NOTIFICATION,{
      type:'visa'
    }).then((x)=>{
      // console.log(x.data)
    })
  }

  const toggleForm = () => {
    dispatch({
      type:'set',
      payload:{
        load:true,
        visible:false
      }
    })
    axios.post(process.env.NEXT_PUBLIC_POST_TOGGLE_VISA_FORM,{
      id:state.selectedRecord.id,
      status:state.selectedRecord.status=='0'?'1':'0'
    }).then((x)=>{
      let tempState = [...state.records];
      let index = tempState.findIndex((x)=>x.id==state.selectedRecord.id);
      tempState[index].status = state.selectedRecord.status=='0'?'1':'0'
      dispatch({
        type:'set',
        payload:{
          load:false,
          records:tempState
        }
      })
    })
  }

  return (
  <>
    <Row>
      <Col md={5}>
        <h4>Visa Queries</h4>
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
        <button onClick={getVisas} className='btn-custom'>Go</button>
      </Col>
    </Row>
    <Row style={{maxHeight:'70vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Created</th>
            <th>Status</th>
            <th>Dated</th>
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
            <td> {x?.VisaPersons[0]?.firstName} {x?.VisaPersons[0]?.lastName} </td>
            <td> {x?.VisaPersons[0]?.email} </td>
            <td> {moment(x.createdAt).fromNow()}  </td>
            <td> {x.status=="0"?<span className='grey-txt-2'>Pending</span>:<span className='green-txt'>Done</span>} </td>
            <td> {moment(x.createdAt).format("YYYY-MM-DD")}  </td>
          </tr>
          )})}
        </tbody>
        </Table>
      </div>
    </Col>
    </Row>
    <Modal
      open={state.visible}
      onOk={()=>dispatch({ type: 'modalOff' })}
      onCancel={()=>dispatch({ type: 'modalOff' })}
      title="Visa Query"
      centered
      footer={false} 
      width={550}
    >
      <button className='btn-custom mb-3' onClick={toggleForm}>Toggle Done</button>
      <Row className='fs-17'>
        <hr/>
        {state?.selectedRecord?.VisaPersons?.map((x, i)=>{
          return (
            <Row key={i} className=''>
              <Col md={4}>Name:</Col>
              <Col md={8} className='text-end'>{x.firstName} {x.lastName}</Col>
              <Col md={4}>D.O.B:</Col>
              <Col md={8} className='text-end'>{x.dob}</Col>
              <Col md={4}>Email:</Col>
              <Col md={8} className='text-end'>{x.email}</Col>
              <Col md={4}>Country:</Col>
              <Col md={8} className='text-end'>{getCodeValue(x.nationality)}</Col>
              <Col md={4}>City:</Col>
              <Col md={8} className='text-end'>{x.city}</Col>
              <Col md={4}>State:</Col>
              <Col md={8} className='text-end'>{x.state}</Col>
              <Col md={4}>Contact:</Col>
              <Col md={8} className='text-end'>{"("}{getCode(x.countryCode)}{")"} {x.contact}</Col>
              <Col md={4}>WhatsApp:</Col>
              <Col md={8} className='text-end'>{"("}{getCode(x.WAcountryCode)}{")"} {x.WAcontact}</Col>
              <Col md={4}>Visa Entry Type:</Col>
              <Col md={8} className='text-end'>{x.entryType}</Col>
              <Col md={4}>Passport No.:</Col>
              <Col md={8} className='text-end'>{x.passport}</Col>
              <Col md={4}>Expiry Date:</Col>
              <Col md={8} className='text-end'>{x.passportDay} {x.passportMonth} {x.passportYear}</Col>
              <Col md={4}>Entry Date:</Col>
              <Col md={8} className='text-end'>{x.ApassportDay} {x.ApassportMonth} {x.ApassportYear}</Col>
              <Col md={12}><hr/></Col>
            </Row>
          )
        })}
        {/* <Button disabled={state.selectedRecord.status=="1"?true:false} type='primary' 
          onClick={()=>markAsDone(state.selectedRecord.id)}
        >
          {!state.submitLoad?"Mark as Done":<Spinner size='sm' />}
        </Button> */}
      </Row>
    </Modal>
  </>
  )
}

export default React.memo(HotelQueries)