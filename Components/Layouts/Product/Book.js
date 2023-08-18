import React, { useEffect, useState, useReducer } from 'react'
import { Select, Checkbox, Input, message } from 'antd';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/cart/cartSlice';
import aos from "aos";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { saveCart } from '../../../functions/cartFunction';
import IncDec from './IncDec';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { MdPlace } from "react-icons/md";
import codes from "../../../JSONData/codes.json"
import { initialState, reducerFunctions, setTour, validateName, validateDate, ValidateEmail } from './states';

const Book = ({tour, transport, category, setOpen}) => {

    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const cart = useSelector((state) => state.cart.value);
    const conversion = useSelector((state) => state.currency.conversion);
    const [state, dispatchReducer] = useReducer(reducerFunctions, initialState);

    const [load, setLoad] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        aos.init({duration:300})
        setTour(tour, dispatchReducer, category);
    }, [])

    const showMessage = (msg) =>messageApi.info(msg);

    const addToCart = async() => {
        let notValidAddress = false
        state.booking.forEach((x)=>{
            if(x.transfer!="No" && x.address==""){
                notValidAddress = true
            }
        })
        if(notValidAddress){
            showMessage("Please Select Pick Up Location!");
            return
        }
        if(!validateDate(state.booking)){
            showMessage("Please Select A Valid Date Please!");
            return
        }
        if(!validateName(state.name.length)){
            showMessage("Enter A Valid Full Name !");
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
            if(x.check){ cartValues.options.push({...x, date:x.date.toString()}) }
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
        showMessage("Successfully Added To Cart!");
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

    useEffect(() => {
      console.log(state.booking)
    }, [state.booking])
    
  return (
    <>
    {contextHolder}
    <div>
        {!load && <>
        {state.booking.map((x, i)=>{
            return(
            <div className='tour-opt mb-2 prevent-select' key={i}>
            <Row style={{color:x.check?"black":"silver"}}>
                <Col style={{maxWidth:30}} 
                    onClick={()=>{
                        if(category!="Combo Tours"){
                            let temp = [...state.booking];
                            temp[i].check = !temp[i].check
                            dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                        }
                    }}
                >
                    <Checkbox className='' disabled={category=="Combo Tours"?true:false} checked={x.check}/>
                </Col>
                <Col md={7} className='cur' onClick={()=>{
                    if(category!="Combo Tours"){
                        let temp = [...state.booking];
                        temp[i].check = !temp[i].check
                        dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                    }
                }}>
                    <h6>{'#'+(i+1)+' '+x.name}</h6>
                </Col>
                <Col md={4} className='cur'
                    onClick={()=>{
                        if(category!="Combo Tours"){
                            let temp = [...state.booking];
                            temp[i].check = !temp[i].check
                            dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
                        }
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
                <span style={{marginRight:10}}>Transfer: </span>
                <Select defaultValue="Yes" value={x.transfer} style={{width:140}}
                    onChange={(e)=>{
                        let temp = [...state.booking];
                        temp[i].transfer = e;
                         // <- iF e==1? means no transfer option selected
                        // let temp = [...state.booking];
                        // temp[i].transfer = e;
                        // if(e=="Shared"){
                        //     temp[i].transportPrice = x.transport?0.00:parseFloat(transport[0].price)
                        // } else if(e=="Private"){ 
                        //     temp[i].transportPrice = parseFloat(transport[1].price);
                        // } else if(e=="No"){ 
                        //     temp[i].transportPrice = 0.00; 
                        // }
                        let tempAddress = "";
                        if(e!="1"){
                            transport.forEach((y)=>{
                                if(y.id==e){
                                    if(e=="845610848208257025"){
                                        temp[i].transportPrice = x.transport?0.00:parseFloat(y.price);
                                    }else{
                                        temp[i].transportPrice = parseFloat(y.price)
                                    }
                                }
                            })
                            tempAddress = "";
                        } else {
                            tempAddress = "none"
                            temp[i].transportPrice = 0.00; 
                        }
                        temp[i].price = temp[i].adult*temp[i].adult_price + temp[i].child*temp[i].child_price + temp[i].transportPrice;
                        dispatchReducer({type: 'set', payload:{booking:temp, address:tempAddress}});
                    }}
                    options={[{value:"1", label:"No", disabled:x.transport},...transport.filter((y)=>{if(y.status=="1"){return x}}).map((y)=>{  return { value:y.id, label:y.name } }) ]}
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
                {x.transport==true && <Col md={12} className='px-3 mt-1' style={{color:'silver'}}> {"("}Shared Transfer is included in ticket{")"} </Col>}
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
                {x.transfer!="No" &&
                <>
                    <Col md={12}><hr className='my-2' /></Col>
                    <Col md={12} className="mt-1 px-4">
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk"
                            selectProps={{
                                onChange: (res)=> {
                                    let temp = [...state.booking];
                                    temp[i].address = res.label;
                                    //console.log(temp[i].address)
                                    dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
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
                </>
                }
                </>
                }
            </Row>
            </div>
            )
        })}
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
                <Select  defaultValue="United Arab Emirates"
                    style={{width:"100%"}}
                    onChange={(e)=>{
                        let tempContact = ""
                        codes.forEach((x)=>{
                            if(x.value==e){
                                tempContact = x.code+" "
                                return
                            }
                        })
                        dispatchReducer({ type:'set', payload:{ code:e, contact:tempContact }})
                    }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                        ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())||
                        ((option?.code) ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={codes}
                />
                </Col>
                <Col md={1} className=' flag-box'>
                <span className={`fi fi-${state.code.toLowerCase()}`}></span>
                </Col>
                <Col md={6} className='mt-3'>
                    <Input placeholder='Contact No' value={state.contact}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'contact', payload: e.target.value })} 
                    />
                </Col>
                <Col md={12}><hr className='mt-4 mb-1'/></Col>
            </Row>
            <Row>
                <Col md={12}>{(state.booking.length>0 && oneSelected()) && <button className='cart-btn mt-3' onClick={addToCart}>Add To Cart</button>}</Col>
            </Row>
        </div>
        </>
        }
        {load && <div className='text-center py-5'> <Spinner className='mt-5' /><p className='mb-5'>Please wait...</p> </div>}
    </div>
    </>
  )
}
export default Book