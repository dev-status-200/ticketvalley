import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {Row, Col, Container} from 'react-bootstrap';
import { AiFillCar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import Router from 'next/router';
import { Empty } from 'antd';
import Aos from 'aos';
import CircleIcons from '../Shared/CircleIcons';

const MyBookings = () => {

    const conversion = useSelector((state) => state.currency.conversion);
    const {data:session} = useSession();
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        Aos.init({duration:300})
    }, [])

    const retrive = (data) => {
        setEmail(data)
        axios.post(process.env.NEXT_PUBLIC_CREATE_GET_MY_RESERVATIONS,{
            email:data
        }).then((x)=>{
            setBookings(x.data.result)
        })
    }

  return (
    <div style={{backgroundColor:'white'}}>
        <hr className='my-0' />
        <div className='home-styles'>
        <div className='theme py-4'>
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
            <div className='my-2'>
                <div className='text-center'>
                <h1 className='wh-txt hero-txt-1'>My <span className='yellow-txt'>Bookings</span></h1>
                </div>
            </div>
        </div>
        </div>
        {(session && email=='') && <div>{retrive(session.user.email)}</div>}
        <Container className='mb-5 px-5'>
            <CircleIcons/>
        <h4 className='my-4'>Your Bookings</h4>
        <p>All Your booking info will be diplayed here.</p>
        {bookings.map((y, j)=>{
            return(
            <div key={j}>
            <hr className='mb-2 mt-2' />
            <Row  className='booking-row' onClick={()=>Router.push(`/ticketPage?id=${y.id}`)}>
            <Col md={12}>
            {y.BookedTours.map((x, i)=>{
            return(
                <Row key={i} className="cart-item">
                    <Col className="" md={12} >
                    <div>
                    {i==0 &&
                        <Row>
                            <Col>
                            <div>Date :  <span className='grey-txt'>{moment(y.moment).format('DD/MM/YY')}</span></div>
                            <div>Booking No. :  <b className='grey-txt'>{y.id}</b></div>
                            <div className='mt-2'>
                                PROMO :
                                {" "}
                                <span className='grey-txt'>
                                    {y.promo=="none"?
                                        'NO':
                                        <>
                                        <span style={{color:'goldenrod'}}>{JSON.parse(y.promo).name}</span> -
                                        <span style={{marginLeft:5}}>{JSON.parse(y.promo).price}</span>
                                        <span className=''>{JSON.parse(y.promo).byPercentage?'%':`${conversion.currency}`} OFF</span>
                                        </>
                                    }
                                </span>
                            </div>
                            </Col>
                            <Col>
                            <div style={{float:'right'}}>
                            <h4 className='mt-2'>Total Price :  
                                {" "}<b className='grey-txt'>{(y.final_price*conversion.rate).toFixed(2)}</b> {conversion.currency}
                            </h4>    
                            <h6 style={{color:'#2b55bf'}}>Click To View Tickets {">"}</h6>
                            </div>
                            </Col>
                        </Row>
                    }
                    <br/>
                    </div>
                    </Col>
                </Row>
            )})}
            </Col>
            </Row>
            </div>
        )})}
        {bookings.length==0 && 
        <Container className='py-5' data-aos='fade-up'>
            <Empty /> <h3 className='text-center fw-200 mt-5'>Looks like you haven't made any bookings yet!</h3>
        </Container>
        }
        </Container>
    </div>
  )
}

export default MyBookings