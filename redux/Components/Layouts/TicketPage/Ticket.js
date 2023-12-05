import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import QRCode from "react-qr-code";
import { MdShareLocation } from 'react-icons/md'

const Ticket = ({fetchedTicket, i}) => {

  return (
    <>
    {fetchedTicket && <div className={` ${i>0?"pt-5":""}`}>
        <div className='home-styles'>
        <div style={{height:1000, width:700}} className='mx-5 ticket-bg'>
            
            <QRCode style={{position:'relative', left:470, top:80}}
                value={fetchedTicket.code}
                scale={0.6} 
                size={180}
                level='Q'
                viewBox={`0 0 200 200`}
            />
            <div style={{position:'relative', left:470, top:85, width:180, textAlign:'center', fontSize:10}}><div>{fetchedTicket.code}</div></div>

            <div style={{position:'relative', left:60, top:150}}>
                <Row className='mt-4'>
                    <Col style={{maxWidth:300}}>
                        <div className='left-ticket-box'>
                            <div className='tictet-field mt-4'><MdShareLocation className='tictet-icon' color='yellow' /> Tour Name</div>
                            <div className='wh-txt fw-700' style={{paddingLeft:18}}>{fetchedTicket.title}</div>
                            <div className='ticket-line'></div>
                            <div className='tictet-field mt-2'><MdShareLocation className='tictet-icon' color='yellow' /> Customer Name</div>
                            <div className='wh-txt fw-700' style={{paddingLeft:18}}>{fetchedTicket.name}</div>
                            <div className='ticket-line'></div>
                            <div className='tictet-field mt-2'><MdShareLocation className='tictet-icon' color='yellow' /> Transfer</div>
                            <div className='wh-txt fw-700' style={{paddingLeft:18}}>{fetchedTicket.transfer}</div>
                            <div className='ticket-line'></div>
                            <div className='tictet-field mt-2'><MdShareLocation className='tictet-icon' color='yellow' /> Tour Date</div>
                            <div className='wh-txt fw-700' style={{paddingLeft:18}}>{fetchedTicket.date}</div>
                            <div className='ticket-line'></div>
                            <div className='tictet-field mt-2'><MdShareLocation className='tictet-icon' color='yellow' /> Time Slot</div>
                            <div className='wh-txt fw-700' style={{paddingLeft:18}}>{fetchedTicket.timeSlot==null?'Any':fetchedTicket.timeSlot}</div>
                            <div className='ticket-line'></div>
                        </div>
                    </Col>
                    <Col style={{maxWidth:300}}>
                        <div >
                            <img src={fetchedTicket.image} className='cropped ' alt="Tour" />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        </div>
    </div>}
    </>
  )
}

export default Ticket