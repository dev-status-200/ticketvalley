import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { ConfigProvider, notification, Input } from 'antd';
import axios from 'axios';
import Aos from 'aos';
import CircleIcons from '/Components/Shared/CircleIcons';
import CircleMobileIcons from '../Shared/CircleMobileIcons';
import useWindowSize from '/functions/useWindowSize';
import Link from 'next/link';
import Router from 'next/router';

const Contact = () => {

  const size = useWindowSize();
  const [ form, setForm ] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Success',
      description:
        'Your message has been submitted.',
    });
  };

  useEffect(() => {
    Aos.init({
      duration:1000
    })
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    let tempForm = {...form, email:form.email +', '+ form.phone}
    axios.post(process.env.NEXT_PUBLIC_POST_CONTACT_US_MESSAGE, tempForm)
    .then((x)=>{
      // console.log(x.data);
      setForm({
        name:'',
        msg:'',
        email:'',
        phone:'',
      });
      openNotificationWithIcon('success')
    })
  }
  return (
  <div className='home-styles bg-white' >
    {contextHolder}
    {size.width>600 &&
      <div data-aos="fade-in">
        <div className='about-us activity py-4' style={{minHeight:500}}>
        <div className='navBar'>
        <Link className='navLink' href='/'>HOME</Link>
        <div className='dropdown'>
        <div className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>DESTINATION</div>
        <div className="dropdown-content">
            <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>Dubai</a>
            <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Abu+Dhabi")}>Abu Dhabi</a>
        </div>
        </div>
        <span className="navLink">
            <img src={'/images/logo.png'} height={100} alt="Logo" />
        </span>
        <div className='dropdown  mx-2'>
            <span className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>ACTIVITIES</span>
            <div className="dropdown-content">
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}>Theme Parks</Link>
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}>Water Parks</Link>
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours'  }}}>City Tours</Link>
                <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours'}}}>Luxury Tours</Link>
                <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure'   }}}>Adventure</Link>
                <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Family Fun'   }}}>Family Fun</Link>
            </div>
        </div>
        <Link className='navLink' href='/about'>ABOUT US</Link>
        </div>
        <div className='my-5'>
            <div className='text-center'>
            <h1 className='wh-txt hero-txt-1'>CONTACT <span className='yellow-txt'>US</span></h1>
            </div>
        </div>
        </div>
      </div>}
      <div className='pb-5 why-us-section'>
      {size.width>600? <CircleIcons/>: <CircleMobileIcons/> }
    </div>
    <Container>
    <Row className='bg-white'>
      <Col md={7} className={`${size.width>600?'pt-5 mt-5':'pt-5'}`}>
        {size.width>600 &&<div className='my-5'></div>}
        <div className={`mb-2 fw-700 fs-${size.width>600?"45":"30"} black-txt`} style={{lineHeight:1}}>HAVE ANY <span className='blue-txt'>QUESTIONS?</span></div>
        <div className={`mb-5 fw-600 fs-${size.width>600?"35":"25"} black-txt`} style={{lineHeight:1}}>FEEL FREE TO REACH OUT</div>
        <p className='grey-txt fs-18' style={{maxWidth:'75%'}}>
        Have questions or need assistance with scheduling your trip? Do not hesitate to get in touch with us. Our team is here to assist you every step of the way, ensuring that your travel experience is hassle-free and memorable.
        </p>
        <p className='grey-txt fs-18'>Our Contact Form is Below</p>
        {size.width>600 && <div className='pt-5'></div>}
      </Col>
      <Col md={5} className='p-5 text-center'>
        {size.width>600 && <img src='images/contact.png' className='mt-4' height={450} />}
      </Col>
    </Row>
    <hr className='pt-0 mt-0' />
    <Row className='contact-bg mx-2'>
    {size.width>600 &&<Col md={3}></Col>}
      <Col md={6} className='text-center contact-box'>
        <h1 className='blue-txt-1'>Leave a Message</h1>
        <ConfigProvider theme={{token:{ colorPrimary:'#61c7c8', borderRadius:0 }}}>
          <form className='fs-18' onSubmit={handleSubmit}>
            <div className='text-start'>Name</div>
            <Input placeholder="Name" required className='' value={form.name} onChange={(e)=>setForm((x)=>{ return{...x, name:e.target.value} })} />
            <div className='text-start mt-3'>E-mail</div>
            <Input placeholder="Email" type='email' required className='mb-' value={form.email} onChange={(e)=>setForm((x)=>{ return{...x, email:e.target.value} })} />
            <div className='text-start mt-3'>Phone</div>
            <Input placeholder="Enter Contact No." type='text' required className='mb-3' value={form.phone} onChange={(e)=>setForm((x)=>{ return{...x, phone:e.target.value} })} />
            <div className='text-start'>Message</div>
            <Input.TextArea placeholder="Your Message" required className='mb-4' rows={6} value={form.msg} onChange={(e)=>setForm((x)=>{ return{...x, msg:e.target.value} })}  />
            <button className='btn-custom'>Submit</button>
          </form>
        </ConfigProvider>
      </Col>
    </Row>
    {/*  */}
    </Container>
  </div>
  )
}

export default React.memo(Contact)