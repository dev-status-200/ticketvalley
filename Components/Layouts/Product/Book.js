import React, { usestate, useEffect, useState } from 'react'
import { DatePicker, Select } from 'antd';
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/cart/cartSlice';
import Router from 'next/router';

const Book = ({tour, transport}) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);

    const [price, setPrice] = useState(0);
    
    const [adult, setAdult] = useState(0);
    const [infant, setInfant] = useState(0);
    const [children, setChildren] = useState(0);
    const [tranfer, setTransfer] = useState("Yes");
    const [date, setDate] = useState("");

    const [added, setAdded] = useState(false);

    useEffect(() => {
        console.log(cart);
        cart.forEach((x)=>{
            if(x.tourId==tour.id){
                setAdded(true)
            }
        })
    }, [cart])

    const calculatePrice = (adult, child, trans) => {
        setAdult(adult);
        setChildren(child);
        setTransfer(trans);
        let price = 0;
        price = adult*tour.adult_price + price;
        price = child*tour.child_price + price;
        if(trans=="Yes"){
            console.log(tour.transportType)
            transport.forEach(x => {
                if(x.id==tour.transportType){
                    price = price + parseFloat(x.price)
                }
            });
        }
        setPrice(price)
    }

  return (
    <div>
    {!added &&<>
        <hr/>
        <Row className='mb-1'>
        <Col md={5}> <p className='my-1'>No. of Adult</p> </Col>
        <Col className='mx-2'>
        <Select defaultValue="1" style={{ width: 110 }} value={adult} onChange={(e)=>calculatePrice(e, children, tranfer)}
            options={[
                { value: '1', label: '1'},
                { value: '2', label: '2'},
                { value: '3', label: '3'},
                { value: '4', label: '4'},
                { value: '5', label: '5'},
                { value: '6', label: '6'}
            ]}
        />
        </Col>
        </Row>
        <Row className='mb-1'>
        <Col md={5}> <p className='my-1'>No. of Child</p> </Col>
        <Col className='mx-2'>
        <Select defaultValue="1" style={{ width: 110 }} value={children} onChange={(e)=>calculatePrice(adult, e, tranfer)}
            options={[
                { value: '0', label: '0'},
                { value: '1', label: '1'},
                { value: '2', label: '2'},
                { value: '3', label: '3'},
                { value: '4', label: '4'},
                { value: '5', label: '5'},
                { value: '6', label: '6'}
            ]}
        />
        </Col>
        </Row>
        <Row className='mb-1'>
        <Col md={5}> <p className='my-1'>Infant</p> </Col>
        <Col className='mx-2'>
        <Select defaultValue="0" style={{ width: 110 }} value={infant} onChange={(e)=>setInfant(e)}
            options={[
                { value: '0', label: '0'},
                { value: '1', label: '1'},
            ]}
        />
        </Col>
        </Row>
        <Row className='mb-1'>
        <Col md={5}> <p className='my-1'>With Transfer</p> </Col>
        <Col className='mx-2'>
        <Select defaultValue="Yes" style={{ width: 110 }} value={tranfer} onChange={(e)=>calculatePrice(adult, children, e)}
            options={[
                { value: 'Yes', label: 'Yes'},
                { value: 'No', label: 'No'}
            ]}
        />
        </Col>
        </Row>
        <Row className='mb-1'>
            <Col md={5}> <p className='my-1'>Tour Date</p> </Col>
            <Col className='mx-2'>
                <Form.Control type="date" size='sm' style={{ width: 110 }} value={date} 
                onChange={(e)=>{
                    console.log(e.target.value)
                    setDate(e.target.value)
                }}
                 />
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col md={5}> <p className='my-1'>Total Price</p> </Col>
            <Col className='mx-2'><p className='cart-price'>{price} AED</p></Col>
        </Row>

        {(adult!=0&&date!="")&&
        <button className='cart-btn mt-5'
            onClick={()=>{
                let temp = [...cart];
                temp.push({tourId:tour.id, image:tour.main_image, name:tour.title, adults:adult, childs:children, infant:infant, transfer:tranfer, date:date, price:price })
                dispatch(addProduct(temp));
            }}
        >Add To Cart</button>
        }
    </>}
    {
        added&&
        <>
            <div className='already' style={{cursor:'pointer'}} onClick={()=>Router.push('/cart')}>
                Already Added To Cart
            </div>
        </>
    }
    </div>
  )
}

export default Book