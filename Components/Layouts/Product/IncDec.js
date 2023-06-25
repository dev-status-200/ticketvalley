import React from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"

const IncDec = (props) => {
  return (
    <div className='mx-1'>
    <span>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}: </span>
        <span className='text-center'>
        <b style={{
            paddingLeft:6,
            paddingRight:5
        }} className='inc-dec'
            onClick={()=>{
                let temp = [...props.state.booking];
                temp[props.index][`${props.type}`] = temp[props.index][`${props.type}`]+1;
                props.type!="infant"?
                temp[props.index].price = temp[props.index].adult*temp[props.index].adult_price + temp[props.index].child*temp[props.index].child_price + temp[props.index].transportPrice
                :null;
                props.dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
            }}
        ><span style={{position:'relative', bottom:1}}>+</span></b>
        <div style={{width:30, display:'inline-block'}}>{props.count}</div>
        <b style={{
            paddingLeft:7,
            paddingRight:7
        }} className='inc-dec'
            onClick={()=>{
                let temp = [...props.state.booking];
                if(props.type!="adult"){
                    temp[props.index][`${props.type}`]=temp[props.index][`${props.type}`]>1? temp[props.index][`${props.type}`]-1:0;
                }else{
                    temp[props.index][`${props.type}`]=temp[props.index][`${props.type}`]>2? temp[props.index][`${props.type}`]-1:1;
                }
                props.type!="infant"?
                temp[props.index].price = temp[props.index].adult*temp[props.index].adult_price + temp[props.index].child*temp[props.index].child_price + temp[props.index].transportPrice
                :null;
                props.dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
            }}
        ><span style={{position:'relative', bottom:1}}>--</span></b>
        </span>
    </div>
  )
}

export default IncDec