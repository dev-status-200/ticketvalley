import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QRCode from "react-qr-code";

const Ticket = ({fetchedTicket}) => {

  return (
    <>
    <div className='my-5' style={{height:10}}></div>
    <div style={{border:'1px solid grey', width:700}} className='mx-5 my-5 py-5'>
        <Row>
            <Col className='mx-4'>
                <h4>Ticket Valley</h4>
                <p>www.ticketsvalley.com</p>
            </Col>
            <Col style={{backgroundColor:"#c5c487", borderRadius:9}} className='text-center py-4 mx-4' >
                <h6>This is your E-Ticket</h6>
            </Col>
        </Row>
        <hr/>
        <Row className='my-3 mx-4' style={{borderRadius:9, backgroundColor:"#c8d6e4"}}>
            <Col md={7} className='p-4' >
                <div>
                    <h4>Info</h4>
                    <h6>Tour: {fetchedTicket.title}</h6><hr className='my-0 mb-1' />
                    <h6>Guest Name: {fetchedTicket.name}</h6><hr className='my-0 mb-1' />
                    <h6>Transfer: {fetchedTicket.transfer}</h6><hr className='my-0 mb-1' />
                    <h6>Date: {fetchedTicket.date}</h6>
                </div>
            </Col>
            <Col md={5} className='text-center py-3'>
                <div className='mt-3 mx-5' style={{padding:1, backgroundColor:"white", width:180, height:"79%", paddingTop:10}}>
                <QRCode 
                    value={fetchedTicket.code}
                    scale={0.6} 
                    size={150}
                    level='Q'
                    viewBox={`0 0 200 200`}
                />
                </div>
                <p className='mt-2'>{fetchedTicket.code}</p>
            </Col>
        </Row>
        <hr/>
        <Row className='mx-4'>
            <Col md={4} className='p-3' style={{borderRadius:9, backgroundColor:"#c8d6e4"}}>
            <h6>Location</h6>
            <hr className='mt-1 mb-3'/>
            Lorem Ipsum Test Location
            </Col>
            <Col md={8}><img src={fetchedTicket.image} style={{width:"102%", height:200}} /></Col>
        </Row>
        <hr/>
        <Row className=''>
            <Col md={12} className='px-5'>
            <ul>
                <li>This is your ticket. Please carry this with you for your visit.</li>
                <li>Visitors should arrive at the Museum 15 minutes prior to the time slot on the entry date as shown on the Ticket{"("}s{")"}.</li>
                <li>MOTF cannot offer refunds if the arrival time slot is missed.</li>
                <li>Re-booking an alternate same-day time slot will be based on availability with no guarantee</li>
            </ul>
            </Col>
        </Row>
    </div>
    </>
  )
}

export default Ticket