import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import Router from 'next/router';
import TourSearchBar from '../../Shared/TourSearchBar';
import NavLinks from '../../Shared/NavLinks';

const VideoComp = () => {
  return (
    <div style={{width:'100%' , position:'relative', left:0, top:0}}>
        <video autoPlay loop muted style={{ width:'100%' }}>
            <source src="/videos/video3.mp4"  />
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
              <NavLinks/>
            </div>
          </div>
          <Link className='navLink' href='/about'>ABOUT US</Link>
        </div>
        <div className='hero-cont top-text'
          style={{
              position:'absolute',
              width:"100vw"
          }}>
            <div className='text-center'>
            <h1 className='wh-txt hero-txt-1'>TICKETS <span className='yellow-txt'>VALLEY</span></h1>
            </div>
        </div>
        <div
          style={{
              position:'absolute',
              width:"100%",
              textAlign:'center',
              bottom:"40%"
          }}>
            <div className='home-search-bar'>
              <TourSearchBar/>
            </div>
        </div>
    </div>
  )
}

export default VideoComp