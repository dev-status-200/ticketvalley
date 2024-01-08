import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HiShoppingCart } from "react-icons/hi";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from 'next-auth/react';
import { fetchCurrencyData } from '/functions/fetchCurrencyData';
import { GrLogout } from "react-icons/gr";
import { BsCurrencyExchange } from "react-icons/bs";
import { Dropdown, Popover, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrency, changeCurrency } from '/redux/currency/currencySlice';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import MyOffers from "/Components/Shared/MyOffers"

function OffCanvasExample({ name, ...props }) {

  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => !load?setShow(false):null;
  const toggleShow = () => setShow((s) => !s);
  const navStyles = {color:'white', textDecoration:'none', fontSize:30}
  
  const {data:session} = useSession();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.value);

  const [showOffers, setShowOffers] = useState(false);
  const currencyList = useSelector((state) => state.currency.value);
  const conversion = useSelector((state) => state.currency.conversion);

  return (
    <>
    <Container fluid="true" style={{backgroundColor:'rgb(8, 78, 77)', color:'white'}}>
      <Row style={{fontSize:12}} className='pb-1 px-2'>
        <Col xs={6}>
          <FaPhoneAlt style={{position:'relative', top:1, fontSize:10}}/>
          <span className='mx-1' style={{position:'relative', top:2}}>+ 971  50 337 4890</span>
        </Col>
        <Col xs={6} className='px-1 text-end'>
          <FaRegEnvelopeOpen style={{fontSize:10}}/><span className='mx-1' style={{position:'relative', top:2}}>booking@ticketsvalley.com</span>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className='py-2'>
        <Col xs={3} className='text-start'>
          <CgMenuLeft onClick={toggleShow} style={{fontSize:25, color:'#21a69b', marginTop:11}}/>
        </Col>
        <Col xs={6} className='text-center'>
        <img src={'/images/logo.png'} height={50} style={{position:'relative', right:10}} onClick={()=>router.push("/")} alt='logo' />
        </Col>
        <Col xs={3} className='text-end'>
          <div onClick={()=>router.push("/cart")} style={{color:'#21a69b', marginTop:11}}>
           <span style={{fontSize:12}} >{`(${cart.length})`}</span><HiShoppingCart size={23} />
          </div>
          {/* <FaUser style={{fontSize:16, color:'#21a69b'}}/> */}
        </Col>
      </Row>
    </Container>

    <Offcanvas show={show} onHide={handleClose} {...props} >
      <Offcanvas.Header closeButton style={{backgroundColor:'#21a69b'}}>
        <Offcanvas.Title style={{color:'white'}}>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{backgroundColor:'#21a69b'}}>
        {!load &&<>
          <div className='text-center navBar'>
            <div className='mt-3'></div>
            <Link style={navStyles} href='/' >Home</Link><br/><br/>
            <Link style={navStyles} href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}} >Activities</Link><br/><br/>
            <Link style={navStyles} href='/about' >About</Link><br/><br/>
            {!session &&
              <span className='cur mx-2' style={navStyles}
                  onClick={()=>{
                      //This Logic sets the redirected URL to get back to this page
                      setLoad(true);
                      if(Object.keys(router.query).length>0){
                        Cookies.set("redirect",`${router.pathname}?id=${router.query.id}`)  
                      }
                      else {
                        Cookies.set("redirect",`${router.pathname}`) 
                      }
                      signIn();
                  }}
              >My Login</span>
            }
            {session &&
              <>
              <div style={navStyles} onClick={()=>router.push('/myBookings')}>
                  My Bookings
              </div><br/>
              <div style={navStyles} onClick={async()=>{ await handleClose(); setShowOffers(true)}}>
                  My Offers
              </div><br/>
              <div style={navStyles} onClick={()=>{setLoad(true); signOut()}}>
                  Logout
              </div>
              </>
            }
          </div>
        </>}
        {load &&<>
          <div className='text-center' style={{paddingTop:'70%', color:'white'}} >
            <Spinner size='lg' />
            <p style={{margin:15, fontSize:22}}>Please Wait...</p>
          </div>
        </>}
      </Offcanvas.Body>
    </Offcanvas>

    <hr className='p-0 m-0' />
    {showOffers &&  <>
      <Modal title="My Offers" 
      scroll={false} 
      backdrop={true} 
      open={showOffers} 
      centered 
      onCancel={()=>setShowOffers(false)} footer={false}>
          <hr/>
          <MyOffers selectable={false} email={session?.user.email} />
      </Modal>
    </>}
    </>
  );
}

export default function Mobile() {
  return (
    <>
      <OffCanvasExample scroll={false} backdrop={true} />
    </>
  );
}
