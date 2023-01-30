import React, { useEffect, useState, useReducer } from 'react'
import { Select, Modal } from 'antd';
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/cart/cartSlice';
import Router from 'next/router';
import Incrementor from '../../Shared/Incrementor';
import aos from "aos";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import MoreInfo from './MoreInfo';

function reducerFunctions(state, action) {
    switch (action.type) {
      case 'field': {
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      }
      case 'open': {
        return {
          ...state,
          visible: true,
        };
      }
      case 'close': {
        return {
          ...state,
          visible: false,
        };
      }
      default:
        return state;
    }
}

const initialState = {
    load:false,
    price:0.0,
    adult:0,
    children:0,
    infant:0,
    transfer:"No",
    date:"",
    added:false,
    visible:false,
    edit:false,

    dated:false,
    dates:[],
    timed:false,
    timeSlot:"",

    title:"Mr.",
    fName:"",
    lName:"",
    email:"",
    contact:"",
    specialReq:"",
    address:"",
    additionalAddress:"",
    timeslotindex:null
};

const Book = ({tour, transport}) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);
    const [cartIndex, setCartIndex] = useState(0)
    const [state, dispatchReducer] = useReducer(reducerFunctions, initialState);

    const [added, setAdded] = useState(false);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        aos.init({duration:300})
        cart.forEach((x, i)=>{
            if(x.tourId==tour.id){
                setAdded(true);
                setCartIndex(i)
            }
        })
    }, [cart])

    useEffect(() => {
        let price = 0.0;
        price = price + state.adult*parseFloat(tour.adult_price)
        price = price + state.children*parseFloat(tour.child_price)
        if(state.transfer=="Shared"){
            price = price + 30.00
        }else if(state.transfer=="Private"){
            price = price + 90.00
        }
        price = price + state.children*parseInt(tour.child_price)
        dispatchReducer({ type: 'field', fieldName:'price', payload: price.toFixed(2) })
        console.log(price)
    }, [state.children, state.adult, state.transfer])

    useEffect(() => {
    
    if(tour.dated){
        let tempDates = [];
        
        JSON.parse(tour.dates).forEach((x)=>{
            if(x.stock>0){
                tempDates.push(new Date(`${x.date}`))
            }
        });
        dispatchReducer({ type: 'field', fieldName:'dated', payload: tour.dated })
        dispatchReducer({ type: 'field', fieldName:'dates', payload: tempDates })
    }

        dispatchReducer({ type: 'field', fieldName:'timed', payload: tour.timed })
    }, [])

    const addToCart = async() => {
        await delay(1000);
        let temp = [...cart];
        temp.push({
            tourId:tour.id, image:tour.main_image, name:tour.title,
            adults:state.adult, childs:state.children,
            infant:state.infant, transfer:state.transfer, 
            date:state.date, price:state.price,
            timeslot:tour.timed?state.timeSlot:"", 
            passenerInfo:{
                title:state.title, fName:state.fName, lName:state.lName,
                address:state.address, specialReq:state.specialReq,
                email:state.email, contact:state.contact, 
                additionalAddress:state.additionalAddress
            }
        })
        dispatch(addProduct(temp));
        dispatchReducer({ type: 'close' })
    }

  return (
    <div>
    {!added &&
    <>
        <hr/>
        <Row className='mb-1' >
        <Col md={5}> <p className='my-1'>No. of Adult</p> </Col>
        <Col className='mx-2'>
            <Incrementor value={state.adult} field={'adult'} dispatchReducer={dispatchReducer} />
        </Col>
        </Row>
        <Row className='mb-1'>
        <Col md={5}> <p className='my-1'>No. of Child</p> </Col>
        <Col className='mx-2'>
        <Incrementor value={state.children} field={'children'} dispatchReducer={dispatchReducer} />
        </Col>
        </Row>
        <Row className='mb-1'>
        <Col md={5}> <p className='my-1'>Infant</p> </Col>
        <Col className='mx-2'>
        <Incrementor value={state.infant} field={'infant'} dispatchReducer={dispatchReducer} />
        </Col>
        </Row>
        <Row className='mb-1'>
        <Col md={5}> <p className='my-1'>Transfer Opt.</p> </Col>
        <Col className='mx-2'>
        <Select defaultValue="Yes" style={{ width: "80%" }} value={state.transfer} 
            onChange={(e)=>{
                dispatchReducer({ type: 'field', fieldName: 'transfer', payload: e })
                if(e=="No"){
                    dispatchReducer({ type: 'field', fieldName: 'address', payload: "none" })
                }else{
                    dispatchReducer({ type: 'field', fieldName: 'address', payload: "" })
                }
            }}
            options={[
                { value: 'No', label: 'No'},
                { value: 'Shared', label: 'Shared'},
                { value: 'Private', label: 'Private'},
            ]}
        />
        </Col>
        </Row>
        <Row className='mb-1'>
            <Col md={5}> <p className='my-1'>Tour Date</p> </Col>
            <Col className='mx-2'>
            <DatePicker 
                selected={state.date} 
                onChange={(date) => dispatchReducer({ type: 'field', fieldName: 'date', payload:date })}
                minDate={new Date()}
                includeDates={state.dated?state.dates:false}
                dateFormat="yyyy - MMM - dd"
            />
            </Col>
        </Row>
        {tour.timed && 
        <Row className='mb-1'>
            <Col md={5}> <p className='my-1'>Timings</p> </Col>
            <Col className='mx-2'>
                <Row>
                    {
                    tour.timeSlots.split("//").map((x, i)=>{
                        return(
                            <Col md={5}>
                                <div className='time-slot text-center my-1'
                                style={{backgroundColor:state.timeslotindex==i?"#cd6937":null}}
                                onClick={()=>{
                                    console.log(i)
                                    dispatchReducer({ type: 'field', fieldName: 'timeslotindex', payload:i })
                                    dispatchReducer({ type: 'field', fieldName: 'timeSlot', payload:x })
                                }}
                                >
                                    {x}
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Col>
        </Row>}
        <hr/>
        <Row>
            <Col md={5}> <p className='my-1'>Total Price</p> </Col>
            <Col className='mx-2'><p className='cart-price'>{state.price} AED</p></Col>
        </Row>
        {(state.date && state.adult>0 && ( (tour.timed==true && state.timeSlot!="") || (tour.timed==false))) &&
            <button className='cart-btn mt-3 px-5 fs-17' onClick={()=>dispatchReducer({ type: 'open' })}>Book Now</button>
        }
    </>
    }
        {added&&
        <div data-aos="fade-up" className='already' style={{cursor:'pointer'}} onClick={()=>Router.push('/cart')}>
            Added To Cart
        </div>
        }

      <Modal open={state.visible} onOk={()=>dispatchReducer({ type: 'close' })} onCancel={()=>dispatchReducer({ type: 'close' })}
        width={800}
        maskClosable={false}
        footer={false}
      >
        <MoreInfo state={state} dispatchReducer={dispatchReducer} addToCart={addToCart} />
      </Modal>
    </div>
  )
}

export default Book