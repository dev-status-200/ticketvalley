import React,{ useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { CiLocationOn } from "react-icons/ci"

const Search = ({destination, city}) => {
    
  return (
    <div className='home-styles'>
    <div className={`activity-bg activity py-4`}>
      {/* Header */}
      <div className='navBar'>
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
        <div className='dropdown  mx-2'>
          <span className='navLink dropbtn'>ACTIVITIES</span>
          <div className="dropdown-content">
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Theme Parks'}}}>Theme Parks</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Water Parks'}}}>Water Parks</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'City Tours'}}}>City Tours</Link>
              <Link className='menu-drop-links mx-3' href={{pathname:'/activities', query:{id:'Luxury Tours'}}}>Luxury Tours</Link>
              <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/activities', query:{id:'Adventure'}}}>Adventure</Link>
          </div>
        </div>
        <Link className='navLink' href='/about'>ABOUT US</Link>
      </div>
      <h1 className='text-center mt-5 wh-txt fw-700 text-shadow fs-45'>SEARCH ACTIVITIES</h1>
    </div>
    
    <div className='py-5'>
        <Container>
            <Row>
                <Col md={3} className="px-4">
                    <div className='tour-filters'>
                        <div><b>Search Activity</b></div>
                        <Row className='tour-fltr-locate px-2 py-3 my-2'>
                            <Col md={2}><CiLocationOn className='' size={30} /></Col>
                            <Col className='px-3'>
                                <div className='fs-13'><b>Location</b></div>
                                <div className='fs-10'>Dubai</div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={9}>
                    Hello
                </Col>
            </Row>
        </Container>
    </div>
    </div>
  )
}

export default Search