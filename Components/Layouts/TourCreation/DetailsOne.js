import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { CloseCircleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';

const DetailsOne = ({register, control, state, setValues, dispatch}) => {

    const ValueUpshift = (variable, arr, i) => {
        let tempState = [...arr];
        if(i==0 && arr.length>0){
            let lastValue = tempState[tempState.length-1]
            tempState[tempState.length-1] = tempState[0]
            tempState[0] = lastValue;
            dispatch({ type: 'field', fieldName:variable, payload: tempState })
        } else {
            let aboveValue = tempState[i-1]
            tempState[i-1] = tempState[i]
            tempState[i] = aboveValue;
            dispatch({ type: 'field', fieldName:variable, payload: tempState })
        }
    }

  return (
    <div style={{minHeight:542, maxHeight:542, overflowY:"auto", overflowX:"hidden"}}>
    <Row>
        <Col className='px-4'>
            <hr className='my-4' />
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
                <Row key={i} className='my-2'>
                    <Col md={1}><VerticalAlignTopOutlined onClick={()=>ValueUpshift('inclusions', state.inclusions, i)} /></Col>
                    <Col md={10} className='list-items'>{x}</Col>
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
                <Row key={i} className='my-2'>
                    <Col md={1}><VerticalAlignTopOutlined onClick={()=>ValueUpshift('why_shoulds', state.why_shoulds, i)} /></Col>
                    <Col md={10} className='list-items'>{x}</Col>
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
        <div className='mt-4'>Cancellation Policy</div>
        <Row>
            <Col md={9}>
            <Input className='mb-2' placeholder="Type Booking Policy" value={state.cancellation_policy} 
                onChange={(e)=>setValues(e.target.value,'cancellation_policy')} 
            />
            </Col>
            <Col md={3}>
                <div className='btn-custom text-center'
                    onClick={()=>{
                    if(state.cancellation_policy!=""){
                        let tempState = [...state.cancellation_polices];
                        tempState.push(state.cancellation_policy)
                        console.log(tempState)
                        dispatch({type: 'field', fieldName: 'cancellation_polices', payload: tempState });
                        setValues("",'cancellation_policy')
                    }}}>
                    Add
                </div>
            </Col>
        </Row>
        {
        state.cancellation_polices.map((x, i)=>{
            return(
            <Row key={i} className='my-2'>
                <Col md={1}><VerticalAlignTopOutlined onClick={()=>ValueUpshift('cancellation_polices', state.cancellation_polices, i)} /></Col>
                <Col className='list-items'>{x}</Col>
                <Col md={1}>
                    <CloseCircleOutlined className='cross-icon' 
                    onClick={()=>{
                        let tempState = [...state.cancellation_polices];
                        tempState.splice(i,1);
                        dispatch({ type: 'field', fieldName: 'cancellation_polices', payload: tempState })
                    }}/>
                </Col>
            </Row>
            )
        })
        }
        <hr className='my-4' />
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
            <Row key={i} className='my-2'>
                <Col md={1}><VerticalAlignTopOutlined  onClick={()=>ValueUpshift('imp_infos', state.imp_infos, i)} /></Col>
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
        <hr className='my-4' />
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
            <Row key={i} className='my-2'>
                <Col md={1}><VerticalAlignTopOutlined  onClick={()=>ValueUpshift('policies', state.policies, i)} /></Col>
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
    </div>
  )
}

export default DetailsOne