import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { Switch } from 'antd';
import { Form } from 'react-bootstrap';
import { InputNumber, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons'

const DetailsThree = ({state, setValues, dispatch}) => {

  return (
    <div style={{minHeight:542}}>
    <Row>
        <Col className='mx-1 mt-3' md={2}>
            <div>Dated Tour</div>
            <Switch checked={state.dated} onChange={()=>{
                dispatch({type:'field', fieldName:"dated", payload:!state.dated})
            }} />
        </Col>
        {!state.dated&&
        <Row>
        <Col md={2} className="mt-3">
            <div>Stock</div>
            <InputNumber value={state.stock} min={0} onChange={(e)=>dispatch({type:'field', fieldName:"stock", payload:e})} />
        </Col>
        </Row>
        }
        {state.dated&&
        <Col md={12} className="mt-3">
            <Row>
                <Col md={2}>
                    <div className='btn-custom text-center'
                        onClick={()=>{
                            let temp = [...state.dates];
                            temp.push({date:'', stock:0})
                            dispatch({type:'field', fieldName:"dates", payload:temp})
                        }}
                    >Add Date</div>
                </Col>
                <div className='mt-3' style={{maxHeight:400, overflowY:"auto"}}>
                {state.dates.map((x, i)=>{
                return(
                <Row key={i}>
                <Col md={4} className="date-list-boundary">
                    <Row>
                        <Col md={2}>
                        <Form.Control type='date' size="sm" value={x.date} 
                            onChange={(e)=>{
                                let temp = [...state.dates];
                                let exist = false;
                                state.dates.forEach((y)=>{
                                    if(y.date==e.target.value){
                                        exist = true;
                                    }
                                });
                                !exist?temp[i].date=e.target.value: message.error('Same Date Already Exists');
                                dispatch({type:'field', fieldName:"dates", payload:temp})
                            }}
                        />
                        </Col>
                        <Col md={4} className="specific-date my-1">{x.date}</Col>
                        <Col md={4}>
                        <InputNumber className='mb-2' placeholder="Type Terms & Conditions" value={x.stock} min={0}
                            onChange={(e)=>{
                                let temp = [...state.dates];
                                temp[i].stock=e;
                                dispatch({type:'field', fieldName:"dates", payload:temp})
                            }} 
                        />
                        </Col>
                        <Col className='pt-1'>
                        <CloseCircleOutlined className='close-icon' style={{float:"right"}}
                            onClick={()=>{
                                let temp = [...state.dates];
                                temp.splice(i, 1)
                                dispatch({type:'field', fieldName:"dates", payload:temp})
                            }}
                        />
                        </Col>
                    </Row>
                </Col>
                </Row>
                )})}
                </div>
            </Row>
        </Col>
        }
    </Row>
    </div>
  )
}

export default DetailsThree