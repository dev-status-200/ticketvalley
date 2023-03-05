import React, { useEffect, useState, useReducer } from 'react'
import { Select, Checkbox } from 'antd';
import { Row, Col } from 'react-bootstrap';
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
    address:"none",
    additionalAddress:"",
    timeslotindex:null,

    booking:[
        {id:"", tour:"", title:"", check:"", adult_price:0.00, child_price:0.00, adult:0, child:0, infant:0, transfer:"No", date:"", address:"", price:0.00}
    ]
};

const Book = ({tour, transport}) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.value);
    const conversion = useSelector((state) => state.currency.conversion);
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
        let tempBook = [];
        if(tour.TourOptions!=undefined){
            tour.TourOptions.forEach((x, i)=>{
                tempBook.push({id:x.id, tour:x.TourId, name:x.name, check:i==0?true:false, adult_price:parseFloat(x.adult_price), child_price:parseFloat(x.child_price), adult:1, child:0, infant:0, transfer:"No", date:new Date(), price:parseFloat(x.adult_price)})
            })
            dispatchReducer({ type: 'field', fieldName:'booking', payload: tempBook });
        }

        if(tour.dated){
            let tempDates = [];
            JSON.parse(tour.dates).forEach((x)=>{
                if(x.stock>0){ tempDates.push(new Date(`${x.date}`)) }
            });
            dispatchReducer({ type: 'field', fieldName:'dated', payload: tour.dated })
            dispatchReducer({ type: 'field', fieldName:'dates', payload: tempDates })
        }
        dispatchReducer({ type: 'field', fieldName:'timed', payload: tour.timed })
    }, [])

    const addToCart = async() => {
        await delay(100);
        let cartValues = {
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
        }
        saveCart(cartValues)
        let temp = [...cart];
        temp.push(cartValues)
        dispatch(addProduct(temp));
        dispatchReducer({ type: 'close' })
    }

  return (
    <div>
    {
        state.booking.map((x, i)=>{
            return(
            <div className='tour-opt mb-4 prevent-select' key={i}>
                <Row style={{color:x.check?"black":"silver"}}>
                    <Col style={{maxWidth:30}}
                    onClick={()=>{
                        let temp = [...state.booking];
                        temp[i].check = !temp[i].check
                        dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                    }}
                    >
                        <Checkbox className='mt-1' checked={x.check}/>
                    </Col>
                    <Col md={7}
                        onClick={()=>{
                            let temp = [...state.booking];
                            temp[i].check = !temp[i].check
                            dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                        }}
                    ><h5 >{x.name}</h5></Col>
                    <Col md={4}
                        onClick={()=>{
                            let temp = [...state.booking];
                            temp[i].check = !temp[i].check
                            dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                        }}
                    ><h5 className='text-end' style={{color:x.check?"#075ca2":"silver"}}>{x.price.toFixed(2)} AED</h5></Col>
                    <Col md={12}><hr className='my-2' /></Col>
                    <Col md={4}>
                        <IncDec type={"adult"} count={x.adult} index={i} state={state} dispatchReducer={dispatchReducer} />
                    </Col>
                    <Col md={4}>
                        <IncDec type={"child"} count={x.child} index={i} state={state} dispatchReducer={dispatchReducer} />
                    </Col>
                    <Col md={4}>
                        <IncDec type={"infant"} count={x.infant} index={i} state={state} dispatchReducer={dispatchReducer} />
                    </Col>
                    <Col className='mt-3 ' style={{ maxWidth:170, marginLeft:14}}>
                    <span>Transfer: </span>
                    {" "}
                    <Select defaultValue="Yes" value={x.transfer} 
                        onChange={(e)=>{
                            let temp = [...state.booking];
                            temp[i].transfer = e;
                            dispatchReducer({type: 'field', fieldName:'booking', payload: temp});

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
                            includeDates={state.dated?state.dates:false}
                            dateFormat="yyyy - MMM - dd"
                            /> 
                            </Col>
                        </Row>

                    </Col>
                    {x.transfer!="No" && <Col md={12}><hr className='my-2' /></Col> }
                    {x.transfer!="No" &&
                    <Col md={12} className="mt-1 px-4">
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk"
                            selectProps={{
                                onChange: (res)=> {
                                    console.log(res.label);
                                    let temp = [...state.booking];
                                    temp[i].address = res.label;
                                    dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                                    //dispatchReducer({ type: 'field', fieldName: 'address', payload: res.label })
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
                </Row>
            </div>
            )
        })
    }
    </div>
  )
}

export default Book