import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { DownCircleOutlined } from '@ant-design/icons';
import { CgMenuLeft } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Cookies from "js-cookie";
// import { fetchCurrencyData } from '/functions/fetchCurrencyData';
// import { GrLogout } from "react-icons/gr";
// import { BsCurrencyExchange } from "react-icons/bs";
// import { addCurrency, changeCurrency } from '/redux/currency/currencySlice';
import { Drawer } from "antd";
import { Dropdown, Popover, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import "/node_modules/flag-icons/css/flag-icons.min.css";
// import MyOffers from "/Components/Shared/MyOffers";
import { HiLogout } from "react-icons/hi";
import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';

function ContextAwareToggle({ children, eventKey, callback }) {

  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton( eventKey, () => callback && callback(eventKey), );

  return (
    <button className='link-dropdown-btn' type="button" onClick={decoratedOnClick} >
      {children}
    </button>
  );
}

function OffCanvasExample({ name, ...props }) {

  const {data:session} = useSession();
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const handleClose = () => !load?setShow(false):null;
  const toggleShow = () => setOpen((s) => !s);
  const navStyles = {color:'white', textDecoration:'none', fontSize:22, fontWeight:400, lineHeight:2}
  
  const router = useRouter();
  const cart = useSelector((state) => state.cart.value);

  const [showOffers, setShowOffers] = useState(false);
  // const currencyList = useSelector((state) => state.currency.value);
  // const conversion = useSelector((state) => state.currency.conversion);

  useEffect(() => {
    // let values = Cookies.get("token");
    // if(values){
    //   setImage(JSON.parse(values)?.picture)
    // }
    axios.get(process.env.NEXT_PUBLIC_GET_ALL_CITIES)
    .then((x)=>{
      let tempList = [];
      tempList = x?.data?.result?.map((y, i)=>{
        return {
          name:y.name,
          url:`/activities?destination=uae&city=${y.name}&category=`
        }
      });
      setList(tempList)
    })
  }, [])

  const [countdown, setCountdown] = useState(1);
  const [changeTag, setChangeTag] = useState(false);
  
  useEffect(() => {
    let timeout;
    if (countdown < 1000) {
      timeout = setTimeout(() => {
        setCountdown(countdown + 1);
      }, 1000);
    }
    countdown%10==0?setChangeTag(!changeTag):null;
    return () => clearTimeout(timeout);
  }, [countdown]);

  return (
    <>
    <Container>
      <Row className='py-2'>
        <Col xs={4} className='text-start pt-3'>
          <CgMenuLeft onClick={toggleShow} color='#31a0a1' size={23}/>
        </Col>
        <Col xs={4} className='text-center'>
        <img src={'/images/logo.png'} height={50} style={{position:'relative', right:10}} onClick={()=>router.push("/")} alt='logo' />
        </Col>
        <Col xs={4} className='text-end'>
          <div className='mt-3'>
           <span className='mx-1 grey-txt-2'>{`(${cart.length})`}<HiShoppingCart color='#31a0a1' size={23} onClick={()=>router.push("/cart")} /></span>
            {session && <img src={session?.user?.image||''} style={{height:22, borderRadius:100}} />}
            {!session && <FaUserCircle color='#31a0a1' size={21} style={{position:'relative', bottom:1}} onClick={()=>router.push("/auth")} />}
          </div>
        </Col>
      </Row>
    </Container>

    <Drawer 
      style={{backgroundColor:'#21a69b'}}
      title={<h4 className="wh-txt pt-2">Menu</h4>}
      placement={"left"}
      onClose={()=>setOpen(false)}
      open={open}
      width={"70%"}
    >
    <div>
    {!load &&
      <div className='navBar'>
        <div className='mt-3'></div>
        <Link style={navStyles} href='/'>Home</Link><br/>
        <Accordion defaultActiveKey="3">
          <Link style={navStyles} href={{pathname:'/search', query:{destination:"uae", city:"Dubai City"}}}>Destination</Link>
          <ContextAwareToggle eventKey="0">
            <DownCircleOutlined style={{color:'white', position:'relative', bottom:2, fontSize:20}} />
          </ContextAwareToggle>
          <Accordion.Collapse 
            eventKey="0" 
          >
            <div className='wh-txt'>
              {list?.length>0 && list?.map((x, i)=>{
                return(
                  <div key={i} className='mx-2 p-1 fw-500 fs-20' onClick={()=>router.push(x.url)}>- {x.name}</div>
                )
              })}
            </div>
          </Accordion.Collapse>
          <br/>
          <Link style={navStyles} href={{pathname:'/search', query:{destination:"uae", city:"Dubai City"}}}>Activities</Link>
          <ContextAwareToggle eventKey="1">
            <DownCircleOutlined style={{color:'white', position:'relative', bottom:1, fontSize:20}} />
          </ContextAwareToggle>
          <Accordion.Collapse 
            eventKey="1" 
          >
            <div className='wh-txt'>
            <div className='mx-2 p-1 fw-500 fs-20' onClick={()=>router.push('/activities?destination=&city=&category=Adventure')}>   - Adventure Tours</div>
            <div className='mx-2 p-1 fw-500 fs-20' onClick={()=>router.push('/activities?destination=&city=&category=Water+Parks')}> - Water Parks  </div>
            <div className='mx-2 p-1 fw-500 fs-20' onClick={()=>router.push('/activities?destination=&city=&category=Family+Fun')}>  - Family Fun    </div>
            <div className='mx-2 p-1 fw-500 fs-20' onClick={()=>router.push('/activities?destination=&city=&category=Theme+Parks')}> - Theme Parks  </div>
            <div className='mx-2 p-1 fw-500 fs-20' onClick={()=>router.push('/activities?destination=&city=&category=City+Tours')}>  - City Tours    </div>
            <div className='mx-2 p-1 fw-500 fs-20' onClick={()=>router.push('/activities?destination=&city=&category=Luxury+Tours')}>- Luxury Tours</div>
            </div>
          </Accordion.Collapse>
          <br/>
        </Accordion>
        <Link style={navStyles} href='/about' >About</Link><br/>
        <Link style={navStyles} href='/contact' >Contact</Link><br/>
        <div style={{position:'absolute', bottom:10, width:'85%'}}>
          {/* <hr className='mb-1' /> */}
          {!session &&
            <span className='cur' style={{color:'white', fontSize:17}}
            onClick={()=>{
              // This Logic sets the redirected URL to get back to this page
              if(Object.keys(router.query).length>0){ 
                Cookies.set("redirect",`${router.pathname}?id=${router.query.id}`)  
              }
              else { 
                Cookies.set("redirect",`${router.pathname}`) 
              }
              signIn()
            }}
          >My Login</span>
          }
          {session && <div>
            <Link style={{color:'white', fontSize:17, textDecoration:'none'}} href='/myBookings'>My Bookings</Link>
            <span style={{color:'white', fontSize:22}} className='mx-3'>|</span>
            <span style={{color:'white', fontSize:17}} onClick={()=>signOut()}>Logout <HiLogout style={{position:'relative', bottom:2, right:4}}/></span>
          </div>
          }
        </div>
      </div>
    }
    {load &&
      <div className='text-center' style={{paddingTop:'70%', color:'white'}} >
        <Spinner size='lg' />
        <p style={{margin:15, fontSize:22}}>Please Wait...</p>
      </div>
    }
    </div>
    </Drawer>

    <hr className='p-0 m-0' />
    {showOffers && 
      <Modal 
        title="My Offers" 
        centered 
        scroll={false} 
        backdrop={true} 
        open={showOffers} 
        footer={false}
        onCancel={()=>setShowOffers(false)}
      >
        <hr/>
      </Modal>
    }
    </>
  );
}

export default function Mobile(){
  return (
    <>
      <OffCanvasExample scroll={false} backdrop={true} />
    </>
  );
}
