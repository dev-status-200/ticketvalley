import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Modal, Tag } from 'antd';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons';
import BookingInfo from './BookingInfo';
import moment from 'moment';

function recordsReducer(state, action){
    switch (action.type) {
      case 'toggle': { 
        return { ...state, [action.fieldName]: action.payload } 
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
      let tempValues = bookingsData.result;
      tempValues.forEach((x)=>{
        x.BookedTours.forEach((y)=>{
          y.BookedToursOptions.forEach((z)=>{
            z.inventory=getInventoryTickets(z.TourOptionId, bookingsData.resultTwo)
          })
        })
      })
      dispatch({type:'toggle', fieldName:'records', payload:tempValues});
      dispatch({type:'toggle', fieldName:'inventory', payload:bookingsData.resultTwo});
    }, [])

  return (
    <div>
    <Row>
      <Col><h5>Bookings</h5></Col>
    </Row>
    <Row style={{maxHeight:'69vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>No. Of Tickets</th>
            <th>Price</th>
            <th>Stripe PI</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
        {state.records.map((x, index) => {
          return (
          <tr key={index} className='hov-row'
            onClick={()=>{
                dispatch({type:'select', payload:x})
            }}
          >
            <td>{index+1} </td>
            <td>
              <div style={{color:"#108ee9"}}><b>#{x.booking_no}</b></div>
            </td>
            <td>{x.name} </td>
            <td>{x.email} </td>
            <td className='px-4' style={{fontSize:15, color:"#a3592e"}}><b>{x.BookedTours.length}</b></td>
            <td style={{color:"green"}}><b>{parseFloat(x.final_price).toFixed(2)}</b></td>
            <td style={{color:'grey'}}>{x.payment_intent}</td>
            <td style={{color:'grey'}}>
              {moment(x.createdAt).format("DD - MMM - YYYY")}
              <br/>
              {moment(x.createdAt).fromNow()} 
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
    </div>
  )
}

export default Bookings