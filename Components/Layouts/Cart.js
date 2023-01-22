import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { CloseCircleOutlined } from '@ant-design/icons';
import { AiFillCar } from 'react-icons/ai';
import { addProduct } from '../../redux/cart/cartSlice';
import AutoComplete from "react-google-autocomplete";
//AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk
const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);

    const getTotalPrice = (val) => {
        let p = 0;
        val.forEach(x => {
            p = p + x.price
        });
        return p;
    }

  return (
    <div className='cart-styles'>
        <Container className='cart-box' fluid>
            <Row>
                <Col md={8}>
                <Container className='p-5'>
                    <h2 className='mb-5'><strong>Your Cart</strong></h2>
                    {cart.length>0 &&<>
                    {cart.map((x, i)=>{
                    return(
                        <Row key={i} className="cart-item">
                            <Col md={3}>
                                <img src={x.image} height={100} width={170} style={{borderRadius:5}} />
                            </Col>
                            <Col className="">
                                <h4 className='fw-600'>{x.name}</h4>
                                <div className='silver-txt fs-16'>{x.adults} Adults, {x.childs} Children{x.infant!=""?", 1 Infant":""}</div>
                                <div className='silver-txt fs-16'>{x.transfer=="Yes"? <><AiFillCar style={{position:"relative", bottom:2}}/> With Transfer</>:"Witout Transfer"}</div>
                                <AutoComplete
                                    apiKey={"AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk"}
                                    onPlaceSelected={(place) => console.log(place)}
                                />
                            </Col>
                            <Col className="">
                                <div style={{float:'right'}}>
                                    <span className='fs-18 fw-500 grey-txt'>AED {x.price}</span>
                                    <CloseCircleOutlined className='close-cart-btn' 
                                        onClick={()=>{
                                            let tempState = [...cart];
                                            tempState = tempState.filter((j)=>{
                                                return j.tourId!=x.tourId
                                            })
                                            dispatch(addProduct(tempState));
                                        }}
                                    />
                                    <br/>
                                </div>
                            </Col>
                        </Row>
                    )})}
                    <hr/>
                    <div style={{minHeight:90}}>
                    <div style={{float:'right'}}>
                        <h5>Total AED</h5>
                        <h1 style={{color:'green'}}>{getTotalPrice(cart)}</h1>
                        <button className='cart-btn'>Checkout</button>
                    </div>
                    </div>
                    </>}
                    {
                        cart.length==0 && <div><p style={{fontSize:40, color:'silver'}} className='text-center'>Cart Is Empty</p></div>
                    }
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
