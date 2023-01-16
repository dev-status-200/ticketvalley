import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {CloseCircleOutlined} from '@ant-design/icons';
import { addProduct } from '../../redux/cart/cartSlice';

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
      <div className='cont'>
        <div className='cart-box'>
            <h4>Your Cart</h4>
            {cart.length>0 &&<>
            <hr/>
            {
                cart.map((x, i)=>{
                    return(
                        <Row key={i} className="cart-item">
                            <Col md={3}>
                                <img src={x.image} height={100} width={200} style={{borderRadius:5}} />
                            </Col>
                            <Col className="p-3">
                                <h4>{x.name}</h4>
                                <div>Adults: <strong>{x.adults}</strong></div>
                                <div>Children: <strong>{x.childs}</strong></div>
                            </Col>
                            <Col className="p-3">
                                <div style={{float:'right'}}>
                                    <span style={{color:'green', fontSize:25, fontWeight:600}}>{x.price}</span><span> AED</span>
                                    <CloseCircleOutlined className='close-cart-btn' 
                                        onClick={()=>{
                                            let tempState = [...cart];
                                            tempState = tempState.filter((j)=>{
                                                return j.tourId!=x.tourId
                                            })
                                            dispatch(addProduct(tempState));
                                            console.log(tempState)
                                        }}
                                    />
                                    <br/>
                                </div>
                            </Col>
                        </Row>
                    )
                })
            }
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
        </div>
      </div>
    </div>
  )
}

export default Cart
