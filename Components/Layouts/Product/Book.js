import React, { useEffect, useState, useReducer } from 'react'
import { Select, Checkbox, Input } from 'antd';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/cart/cartSlice';
import Router from 'next/router';
import aos from "aos";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { saveCart } from '../../../functions/cartFunction';
import IncDec from './IncDec';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { MdPlace } from "react-icons/md";
import moment from "moment";
import openNotification from '../../Shared/Notification';

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
    added:false,
    visible:false,
    edit:false,

    title:"Mr.",
    name:"",
    email:"",
    contact:"",
    address:"none",

    booking:[
        {
            id:"", tour:"", title:"", check:"", adult_price:0.00, child_price:0.00, adult:0, child:0, infant:0, transfer:"No", transportPrice:0.00,
            date:"",  dated:false, dates:[], timed:false, timeSlots:[], timeSlot:'', address:"", price:0.00, name:"", email:"", contact:""
        }
    ]
};

const Book = ({tour, transport, setOpen}) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);
    const conversion = useSelector((state) => state.currency.conversion);
    const [state, dispatchReducer] = useReducer(reducerFunctions, initialState);

    const [added, setAdded] = useState(false);
    const [load, setLoad] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        aos.init({duration:300})
        let tempBook = [];
        if(tour.TourOptions!=undefined){
            tour.TourOptions.forEach((x, i)=>{
                let tempDates = [];
                    if(x.dated && x.dates.length>0){
                        x.dates.forEach((x)=>{
                            tempDates.push(new Date(`${x.date}`))
                        });
                    }
                    let tempTimes = [];
                    if(x.timed && x.timeSlots.length>0){
                        x.timeSlots.forEach((x)=>{
                            tempTimes.push({slot:moment(x.slot, "HH:mm:ss").format("hh:mm A")})
                        });
                    }
                    tempBook.push({
                        id:x.id, tour:x.TourId, name:x.name, check:i==0?true:false, adult_price:parseFloat(x.adult_price),
                        child_price:parseFloat(x.child_price), adult:1, child:0, infant:0, transfer:"No", 
                        date:'', dates:tempDates, dated:x.dated, timed:x.timed, timeSlots:tempTimes, timeSlot:tempTimes.length>0? tempTimes[0].slot:null,
                        price:parseFloat(x.adult_price), transportPrice:0.00, address:""
                    })
            })
            dispatchReducer({ type: 'field', fieldName:'booking', payload: tempBook });
        }
    }, [])
    
    function ValidateEmail(mail){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        openNotification("Error","You have entered an invalid email address!", "Orange")
        return (false)
    }

    const validateDate = (values) => {
        let result = true;
        values.forEach((x)=>{
            if(x.date=='' && x.check){
                result=false
            }
        })
        return result;
    }

    const validateName = () => {
        if (state.name.length>3)
        {
            return (true)
        }
        openNotification("Error","Enter A Valid Full Name !", "Orange")
        return (false)
    }

    const addToCart = async() => {
        if(!validateDate(state.booking)){
            openNotification("Error","Select A Valid Date Please !", "Orange")
            return
        }
        if(!ValidateEmail(state.email)){
            return
        }
        if(!validateName()){
            return
        }
        
        setLoad(true);
        await delay(500);
        let cartValues = {
            tourId:tour.id, image:tour.main_image, name:tour.title,
            customerTitle:state.title, customerName:state.name, customerContact:state.contact, customerEmail:state.email,
            options:[]
        }
        state.booking.forEach((x, i)=>{
            if(x.check){
                cartValues.options.push({...x, date:x.date.toString()})
            }
        })
        cartValues.options.forEach((x, i)=>{
            delete cartValues.options[i].dates;
            delete cartValues.options[i].timeSlots;
        })
        saveCart(cartValues);
        let temp = [...cart];
        temp.push(cartValues);
        dispatch(addProduct(temp));
        dispatchReducer({ type: 'close' })
        openNotification('Success', `Successfully Added To Cart!`, 'green')
        setLoad(false);
        setOpen(false)
        //console.log(cartValues);
    }

    const oneSelected = () => {
        let result = false;
        state.booking.forEach((x)=>{
            if(x.check){
                result = true;
            }
        })
        return result
    }

  return (
    <>
    <div>
        {!load && <>
        {
            state.booking.map((x, i)=>{
                return(
                <div className='tour-opt mb-2 prevent-select' key={i}>
                    <Row style={{color:x.check?"black":"silver"}}>
                        <Col style={{maxWidth:30}} 
                            onClick={()=>{
                                let temp = [...state.booking];
                                temp[i].check = !temp[i].check
                                dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                            }}
                        >
                            <Checkbox className='' checked={x.check}/>
                        </Col>
                        <Col md={7} className='cur' onClick={()=>{
                            let temp = [...state.booking];
                            temp[i].check = !temp[i].check
                            dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                        }}>
                            <h6>{'#'+(i+1)+' '+x.name}</h6>
                        </Col>
                        <Col md={4} className='cur'
                            onClick={()=>{
                                let temp = [...state.booking];
                                temp[i].check = !temp[i].check
                                dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                            }}>
                                <h6 className='text-end' style={{color:x.check?"#075ca2":"silver"}}>{x.price.toFixed(2)} AED</h6>
                        </Col>
                        {x.check &&
                        <>
                        <Col md={12}><hr className='mt-1' /></Col>
                        <Col md={4}>
                            <IncDec type={"adult"} count={x.adult} index={i} state={state} dispatchReducer={dispatchReducer} />
                        </Col>
                        <Col md={4}>
                            <IncDec type={"child"} count={x.child} index={i} state={state} dispatchReducer={dispatchReducer} />
                        </Col>
                        <Col md={4}>
                            <IncDec type={"infant"} count={x.infant} index={i} state={state} dispatchReducer={dispatchReducer} />
                        </Col>
                        <Col className='mt-3' style={{ maxWidth:230, marginLeft:4}}>
                        <span>Transfer: </span>
                        {" "}
                        <Select defaultValue="Yes" value={x.transfer} style={{width:100}}
                            onChange={(e)=>{
                                let temp = [...state.booking];
                                temp[i].transfer = e;

                                if(e=="Shared"){ 
                                    temp[i].transportPrice = parseFloat(transport[0].price);
                                } else if(e=="Private"){ 
                                    temp[i].transportPrice = parseFloat(transport[1].price);
                                } else if(e=="No"){ 
                                    temp[i].transportPrice = 0.00; 
                                }

                                temp[i].price = temp[i].adult*temp[i].adult_price + temp[i].child*temp[i].child_price + temp[i].transportPrice;
                                dispatchReducer({type: 'field', fieldName:'booking', payload: temp});

                                if(e=="No"){ 
                                    dispatchReducer({ type: 'field', fieldName: 'address', payload: "none" })
                                } else { 
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
                        <Col className='text-center mt-3' >
                            <Row>
                                <Col md={1} className='pt-1'><span>Date: </span> </Col>
                                <Col>
                                <DatePicker 
                                selected={x.date}
                                onChange={(date) => {
                                    let temp = [...state.booking];
                                    temp[i].date = date;
                                    dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                                }}
                                minDate={new Date()}
                                includeDates={x.dated?x.dates:false}
                                dateFormat="yyyy - MMM - dd"
                                /> 
                                </Col>
                            </Row>

                        </Col>
                        {x.timed &&<Col md={12} className='mt-2 mx-1' >
                        <div>Time Slots</div>
                        {
                         x.timeSlots.map((z, j)=>{
                            return(
                                <div key={j} className={`time-box ${x.timeSlot==z.slot?'selected-time-box':''}`} onClick={()=>{
                                    let temp = [...state.booking];
                                    temp[i].timeSlot = z.slot;
                                    dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                                }}>
                                    { z.slot}
                                </div>
                            )
                         })   
                        }
                        </Col>}
                        {x.transfer!="No" && <Col md={12}><hr className='my-2' /></Col> }
                        {x.transfer!="No" &&
                            <Col md={12} className="mt-1 px-4">
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk"
                                    selectProps={{
                                        onChange: (res)=> {
                                            let temp = [...state.booking];
                                            temp[i].address = res.label;
                                            //console.log(temp[i].address)
                                            dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                                            console.log(temp)
                                        },
                                        placeholder: 'Pick up Address',
                                        components : {
                                            IndicatorSeparator: () => null,
                                            DropdownIndicator: () => 
                                            <>
                                                <span className='mx-2' style={{color:'silver'}}>Powered By Google </span>
                                                <MdPlace style={{fontSize:20, position:'relative', bottom:0, right:5, color:'#4a9fe8'}} />
                                            </>
                                        },
                                    }}
                                />
                            </Col>
                        }
                        </>
                        }
                    </Row>
                </div>
                )
            })
        }
        <div>
            <Row className="px-1">
                <Col md={12} className='my-2 fs-16'><b>Lead Passenger Details</b></Col>
                <Col md={3}>
                    <Select style={{width:"100%"}} value={state.title}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'title', payload: e })}
                        options={[{value:"Mr.", label:"Mr."}, {value:"Ms.", label:"Ms."}, {value:"Mrs.", label:"Mrs."}]}
                    />
                </Col>
                <Col md={9}>
                    <Input placeholder='Full Name' value={state.name}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'name', payload: e.target.value })} 
                    />
                </Col>
                <Col md={5} className='mt-3'>
                    <Input placeholder='Contact No' value={state.contact}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'contact', payload: e.target.value })} 
                    />
                </Col>
                <Col md={7} className='mt-3'>
                    <Input placeholder='Email' value={state.email}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'email', payload: e.target.value })} 
                    />
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                {(state.booking.length>0 && oneSelected()) && <button className='cart-btn mt-3' onClick={addToCart}>Add To Cart</button>}
                </Col>
            </Row>
        </div>
        </>
        }
        {load && <div className='text-center py-5'> <Spinner className='mt-5' /><p className='mb-5'>Please wait...</p> </div>}
    </div>
    {/* {added && 
        <div>
            <h3 className='text-center'>Product Already Added!</h3>
            <button className='already-in-cart mt-3' onClick={()=>Router.push("/cart")}>Go To Cart</button>
        </div>
    } */}
    </>
  )
}

export default Book