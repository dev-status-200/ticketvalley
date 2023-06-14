import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HiShoppingCart } from "react-icons/hi";
import Link from 'next/link';

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const navStyles = {color:'white', textDecoration:'none', fontSize:40}
  return (
    <>
    <Container fluid style={{backgroundColor:'#21a69b', color:'white'}}>
    <Row style={{fontSize:12}} className='pb-1'>
        <Col xs={6}>
        <FaPhoneAlt style={{position:'relative', top:1, fontSize:10}}/><span className='mx-1' style={{position:'relative', top:2}}>+971 55 998 6370</span>
        </Col>
        <Col xs={6} className='px-1 text-end'>
        <FaRegEnvelopeOpen style={{fontSize:10}}/><span className='mx-1' style={{position:'relative', top:2}}>booking@ticketsvalley.com</span>
        </Col>
    </Row>
    </Container>
    <Container>
      <Row className='py-2'>
        <Col xs={3} className='text-start'>
          <CgMenuLeft onClick={toggleShow} className='mt-2' style={{fontSize:30, color:'#21a69b'}}/>
        </Col>
        <Col xs={6} className='text-center'>
        <img src={'/images/logo.png'} height={50} style={{position:'relative', right:10}} />
        </Col>
        <Col xs={3} className='text-end'>
          <HiShoppingCart onClick={toggleShow} className='mt-2' style={{fontSize:30, color:'#21a69b'}}/>
        </Col>
      </Row>
    </Container>
    <Offcanvas show={show} onHide={handleClose} {...props} >
      <Offcanvas.Header closeButton style={{backgroundColor:'#21a69b'}}>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{backgroundColor:'#21a69b'}}>
        <div className='text-center navBar'>
          <Link style={navStyles} href='/' >Home</Link><br/><br/>
          <Link style={navStyles} href='/' >Activities</Link><br/><br/>
          <Link style={navStyles} href='/' >About</Link><br/><br/>
          <Link style={navStyles} href='/' >Login</Link>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
    </>
  );
}

export default function Mobile() {
  return (
    <>
    <OffCanvasExample scroll={false} backdrop={true} />
    </>
  );
}
