import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {Row, Col, Container} from 'react-bootstrap';
import { AiFillCar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';

const MyBookings = () => {

    const conversion = useSelector((state) => state.currency.conversion);
    const {data:session} = useSession();
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);

    const retrive = (data) => {
        setEmail(data)
        axios.post(process.env.NEXT_PUBLIC_CREATE_GET_MY_RESERVATIONS,{
            email:data
        }).then((x)=>{
            setBookings(x.data.result)
            console.log(x.data.result)
        })
    }

  return (
    <div style={{backgroundColor:'white'}}>
        <hr className='my-0' />
        <div className='home-styles'>
        <div className='theme empty-bg py-4'>
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
        </div>
        </div>
        {(session && email=='') && <div>{retrive(session.user.email)}</div>}
        <Container className='my-5 px-5'>
        <h3 className='mb-4'>My All Bookings</h3>
        {bookings.map((y, j)=>{
            return(
            <Row key={j}>
            <Col md={12}>
            <hr className='mb-3 mt-0' />
            {y.BookedTours.map((x, i)=>{
            return(
                <Row key={i} className="cart-item my-2">
                    <Col md={2} className=""><img src={x.image} height={100} width={170} style={{borderRadius:5}} /></Col>
                    <Col className="" md={10} >
                    <div style={{float:'right'}}>
                    {i==0 &&
                        <div>
                            <div>Date :  <span className='grey-txt'>{moment(y.moment).format('DD/MM/YY')}</span></div>
                            <div>Booking No. :  <b className='grey-txt'>{y.id}</b></div>
                            <div className='mt-2'>
                                PROMO :
                                {" "}
                                <span className='grey-txt'>
                                    {
                                        y.promo=="none"?
                                        'NO':
                                        <>
                                            <span style={{color:'goldenrod'}}>{JSON.parse(y.promo).name}</span> -
                                            <span style={{marginLeft:5}}>{JSON.parse(y.promo).price}</span>
                                            <span className=''>{JSON.parse(y.promo).byPercentage?'%':`${conversion.currency}`} OFF</span>
                                        </>
                                    }
                                </span>
                            </div>
                            <h4 className='mt-2'>Total Price :  
                                {" "}<b className='grey-txt'>{(y.final_price*conversion.rate).toFixed(2)}</b> {conversion.currency}
                            </h4>
                        </div>
                    }
                    <br/>
                    </div>
                    <h5 className='fw-500'>{x.name}</h5>
                    {x.BookedToursOptions.map((y, j)=>{
                    return(
                    <div key={j+i}>
                        <div className=''>
                            Option: {y.name} {"("}{`${y.adult} Adult`}{y.child>0?`, ${y.child} Child`:""} {y.infant>0?`, Infant ${y.infant}`:""}{" )"}
                        </div>
                        <div>Transfer Type: {y.transfer}</div>
                        <div>{y.transfer!="No"?`Pickup Location: ${y.address} `:""}</div>
                    </div>
                    )})}
                    </Col>
                </Row>
            )})}
            </Col>
            </Row>
        )})}
        {bookings.length==0 && <div className='text-center'> <img src='/loader.svg' /> </div> }
        </Container>
    </div>
  )
}

export default MyBookings