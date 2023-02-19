import React from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

const BookingInfo = ({state, dispatch}) => {

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
    <div className='p-3'>
        <h4>Booking Details</h4>
        <hr/>
        <Row>
            <Col md={6}>
            <h6>Booking Info</h6>
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
            </Col>
            <Col md={6}>
                <h6>Tours Info</h6>
                <Row>
                    {
                        state.selectedRecord.BookedTours.map((x, i)=>{
                            return(
                                <>
                                    <Col md={12} className='grey-txt tour-booking-list'>
                                        <span className='fw-500'>Name:</span> <span>{x.name}</span><br/>
                                        <span className='fw-500'>Adults:</span> <span>{x.adults}</span>
                                        <span className='mx-2'>
                                            <span className='fw-500'>Childs:</span> <span>{x.childs}</span>
                                        </span>
                                        <span className=''>
                                            <span className='fw-500 '>Infants:</span> <span>{x.infant}</span>
                                        </span>
                                        <br/>
                                        <span className=''>
                                            <span className='fw-500 '>Pickup:</span>
                                            <br/>
                                            <span>{x.address}</span>
                                        </span>
                                        <br/>
                                        <span className=''>
                                            <span className='fw-500 '>Date:</span>
                                            <span> {moment(x.date).format("DD/MM/YY")}</span>
                                        </span>
                                    </Col>
                                </>
                            )
                        })
                    }
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default BookingInfo