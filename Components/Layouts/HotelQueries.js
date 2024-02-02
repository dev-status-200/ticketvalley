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
  submitLoad:false,
  visible:false,
  edit:false,
  selectedRecord:{}
};

const HotelQueries = ({}) => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  useEffect(() => {
    getHotelsQueries();
  }, [])
  
  const getHotelsQueries = async() => {
    await axios.get(process.env.NEXT_PUBLIC_GET_HOTEL_FORMS)
    .then((x)=>{
      dispatch({type:"set", 
        payload:{
          records:x.data.result,
          load:false,
          visible:false,
          submitLoad:false
        }
      })
    })
  }

  const markAsDone = async(id) => {
    dispatch({type:"set", 
      payload:{
        submitLoad:true,
      }
    })
    await axios.get(process.env.NEXT_PUBLIC_POST_HOTEL_QUERY_DONE,{
      headers:{id:id}
    }).then((x)=>{
      getHotelsQueries();
    })
  }

  return (
  <>
    <Row>
      <Col><h5>Hotel Queries</h5></Col>
    </Row>
    {!state.load &&<Row style={{maxHeight:'70vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Mail</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Dated</th>
            <th>Status</th>
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
            <td> {x.email} </td>
            <td> {moment(x.checkin).format("YYYY/MMM/ddd")} </td>
            <td> {moment(x.checkout).format("YYYY/MMM/ddd")} </td>
            <td> {moment(x.createdAt).fromNow()}  </td>
            <td> {x.done=="0"?"Pending":<CheckCircleOutlined style={{color:'green', position:'relative', bottom:4}} />} </td>
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
      title="Hotel Query"
      centered={false}
      footer={false} 
      width={450}
    >
      <Row className='fs-17'>
        <hr/>
        <Col md={4}>Email:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.email}</Col>
        {/* <br/> */}
        <Col md={4}>Check-in:</Col>
        <Col md={8} className='text-end'>{moment(state.selectedRecord.checkin).format("YYYY/MMM/ddd")}</Col>
        {/* <br/> */}
        <Col md={4}>Check-out:</Col>
        <Col md={8} className='text-end'>{moment(state.selectedRecord.checkout).format("YYYY/MMM/ddd")}</Col>
        {/* <br/> */}
        <Col md={4}>Rooms:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.rooms}</Col>
        {/* <br/> */}
        <Col md={4}>Adults:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.adults}</Col>
        {/* <br/> */}
        <Col md={4}>Children:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.children}</Col>
        {/* <br/> */}
        <Col md={4}>Rating:</Col> 
        <Col md={8} className='text-end'>
          {state.selectedRecord.rating} Star
          {" "}<Rate value={state.selectedRecord.rating} disabled />
        </Col>
        <hr/>
        <Button disabled={state.selectedRecord.done=="1"?true:false} type='primary' 
          onClick={()=>markAsDone(state.selectedRecord.id)}
        >
          {!state.submitLoad?"Mark as Done":<Spinner size='sm' />}
        </Button>
      </Row>
    </Modal>
  </>
  )
}

export default React.memo(HotelQueries)