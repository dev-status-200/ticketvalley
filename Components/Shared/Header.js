import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";
import Link from 'next/link'
const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className='header-styles'>
        <Row className='px-5 pb-3 pt-3 m-0 white-bg'>
            <Col md={4}>
                <div>
                    <span style={{color:'grey', fontSize:13}}><FaPhoneAlt/></span>
                    <span className='f mx-2' style={{position:'relative', top:2}}>+41 21 634 05 05</span>
                    <span style={{color:'grey', fontSize:13, marginLeft:20}}><FaRegEnvelopeOpen/></span>
                    <span className='f mx-2' style={{position:'relative', top:2}}>Booking@ticketvalley.com</span>
                </div>
            </Col>
            <Col md={3}></Col>
            <Col md={5}>
                <div style={{float:'right'}}>
                    <span className='cur mx-2' style={{color:'grey', fontSize:13}}><SiFacebook/></span>
                    <span className='cur mx-2' style={{color:'grey', fontSize:13}}><SiInstagram/></span>
                    <span className='cur mx-2' style={{color:'grey', fontSize:13}}><SiTwitter/></span>
                    <span className='cur ' style={{color:'grey', fontSize:13, marginLeft:20}}><AiOutlineUser/></span>
                    <Link className='cur f mx-2' style={{position:'relative', top:2, textDecoration:'none'}} href="/login">Login</Link>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Header