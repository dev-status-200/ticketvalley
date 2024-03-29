import { CheckOutlined, DiffOutlined } from "@ant-design/icons";
import { Col, Row, Spinner } from 'react-bootstrap';
import React, { useEffect } from 'react';
import moment from 'moment';
import Details from "./Details";
import axios from "axios";
import Router from "next/router";
import { openNotification } from "/Components/Shared/Notification"

const BookingInfo = ({state, dispatch, getBooking}) => {

    const assignTicket = async(data, count, type) => {
        dispatch({type:'set', payload:{
            assignLoad:true
        }})
        if(type!="no"){
            let tempTickets = [], i=0;
            if(!data.TourOption.manual){
                while(tempTickets.length!=count){
                    if(!data.inventory[i].used){
                        tempTickets.push({...data.inventory[i], used:true});
                    }
                    i++;
                }
            }
            await axios.post(process.env.NEXT_PUBLIC_CREATE_POST_ASSIGN_TICKET,{
                data, tickets:tempTickets, email:state.selectedRecord['email'],
                ticketId:state.selectedRecord.id, manual:data.TourOption.manual
            }).then((x)=>{
                if(x.data.result[0]==1){
                    openNotification("Success", "Operation Done Successfully", "green");
                    dispatch({type:'set', payload:{
                        visible:false,
                        assignLoad:false
                    }})
                    getBooking()
                    // Router.push("/bookings");
                }
            })
        } else {
            await axios.post(process.env.NEXT_PUBLIC_CREATE_POST_REVERSE_TICKET,{
                id:data.id
            }).then((x)=>{
                openNotification("Success", "Operation Done Successfully", "green");
                dispatch({type:'set', payload:{
                    visible:false
                }})
                getBooking()
                // Router.push("/bookings");
            })
        }
    }

    const transportName = (id) => {
        let result = "";
        state.transports.forEach(x => {
            if(x.id==id){
                result = x.name
            }
        });
        return result
    }

  return (
    <div className='p-3'>
        <h4>Booking Details</h4><hr/>
        <Row>
            <Col md={4}>
                <h6>Booking Info</h6>
                <Details state={state} />
            </Col>
            <Col md={8}>
            <h6>Tours Info</h6>
            <Row>{state.selectedRecord.BookedTours.map((x, i)=>{
            return(
            <Col md={12} className='grey-txt tour-booking-list' key={x.id}>
            <Row className='px-1 py-2'>
                <Col md={12} >
                {x.BookedToursOptions.map((y, j)=>{
                return(<div key={j+'a'}>
                    {j!=0 && <hr className='my-2' />}
                    <span className='fw-500' style={{borderBottom:"1px solid grey"}}>#{j+1} {y.tourOptName}</span>
                    {!y.TourOption.manual &&
                    <div>
                        {!state.assignLoad &&
                        <div className='fw-500 right text-end'>
                            {y.assigned=="0" &&<>
                            <div>{parseInt(y.adult) + parseInt(y.child)} Required</div>
                            <div style={{color:y.inventory.length>=parseInt(y.adult) + parseInt(y.child)?"green":'red'}}>
                                {y.inventory.length} In-Stock 
                            </div>
                            {(y.inventory.length>=parseInt(y.adult) + parseInt(y.child) && y.assigned=="0") &&
                            <div className="cur" style={{color:"#9b6a08"}} 
                                onClick={()=>assignTicket(y, parseInt(y.adult) + parseInt(y.child))}
                            > 
                                <DiffOutlined style={{position:'relative', bottom:2}} /> Assign
                            </div>
                            }
                            </>}
                            {y.assigned=="1" &&<>
                            <div style={{color:'green'}}> 
                                <CheckOutlined style={{position:'relative', bottom:2}}
                                    onClick={()=>assignTicket(y, parseInt(y.adult) + parseInt(y.child))}
                                /> Assigned
                            </div>
                            </>}
                        </div>}
                        {state.assignLoad && <Spinner/>}
                    </div>
                    }
                    {y.TourOption.manual &&
                    <div>
                        {!state.assignLoad && <div className='fw-500 right text-end'>
                            {y.assigned=="0" &&<>
                            <div>
                                {parseInt(y.adult) + parseInt(y.child)} Manual Required 
                                <div className="cur" style={{color:'#9b6a08'}} 
                                    onClick={()=>assignTicket(y, parseInt(y.adult) + parseInt(y.child))}
                                > 
                                    <DiffOutlined  style={{position:'relative', bottom:2}} /> Assign
                                </div>
                            </div>
                            </>}
                            {y.assigned=="1" &&<>
                            <div style={{color:'green', cursor:'pointer'}}
                                onClick={()=>assignTicket(y, parseInt(y.adult) + parseInt(y.child),"no")}
                            >
                                <CheckOutlined style={{position:'relative', bottom:2}} /> Assigned Manually
                            </div>
                            </>}
                        </div>}
                        {state.assignLoad && <Spinner/>}
                    </div>
                    }
                    <div className=' mt-2'>
                    <span className='fw-500'>Adults:</span> <span className="silver-txt-2">{y.adult}</span>
                    <span className='mx-3'><span className='fw-500'>Childs:</span> <span className="silver-txt-2">{y.child}</span></span>
                    <span><span className='fw-500'>Infants:</span> <span className="silver-txt-2">{y.infant}</span></span>
                    <span className='mx-3'><span className='fw-500'>Transfer:</span>
                        <span className="silver-txt-2"> {y.transfer==1?"No":transportName(y.transfer)}</span>
                    </span>
                    <br/>
                    {y.transfer!="1" &&
                    <div style={{maxWidth:400}}>
                        <span className='fw-500'>Pickup: </span>
                        <span className="silver-txt-2">{y.address}</span>
                    </div>
                    }
                    <span className=''>
                        <span className='fw-500'>Tour Date:</span>
                        <span className="silver-txt-2"> {moment(y.date).format("DD/MM/YY")}</span>
                    </span>
                    </div>
                </div>)
                })}
                </Col>
            </Row>
            </Col>
            )})
            }</Row>
            </Col>
        </Row>
    </div>
  )
}

export default React.memo(BookingInfo)