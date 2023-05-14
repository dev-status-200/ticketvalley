import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from 'next-auth/react';
import { fetchCurrencyData } from '../../functions/fetchCurrencyData';
import { GrLogout } from "react-icons/gr";
import { HiShoppingCart } from "react-icons/hi";
import { GrCurrency } from "react-icons/gr";
import { Dropdown, Popover  } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrency, changeCurrency } from '../../redux/currency/currencySlice';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Header = () => {
 
  const {data:session} = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const currencyList = useSelector((state) => state.currency.value);
  const conversion = useSelector((state) => state.currency.conversion);
  
    useEffect(() => {
        if(Object.keys(currencyList).length==0){
            setCurrency();
        }
    }, [])

    const setCurrency = async() => {
        let items = await fetchCurrencyData();
        dispatch(addCurrency(items));
    }

  const items = [
    { label: <span className='text-center px-3' onClick={()=>router.push('/myBookings')}>My Bookings</span>, key: '0' },
  ];

  const adjustCurrency = (curr) => {
    dispatch(changeCurrency({currency:curr, rate:currencyList[`${curr}`]}));
  }

  return (
    <div className='header-styles silver-3-txt'>
        <Row className='px-5 pt-1 m-0 white-bg' style={{paddingBottom:5}}>
            <Col md={6}>
                <div style={{fontSize:11}}>
                    <span ><FaPhoneAlt/></span>
                    <span className='mx-2' style={{position:'relative', top:2}}>+41 21 634 05 05</span>
                    <span style={{marginLeft:1, marginRight:10, position:'relative', top:1}}>|</span>
                    <span style={{position:'relative', bottom:0}}><FaRegEnvelopeOpen/></span>
                    <span className=' mx-2' style={{position:'relative', top:2}}>booking@ticketsvalley.com</span>
                </div>
            </Col>
            <Col md={6}>
                <div style={{float:'right', fontSize:11}}>
                    <Popover placement="bottom" content={
                        <div className='text-center' style={{minHeight:60}}>
                            <div>Select Currency</div>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('AED')}><span className="fi fi-ae"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('USD')}><span className="fi fi-um"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('AUD')}><span className="fi fi-au"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('GBP')}><span className="fi fi-gb"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('PKR')}><span className="fi fi-pk"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('INR')}><span className="fi fi-in"></span></span>
                        </div>
                    } trigger="click">
                        <span className='cur mx-2'><GrCurrency size={15} color='yellow'/></span>
                    </Popover>
                    <span className='cur mx-1'onClick={()=>router.push("/cart")}><HiShoppingCart size={15}/></span>
                    <span className='mx-2'> | </span>
                    <span className='cur mx-1'><SiFacebook/></span>
                    <span className='cur mx-1'><SiInstagram/></span>
                    <span className='cur mx-1'><SiTwitter/></span>
                    {!session &&
                    <span className='cur mx-2' style={{position:'relative', top:2}}
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
                    >My Login</span>
                    }
                    {session &&
                    <>
                    <span className='cur mx-2' style={{position:'relative', top:2, }}>
                    <Dropdown menu={{ items }}>
                        <span onClick={(e) => e.preventDefault()}>
                            <span className='' style={{fontSize:13, marginLeft:10, position:'relative', bottom:2, marginRight:4}}><AiOutlineUser/></span>
                            {session.user.name}
                        </span>
                    </Dropdown>
                    </span>
                    <span className='cur  mx-2'  style={{position:'relative', top:2}} onClick={()=>signOut()}>
                        <GrLogout className='mx-1' style={{position:'relative', bottom:2, fontSize:13}}  />Logout
                    </span>
                    </>
                    }
                    {!session && <span className='' style={{position:'relative', top:2}}>|</span>}
                    {!session && <Link className='cur silver-3-txt mx-2' style={{position:'relative', top:2, textDecoration:'none'}} href="/login">Agent Login</Link>}
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Header