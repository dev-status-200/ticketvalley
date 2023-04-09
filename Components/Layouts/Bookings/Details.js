import React from 'react';
import { Row, Col } from "react-bootstrap";
import moment from 'moment';

const Details = ({state}) => {
    const showPromoInfo = (data) => {
        const val = JSON.parse(data)
        return(
            <div style={{color:'#d37945'}}>
                <span >{val.byPercentage==true?`${val.price}%`:`${val.price}`}</span>
                <span className='mx-2'>{"( "}{val.name}{" )"}</span>
            </div>
        )
    }
  return (
    <Row>
    <>
        <Col md={4} className='fw-500'>Name :</Col>
        <Col md={8} className=' grey-txt'>{state.selectedRecord.name}</Col>
    </>
    <>
        <Col md={4} className='fw-500'>Email :</Col>
        <Col md={8} className=' grey-txt'>{state.selectedRecord['email']}</Col>
    </>
    <>
        <Col md={4} className='fw-500'>Base Price :</Col>
        <Col md={8} className=' grey-txt'>{state.selectedRecord.base_price}.00 AED</Col>
    </>
    <>
        <Col md={4} className='fw-500'>Discount :</Col>
        <Col md={8} className=' grey-txt'>
            {state.selectedRecord.promo=='none'?'No':showPromoInfo(state.selectedRecord.promo)}
        </Col>
    </>
    <>
        <Col md={4} className='fw-500'>Final Price :</Col>
        <Col md={8} className=' grey-txt'>{state.selectedRecord.final_price} AED</Col>
    </>
    <>
        <Col md={4} className='fw-500'>Created At :</Col>
        <Col md={8} className=' grey-txt'>{moment(state.selectedRecord.createdAt).format("DD/MM/YY  hh:mm")}</Col>
    </>
    <>
        <Col md={4} className='fw-500'>Stripe PI :</Col>
        <Col md={8} className=' grey-txt'>{state.selectedRecord.payment_intent}</Col>
    </>
    <>
        <Col md={4} className='fw-500'>Cl Secret :</Col>
        <Col md={8} className=' grey-txt'>{state.selectedRecord.payment_intent_client_secret}</Col>
    </>
</Row>
  )
}

export default Details