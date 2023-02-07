import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';

const VideoComp = () => {
  return (
    <div className='home-styles'>

        <video autoPlay loop muted style={{ width:'100%' }}>
            <source src="https://res.cloudinary.com/abdullah7c/video/upload/v1675674403/VN20230206_135526_uprc0e.mp4" />
        </video>

        <div className='navBar' 
            style={{
                position:'absolute',
                top:30,
                width:"100%",
                zIndex:1
            }}
        >
          <Link className='navLink' href='/'>HOME</Link>
        <div className='dropdown'>
        <div className='navLink dropbtn'>DESTINATION</div>
        <div className="dropdown-content">
            <a className='menu-drop-links pb-2'>Dubai</a>
        </div>
        </div>
          <span className="navLink">
            <img src={'/images/logo.png'} height={100} />
          </span>
          <div className='dropdown mx-2'>
            <span className='navLink dropbtn'>ACTIVITIES</span>
            <div className="dropdown-content">
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Park'}}}>Theme Parks</Link>
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
                <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
                <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
            </div>
          </div>
          <Link className='navLink' href='/'>CONTACT</Link>
        </div>

        <div className='hero-cont top-text'
          style={{
              position:'absolute',
              width:"100%"
          }}>
            <h1 className='wh-txt hero-txt-1'>TICKET VALLEY</h1>
            <h1 className='wh-txt hero-txt-2'>Travel & Tours</h1>
        </div>

        <div className='hero-icons'
          style={{
              position:'absolute',
              width:"100%"
          }}>
            <Row className="text-center">
              <Col md={2} className="text-center">
              </Col>
              <Col md={2} className="text-center">
                <img src='/icons/1.png' height={200} />
              </Col>
              <Col md={2} className="text-center">
                <img src='/icons/4.png' height={200} />
              </Col>
              <Col md={2} className="text-center">
                <img src='/icons/3.png' height={200} />
              </Col>
              <Col md={2} className="text-center">
                <img src='/icons/2.png' height={200} />
              </Col>
              <Col md={2} className="text-center">
              </Col>
            </Row>
        </div>
    </div>
  )
}

export default VideoComp
