import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import InputComp from '../../Shared/Form/InputComp';
import SelectComp from '../../Shared/Form/SelectComp';
import InputAreaComp from '../../Shared/Form/InputAreaComp';
import { Switch } from 'antd';

const DetailsTwo = ({register, control, state, setValues, dispatch}) => {

  return (
    <div style={{minHeight:542}}>
    <Row className=''><Col style={{maxWidth:100, color:"silver"}}>Basic Info</Col><Col><div><hr /></div></Col></Row>
    <Row>
    <Col className='' md={4}>
        <InputComp  register={register} name='title' control={control} label='Title' />
    </Col>
    <Col className='' md={2}>
        <SelectComp register={register} name='city' control={control} label='City' width={"100%"}
          options={[
            {id:'Dubai City', name:'Dubai City'},
            {id:'Abu Dhabi',  name:'Abu Dhabi' },
        ]}/>
    </Col>
    <Col className='' md={2}>
        <SelectComp register={register} name='category' control={control} label='Sub Category' width={"100%"}
          options={[
            {id:'Theme Parks', name:'Theme Parks'},
            {id:'Water Parks', name:'Water Parks'},
            {id:'City Tours', name:'City Tours'},
            {id:'Luxury Tours', name:'Luxury Tours'},
            {id:'Adventure', name:'Adventure'},
        ]}/>
    </Col>
    <Col className='' md={3}>
        <SelectComp register={register} name='advCategory' control={control} label='Advanced Category' width={"100%"}
          options={[  
            {id:'Best Selling', name:'Best Selling'},
            {id:'Adventure Tours', name:'Adventure Tours'},
            {id:'Combo Tours', name:'Combo Tours'},
        ]}/>
    </Col>
    </Row>
    <Row>
    <Col className='px-0 mx-4' md={1}>
        <InputComp  register={register} name='prevPrice' control={control} label='Old price' />
    </Col>
    <Col className='mx-1 mt-3' md={1}>
        <div>Active</div>
        <Switch checked={state.status=="1"?true:false} onChange={()=>{
            dispatch({type:'field', fieldName:"status", payload:state.status=="1"?"0":"1"})
        }} />
    </Col>
    </Row>
    <Row>
    <Col className='px-4' md={12}>
        <InputAreaComp  register={register} name='tour_detail' control={control} label='Detail' />
    </Col>
    </Row>
    <Row>
    <Col className='px-4' md={4}>
        <InputComp  register={register} name='availability' control={control} label='Availability' />
    </Col>

    <Col className='px-4' md={4}>
        <InputComp  register={register} name='duration' control={control} label='Duration' />
    </Col>

    <Col className='px-4' md={4}>
        <InputComp  register={register} name='time_slot' control={control} label='Time Slot' />
    </Col>

    <Col className='px-4' md={4}>
        <InputComp  register={register} name='confirmation' control={control} label='Confirmation' />
    </Col>
    
    <Col className='px-4' md={4}>
        <SelectComp register={register} name='refund' control={control} label='Refund' width={"100%"}
          options={[  
            {id:'Yes', name:'Yes'},
            {id:'No', name:'No'},
        ]}/>
    </Col>

    <Col className='px-4' md={4}>
        <SelectComp register={register} name='voucher' control={control} label='Voucher' width={"100%"}
          options={[  
            {id:'Printed V-copy Accepted', name:'Printed V-copy Accepted'},
        ]}/>
    </Col>

    <Col className='px-4' md={4}>
        <InputComp  register={register} name='lang' control={control} label='Lang Info' />
    </Col>

    <Col className='px-4' md={4}>
        <InputComp  register={register} name='departure' control={control} label='Departure Info' />
    </Col>

    <Col className='px-4' md={4}>
        <InputComp  register={register} name='reporting' control={control} label='Reporting Info' />
    </Col>
    </Row>
    </div>
  )
}

export default DetailsTwo