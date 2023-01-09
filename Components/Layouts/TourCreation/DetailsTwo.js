import React from 'react';
import { Row, Col } from 'react-bootstrap';
import InputComp from '../../Shared/Form/InputComp';
import SelectComp from '../../Shared/Form/SelectComp';
import InputAreaComp from '../../Shared/Form/InputAreaComp';

const DetailsTwo = ({register, control, state, setValues, dispatch}) => {
  return (
    <>
    <Row>
    <Col className='px-4' md={4}>
        <InputComp  register={register} name='title' control={control} label='Title' />
    </Col>
    <Col className='px-4' md={8}>
        <InputAreaComp  register={register} name='detail' control={control} label='Detail' />
    </Col>
    <Col className='px-4' md={4}>
        <InputComp  register={register} name='adult_price' control={control} label='Adult price' />
    </Col>

    <Col className='px-4' md={4}>
        <InputComp  register={register} name='child_price' control={control} label='Child Price' />
    </Col>

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
        <SelectComp register={register} name='category' control={control} label='Category' width={"100%"}
          options={[  
            {id:'Best Selling', name:'Best Selling'},
            {id:'Adventure Tours', name:'Adventure Tours'},
            {id:'Combo Tours', name:'Combo Tours'},
        ]}/>
    </Col>
    </Row>
    </>
  )
}

export default DetailsTwo