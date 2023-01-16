import React from 'react';
import { Row, Col } from 'react-bootstrap';
import InputComp from '../../Shared/Form/InputComp';
import SelectComp from '../../Shared/Form/SelectComp';
import InputAreaComp from '../../Shared/Form/InputAreaComp';
import { Switch } from 'antd';

const DetailsTwo = ({register, control, state, setValues, dispatch}) => {
  return (
    <>
    <Row className=''><Col style={{maxWidth:100, color:"silver"}}>Basic Info</Col><Col><div><hr /></div></Col></Row>
    <Row>
    <Col className='px-4' md={5}>
        <InputComp  register={register} name='title' control={control} label='Title' />
    </Col>
    <Col className='px-4' md={2}>
        <SelectComp register={register} name='category' control={control} label='Category' width={"100%"}
          options={[  
            {id:'Best Selling', name:'Best Selling'},
            {id:'Adventure Tours', name:'Adventure Tours'},
            {id:'Combo Tours', name:'Combo Tours'},
        ]}/>
    </Col>
    <Col className='px-0 mx-4' md={1}>
        <InputComp  register={register} name='adult_price' control={control} label='Adult price' />
    </Col>
    <Col className='px-0' md={1}>
        <InputComp  register={register} name='child_price' control={control} label='Child Price' />
    </Col>
    <Col className='mx-1' md={1}>
        <InputComp  register={register} name='stock' control={control} label='Stock' />
    </Col>
    <Col className='mx-1 mt-3' md={1}>
        <Switch checked={state.status=="1"?true:false} onChange={()=>{
            dispatch({type:'field', fieldName:"status", payload:state.status=="1"?"0":"1"})
        }} />
    </Col>
    <Col className='px-4' md={10}>
        <InputAreaComp  register={register} name='tour_detail' control={control} label='Detail' />
    </Col>
    </Row>
    <Row className='mt-4'><Col style={{maxWidth:120, color:"silver"}}>Important Info</Col><Col><div><hr  /></div></Col></Row>
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

    <Col className='px-4' md={4}>
        <SelectComp register={register} name='transport' control={control} label='Transport' width={"100%"}
          options={[  
            {id:'Available', name:'Available'},
            {id:'Not Available', name:'Not Available'},
        ]}/>
    </Col>
    <Col className='px-4' md={4}>
        <SelectComp register={register} name='transportType' control={control} label='Select Transport type' width={"100%"}
          options={state.transportData}/>
    </Col>


    </Row>
    </>
  )
}

export default DetailsTwo