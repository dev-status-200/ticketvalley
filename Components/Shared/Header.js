import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";
import Link from 'next/link'
const Header = () => {
    const [menu, setMenu] = useState(false);
  return (
    <div className='header-styles'>
        <div>
            <Row className='px-5 py-3 m-0'>
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
                        <Link className='cur f mx-2' style={{position:'relative', top:2, textDecoration:'none'}} href={'/login'}>Login</Link>
                    </div>
                </Col>
            </Row>
            <Row className='header m-0'>
                <Col md={3}></Col>
                <Col md={6}>
                    <Row>
                    <Col md={3}><h3 style={{color:'white', marginTop:10}}><span style={{fontWeight:200}}>Ticket</span>Valley</h3></Col>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <div className='link' style={{display:'inline-block'}}>
                            Home
                            
                        </div>
                        <div  style={{display:'inline-block'}} onMouseEnter={()=>setMenu(true)} onMouseLeave={()=>setMenu(false)}>
                            <span className='link'>Packages</span>
                            
                            <div className={!menu?'dropdown-hidden':'dropdown-show'}>
                                <div className='ul'>Desert Safari</div>
                                <div className='ul'>Theme Parks</div>
                                <div className='ul'>Hotels</div>
                                <div className='ul'>High Rise</div>
                                <div className='ul'>Cruise</div>
                                <div className='ul'>Beach</div>
                            </div>
                            
                        </div>
                        <div className='link' style={{display:'inline-block'}}>Locations</div>
                    </Col>
                    </Row>
                </Col>
                <Col md={3}></Col>
            </Row>
        </div>
    </div>
  )
}

export default Header