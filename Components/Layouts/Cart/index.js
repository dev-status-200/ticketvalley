import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../../functions/cartFunction';
import PayComp from './PayComp';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { Modal, Empty, Input } from 'antd';
import { CloseCircleOutlined, ExclamationCircleFilled, LeftCircleOutlined } from '@ant-design/icons';
import { addProduct } from '../../../redux/cart/cartSlice';
import { useSession } from 'next-auth/react';
import Aos from 'aos';
import { AiFillCar } from 'react-icons/ai';
import Router from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

const Cart = () => {

    const {data:session} = useSession();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);
    const [promoInfo, setPromoInfo] = useState({price:0, byPercentage:false, name:""});
    const [price, setPrice] = useState(0.0);
    const [promo, setPromo] = useState("");
    const [discountPrice, setDiscountPrice] = useState(0);
    const [load, setLoad] = useState(false);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => { Aos.init({duration:500}); }, []);
    useEffect(()=> setPrice(parseFloat(getTotalPrice(cart)).toFixed(2)), [cart])

    const getTotalPrice = (val) => {
        let discount = Cookies.get("promoDiscount");
        let removingPrice = 0;
        let p = 0.0;
        val.forEach(x => p = p + parseFloat(x.price) );
        if(discount){ 
            discount = JSON.parse(discount);
            setPromoInfo(discount)
            if(discount.byPercentage){ removingPrice = discount.price*(p/100) }
            else if(!discount.byPercentage){ removingPrice = discount.price }
        }
        setDiscountPrice(removingPrice)
        let retrnValue = p.toFixed(2)-removingPrice;
        return retrnValue;
    }

    const showConfirm = (x) => {
        Modal.confirm({
          title: 'Do you want to remove this item from cart?',
          icon: <ExclamationCircleFilled />,
          onOk() {
            let tempState = [...cart];
            tempState = tempState.filter((j)=>{
                return j.tourId!=x.tourId
            })
            removeFromCart(x.tourId)
            if(cart.length==1){
                Cookies.remove("promoDiscount")
            }
            dispatch(addProduct(tempState));
            Router.push("/cart")
          },
          onCancel() {
          },
        });
    };

    const ApplyPromo = async(e) => {
        e.preventDefault();
        setLoad(true);

        await delay(2000)
        await axios.post(process.env.NEXT_PUBLIC_VERIFY_PROMO,{
            code:promo
        }).then((x)=>{
            setLoad(false);
            if(x.data.result==null){
                Modal.warning({ title: 'Error', content: "Promo code dosen't exists or has been disabled!" });
            }else if(x.data.result.stock==0){
                Modal.warning({ title: 'Error', content: "Oops, this code cannot be used anymore!" });
            }else if(x.data.result.stock>0){
                Modal.success({ title:'Success', content:(
                    <div>
                      <p>Congratulations! You've recieved a discount of <br/>
                        <strong>{x.data.result.amount} {x.data.result.byPercentage=="1"?"%":"AED"}</strong>!
                      </p>
                    </div>
                  ),
                  onOk(){
                    Cookies.set("promoDiscount", JSON.stringify(({price:parseFloat(x.data.result.amount), byPercentage:x.data.result.byPercentage=="0"?false:true, name:x.data.result.code})))
                    setPromoInfo({price:parseFloat(x.data.result.amount), byPercentage:x.data.result.byPercentage=="0"?false:true, name:x.data.result.code})
                    Router.push("/cart")
                  }, 
                });
            }
        })
    };

  return (
    <div className='cart-styles' style={{borderTop:"1px solid silver"}}>
        <Container className='cart-box' fluid>
        <Row>
            <Col md={8}>
            <Container className='px-5'>
                <div className='my-3'>
                <Link href="/" style={{color:'grey', textDecoration:'none'}}><LeftCircleOutlined style={{fontSize:24}} /></Link>
                </div>
                <h3 className='mb-3'><strong>Your Cart</strong></h3>
                {cart.length>0 &&
                <>
                {cart.map((x, i)=>{
                return(
                    <Row key={i} className="cart-item">
                        <Col md={3} className="text-center py-3" style={{borderRight:"1px solid silver"}}>
                            <img src={x.image} height={100} width={170} style={{borderRadius:5}} />
                        </Col>
                        <Col className="" md={9} >
                        <div style={{float:'right'}}>
                            <span className='fs-18 fw-500 grey-txt'>AED {x.price}</span>
                            <CloseCircleOutlined className='close-cart-btn' 
                                onClick={()=>showConfirm(x)}
                            />
                            <br/>
                        </div>
                        <h5 className='fw-500'>{x.name}</h5>
                        <div className='silver-txt fs-16'>{x.adults} Adults, {x.childs} Children{x.infant!=""?", 1 Infant":""}</div>
                        <div className='silver-txt fs-16'>Lead Passenger : {x.passenerInfo.title} {x.passenerInfo.fName} {x.passenerInfo.lName}</div>
                            {x.timeslot!="" && <div className='silver-txt fs-16'>Time Slot :  {x.timeslot}</div>}
                        <div className='silver-txt fs-16'>
                            {x.transfer!="No"? 
                            <>
                                <AiFillCar style={{position:"relative", bottom:2}}/> {" "}
                                {x.transfer} Transfer<br/>
                                    <div className='fs-13'>{x.passenerInfo.address}</div>
                            </>:
                            "Without Transfer"
                            }
                        </div>
                        </Col>
                    </Row>
                )})}
                <hr/>
                <div className='mt-3' style={{minHeight:90}}>
                    <div className='my-4' style={{float:'right'}}>
                        <form onSubmit={ApplyPromo}>
                        <Row>
                            <Col md={3}>
                                <button className='btn-custom' type="submit" disabled={load?true:false}>
                                    {load?<Spinner size='sm' className='mx-3' />:"Apply"}
                                </button>
                            </Col>
                            <Col>
                                <Input className='mx-2' 
                                    placeholder="Enter Promo" required 
                                    value={promo} onChange={(e)=>setPromo(e.target.value)} 
                                />
                            </Col>
                        </Row>
                        </form>
                        <hr/>
                        {discountPrice>0 && 
                        <h5 className='text-end'>
                            <span style={{fontWeight:400}}>Promo Code: </span><span style={{fontWeight:400, color:"silver"}}>{promoInfo.name}</span><br/>
                            <span style={{fontWeight:400}}>Discount </span><s style={{color:'#dd9613'}}> {discountPrice}</s>
                        </h5>
                        }
                        <h5 className='text-end' style={{fontWeight:400}}>Total AED</h5>
                        <h2 style={{color:'green'}} className='text-end'>{price}</h2>
                    </div>
                </div>
                </>
                }
                {cart.length==0 && 
                <div>
                    <Container className='py-5' data-aos='fade-up'>
                        <Empty />
                        <h3 className='text-center fw-200 mt-5'>Cart Is Empty!</h3>
                    </Container>
                </div>
                }
            </Container>
            </Col>
            <Col md={4} className="pay-screen p-5">
            {cart.length>0 &&
                <>
                    {session && <> {price>0 && <PayComp price={price} email={session?.user.email} />} </> }
                    {!session &&
                        <div className='cart-logged-in-warning'>
                            Sign-in is required to continue Checkout!
                        </div>
                    }
                </>
            }
            {cart.length==0 &&
                <div className='cart-logged-in-warning'>
                    Fill up cart to continue Checkout!
                </div>
            }
            </Col>
        </Row>
        </Container>
    </div>
  )
}
export default Cart