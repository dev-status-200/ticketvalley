import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'react-bootstrap';
import {CloseCircleOutlined} from '@ant-design/icons';

const DetailsOne = ({state, setValues, dispatch}) => {
  return (
    <>
    <Row>
    <Col className='px-4'>
        <div>Title</div>
        <Input placeholder="Title" value={state.title} 
            onChange={(e)=>setValues(e.target.value,'title')} 
        />

        <div className='mt-4'>Inclusions</div>
        <Row>
        <Col md={9}>
        <Input className='mb-2' placeholder="Type Inclusion" value={state.inclusion} 
            onChange={(e)=>setValues(e.target.value,'inclusion')} 
        />
        </Col>
        <Col md={3}>
        <div className='btn-custom text-center'
            onClick={()=>{
            if(state.inclusion!=""){
                let tempState = [...state.inclusions];
                tempState.push(state.inclusion)
                dispatch({type: 'field', fieldName: 'inclusions', payload: tempState })
                setValues("",'inclusion')
            }}}>Add</div>
        </Col>
        </Row>
        {
        state.inclusions.map((x, i)=>{
            return(
            <Row key={i} className='m-2'>
            <Col className='list-items'>{x}</Col>
            <Col md={1}>
                <CloseCircleOutlined className='cross-icon' 
                onClick={()=>{
                    let tempState = [...state.inclusions];
                    tempState.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'inclusions', payload: tempState })
                }}/>
            </Col>
            </Row>
            )
        })
        }
        <hr className='my-4' />
        <div className='mt-2'>Why Should Captions</div>
        <Row>
        <Col md={9}>
        <Input className='mb-2' placeholder="Type" value={state.why_should} 
            onChange={(e)=>setValues(e.target.value,'why_should')} 
        />
        </Col>
        <Col md={3}>
        <div className='btn-custom text-center'
            onClick={()=>{
            if(state.why_should!=""){
                let tempState = [...state.why_shoulds];
                tempState.push(state.why_should)
                dispatch({type: 'field', fieldName: 'why_shoulds', payload: tempState })
                setValues("",'why_should')
            }}}>Add</div>
        </Col>
        </Row>
        {
        state.why_shoulds.map((x, i)=>{
            return(
            <Row key={i} className='m-2'>
            <Col className='list-items'>{x}</Col>
            <Col md={1}>
                <CloseCircleOutlined className='cross-icon' 
                onClick={()=>{
                    let tempState = [...state.why_shoulds];
                    tempState.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'why_shoulds', payload: tempState })
                }}/>
            </Col>
            </Row>
            )
        })
        }
    </Col>
    <Col className='px-4'>
    <div className=''>Detail</div>
        <Input.TextArea placeholder="Detail" value={state.tour_detail} 
            onChange={(e)=>setValues(e.target.value,'tour_detail')} 
        />
        <div className='mt-4'>Important Information</div>
        <Row>
        <Col md={9}>
        <Input className='mb-2' placeholder="Type Imp info" value={state.imp_info} 
            onChange={(e)=>setValues(e.target.value,'imp_info')} 
        />
        </Col>
        <Col md={3}>
        <div className='btn-custom text-center'
            onClick={()=>{
            if(state.imp_info!=""){
                let tempState = [...state.imp_infos];
                tempState.push(state.imp_info)
                dispatch({type: 'field', fieldName: 'imp_infos', payload: tempState })
                setValues("",'imp_info')
            }}}>Add</div>
        </Col>
        </Row>
        {
        state.imp_infos.map((x, i)=>{
            return(
            <Row key={i} className='m-2'>
            <Col className='list-items'>{x}</Col>
            <Col md={1}>
                <CloseCircleOutlined className='cross-icon' 
                onClick={()=>{
                    let tempState = [...state.imp_infos];
                    tempState.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'imp_infos', payload: tempState })
                }}/>
            </Col>
            </Row>
            )
        })
        }
        <hr/>
        <div className='mt-4'>Booking Policy</div>
        <Row>
        <Col md={9}>
        <Input className='mb-2' placeholder="Type Booking Policy" value={state.policy} 
            onChange={(e)=>setValues(e.target.value,'policy')} 
        />
        </Col>
        <Col md={3}>
        <div className='btn-custom text-center'
            onClick={()=>{
            if(state.policy!=""){
                let tempState = [...state.policies];
                tempState.push(state.policy)
                dispatch({type: 'field', fieldName: 'policies', payload: tempState })
                setValues("",'policy')
            }}}>Add</div>
        </Col>
        </Row>
        {
        state.policies.map((x, i)=>{
            return(
            <Row key={i} className='m-2'>
            <Col className='list-items'>{x}</Col>
            <Col md={1}>
                <CloseCircleOutlined className='cross-icon' 
                onClick={()=>{
                    let tempState = [...state.policies];
                    tempState.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'policies', payload: tempState })
                }}/>
            </Col>
            </Row>
            )
        })
        }
    </Col>
    </Row>
    </>
  )
}

export default DetailsOne