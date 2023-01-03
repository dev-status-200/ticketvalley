import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'react-bootstrap';

const DetailsTwo = ({state, setValues}) => {
  return (
    <>
    <Row>
    <Col className='px-4' md={4}>
        <div>Price</div>
        <Input placeholder="Price" value={state.price} 
            onChange={(e)=>setValues(e.target.value,'price')} />
    </Col>

    <Col className='px-4' md={4}>
        <div>Availability</div>
        <Input placeholder="Availability" value={state.availability} 
            onChange={(e)=>setValues(e.target.value,'availability')} />
    </Col>

    <Col className='px-4' md={4}>
        <div>Duration</div>
        <Input placeholder="Duration" value={state.duration} 
            onChange={(e)=>setValues(e.target.value,'duration')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Time Slot</div>
        <Input placeholder="Time Slot" value={state.time_slot} 
            onChange={(e)=>setValues(e.target.value,'time_slot')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Transport</div>
        <Input placeholder="Transport" value={state.transport} 
            onChange={(e)=>setValues(e.target.value,'transport')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Confirmation</div>
        <Input placeholder="Confirmation" value={state.confirmation} 
            onChange={(e)=>setValues(e.target.value,'confirmation')} />
    </Col>
    
    <Col className='px-4' md={4}>
        <div className='mt-3'>Refund</div>
        <Input placeholder="Refund" value={state.refund} 
            onChange={(e)=>setValues(e.target.value,'refund')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Voucher Info</div>
        <Input placeholder="voucher" value={state.voucher} 
            onChange={(e)=>setValues(e.target.value,'voucher')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Lang Info</div>
        <Input placeholder="Lang" value={state.lang} 
            onChange={(e)=>setValues(e.target.value,'lang')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Departure Info</div>
        <Input placeholder="Departure Info" value={state.departure} 
            onChange={(e)=>setValues(e.target.value,'departure')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Reporting Info</div>
        <Input placeholder="Reporting Info" value={state.reporting} 
            onChange={(e)=>setValues(e.target.value,'reporting')} />
    </Col>

    <Col className='px-4' md={4}>
        <div className='mt-3'>Meals Info</div>
        <Input placeholder="Meals Info" value={state.meals} 
            onChange={(e)=>setValues(e.target.value,'meals')} />
    </Col>
    </Row>
    </>
  )
}

export default DetailsTwo