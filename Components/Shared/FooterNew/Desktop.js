import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaShieldAlt } from "react-icons/fa";
import Link from 'next/link';
import { Button, notification, Space } from 'antd';

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
    openNotificationWithIcon('success');
    setEmail("")
  }

  return (
  <div className='footer-styles'>
    {contextHolder}
    <div className='bgTop pt-4 pb-4'>
      <Container className='px-5'>
        <Row className='mt-2'>
          <Col md={3}>
            <img src='/images/logo.png' height={80} style={{filter: 'brightness(0) invert(1)'}} />
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
          <Col md={2}>
            <Link href='/' className='white-links'>Home</Link><br/>
            <Link href='/activities' className='white-links'>Destinations</Link><br/>
            <Link href='/activities' className='white-links'>Activities</Link><br/>
          </Col>
          <Col md={2}>
            <Link href='/about' className='white-links'>About</Link><br/>
            <Link href='/contact' className='white-links'>Contact</Link><br/>
          </Col>
          <Col md={4} className='px-2'>
            <p className='wh-txt'>
              <div className='mb-2'>
                <b className='mb-2'>Our Address</b>
              </div>
              <div className='fw-300'>Office # 302, Royal Plaza Bdg Opposite ADCB Bank Al Rigga Road, Deira - 1 B St Dubai-UAE</div>
            </p>
            {/* <p className='wh-txt'>
              <b>Address # 2</b><br/>
              <span className='fw-300'>Shop # 4, Rahab Hotel Bldg, Beside Bori Masjid Eyal Nasser, Street # 16 Deira Dubai-UAE</span>
            </p> */}
          </Col>
          <Col className='px-4'>
            {/* <h3 className='wh-txt'>Follow us on</h3> */}
            <div className='social-links-container'>
            <Link href={'https://www.facebook.com/ticketsvalley'} target='_blank'>
              <img src='icons/facebook.png' height={22} />
            </Link>
            {/* <Link href="https://www.tiktok.com/@peacelandtravel" target='_blank'>
              <img src='icons/tiktok.png' height={30} />
            </Link> */}
            <Link href="https://www.instagram.com/ticketsvalley/" target='_blank'>
              <img src='icons/insta.png' height={22} />
            </Link>
            {/* <Link href={'https://twitter.com/peacelandgroup'} target='_blank'>
              <img src='icons/x.png' height={30} />
            </Link> */}
            <Link href="https://www.linkedin.com/company/tickets-valley/" target='_blank'>
              <img src='icons/linked.png' height={22} />
            </Link>
            </div>
            <div className='heading mt-4'>PAY SAFELY WITH US</div>
            <img src='/images/creditcard-logo.png' alt='credit card' />
            <div className='wh-txt'><FaShieldAlt color='gold' className='mb-1 mx-2' /> Strip protected payement gateway</div>
          </Col>
        </Row>
      </Container>
    </div>
    <div className='bgBt p-2 text-center wh-txt fs-12'> Copyright 2024 tickets valley, All Rights Reserved </div>
  </div>
  )
}

export default React.memo(Desktop);