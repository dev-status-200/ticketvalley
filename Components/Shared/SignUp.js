import React from 'react';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { Container, Row, Col } from 'react-bootstrap';
import { useSession, signIn, signOut } from 'next-auth/react';

const SignUp = () => {
  return (
    <div className='signin-bg'>
    <Container>
    <Row>
      <Col md={1}></Col>
      <Col md={7}>
        <Row>
          <Col md={2}>
          <IoMailUnreadOutline size={90}/> 
          </Col>
          <Col md={10}>
          <div className='fs-30'>Your Travel Journey Starts Here</div>
          <div className='fs-20'>Signup and we'll send the best deals to you</div>
          </Col>
        </Row>
      </Col>
      <Col md={3} className=''>
        <div className='subscribe-btn' onClick={()=>signIn()}>SUBSCRIBE</div>
      </Col>
      <Col md={1}></Col>
    </Row>
    </Container>
  </div>
  )
}

export default SignUp
