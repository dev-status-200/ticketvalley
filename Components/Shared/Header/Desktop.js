import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from 'next-auth/react';
import { fetchCurrencyData } from '/functions/fetchCurrencyData';
import { GrLogout } from "react-icons/gr";
import { HiShoppingCart } from "react-icons/hi";
import { BsCurrencyExchange } from "react-icons/bs";
import { Dropdown, Popover, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrency, changeCurrency } from '/redux/currency/currencySlice';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import MyOffers from "/Components/Shared/MyOffers";
import { FaSquareXTwitter } from "react-icons/fa6";

const Header = () => {
 
  const {data:session} = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  
  const [showOffers, setShowOffers] = useState(false);
  const currencyList = useSelector((state) => state.currency.value);
  const conversion = useSelector((state) => state.currency.conversion);
  
    useEffect(() => {
      if(Object.keys(currencyList).length==0){
        setCurrency();
      }
    }, [])

    const setCurrency = async() => {
      let items = await fetchCurrencyData();
      dispatch(addCurrency([]));
    }

  const items = [
    { label: <div className='text-center px-3' onClick={()=>router.push('/myBookings')}>My Bookings</div>, key: '0' },
    // { label: <div className='text-center px-3' onClick={()=>setShowOffers(true)}>My Offers</div>, key: '1' }
  ];

  const adjustCurrency = (curr) => {
    dispatch(changeCurrency({currency:curr, rate:currencyList[`${curr}`]}));
  }

  return (
    <div className='header-styles '>
      <Row className='px-5 pt-2 m-0 white-bg' style={{paddingBottom:8}}>
        <Col md={6}>
          <div style={{fontSize:15}}>
            <span ><FaPhoneAlt/></span>
            <span className='mx-2' style={{position:'relative', top:2}}>+ 971  50 337 4890</span>
            <span style={{marginLeft:1, marginRight:10, position:'relative', top:1}}>|</span>
            <span style={{position:'relative', bottom:0}}><FaRegEnvelopeOpen/></span>
            <span className=' mx-2' style={{position:'relative', top:2}}>support@ticketsvalley.com</span>
          </div>
        </Col>
        <Col md={6}>
          <div style={{float:'right', fontSize:15}}>
            <Popover placement="bottom" 
              trigger="click"
              content={
                <div className='text-center' style={{minHeight:60}}>
                    <div className='fs-15'>Select Currency</div>
                    <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('AED')}><span className="fi fi-ae"></span></span>
                    <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('USD')}><span className="fi fi-um"></span></span>
                    <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('AUD')}><span className="fi fi-au"></span></span>
                    <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('GBP')}><span className="fi fi-gb"></span></span>
                    <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('PKR')}><span className="fi fi-pk"></span></span>
                    <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('INR')}><span className="fi fi-in"></span></span>
                </div>
              }>
                <span className='cur mx-1'>Currency <BsCurrencyExchange size={15} className='blue-txt' /></span>
            </Popover>
            <span className='mx-3 fs-11' style={{opacity:0.5}}>|</span>
            <span className='cur mx-1 blue-txt'onClick={()=>router.push("/cart")}>
                My Cart
                <span className='fs-12'>{" ( "}{cart.length}{" )"} </span>
                <HiShoppingCart size={15} />
            </span>
            <span className='mx-3 fs-11' style={{opacity:0.5}}>|</span>
            {/* <a className='cur mx-1' href='https://m.facebook.com/ticketsvalley/?locale=hi_IN' target='_blank' style={{color:'#2b67b6'}}><SiFacebook/></a>
            <a className='cur mx-1' style={{color:'#e425b4'}}><img src={'/icons/insta.png'} height={12} /></a>
            <a className='cur mx-1' style={{color:'grey'}}><FaSquareXTwitter size={13} /></a> */}
            {!session &&
            <span className='cur' style={{position:'relative', top:2}}
              onClick={()=>{
                // This Logic sets the redirected URL to get back to this page
                if(Object.keys(router.query).length>0){ 
                  Cookies.set("redirect",`${router.pathname}?id=${router.query.id}`)  
                }
                else { 
                  Cookies.set("redirect",`${router.pathname}`) 
                }
                signIn();
              }}
            ><AiOutlineUser size={15} style={{marginLeft:0, position:'relative', bottom:3, marginRight:4}} /> My Login</span>
            }
            {session &&
            <>
            <span className='mx-3 fs-11' style={{position:'relative', top:2, }}>
            <Dropdown menu={{ items }}>
                <span onClick={(e) => e.preventDefault()}>
                    <span className='' style={{marginLeft:0, position:'relative', bottom:3, marginRight:4}}>
                        <AiOutlineUser size={15} />
                    </span>
                    {session.user.name}
                </span>
            </Dropdown>
            </span>
            <span className='mx-3 fs-11' style={{opacity:0.5}}>|</span>
            <span className='cur'  style={{position:'relative', top:2}} onClick={()=>signOut()}>
                <GrLogout className='mx-1' style={{position:'relative', bottom:2, fontSize:13}}  />Logout
            </span>
            </>
            }
          </div>
        </Col>
      </Row>
      {showOffers && 
      <>
        <Modal title="My Offers" open={showOffers} onCancel={()=>setShowOffers(false)} footer={false} centered>
          <hr/>
          <MyOffers selectable={false} email={session?.user.email} />
        </Modal>
      </>
      }
    </div>
  )
}

export default Header