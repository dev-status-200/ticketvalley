import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from "js-cookie"
import { useSession, signIn, signOut } from 'next-auth/react';
import { GrLogout } from "react-icons/gr";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const {data:session} = useSession();
  const router = useRouter();

  return (
    <div className='header-styles'>
        <Row className='px-5 pb-3 pt-3 m-0 white-bg'>
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
                    <span className='' style={{color:'grey', fontSize:13, marginLeft:20}}><AiOutlineUser/></span>
                    {!session &&
                    <span className='cur f mx-2' style={{position:'relative', top:2}}
                        onClick={()=>{
                            if(Object.keys(router.query).length>0){ Cookies.set("redirect",`${router.pathname}?id=${router.query.id}`) }
                            else { Cookies.set("redirect",`${router.pathname}`) }
                            signIn();
                        }}
                    >My Login</span>
                    }
                    {session &&
                    <>
                    <span className='f mx-2' style={{position:'relative', top:2}} >{session.user.name}</span>
                    <span className='cur f mx-2'  style={{position:'relative', top:2}} onClick={()=>signOut()}>
                        <GrLogout className='mx-1' style={{position:'relative', bottom:2, fontSize:13}}  />Logout
                    </span>
                    </>
                    }
                    {!session && <span className=''>|</span>}
                    {!session && <Link className='cur f mx-2' style={{position:'relative', top:2, textDecoration:'none'}} href="/login">Agent Login</Link>}
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Header