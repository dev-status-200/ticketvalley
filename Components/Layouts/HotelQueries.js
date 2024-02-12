import React, { useEffect, useReducer } from 'react';
import { Row, Col, Table, Spinner } from 'react-bootstrap';
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
  load:true,
  submitLoad:false,
  visible:false,
  edit:false,
  selectedRecord:{}
};

const HotelQueries = ({}) => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  useEffect(() => {
    checkNotifications(getHotelsQueries());
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

  const markAsDone = async(id, status) => {
    dispatch({type:"set", 
      payload:{
        submitLoad:true,
      }
    })
    await axios.get(process.env.NEXT_PUBLIC_POST_HOTEL_QUERY_DONE,{
      headers:{id:id, status}
    }).then((x)=>{
      getHotelsQueries();
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

  const checkNotifications = () => {
    axios.post(process.env.NEXT_PUBLIC_POST_CHECK_NOTIFICATION,{
      type:'hotel'
    }).then((x)=>{
      // console.log(x.data)
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
      centered={true}
      footer={false} 
      width={450}
    >
      <Row className='fs-17'>
        <hr/>
        <Col md={4}>Name:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.name}</Col>

        <Col md={4}>Email:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.email}</Col>

        <Col md={4}>Nationality:</Col>
        <Col md={8} className='text-end'>{getCodeValue(state.selectedRecord.nationality)}</Col>

        <Col md={4}>Contact:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.contact}</Col>

        <Col md={4}>Check-in:</Col>
        <Col md={8} className='text-end'>{moment(state.selectedRecord.checkin).format("YYYY/MMM/ddd")}</Col>

        <Col md={4}>Check-out:</Col>
        <Col md={8} className='text-end'>{moment(state.selectedRecord.checkout).format("YYYY/MMM/ddd")}</Col>

        <Col md={4}>Destination:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.destination}</Col>

        <Col md={4}>Hotel:</Col>
        <Col md={8} className='text-end'>{state.selectedRecord.hotel}</Col>

        <Col md={4}>Rating:</Col> 
        <Col md={8} className='text-end'>
          {state.selectedRecord.rating} Star
          {" "}<Rate value={state.selectedRecord.rating} disabled />
        </Col>
          <hr/>
        <Col md={4}>Guest Info:</Col> 
        <Col md={8} className='text-end'>
          {state.selectedRecord.Rooms?.map((y, j)=>{
            return (<div key={j}>Room: {j+1} Adults: {y.adult}, Children: {y.child}</div>)
          })}
        </Col> 
        <hr className='mt-2' />
        <Button type='primary' 
          onClick={()=>markAsDone(state.selectedRecord.id, state.selectedRecord.done)}
        >
          {!state.submitLoad?"Toggle Status":<Spinner size='sm' />}
        </Button>
      </Row>
    </Modal>
  </>
  )
}

export default React.memo(HotelQueries)