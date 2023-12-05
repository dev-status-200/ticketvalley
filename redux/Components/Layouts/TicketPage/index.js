import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Input, Rate } from 'antd';
import Ticket from './Ticket';
import moment from 'moment';
import Link from 'next/link';
import CircleIcons from '../../Shared/CircleIcons';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import Router from 'next/router';
import { delay } from '../../../functions/delay';
import CircleMobileIcons from '/Components/Shared/CircleMobileIcons';
import useWindowSize from '/functions/useWindowSize';
const { TextArea } = Input;

const TicketPage = ({ticketData, bookingNo}) => {

    const size = useWindowSize();
    let inputRef = useRef(null);
    const [load, setLoad] = useState(false);
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

    useLayoutEffect(() => {
        let temp = ticketData.result.BookedTours;
        temp.forEach((x, i)=>{
            x.BookedToursOptions.forEach((y, j)=>{
                y.check = false;
                y.reviewCheck = false;
                y.rating = y.rating==null?0:parseInt(y.rating) ;
            })
        })
        setTickets(temp);
    }, []);

  return (
    <div style={{minHeight:'50vh', backgroundColor:"white"}}>
        {size.width>400?<>
        <div className='home-styles'>
        <div className='theme py-4'>
            <div className='navBar'>
            <Link className='navLink' href='/'>HOME</Link>
            <div className='dropdown'>
            <div className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>DESTINATION</div>
            <div className="dropdown-content">
                <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>Dubai</a>
                <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Abu+Dhabi")}>Abu Dhabi</a>
            </div>
            </div>
            <span className="navLink">
                <img src={'/images/logo.png'} height={100} alt="Logo" />
            </span>
            <div className='dropdown  mx-2'>
                <span className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>ACTIVITIES</span>
                <div className="dropdown-content">
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}  >Theme Parks</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}  >Water Parks</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours'  }}}  >City Tours</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours'}}}>Luxury Tours</Link>
                    <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure'   }}}  >Adventure</Link>
                </div>
            </div>
            <Link className='navLink' href='/about'>ABOUT US</Link>
            </div>
        </div>
        </div>
        <CircleIcons/>
        <hr className='mb-0 mt-5' />
        </>:
        <>
        <CircleMobileIcons/>
        <hr className='mb-0 mb-0' />
        </>
        }
        <div className={`${size.width>400?"tickets-cont pb-5":"pb-3 px-5"}`}>
            <h3 className='mt-4 grey-txt'>Booking #{ticketData?.result?.booking_no} Tickets</h3>
            <span className='grey-txt'> Please select the ticket to interact</span>
            <Row className='ticket-cont-wh-bg my-3' style={{padding:size.width>400?"20px 20px":"0px"}}>
            {tickets.map((x, i)=>{
            return(
            <Col md={12} xs={12} key={i} className={`${size.width>400?"":"py-0"}`}>
                {i!==0 && <hr className='my-0 py-0' />}
                {x.BookedToursOptions.map((y, j)=>{
                return(
                <>
                {j!=0 &&<hr/>}
                <Row className={y.check?'selected-ticket-row': size.width>400?'ticket-row':"py-3 px-1"} key={"a"+j}
                    onClick={async()=>{
                        setLoad(true);
                        if(!y.TourOption.manual){
                            let temp = [...tickets];
                            await temp.forEach((l)=>{
                                l.BookedToursOptions.forEach((m)=>{
                                    m.check=false
                                })
                            })
                            temp[i].BookedToursOptions[j].check=true;
                            setTickets(temp);
                            selectTour(x, y);
                        }
                        await delay(2000);
                        setLoad(false);
                    }}
                >
                    <Col md={2} xs={12}>
                        <img src={x.image} height={size.width>400?100:150} width={size.width>400?140:"100%"} style={{borderRadius:5}} alt="Tour" />
                    </Col>
                    <Col md={6} className={`${size.width>400?"":"mt-1"}`}>
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
                    {size.width<400 && <Col xs={12}><hr/></Col>}
                    <Col md={4} xs={12}>
                        <div style={size.width>400?{float:'right', height:"100%"}:{}}>
                            <div className={`${size.width>400? "text-end":""}`}>
                                <div className='mx-3'>{" "}</div>
                                {
                                y.assigned=="1"?
                                <>
                                <div className='mx-3 fs-12'>{y.TourOption.manual?'Not Downloadable':'Downloadable'}</div>
                                <div className='mx-3 fs-18'>{y.TourOption.manual?<>Check your E-mail Inbox</>:"Select & Download"}</div>
                                <img src={'/icons/ticket-available.png'} className={`${size.width>400?"":"mx-2"}`} height={50} alt="Ticket" />
                                </>:
                                <>
                                <div className='mx-3 fs-12'>{y.TourOption.manual?'Not Downloadable':'Downloadable'}</div>
                                <div className='mx-3 fs-18'>Pending</div>
                                <img src={'/icons/ticket-pending.png'} className={`${size.width>400?"":"mx-3"}`} height={50} alt="Pending" />
                                </>
                                }
                                {(y.reviewed=="1" && size.width>400) &&
                                <div className={"mx-2"} style={{color:'green'}}>Review Sent</div>
                                }
                            </div>
                            {y.assigned=="0" &&<div style={{position:'relative', top:"50%"}}>
                            </div>}
                        </div>
                    </Col>
                    {(y.reviewed=="0" && y.assigned=="1") &&<>
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
                    {(y.reviewed=="1" && size.width<400) &&
                    <div className={"mx-2"} style={{color:'green'}}>Review Sent</div>
                    }
                </Row>
                </>
                )
                })}
            </Col>
            )})}
            </Row>
            {fetchedTicket.length>0 &&
            <>
            {!load && <ReactToPrint content={()=>inputRef} trigger={()=><button className={`custom-btn ${size.width>400?"":"mt-3"}`}>Get Ticket</button>} />}
            {load && <button className='custom-btn'><Spinner size='sm'  className='mx-3' /></button>}
            </>
            }
            {fetchedTicket.length==0 && 
                <div>The Selected Ticket is pending for arrival</div>
            }
        </div>

        {fetchedTicket.length>0 &&
        <div style={{display:"none"}}>
        <div ref={(response) => (inputRef = response)} >
            {fetchedTicket.map((x, i)=>{
            return(
                <div key={i} className=''>
                    <div className='my-5'></div>
                    <Ticket fetchedTicket={x} i={i} />
                </div>
            )})}
        </div>
        </div>}
    </div>
  )
}

export default TicketPage