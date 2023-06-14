import React, { useEffect, useState, useRef, createRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Input, Rate } from 'antd';
import Ticket from './Ticket';
import moment from 'moment';
import Link from 'next/link';
import CircleIcons from '../../Shared/CircleIcons';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import Router from 'next/router'
const { TextArea } = Input;

const TicketPage = ({ticketData, bookingNo}) => {
    let inputRef = useRef(null);
    const [tickets, setTickets] = useState([]);
    const [fetchedTicket, setFetchedTicket] = useState({});

    const selectTour = async(tour, option) => {
        if(option.assigned=="1"){
            let count = option.codes.split(", ")
            let ticket = [];
            count.forEach((x)=>{
                ticket.push({
                    image:tour.image,
                    title:option.tourOptName,
                    name:tour.customerTitle + " " + tour.customerName,
                    transfer:option.transfer,
                    date:moment(option.date).format("MMM-DD-YYYY"),
                    assigned:option.assigned,
                    code:x
                })
            })
            console.log(option);
            await setFetchedTicket(ticket);
        }
	};

    const submitReview = async(data) => {
        await axios.post(process.env.NEXT_PUBLIC_POST_CUSTOMER_REVIEW,{
            id:data.id, review:data.review, rating:data.rating
        }).then((x)=>Router.push(`/ticketPage?id=${bookingNo}`))
    }

    useEffect(() => {
        let temp = ticketData.result.BookedTours;
        temp.forEach((x, i)=>{
            x.BookedToursOptions.forEach((y, j)=>{
                y.check = false;
                y.reviewCheck = false;
                y.rating = y.rating==null?0:parseInt(y.rating) ;
            })
        })
        setTickets(temp);
    }, [])
    const btm = {position:'relative', bottom:3}

  return (
    <div style={{minHeight:'50vh', backgroundColor:"white"}}>
        <div className='home-styles'>
        <div className='theme py-4'>
            <div className='navBar'>
            <Link className='navLink' href='/'>HOME</Link>
            <div className='dropdown'>
            <div className='navLink dropbtn'>DESTINATION</div>
            <div className="dropdown-content">
                <a className='menu-drop-links pb-2'>Dubai</a>
            </div>
            </div>
            <span className="navLink">
                <img src={'/images/logo.png'} height={100} />
            </span>
            <div className='dropdown  mx-2'>
                <span className='navLink dropbtn'>ACTIVITIES</span>
                <div className="dropdown-content">
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Parks'}}}>Theme Parks</Link>
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
                    <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
                    <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
                </div>
            </div>
            <Link className='navLink' href='/about'>ABOUT US</Link>
            </div>
        </div>
        </div>
        <div className=''>
        <CircleIcons/>
        <hr className='mb-0 mt-5' />
        <div className='tickets-cont pb-5'>
            <h3 className='mt-4 grey-txt'>Tickets for booking #  {ticketData?.result?.booking_no}</h3>
            <span className='grey-txt'> Please select the ticket to interact</span>
            <Row className='ticket-cont-wh-bg my-3'>
            {tickets.map((x, i)=>{
            return(
            <Col md={12} key={i}>
                {i!==0 && <hr className='my-0 py-0' />}
                {x.BookedToursOptions.map((y, j)=>{
                return(
                <Row className={y.check?'selected-ticket-row':'ticket-row'} key={"a"+j} 
                    onClick={()=>{
                        if(!y.TourOption.manual){
                            let temp = [...tickets];
                            temp.forEach((l)=>{
                                l.BookedToursOptions.forEach((m)=>{
                                    m.check=false
                                })
                            })
                            temp[i].BookedToursOptions[j].check=true;
                            setTickets(temp);
                            selectTour(x, y);
                        }
                    }}
                >
                    <Col md={2}>
                        <img className='' src={x.image} height={100} width={140} style={{borderRadius:5}} />
                    </Col>
                    <Col md={6}>
                    <h5>{y.tourOptName}</h5>
                    <div className='mx-1'>
                        <span className=''>Adults:       <span style={{color:'grey'}}>{y.adult}  </span> </span>
                        <span className='mx-2'>Children: <span style={{color:'grey'}}>{y.child}  </span> </span>
                        <span className='mx-2'>Infant:   <span style={{color:'grey'}}>{y.infant} </span> </span>
                    </div>
                    <div className='mx-1'>
                        <span className=''>Transfer:   <span style={{color:'grey'}}>{y.transfer} </span> </span>
                        {y.transfer!="No" && <div><span className=''>Pick-up:</span>    <span style={{color:'grey'}}>{y.address}</span></div>}
                    </div>
                    </Col>
                    <Col md={4} >
                        <div style={{float:'right', height:"100%"}}>
                            <div className=' text-end '>
                                <div className='mx-3'>{" "}</div>
                                {
                                y.assigned=="1"?
                                <>
                                <div className='mx-3 fs-12'>{y.TourOption.manual?'Not Downloadable':'Downloadable'}</div>
                                <div className='mx-3 fs-18'>{y.TourOption.manual?<>Check your E-mail Inbox</>:"Select & Download"}</div>
                                <img src={'/icons/ticket-available.png'} height={50} />
                                </>:
                                <>
                                <div className='mx-3 fs-12'>{y.TourOption.manual?'Not Downloadable':'Downloadable'}</div>
                                <div className='mx-3 fs-18'>Pending</div>
                                <img src={'/icons/ticket-pending.png'} height={50} />
                                </>
                                }
                            </div>
                            {y.assigned=="0" &&<div style={{position:'relative', top:"50%"}}>
                            </div>}
                        </div>
                    </Col>
                    {y.reviewed=="0" &&<>
                    {moment().diff(moment(y.date)) >= 0 && 
                    <Col md={12} className='mt-3'>
                        <div
                          onClick={()=>{
                            let tempTickets = [...tickets];
                            tempTickets[i].BookedToursOptions[j].reviewCheck = true;
                            setTickets(tempTickets)
                        }}>
                        <div className='fs-12'>Leave A Review </div>
                        <Rate allowHalf defaultValue={0} value={y.rating} style={{fontSize:14}} 
                            onChange={(e)=>{
                                let temp = [...tickets];
                                temp[i].BookedToursOptions[j].rating = e;
                                setTickets(temp);
                            }}
                        />
                        {y.reviewCheck &&
                        <>
                            <TextArea className='mt-3' rows={2} placeholder="300 Characters Max" maxLength={300}
                                value={y.review}
                                onChange={(e)=>{
                                    let temp = [...tickets];
                                    temp[i].BookedToursOptions[j].review = e.target.value;
                                    setTickets(temp);
                                }}
                            />
                            <div className='text-end'>
                            <button className='btn-custom mt-2'
                                onClick={()=>submitReview(y)}
                            >Submit</button>
                            </div>
                        </>
                        }
                        </div>
                    </Col>}
                    </>}
                </Row>
                )
                })}
            </Col>
            )})}
            </Row>
            {fetchedTicket.length>0 &&
            <ReactToPrint content={()=>inputRef} trigger={()=><button className='custom-btn'>Get Ticket</button>} />
            }
            {fetchedTicket.length==0 && 
                <div>The Selected Ticket is pending for arrival</div>
            }
        </div>
        </div>

        {fetchedTicket.length>0 &&
        <div 
            style={{display:"none"}}
        >
        <div ref={(response) => (inputRef = response)} >
            {fetchedTicket.map((x, i)=>{
                return(
                    <div key={i} className=''>
                        <div className='my-5'></div>
                        <Ticket fetchedTicket={x} i={i} />
                    </div>
                )
            })}
        </div>
        </div>}
    </div>
  )
}

export default TicketPage