import React, { useEffect } from 'react';
import { Input, Select } from 'antd';
import { Row, Col } from 'react-bootstrap';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { MdPlace } from "react-icons/md";

const MoreInfo = ({state, dispatchReducer, addToCart}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        addToCart()
    }

  return (
    <div className='p-3'>
        <h6>Lead Passenger Details <span style={{color:"red"}}>*</span></h6>
        <hr/>
        <form onSubmit={handleSubmit}>
            <Row>
                <Col md={2} className="mb-3">
                <Select defaultValue="Mr."style={{ width:"100%" }} value={state.title} 
                    onChange={(e)=>dispatchReducer({ type: 'field', fieldName: 'title', payload: e })}
                    options={[
                        { value: 'Mr.', label: 'Mr.' },
                        { value: 'Mrs.', label: 'Mrs.' },
                        { value: 'Ms.', label: 'Ms.' },
                    ]} />
                </Col>
                <Col md={4} className="mb-3">
                    <Input className='dark-placeholder' placeholder='First Name' required 
                        value={state.fName} 
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName: 'fName', payload: e.target.value })}
                    />
                </Col>
                <Col md={4} className="mb-3">
                    <Input className='dark-placeholder' placeholder='Last Name' required
                        value={state.lName} 
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName: 'lName', payload: e.target.value })}
                    />
                </Col>
                <Col md={4} className="mb-3">
                    <Input className='dark-placeholder' placeholder='Email' required 
                        value={state.email} 
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName: 'email', payload: e.target.value })}
                    />
                </Col>
                <Col md={4} className="mb-3">
                    <Input className='dark-placeholder' placeholder='Phone Number' required 
                        value={state.contact} 
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName: 'contact', payload: e.target.value })}
                    />
                </Col>
                <Col md={12} className="mb-3">
                    <Input.TextArea className='dark-placeholder' placeholder='Special Request'
                        value={state.specialReq} 
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName: 'specialReq', payload: e.target.value })}
                    />
                </Col>
            </Row>
            {state.transfer!="No" &&
            <>
            <h6>Pick Up Details <span style={{color:"red"}}>*</span></h6>
            <hr/>
            <Row>
                <Col className='mb-3'>
                <span className=''>
                Search & Select Your Address
                </span>
                    <GooglePlacesAutocomplete
                        apiKey="AIzaSyDNlNHouprfGHm_3mmfLutARQbIwuNamJk"
                        selectProps={{
                            onChange: (res)=> {console.log(res.label); dispatchReducer({ type: 'field', fieldName: 'address', payload: res.label })},
                            placeholder: 'Enter Address',
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
                <Col md={12}>
                    <Input className='dark-placeholder' placeholder='Additional Address Note'
                        value={state.additionalAddress} 
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName: 'additionalAddress', payload: e.target.value })}
                    />
                </Col>
            </Row>
            </>
            }
            <hr className='mt-4'/>
            {//((state.address!="" && state.transfer!="No") && state.fName!="" && state.email!="" && state.contact!="") &&
            (state.address!="" && state.fName!="" && state.email!="" && state.contact!="")?
            <><button className='cart-btn mt-3 px-5 fs-12'>Add To Cart</button></>:<></>
            }
            
            {(state.address=="" || state.fName=="" || state.email=="" || state.contact=="") &&
            <>
                <span style={{color:"silver"}}>Complete The Details To Proceed</span> <span style={{color:"red"}}>*</span>
            </>
            }
        </form>
    </div>
  )
}

export default MoreInfo