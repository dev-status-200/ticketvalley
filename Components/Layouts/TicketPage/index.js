import React, { useEffect, useState, useRef, createRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    CheckCircleOutlined,
    ClockCircleOutlined
  } from '@ant-design/icons';
import { Tag } from 'antd';
import Pdf from "react-to-pdf";
import Ticket from './Ticket';
import moment from 'moment';
import Link from 'next/link';
import CircleIcons from '../../Shared/CircleIcons';

const ref = React.createRef();
const TicketPage = ({ticketData}) => {

    const [tickets, setTickets] = useState([]);
    const [fetchedTicket, setFetchedTicket] = useState({});

    const selectTour = async(tour, option) => {
        if(option.assigned=="1"){
            let count = option.codes.split(", ")
            let ticket = [];
            //console.log(count);
            
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
            
            await setFetchedTicket(ticket);
        }
	};

    useEffect(() => {
        let temp = ticketData.result.BookedTours;
        temp.forEach((x, i)=>{
            x.BookedToursOptions.forEach((y, j)=>{
                y.check = false;
            })
        })
        setTickets(temp);
    }, [])
    
    const btm = {position:'relative', bottom:3}

  return (
    <div style={{minHeight:'50vh', backgroundColor:"white"}}>
        <div className='home-styles'>
        <div className='theme empty-bg py-4'>
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
            <div className='my-3'>
                <div className='text-center'>
                <h1 className='wh-txt hero-txt-1'>ABOUT <span className='yellow-txt'>US</span></h1>
                </div>
            </div>
        </div>
        </div>
        <Container className='mb-5'>
        <CircleIcons/>
        <h4 className='mt-4'>Tickets For Booking No: </h4>
        <p className='grey-txt'>Please Select The Tickets to download</p>
        <hr/>
            <Row>
            {tickets.map((x, i)=>{
            return(
            <Col md={12} key={i}>
                {x.BookedToursOptions.map((y, j)=>{
                return(
                <Row className={y.check?'selected-ticket-row':'ticket-row'} key={"a"+j} 
                    onClick={()=>{
                        let temp = [...tickets];
                        temp.forEach((l)=>{
                            l.BookedToursOptions.forEach((m)=>{
                                m.check=false
                            })
                        })
                        temp[i].BookedToursOptions[j].check=true;
                        setTickets(temp)
                        selectTour(x, y);
                    }}
                >
                    <Col md={2}>
                        <img className='my-3' src={x.image} height={100} width={170} style={{borderRadius:5}} />
                    </Col>
                    <Col md={6}>
                    <h2>{y.tourOptName}</h2>
                    <div className='mx-1'>
                        <span className=''>Adults:       <span style={{color:'grey'}}>{y.adult}  </span> </span>
                        <span className='mx-2'>Children: <span style={{color:'grey'}}>{y.child}  </span> </span>
                        <span className='mx-2'>Infant:   <span style={{color:'grey'}}>{y.infant} </span> </span>
                    </div>
                    <div className='mx-1'>
                        <span className=''>Transfer:   <span style={{color:'grey'}}>{y.transfer} </span> </span>
                        {y.transfer!="No" && <div><span className=''>Pick-up:</span><br/><span style={{color:'grey'}}>{y.address}</span></div>}
                    </div>
                    </Col>
                    <Col md={4} >
                        <div style={{float:'right', height:"100%"}}>
                            <div>
                                <span className='mx-1'>Status:{" "}</span>
                                {
                                y.assigned=="1"?
                                <Tag icon={<CheckCircleOutlined style={btm} />} color="#5db163">Available</Tag>:
                                <Tag icon={<ClockCircleOutlined style={btm} />} color="default">Pending</Tag>
                                }
                            </div>
                            {y.assigned=="0" &&<div style={{position:'relative', top:"50%"}}>
                            </div>}
                        </div>
                    </Col>
                    <Col md={12}></Col>
                </Row>
                )
                })}
                <hr/>
            </Col>
            )})}
            </Row>
            {fetchedTicket.length>0 && 
            <Pdf targetRef={ref} filename="ticket.pdf">
                {({ toPdf }) => <button className='custom-btn' onClick={toPdf}>Download</button>}
            </Pdf>
            }
            {fetchedTicket.length==0 && 
                <div>The Selected Ticket is pending for arrival</div>
            }
        </Container>
        <div style={{position:'absolute', right:10000}}
        >
        
        <div ref={ref} ><Ticket fetchedTicket={fetchedTicket[0]} /></div>
        </div>
    </div>
  )
}

export default TicketPage