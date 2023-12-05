import React, { useEffect, useState } from 'react';
import { Input, InputNumber, Switch, message, Popover } from 'antd';
import { Row, Col, Form } from 'react-bootstrap';
import { CloseCircleOutlined, DeleteOutlined, CopyOutlined, ReloadOutlined, FieldTimeOutlined } from '@ant-design/icons';
import DatePicker, { DateObject, getAllDatesInRange } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import moment from "moment"

const PackagesInfo = ({register, control, state, setValues, dispatch}) => {

  return (
    <div style={{minHeight:542, maxHeight:542, overflowY:"auto", overflowX:"hidden"}}>
        <Row>
        <Col md={10}>
            <h3 className='mx-2'>Tour Options</h3>
        </Col>
        <Col md={2}>
        <div className='mt-2 btn-custom text-center'
            onClick={()=>{
                let tempState = [...state.packages];
                tempState.push({ 
                    id:"", name:"", child_price:0.00, adult_price:0.00, status:"1",
                    stock:"20", timed:false, dated:false, dates:[], timeSlots:[], manual:false, transport:false
                })
                dispatch({type: 'field', fieldName: 'packages', payload: tempState });
            }}>Add</div>
        </Col>
        </Row>
        {state.packages.map((x, i)=>{
            return(
            <Row key={i} className={`m-2 p-3 ${x.status=="1"?"bgc-01":"bgc-02"}`}>
            <Col md={12}>
            <div className='cur copy-tag' 
                onClick={()=>{ 
                    navigator.clipboard.writeText(`i${x.id}`);
                    message.info(`Tour Id Copied`)
                }}
            >Copy <CopyOutlined /></div>
            </Col>
            <Col md={4}>
                <div className='mt-2'>Option #{i+1}</div>    
                <Input className='mb-2' value={x.name} 
                    onChange={(e)=>{
                        let temp = [...state.packages]
                        temp[i].name = e.target.value;
                        setValues(temp,'packages');
                    }} 
                />
            </Col>
            <Col style={{maxWidth:100}}>
            <div className='mt-2'>Adult Price</div>
                <InputNumber className='mb-2' value={x.adult_price} min="0" stringMode
                    onChange={(e) => {
                        let temp = [...state.packages];
                        temp[i].adult_price = e;
                        setValues(temp,'packages');
                    }} 
                />
            </Col>
            <Col style={{maxWidth:100}}>
                <div className='mt-2'>Child Price</div>   
                <InputNumber className='mb-2' value={x.child_price} min="0" stringMode
                    onChange={(e) => {
                        let temp = [...state.packages];
                        temp[i].child_price = e;
                        setValues(temp,'packages');
                    }} 
                />
            </Col>
            <Col className="my-2" style={{maxWidth:70}}>
                <div>Dated</div>
                <Switch checked={x.dated} onChange={()=>{
                    let tempState = [...state.packages];
                    tempState[i].dated = !tempState[i].dated;
                    dispatch({type:'field', fieldName:"packages", payload:tempState})
                }} />
            </Col>
            <Col className="my-2" style={{maxWidth:70}}>
                <div>Timed</div>
                <Switch checked={x.timed} onChange={()=>{
                    let tempState = [...state.packages];
                    tempState[i].timed = !tempState[i].timed
                    dispatch({type:'field', fieldName:"packages", payload:tempState})
                }} />
            </Col>
            <Col className="my-2" style={{maxWidth:100}}>
                <div>Transport</div>
                <Switch checked={x.transport} onChange={()=>{
                    let tempState = [...state.packages];
                    tempState[i].transport = !tempState[i].transport
                    dispatch({type:'field', fieldName:"packages", payload:tempState})
                }} />
            </Col>
            <Col className="my-2" style={{maxWidth:100}}>
                <div>Manual</div>
                <Switch checked={x.manual} onChange={()=>{
                    let tempState = [...state.packages];
                    tempState[i].manual = !tempState[i].manual
                    dispatch({type:'field', fieldName:"packages", payload:tempState})
                }} />
            </Col>
            
            <Col md={1} className="my-1">
                {x.id!="" && <>
                    {x.status=="1"?
                        <DeleteOutlined className='cross-icon mt-4' style={{fontSize:20}}
                        onClick={()=>{
                            let tempState = [...state.packages];
                            tempState[i].status="0";
                            console.log(tempState[i])
                            dispatch({ type: 'field', fieldName: 'packages', payload: tempState })
                        }}/>:
                        <ReloadOutlined className='cross-icon mt-4' style={{fontSize:20}}
                        onClick={()=>{
                            let tempState = [...state.packages];
                            tempState[i].status="1";
                            console.log(tempState[i])
                            dispatch({ type: 'field', fieldName: 'packages', payload: tempState })
                        }}/>
                    }
                </>
                }
                {x.id=="" && 
                <CloseCircleOutlined className='cross-icon mt-4' style={{fontSize:20}}
                onClick={()=>{
                    let tempState = [...state.packages];
                    tempState.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'packages', payload: tempState })
                }}/>
                }
            </Col>
            {x.dated &&
            <Col className="mt-1">
                <div>Set Dates</div>
                <DatePicker 
                    multiple
                    value={x.dates}
                    dateSeparator=","
                    onChange={(x,y)=>{
                        let temp = [...state.packages];
                        temp[i].dates=y.validatedValue;
                        dispatch({type:'field', fieldName:"packages", payload:temp})
                    }}
                    plugins={[
                        <DatePanel />
                    ]}
                />
            </Col>}
            {x.timed &&
            <Col md={6} className="mt-3">
                <Row>
                    <Col md={5}>
                        <div className='btn-custom text-center'
                            onClick={()=>{
                                let temp = [...state.packages];
                                if(temp[i].timeSlots==undefined){
                                    temp[i].timeSlots = [];
                                }
                                temp[i].timeSlots.push({slot:''});
                                dispatch({type:'field', fieldName:"packages", payload:temp})
                            }}
                        >Add Time Slot</div>
                    </Col>
                    <Col>
                    <Popover placement="topLeft" content={
                        <div>
                            Starting Time
                            <Form.Control size="sm" type="time" value={state.timeStart}
                                onChange={(e)=>{
                                    dispatch({type:'field', fieldName:"timeStartWithDate", payload:moment(`2012/10/09 ${e.target.value}`)})
                                    dispatch({type:'field', fieldName:"timeStart", payload:e.target.value})
                                }} />
                            <br/>
                            {state.timeStart!="" && 
                            <>
                                <Form.Control size="sm" type="time" value={state.timeEnd} 
                                Ending Time
                                onChange={(e)=>{
                                    dispatch({type:'field', fieldName:"timeEndWithDate", payload:moment(`2012/10/09 ${e.target.value}`)})
                                    dispatch({type:'field', fieldName:"timeEnd", payload:e.target.value})
                                }}
                                />
                                <InputNumber className='mt-3' value={state.minutes} min={0} max={60} 
                                    onChange={(e)=>dispatch({type:'field', fieldName:"minutes", payload:e})}
                                />
                                <br/>
                                <button className='mt-3 btn-custom'
                                    onClick={()=>{
                                        var start = new Date(state.timeStartWithDate);
                                        var end = new Date(state.timeEndWithDate);

                                        var slices = [];
                                        var count = 0;

                                        while (end > start) {
                                        if(count==0){
                                            start = new Date(start.getTime());
                                        }else{
                                            start = new Date(start.getTime() + (parseInt(state.minutes) * 60 * 1000));
                                        }
                                        slices.push({
                                            slot:`${moment(start).format("HH:mm")}`//start
                                        });
                                        count++;
                                        }
                                        slices.pop()
                                        let temp = [...state.packages]
                                        temp[i].timeSlots = slices;
                                        dispatch({type:'field', fieldName:"packages", payload:temp})
                                    }}
                                >Set Time Slots</button>
                            </>
                            }
                      </div>
                    } title="Title" trigger="click">
                        <FieldTimeOutlined/>
                    </Popover>
                    </Col>
                    {x.timeSlots && <div className='mt-1' style={{maxHeight:400, overflowY:"auto"}}>
                    {x.timeSlots.map((y, j)=>{  
                    return(
                    <Row key={j}>
                    <Col md={9} className="date-list-boundary py-1 px-2">
                        <Row>
                            <Col md={6}>
                            <Form.Control size="sm" type="time" value={y.slot} 
                                onChange={(e)=>{
                                    let temp = [...state.packages];
                                    temp[i].timeSlots[j].slot=e.target.value;
                                    dispatch({type:'field', fieldName:"packages", payload:temp})
                                }}
                            />
                            </Col>
                            <Col className='pt-1'>
                            <CloseCircleOutlined className='close-icon' style={{float:"right"}}
                                onClick={()=>{
                                    let temp = [...state.packages];
                                    temp[i].timeSlots.splice(j, 1)
                                    dispatch({type:'field', fieldName:"dates", payload:temp})
                                }}
                            />
                            </Col>
                        </Row>
                    </Col>
                    </Row>
                    )})}
                    </div>}
                </Row>
            </Col>
            }
            </Row>
            )
        })}
    </div>
  )
}

export default PackagesInfo