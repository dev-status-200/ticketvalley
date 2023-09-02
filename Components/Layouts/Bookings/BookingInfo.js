import { CheckOutlined, DiffOutlined } from "@ant-design/icons";
import { Col, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import moment from 'moment';
import Details from "./Details";
import axios from "axios";
import Router from "next/router"

const BookingInfo = ({state, dispatch}) => {

    const assignTicket = async(data, count, type) => {
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
                    Router.push("/bookings");
                }
            })
        } else {
            await axios.post(process.env.NEXT_PUBLIC_CREATE_POST_REVERSE_TICKET,{
                id:data.id
            }).then((x)=>{
                Router.push("/bookings");
            })
        }
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
            return(<>
            <Col md={12} className='grey-txt tour-booking-list'>
            <Row className='px-1 py-2'>
                <Col md={12} >
                {x.BookedToursOptions.map((y, j)=>{
                return(<div key={j+'a'}>
                    {j!=0 && <hr className='my-2' />}
                    <span className='fw-500' style={{borderBottom:"1px solid grey"}}>#{j+1} {y.tourOptName}</span>
                    {!y.TourOption.manual &&
                    <div>
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
                        </div>
                    </div>
                    }
                    {y.TourOption.manual &&
                    <div>
                        <div className='fw-500 right text-end'>
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
                        </div>
                    </div>
                    }
                    <div className=' mt-2'>
                    <span className='fw-500'>Adults:</span> <span>{y.adult}</span>
                    <span className='mx-3'><span className='fw-500'>Childs:</span> <span>{y.child}</span></span>
                    <span><span className='fw-500'>Infants:</span> <span>{y.infant}</span></span>
                    <span className='mx-3'><span className='fw-500'>Transfer:</span> <span>{y.transfer}</span></span>
                    <br/>
                    {y.transfer!="No" &&
                    <Row className='text-start'>
                        <Col style={{maxWidth:70}}><span className='fw-500'>Pickup:</span></Col>
                        <Col md={8}>{y.address}</Col>
                    </Row>
                    }
                    <span className=''>
                        <span className='fw-500'>Tour Date:</span>
                        <span> {moment(y.date).format("DD/MM/YY")}</span>
                    </span>
                    </div>
                </div>)
                })}
                </Col>
            </Row>
            </Col>
            </>)})
            }</Row>
            </Col>
        </Row>
    </div>
  )
}

export default BookingInfo