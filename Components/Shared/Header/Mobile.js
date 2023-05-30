import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";

const Mobile = () => {
  return (
    <Container fluid>
        <Row style={{backgroundColor:'white'}}>
            <Col xs={6}>
            <span><FaPhoneAlt/></span><span className='mx-1' style={{position:'relative', top:2}}>+971 55 998 6370</span>
            </Col>
            <Col xs={6}>
            <span className='mx-1' style={{position:'relative', top:2}}>booking@ticketsvalley.com</span>
                
            </Col>
        </Row>
    </Container>
  )
}

export default Mobile