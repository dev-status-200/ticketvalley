import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { CloseCircleOutlined, ExclamationCircleFilled, LeftCircleOutlined } from '@ant-design/icons';
import { AiFillCar } from 'react-icons/ai';
import { addProduct } from '../../redux/cart/cartSlice';
import { Modal } from 'antd';
import Link from 'next/link';
const { confirm } = Modal;
import axios from "axios";
import { useSession } from 'next-auth/react';

const Cart = () => {

    const {data:session} = useSession();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);

    const getTotalPrice = (val) => {
        let p = 0.0;
        val.forEach(x => {
            p = p + parseFloat(x.price)
        });
        return p.toFixed(2);
    }

    const showConfirm = (x) => {
        confirm({
          title: 'Do you want to remove this items?',
          icon: <ExclamationCircleFilled />,
          onOk() {
            let tempState = [...cart];
            tempState = tempState.filter((j)=>{
                return j.tourId!=x.tourId
            })
            dispatch(addProduct(tempState));
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    };

  return (
    <div className='cart-styles'>
        <Container className='cart-box' fluid>
            <Row>
            <Col md={8}>
            <Container className='p-5'>
                <div className='my-3'>
                <Link href="/" style={{color:'grey', textDecoration:'none'}}><LeftCircleOutlined style={{fontSize:24}} /></Link>
                </div>
                <h2 className='mb-5'><strong>Your Cart</strong></h2>
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
                <div className='mt-5' style={{minHeight:90}}>
                <div style={{float:'right'}}>
                    <h6 className='text-end'>Total AED</h6>
                    <h3 style={{color:'green'}} className='text-end'>{getTotalPrice(cart)}</h3>
                    <button className='cart-btn'
                        onClick={()=>{
                            axios.post(process.env.NEXT_PUBLIC_CREATE_BOOKING,{
                                user:session?.user||null
                            }).then((x)=>{
                                console.log(x.data)
                            })
                        }}
                    >Checkout</button>
                </div>
                </div>
                </>
                }
                {cart.length==0 && <div><p style={{fontSize:40, color:'silver'}} className='text-center'>Cart Is Empty</p></div>}
            </Container>
            </Col>
            <Col md={4} className="pay-screen">
            </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Cart
