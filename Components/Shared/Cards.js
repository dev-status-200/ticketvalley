import React from 'react';
import { Rate,Card } from 'antd';
const { Meta } = Card;

const Cards = (props) => {
  return (
    <Card
        hoverable
        style={{ width: 340 }}
        cover={<img alt="example" src={props.image} style={{height:200}} />}
    >
        <div>
            <h4 className=' fw-700'>{props.title}</h4>
            <Rate allowHalf defaultValue={4.5} />
            <div className=''> <span className='gold fs-18'>(10 reviews)</span></div>
            <div style={{float:'right'}}>
                Starting From
                <div className='fs-25 fw-700'>{props.price}</div>
            </div>
        </div>
    </Card>
  )
}

export default Cards