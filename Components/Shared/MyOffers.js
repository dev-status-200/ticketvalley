import { Empty, Modal } from 'antd';
import { useState, useEffect } from 'react';
import {Row, Col, Spinner} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Loader from "/Components/Shared/Loader"

const MyOffers = (props) => {

  const [load, setLoad] = useState(false);
  const [list, setList] = useState([
    {Promo:{}}
  ]);

  useEffect(() => {
    setLoad(true);
    props.email?
    axios.get(process.env.NEXT_PUBLIC_GET_MY_PROMOS,{
      headers:{'email':props.email}
    }).then((x)=>{
      if(x.data.result?.MyOffers.length>0){
        setList(x.data.result.MyOffers)
      }
    }):null;
    setLoad(false);
  }, [])
  
  useEffect(() => {
    console.log(list)
  }, [list])

  return (
    <>
      {!load && <div className='my-offers'>
        {Object.keys(list[0].Promo).length>0 &&<>
        {list.map((x, i)=>{
            return(
            <div key={i}>
              {i!=0 && <hr/>}
            <div className="coupon" >
              {/* <img src="/w3images/hamburger.jpg" alt="Avatar" style="width:100%; height:10px" /> */}
              <div className="container wh-txt" style={{backgroundColor:"rgb(6, 150, 172)"}}>
                <Row>
                  <Col md={1} style={{paddingTop:12}}><img src={'/icons/voucher.png'} className='filter' height={40} /></Col>
                  <Col md={10} className='mx-3'>
                  <h3 className='mt-3'><b>{x.Promo.name}</b></h3> 
                  </Col>
                  <p>Copy & Paste the Code below in checkout section to recieve a discount</p>
                </Row>
              </div>
              <div className="p-3">
              <Row >
                <Col>Promo Code: <span className="promo">{x.Promo.code}</span></Col>
                <Col className="expire text-end">Expires: {moment(x.Promo.validity).format("MMM DD, yyyy")}</Col>
              </Row>
              </div>
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
export default MyOffers;