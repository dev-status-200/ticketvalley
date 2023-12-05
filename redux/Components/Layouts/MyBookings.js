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
import CircleMobileIcons from '../Shared/CircleMobileIcons';
import useWindowSize from '/functions/useWindowSize';

const MyBookings = () => {

    const conversion = useSelector((state) => state.currency.conversion);
    const {data:session} = useSession();
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);

    const size = useWindowSize();

    useEffect(() => {
        Aos.init({duration:300});
        //retrive("sabdullah369@gmail.com")
        //retrive(session?.user?.email)
    }, [])

    const retrive = async(data) => {
        setEmail(data)
        await axios.post(process.env.NEXT_PUBLIC_CREATE_GET_MY_RESERVATIONS,{
            email:data
        }).then((x)=>{
            setBookings(x.data.result);
        })
    }

  return (
    <div style={{backgroundColor:'white'}}>
        {size.width>400?
        <>
        <hr className='my-0' />
        <div className='home-styles'>
        <div className='theme py-4'>
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
                <img src={'/images/logo.png'} height={100}  alt="Logo" />
            </span>
            <div className='dropdown  mx-2'>
                <span className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>ACTIVITIES</span>
                <div className="dropdown-content">
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}>Theme Parks</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}>Water Parks</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours'  }}}>City Tours</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours'}}}>Luxury Tours</Link>
                    <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure'   }}}>Adventure</Link>
                </div>
            </div>
            <Link className='navLink' href='/about'>ABOUT US</Link>
            </div>
        </div>
        </div>
        <CircleIcons/>
        <hr className='mb-0 mt-5' />
        </>:
        <>
        <CircleMobileIcons className="" />
        <hr className='pb-0 mb-0' />
        </>
        }
        <div className={`${size.width>400?"tickets-cont":"px-3"} pb-5`}>
        {(session && email=='') && <div>{retrive(session.user.email)}</div>}
        <h1 className='mt-4 grey-txt'>My Bookings</h1>
        <div className='mb-4'>All Your booking info will be diplayed here.</div>
        {bookings.length!=0 &&<>
        {bookings.map((y, j)=>{
            return(
            <div key={j} className='booking-row p-3'>
            <Row className='' onClick={()=>Router.push(`/ticketPage?id=${y.id}`)}>
            <Col md={12} xs={12}>
            {y.BookedTours.map((x, i)=>{
            return(
                <Row key={i} className="cart-item">
                    <Col md={12} xs={12}>
                    {i==0 &&
                        <Row>
                            <Col xs={6}>
                            <div className={`grey-txt fs-${size.width>400?"20":"15"} fw-500`}>Booking #{y.booking_no}</div>
                            <div className={`${size.width>400?'silver-2-txt':'silver-2-txt fs-12'}`}><span >{moment(y.moment).format('DD-MMM-YYYY, hh:ss a')}</span></div>
                            <div className='mt-2'>
                                Discount:
                                {" "}
                                <span className='grey-txt'>
                                    {y.promo=="none"?
                                        <>No</>:
                                        <>
                                        <span style={{color:'goldenrod'}}>{JSON.parse(y.promo).name}</span> -
                                        <span style={{marginLeft:5}}>{JSON.parse(y.promo).price}</span>
                                        <span className=''>{JSON.parse(y.promo).byPercentage?'%':`${conversion.currency}`} OFF</span>
                                        </>
                                    }
                                </span>
                            </div>
                            <div className='mt-2'>Total Price :
                                {size.width?<br/>:<></>}
                                {" "}<span className='grey-txt fw-600'>{(y.final_price*conversion.rate).toFixed(2)}</span> {conversion.currency}
                            </div>    
                            </Col>
                            <Col style={{textAlign:'end'}} xs={6}>
                            <img src={'/icons/reservation.png'} height={size.width>400? 90: 50}  alt="reservation"/>
                            
                            <div style={{color:'#2b55bf'}} className='mt-3'>Click To View Tickets{">"}</div>
                            </Col>
                        </Row>
                    }
                    </Col>
                </Row>
            )})}
            </Col>
            </Row>
            </div>
        )})}
        </>}
        {bookings.length==0 && <Container className='py-5' data-aos='fade-up'><Empty /> <h3 className='text-center fw-200 mt-5'>Looks like you haven't made any bookings yet!</h3></Container>}

        </div>
    </div>
  )
}

export default MyBookings