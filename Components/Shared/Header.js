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
import { HiShoppingCart } from "react-icons/hi";

const Header = () => {
  const {data:session} = useSession();
  const router = useRouter();

  return (
    <div className='header-styles'>
        <Row className='px-5 py-2 m-0 white-bg'>
            <Col md={6}>
                <div>
                    <span style={{fontSize:13}}><FaPhoneAlt/></span>
                    <span className='' style={{position:'relative', top:2}}>+41 21 634 05 05</span>
                    <span style={{marginLeft:10, marginRight:10}}>|</span>
                    <span style={{fontSize:13}}><FaRegEnvelopeOpen/></span>
                    <span className=' mx-2' style={{position:'relative', top:2}}>booking@ticketsvalley.com</span>
                </div>
            </Col>
            <Col md={6}>
                <div style={{float:'right'}}>
                    <span className='cur mx-1' style={{fontSize:15}}
                        onClick={()=>router.push("/cart")}
                        ><HiShoppingCart/></span>
                    <span className='mx-2' style={{fontSize:15}}> | </span>
                    <span className='cur mx-1' style={{fontSize:13}}><SiFacebook/></span>
                    <span className='cur mx-1' style={{fontSize:13}}><SiInstagram/></span>
                    <span className='cur mx-1' style={{fontSize:13}}><SiTwitter/></span>
                    <span className='' style={{fontSize:13, marginLeft:20}}><AiOutlineUser/></span>
                    {!session &&
                    <span className='cur mx-2' style={{position:'relative', top:2}}
                        onClick={()=>{
                            if(Object.keys(router.query).length>0){ Cookies.set("redirect",`${router.pathname}?id=${router.query.id}`) }
                            else { Cookies.set("redirect",`${router.pathname}`) }
                            signIn();
                        }}
                    >My Login</span>
                    }
                    {session &&
                    <>
                    <span className=' mx-2' style={{position:'relative', top:2}} >{session.user.name}</span>
                    <span className='cur  mx-2'  style={{position:'relative', top:2}} onClick={()=>signOut()}>
                        <GrLogout className='mx-1' style={{position:'relative', bottom:2, fontSize:13}}  />Logout
                    </span>
                    </>
                    }
                    {!session && <span className=''>|</span>}
                    {!session && <Link className='cur black-txt mx-2' style={{position:'relative', top:2, textDecoration:'none'}} href="/login">Agent Login</Link>}
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Header