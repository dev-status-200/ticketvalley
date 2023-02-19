import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Modal, Tag } from 'antd';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons';
import BookingInfo from './BookingInfo';

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

    useEffect(()=>dispatch({type:'toggle', fieldName:'records', payload:bookingsData}), [])

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
          </tr>
        </thead>
        <tbody>
        {state.records.map((x, index) => {
          return (
          <tr key={index} className='f hov-row'
            onClick={()=>{
                dispatch({type:'select', payload:x})
            }}
          >
            <td>{index+1} </td>
            <td><Tag color="#108ee9" style={{fontSize:15}}><b>{x.id}</b></Tag></td>
            <td>{x.name} </td>
            <td>{x.email} </td>
            <td className='px-4'><Tag color="#a3592e" style={{fontSize:15}}><b>{x.BookedTours.length}</b></Tag></td>
            <td> <Tag color="#34762e" style={{fontSize:15}}><b>{x.final_price}</b></Tag></td>
            <td style={{color:'grey'}}>{x.payment_intent}</td>
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
      width={750} footer={false} centered={false}
    >
       <BookingInfo state={state} dispatch={dispatch} />
    </Modal>
    </div>
  )
}

export default Bookings