import React from 'react'
import { Empty, message } from 'antd';
import { useState, useEffect } from 'react';
import {Row, Col, Spinner} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Loader from "/Components/Shared/Loader";
import useWindowSize from '/functions/useWindowSize';
import copyToClipboard from '/functions/copyToClipBoard';

const MyOffers = (props) => {

  const size = useWindowSize();
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([
    {Promo:{}}
  ]);

  useEffect(() => {
    getOffers()
  }, [])
  
  async function getOffers(){
    setLoad(true);
    props.email?
    await axios.get(process.env.NEXT_PUBLIC_GET_MY_PROMOS,{
      headers:{'email':props.email}
    }).then((x)=>{
      if(x.data.result?.MyOffers.length>0){
        setList(x.data.result.MyOffers)
      }
    }):null;
    setLoad(false);
  }

  return (
    <>
      {!load && <div className='my-offers'>
        {Object.keys(list[0].Promo).length>0 &&<>
        {list.map((x, i)=>{
            return(
            <div key={i}>
              {i!=0 && <hr/>}
            <div className="coupon">
              <div className="container wh-txt" style={{backgroundColor:"rgb(6, 150, 172)"}}>
                <Row>
                  <Col md={1} xs={3} style={{paddingTop:12}}>
                    <img src={'/icons/voucher.png'} className='filter' height={size.width>500?40:30} alt='Voucher' />
                  </Col>
                  <Col md={10} xs={8} className={`${size.width>500?"mx-3":"mx-0 px-0"}`}>
                  <h3 className='mt-3'><b>{x.Promo.name}</b></h3> 
                  </Col>
                  <p>Click the code below to copy & paste in checkout section to recieve a discount</p>
                </Row>
              </div>
              <Row style={size.width>500?{}:{fontSize:11}} className="p-3">
                <Col className='cur'
                  onClick={async()=>{
                    await copyToClipboard(`${x.Promo.code}`);
                    message.success(`Promo Code Copied`)
                  }}
                >Promo Code: 
                <span className="promo"
                  
                >{x.Promo.code}</span>
                <div className='silver-txt mt-1'>{"("} Click To Copy {")"}</div>
                </Col>
                <Col className="expire text-end">Expires: {moment(x.Promo.validity).format("MMM DD, yyyy")}</Col>
              </Row>
            </div>
            </div>
            )
        })}
        </>}
        {Object.keys(list[0].Promo).length==0 &&
          <Empty description={
              <span>
                You have no offers
              </span>
            } 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
          }
      </div>}
      {load && <div className='text-center py-5'><Spinner/> <br/>Please Wait</div>}
    </>
  );
};
export default React.memo(MyOffers);