import React, { useEffect } from 'react';
import { useForm, useWatch, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputComp from '../../Shared/Form/InputComp';
import InputNumComp from '../../Shared/Form/InputNumComp';
import DateComp from '../../Shared/Form/DateComp';
import { Row, Col, Spinner } from 'react-bootstrap';
import axios from "axios";
import { Switch } from "antd";
import moment from "moment";
import Router from 'next/router';

const SignupSchema = yup.object().shape({
    name: yup.string().required('Required'),
    amount: yup.number().required('Required'),
    code: yup.string().required('Required'),
    validity: yup.date().required('Required'),
    stock: yup.number().required('Required'),
});

const CreateOrEdit = ({state, dispatch, baseValues}) => {
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema),
        defaultValues:state.values
    });

    useEffect(() => {
        let tempState = {...state.selectedRecord};
        if(state.edit){
            tempState = {
                ...tempState,
                validity:moment(tempState.validity)
            }
            dispatch({type:'toggle', fieldName:'status', payload:tempState.status});
            dispatch({type:'toggle', fieldName:'byPercentage', payload:tempState.byPercentage});
            reset(tempState); 
        }
        if(!state.edit){ reset(baseValues) }
    }, [state.selectedRecord])

    const onSubmit = async(data) => {
        dispatch({type:'toggle', fieldName:'load', payload:true});
        setTimeout(async() => {
            await axios.post(process.env.NEXT_PUBLIC_CREATE_PROMO, 
                {
                    ...data,
                    status:state.status,
                    byPercentage:state.byPercentage,
                }
            ).then((x)=>{
                if(x.data.status=='success'){
                    let tempRecords = [...state.records];
                    tempRecords.unshift(x.data.result);
                    dispatch({type:'toggle', fieldName:'records', payload:tempRecords});
                    dispatch({type:'toggle', fieldName:'byPercentage', payload:"0"});
                    dispatch({type:'modalOff'});
                    reset(baseValues)
                    //openNotification('Success', `Client ${x.data.result.name} Created!`, 'green')
                }else{
                    //openNotification('Error', `An Error occured Please Try Again!`, 'red')
                }
                dispatch({type:'toggle', fieldName:'load', payload:false});
            })
        }, 3000);
    };

    const onEdit = async(data) => {
        dispatch({type:'toggle', fieldName:'load', payload:true});
        setTimeout(async() => {
            await axios.post(process.env.NEXT_PUBLIC_EDIT_PROMO, 
                {
                    ...data,
                    status:state.status,
                    byPercentage:state.byPercentage,
                }
            ).then((x)=>{
                if(x.data.status=='success'){
                    //openNotification('Success', `Client ${data.name} Updated!`, 'green')
                    Router.push("/promos")
                } else { 
                    //openNotification('Error', `An Error occured Please Try Again!`, 'red') 
                }
                dispatch({type:'toggle', fieldName:'load', payload:false});
            })
        }, 3000);
    };

    const onError = (errors) => console.log(errors);

  return (
    <div className='client-styles' style={{maxHeight:720, overflowY:'auto', overflowX:'hidden'}}>
        <h6>{state.edit?'Edit':'Create'}</h6>
        <hr/>
        <form onSubmit={handleSubmit(state.edit?onEdit:onSubmit, onError)}>
        <Row>
            <Col md={4} className='py-1'>
                <InputComp  register={register} name='name' control={control} label='Promo Name' />
                {errors.name && <div className='error-line'>{errors.name.message}*</div>}
            </Col>
            <Col md={2} className='py-1'>
                <div className='mt-3'>By {"%"}</div>
                <Switch checked={state.byPercentage=="1"?true:false} onChange={()=>{
                    dispatch({type:'toggle', fieldName:"byPercentage", payload:state.byPercentage=="1"?"0":"1"})
                }} />
            </Col>
            <Col md={4} className='py-1'>
                <InputNumComp  register={register} name='amount' control={control} label='Price' />
                {errors.amount && <div className='error-line'>{errors.amount.message}*</div>}
            </Col>
            <Col md={2} className='py-1'>
                <div className='mt-3'>Active</div>
                <Switch checked={state.status=="1"?true:false} onChange={()=>{
                    dispatch({type:'toggle', fieldName:"status", payload:state.status=="1"?"0":"1"})
                }} />
            </Col>
            <Col md={4} className='py-1'>
                <InputComp  register={register} name='code' control={control} label='Promo Code' />
                {errors.code && <div className='error-line'>{errors.code.message}*</div>}
            </Col>
            <Col md={4} className='py-1'>
                <InputNumComp  register={register} name='stock' control={control} label='No. Stock' />
                {errors.stock && <div className='error-line'>{errors.stock.message}*</div>}
            </Col>
            <Col md={12} className='py-1'>
                <DateComp register={register} name='validity' control={control} label='Validity' />
                {errors.validity && <div className='error-line'>{errors.validity.message}*</div>}
            </Col>
        </Row>
        <hr/>
        <button type="submit" disabled={state.load?true:false} className='btn-custom'>
            {state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}
        </button>
        </form>
    </div>
  )
}

export default CreateOrEdit