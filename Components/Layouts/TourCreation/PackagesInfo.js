import React, { useEffect } from 'react';
import { Input, InputNumber } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import InputComp from '../../Shared/Form/InputComp';
import InputAreaComp from '../../Shared/Form/InputAreaComp';

const PackagesInfo = ({register, control, state, setValues, dispatch}) => {
    //package:{ name:"", child_price:0.00, adult_price:0.00 },

    useEffect(() => {
        console.log(state.packages)
    }, [state.selectedRecord])
    

  return (
    <div style={{minHeight:542, maxHeight:542, overflowY:"auto", overflowX:"hidden"}}>

        <Row>
        <Col md={10}></Col>
        <Col md={2}>
        <div className='mt-2 btn-custom text-center'
            onClick={()=>{
                let tempState = [...state.packages];
                tempState.push({ id:"", name:"", child_price:0.00, adult_price:0.00, status:"1" , stock:"20"})
                dispatch({type: 'field', fieldName: 'packages', payload: tempState });
            }}>Add</div>
        </Col>
        </Row>
        {
        state.packages.map((x, i)=>{
            return(
            <Row key={i} className='m-2 p-3' style={{backgroundColor:x.status==0?"#d6d6d6":"#d3e2f3"}}>
            <Col md={4}>
                <div className='mt-2'>Package Name</div>    
                <Input className='mb-2' value={x.name} 
                    onChange={(e)=>{
                        let temp = [...state.packages]
                        temp[i].name = e.target.value;
                        setValues(temp,'packages');
                    }} 
                />
            </Col>
            <Col md={2}>
            <div className='mt-2'>Adult Price</div>   
                <InputNumber className='mb-2' value={x.adult_price} min="0" stringMode
                    onChange={(e) => {
                        let temp = [...state.packages];
                        temp[i].adult_price = e;
                        setValues(temp,'packages');
                    }} 
                />
            </Col>
            <Col md={2}>
                <div className='mt-2'>Child Price</div>   
                <InputNumber className='mb-2' value={x.child_price} min="0" stringMode
                    onChange={(e) => {
                        let temp = [...state.packages];
                        temp[i].child_price = e;
                        setValues(temp,'packages');
                    }} 
                />
            </Col>
            <Col md={3}>
                {x.id!="" && 
                <DeleteOutlined className='cross-icon mt-4' style={{fontSize:20}}
                    onClick={()=>{
                        let tempState = [...state.packages];
                        tempState[i].status=tempState[i].status=="1"?"0":"1";
                        dispatch({ type: 'field', fieldName: 'packages', payload: tempState })
                    }}/>
                }
            </Col>
            <Col md={1}>
            {x.id=="" && 
                <CloseCircleOutlined className='cross-icon mt-4' style={{fontSize:20}}
                onClick={()=>{
                    let tempState = [...state.packages];
                    tempState.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'packages', payload: tempState })
                }}/>
            }
            </Col>
            </Row>
            )
        })
        }
    </div>
  )
}

export default PackagesInfo