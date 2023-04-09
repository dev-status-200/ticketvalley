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

const ref = React.createRef();
const TicketPage = ({ticketData}) => {

    const [tickets, setTickets] = useState([]);
    const [fetchedTicket, setFetchedTicket] = useState({});

    const selectTour = async(tour, option) => {
        const ticket = {
            image:tour.image,
            title:option.tourOptName,
            name:tour.customerTitle + " " + tour.customerName,
            transfer:option.transfer,
            date:moment(option.date).format("MMM-DD-YYYY"),
            assigned:option.assigned
        }
        await setFetchedTicket(ticket);
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

    useEffect(() => {
      console.log(fetchedTicket)
    }, [fetchedTicket])
    

    const btm = {position:'relative', bottom:3}

  return (
    <div style={{minHeight:'50vh', backgroundColor:"white"}}>
        <Container className='my-5'>
        <h4>Tickets For Booking No: </h4>
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
            {fetchedTicket.assigned=="1" && 
            <Pdf targetRef={ref} filename="ticket.pdf">
                {({ toPdf }) => <button className='custom-btn' onClick={toPdf}>Download</button>}
            </Pdf>
            }
            {fetchedTicket.assigned=="0" && 
                <div>The Selected Ticket is pending for arrival</div>
            }
        </Container>
        <div style={{position:'absolute', right:10000}}
        >
        <div ref={ref} ><Ticket fetchedTicket={fetchedTicket} /></div>
        </div>
    </div>
  )
}

export default TicketPage