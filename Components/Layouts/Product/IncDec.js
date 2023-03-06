import React from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"

const IncDec = (props) => {
  return (
    <div className='text-center'>
    <span >{props.type.charAt(0).toUpperCase() + props.type.slice(1)}: </span>
        <span className='mx-1'>
        <PlusCircleOutlined className='inc-dec' 
            onClick={()=>{
                let temp = [...props.state.booking];
                temp[props.index][`${props.type}`] = temp[props.index][`${props.type}`]+1;
                console.log(temp)
                temp[props.index].price = temp[props.index].adult*temp[props.index].adult_price + temp[props.index].child*temp[props.index].child_price + temp[props.index].transportPrice
                props.dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
            }}
        />
            <div style={{width:30, display:'inline-block'}}>{" "}{props.count}{" "}</div>
        <MinusCircleOutlined className='inc-dec' 
            onClick={()=>{
                let temp = [...props.state.booking];
                if(props.type!="adult"){
                    temp[props.index][`${props.type}`]=temp[props.index][`${props.type}`]>1? temp[props.index][`${props.type}`]-1:0;
                }else{
                    temp[props.index][`${props.type}`]=temp[props.index][`${props.type}`]>2? temp[props.index][`${props.type}`]-1:1;
                }
                temp[props.index].price = temp[props.index].adult*temp[props.index].adult_price + temp[props.index].child*temp[props.index].child_price;
                props.dispatchReducer({type: 'field', fieldName:'booking', payload: temp});
            }}
        />
    </span>
    </div>
  )
}

export default IncDec