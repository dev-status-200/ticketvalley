import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaShieldAlt } from "react-icons/fa";
import Link from 'next/link';
import { notification } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';

const Desktop = () => {

  const [email, setEmail] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Success',
      description:`You have successfully subscribed to our Newsletter. Lookout for exciting offers`
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_POST_CREATE_NEWS_LETTER_CUSTOMER,{
      email:email
    }).then((x)=>{
      openNotificationWithIcon('success');
      setEmail("")
    })
  }

  return (
  <div className='footer-styles'>
    {contextHolder}
    <div className='bgTop pt-4 pb-4'>
      <Container className=''>
        <Row className='mt-2'>
          <Col md={3} className='mb-3'>
            <img src='/icons/white-logo.png' height={80}  />
          </Col>
          <Col md={2}></Col>
          <Col md={3}></Col>
          <Col md={4}>
            <form onSubmit={handleSubmit}>
              <div className='wh-txt'>Get the freshest Ticketsvalley Travel News</div>
              <div className='newsletter-container'>
                <input className='newsletter-input' placeholder='Your E-mail here' type='email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button className='newsletter-btn'>Subscribe</button>
              </div>
            </form>
          </Col>
        </Row>
        <Row className=''>
          <Col md={4}>
            <Row>
              <Col md={6}>
                <Link href='/' className='white-links'>Home</Link><br/>
                <Link href='/activities' className='white-links'>Destinations</Link><br/>
                <Link href='/activities' className='white-links'>Activities</Link><br/>
              </Col>
              <Col md={6}>
                <Link href='/about' className='white-links'>About</Link><br/>
                <Link href='/contact' className='white-links'>Contact</Link><br/>
              </Col>
              <Col md={12}>
                <div className='wh-txt fw-500 mt-4'>
                  <PhoneOutlined />
                  <span className='mx-1 '>+971 50 337 4890</span>
                </div>
                <div className='wh-txt fw-500'>
                  <MailOutlined />
                  <span className='mx-1 '>support@ticketsvalley.com</span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4} className='px-2'>
            <p className='wh-txt'>
              <div className='mb-2'>
                <b className='mb-2 fs-18'>Our Address</b>
              </div>
              <div className='fw-300 fs-18'>Office # 302, Royal Plaza Bdg Opposite ADCB Bank Al Rigga Road, Deira - 1 B St Dubai-UAE</div>
              <div className='fs-18'>Tell: +971 4 255 5356</div>
            </p>
          </Col>
          <Col className='px-4'>
            <h2 className='wh-txt'>Follow us on</h2>
            <div className='social-links-container'>
            <Link href={'https://www.facebook.com/ticketsvalley'} target='_blank'>
              <img src='icons/facebook.png' height={22} />
            </Link>
            <Link href="https://www.instagram.com/ticketsvalley/" target='_blank'>
              <img src='icons/insta.png' height={22} />
            </Link>
            <Link href="https://www.linkedin.com/company/tickets-valley/" target='_blank'>
              <img src='icons/linked.png' height={22} />
            </Link>
            </div>
            <div className='heading mt-3'>PAY SAFELY WITH US</div>
            <img src='/images/creditcard-logo.png' alt='credit card' />
            <div className='wh-txt'>
              <FaShieldAlt color='gold' className='mb-1 mx-2' />
              Strip protected payement gateway
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <div className='bgBt p-2 text-center wh-txt fs-12'> Copyright 2024 tickets valley, All Rights Reserved </div>
  </div>
  )
}

export default React.memo(Desktop);