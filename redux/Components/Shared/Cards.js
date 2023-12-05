import React from 'react';
import { Rate,Card } from 'antd';
import { useRouter } from 'next/router';

const Cards = (props) => {
  const router = useRouter();
  return (
    <Card
        hoverable
        style={{ width: 340 }}
        cover={<img alt="Tour" src={props.image} style={{height:200}}  />}
    >
        <div>
            <h5 className='fw-600'>
              {props.title.slice(0, 28)}
              {props.title.length>28?"...":""}
            </h5>
            <Rate allowHalf defaultValue={4.5} />
            <div className=''> <span className='gold fs-18'>(10 reviews)</span></div>
              <div style={{float:'left'}}>
                <button className='mt-3 cart-btn'
                  onClick={()=>{
                    router.push({ pathname:'/product', query:{ id: props.id }})
                  }}
                >Book Now</button>
              </div>
              <div style={{float:'right'}}>
                Starting From
                <div className='fs-25 fw-700'>{props.price}</div>
              </div>
        </div>
    </Card>
  )
}

export default React.memo(Cards)