import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Input, Modal, Switch } from 'antd';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons';
import BookingInfo from './BookingInfo';
import moment from 'moment';

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
    inventory: [],
    load:false,
    visible:false,
    edit:false,
    values:baseValues,
    status:"1",
    byPercentage:"0",
    assigned:false,
    search:"",
    selectedRecord:{},
};

const Bookings = ({bookingsData}) => {

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

    useEffect(()=>{
      console.log(bookingsData.result)
      let tempValues = bookingsData.result;
      tempValues.forEach((x)=>{
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
        records:tempValues
      }});
    }, [])

    const onChange = (e) => 
      dispatch({type:'set', payload:{
        assigned:e
    }});

  return (
    <>
    <Row>
      <Col md={1}><h5>Bookings</h5></Col>
      <Col md={8}></Col>
      <Col md={2}><Input value={state.search} allowClear onChange={(e)=>dispatch({type:"set", payload:{search:e.target.value}})} placeholder='Search' /></Col>
      <Col md={1} className='pt-1'><Switch checked={state.assigned} onChange={onChange} /></Col>
    </Row>
    <Row style={{maxHeight:'69vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>No.</th>
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
        {
        state.records
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
            <td><div style={{color:"#108ee9"}}><b>#{x.booking_no}</b></div></td>
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
    <Modal
      open={state.visible}
      onOk={()=>dispatch({ type: 'modalOff' })} onCancel={()=>dispatch({ type: 'modalOff' })}
      width={1000} footer={false} 
    >
       <BookingInfo state={state} dispatch={dispatch} />
    </Modal>
    </>
  )
}

export default Bookings