import React, { useReducer, useEffect } from 'react';
import { Row, Col, Table, Form, Spinner } from 'react-bootstrap';
import { Input, Modal, Switch } from 'antd';
import BookingInfo from './BookingInfo';
import moment from 'moment';
import axios from 'axios';

function recordsReducer(state, action){
  switch (action.type) {
    case 'toggle': { 
      return { ...state, [action.fieldName]: action.payload } 
    }
    case 'set': { 
      return { ...state, ...action.payload } 
    }
    case 'select': {
      return {
        ...state,
        selectedRecord:{},
        visible: true,
        selectedRecord:action.payload
      }
    }
    case 'modalOff': {
      let returnVal = { ...state, visible: false };
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
  inventory: [],
  transports: [],
  load:false,
  visible:false,
  edit:false,
  values:baseValues,
  status:"1",
  byPercentage:"0",
  assigned:false,
  search:"",
  selectedRecord:{},
  assignLoad:false,

  from:moment().subtract(7,'days').format("YYYY-MM-DD"),
  to:moment().format("YYYY-MM-DD"),
};

const Bookings = () => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  const getInventoryTickets = (id, data) => {
    let result = [];
    data.forEach((x)=>{
      if(x.TourOptionId==id){
        result.push(x)
      }
    })
    return result
  }

  const getBooking = async() => {
    dispatch({type:'set', payload:{
      load:true,
    }});
    await axios.get(process.env.NEXT_PUBLIC_CREATE_GET_ALL_RESERVATIONS,{
      headers:{
        from:state.from,
        to:state.to
      }
    })
    .then((x)=>{
      console.log(x.data)
      let bookingsData = x.data;
      let tempValues = bookingsData.result;
      tempValues?.forEach((x)=>{
        x.assigningLeft = 0;
        x.booking_no = `${x.booking_no}`;
        x.BookedTours.forEach((y)=>{
          y.BookedToursOptions.forEach((z)=>{
            z.inventory=getInventoryTickets(z.TourOptionId, bookingsData.resultTwo);
            x.assigningLeft = z.assigned=="0"?x.assigningLeft+1: x.assigningLeft+ 0
          })
        })
      })
      dispatch({type:'set', payload:{
        inventory:bookingsData.resultTwo,
        records:tempValues,
        transports:bookingsData.transports,
        load:false
      }});
      checkNotifications();
    })
  }

  const checkNotifications = () => {
    axios.post(process.env.NEXT_PUBLIC_POST_CHECK_NOTIFICATION,{
      type:'tour'
    }).then((x)=>{
      // console.log(x.data)
    })
  }

  const onChange = (e) => 
    dispatch({type:'set', payload:{
      assigned:e
  }});
  
  return (
    <>
    <Row>
      <Col md={1}><h5>Bookings</h5></Col>
      <Col md={1}></Col>
      <Col md={2} className='d-flex'>
          <div className='py-1 mx-1'>From: </div>
          <Form.Control type={"date"} size="sm" value={state.from} onChange={(e)=>dispatch({type:"set", payload:{from:e.target.value}})} />
      </Col>
      <Col md={2} className='d-flex'>
        <div className='py-1 mx-1'>To: </div>
        <Form.Control type={"date"} size="sm" value={state.to} onChange={(e)=>dispatch({type:"set", payload:{to:e.target.value}})} />
      </Col>
      <Col md={2}>
        <button className='btn-custom' onClick={getBooking}>Go</button>
      </Col>
      <Col md={2}>
        <Input value={state.search} allowClear onChange={(e)=>dispatch({type:"set", payload:{search:e.target.value}})} placeholder='Search Bookings' />
      </Col>
      <Col md={2} className='pt-1'>
        {state.assigned?"Assigned":"Pending"}
        <Switch checked={state.assigned} onChange={onChange} className='mx-2' />
      </Col>
    </Row>
    {!state.load &&
    <Row style={{maxHeight:'69vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:"60vh", overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            {/* <th>No.</th> */}
            <th>No. #</th>
            <th>Name</th>
            <th>Email</th>
            <th>Packages</th>
            <th>Stripe PI</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {state.records
          .filter((x)=> { if(state.assigned){return x.assigningLeft==0}else{return x.assigningLeft!=0} })
          .filter((x)=>{
            if(x.booking_no.includes(state.search) || x.email.includes(state.search) || x.name.toLowerCase().includes(state.search.toLowerCase()) || x.payment_intent.toLowerCase().includes(state.search.toLowerCase())){
              return x
            }else if(state.search=="" ){
              return x
            }
          })
          .map((x, index) => {
          return (
          <tr key={index} className='hov-row' onClick={()=>dispatch({type:'select', payload:x})}>
            {/* <td><div style={{color:"#108ee9"}}><b>#{x.booking_no}</b></div></td> */}
            <td>#{x.booking_no} </td>
            <td>{x.name} </td>
            <td>{x.email} </td>
            <td className='px-4' style={{fontSize:15, color:"#a3592e"}}><b>{x.BookedTours.length}</b></td>
            <td style={{color:'grey'}}>{x.payment_intent}</td>
            <td style={{color:'grey'}}>
              <div className='fs-13'>
                {moment(x.createdAt).format("DD - MMM - YYYY")}
              </div>
              <div className='fs-10'>
                  {moment(x.createdAt).fromNow()}
              </div>
            </td>
            <td style={{color:"green"}}><b>{parseFloat(x.final_price).toFixed(2)}</b></td>
            <td style={{color:"green"}}>
              <b>
                {
                  x.assigningLeft==0?
                  <span style={{color:'green'}}>Assigned</span>:<span style={{color:'orange'}}>Pending</span>
                }
              </b>
            </td>
          </tr>
          )
        })}
        </tbody>
        </Table>
      </div>
    </Col>
    </Row>
    }
    {state.load && <div className='p-5 text-center'><Spinner/></div> }
    <Modal open={state.visible} width={1000} footer={false} centered
      onOk={()=>dispatch({ type: 'modalOff' })} onCancel={()=>dispatch({ type: 'modalOff' })}
    >
      <BookingInfo state={state} dispatch={dispatch} getBooking={getBooking} />
    </Modal>
    </>
  )
}

export default React.memo(Bookings)