import React, { useEffect, useReducer } from 'react';
import { Row, Col, Table, Spinner } from 'react-bootstrap';
import { Modal, Button, Rate, Input, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { openNotification } from "/Components/Shared/Notification"
import axios from 'axios';
import moment from 'moment';
import Router from 'next/router';

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
  selectedRecord:{},
  add:false,
  city:"",
};

const Destinations = () => {

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);

  useEffect(() => {
    getDestinations();
  }, []);

  const getDestinations = async() => {
    await axios.get(process.env.NEXT_PUBLIC_GET_ALL_DESTINATIONS)
    .then((x)=>{
      dispatch({type:"set", 
        payload:{
          records:x.data.result,
          load:false
        }
      })
    })
  };

  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
    // message.error('Click on No');
  };

  return (
  <>
    <Row>
      <Col><h5>Destinations</h5></Col>
    </Row>
    {!state.load &&<Row style={{maxHeight:'70vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
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
            <td> {x.active=="1"?<span className='green-txt'>Active</span>:<span className='red-txt'>Disabled</span>} </td>
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
      title="Cities"
      centered={false}
      footer={false} 
      width={500}
    >
      <Row className='fs-17'>
        <hr/>
        <Col md={4}><b>{state.selectedRecord.name}</b></Col>
        {state?.selectedRecord?.Cities?.map((x, i)=>{
          return (
            <div key={i} className='mb-2'>
              {i+1}. {x.name} 
                <span className='mx-1'></span>
                <Popconfirm
                  title="Delete City?"
                  disabled={x.deletable=="0"?true:false}
                  description="Are you sure to delete this task?"
                  onConfirm={()=>{
                    axios.post(process.env.NEXT_PUBLIC_POST_DELETE_CITY,{
                      id:x.id
                    }).then((x)=>{
                      console.log(x.data);
                      Router.push("/destinations")
                    })
                  }}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger={x.deletable=="0"?true:false} disabled={x.deletable=="0"?true:false} size='small'
                    onClick={()=>{
                      if(x.deletable=="1"){
                        console.log(x.id);
                      }
                    }}
                  > Delete
                  </Button>
                </Popconfirm>

            </div>
          )})}
          <Col md={6}>
            {state.add==true && 
              <Input size='large' placeholder='Add A city' 
                value={state.city}
                onChange={(e)=>{
                  dispatch({type:"set", 
                    payload:{
                      city:e.target.value
                    }
                  })
                }}
              />
            }
          </Col>
          <Col md={2}>
            { (state.add && state.city.length>2) && 
              <button className='custom-btn-sm'
                onClick={()=>{
                  dispatch({type:"set", 
                    payload:{
                      load:true,
                      visible:false
                    }
                  });
                  axios.post(process.env.NEXT_PUBLIC_POST_CREATE_CITY,{
                    DestinationId:state.selectedRecord.id,
                    name:state.city,
                    active:'1',
                    deletable:'1'
                  }).then((x)=>{
                    console.log(x.data);
                    Router.push("/destinations")
                  })
                }}
              >Done</button>
            }
          </Col>
          <Col md={12} className='p-2'></Col>
          <Col md={4}>
            <button className='custom-btn-sm'
              onClick={()=>{
                dispatch({type:"set", 
                  payload:{
                    add:!state.add
                  }
                })
              }}
            >{!state.add?"Add City":"Cancel"}</button>
          </Col>
      </Row>
    </Modal>
  </>
  )
}

export default React.memo(Destinations)