import React from 'react';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { Container, Row, Col } from 'react-bootstrap';
import { useSession, signIn, signOut } from 'next-auth/react';

const SignUp = ({mobile}) => {
  return (
    <div className='signin-bg '>
    <Container className={`${mobile?"text-center":''}`}>
    <Row>
      <Col md={1}></Col>
      <Col md={7}>
        <Row>
          <Col md={2}>
          <IoMailUnreadOutline size={90}/> 
          </Col>
          <Col md={10}>
          <div className={`${mobile?"fs-20":"fs-30"}`}>Your Travel Journey Starts Here</div>
          <div className={`${mobile?"fs-20 mb-3":"fs-20"}`}>Signup and we'll send the best deals to you</div>
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

export default React.memo(SignUp)
