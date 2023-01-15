import React, { useEffect } from 'react';
import { useForm, useWatch, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputComp from '../../Shared/Form/InputComp';
import { Row, Col, Spinner } from 'react-bootstrap';
import axios from "axios";

const SignupSchema = yup.object().shape({
    name: yup.string().required('Required'),
    price: yup.string().required('Required'),
});

const CreateOrEdit = ({state, dispatch, baseValues}) => {
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema),
        defaultValues:state.values
    });

    useEffect(() => {
        let tempState = {...state.selectedRecord};
        if(state.edit){
            console.log(tempState)
            reset(tempState); 
        }
        if(!state.edit){ reset(baseValues) }
    }, [state.selectedRecord])

    const onSubmit = async(data) => {
        dispatch({type:'toggle', fieldName:'load', payload:true});
        setTimeout(async() => {
            await axios.post(process.env.NEXT_PUBLIC_CREATE_TRANSPORT, data).then((x)=>{
                console.log(x.data)
                if(x.data.status=='success'){
                    let tempRecords = [...state.records];
                    tempRecords.unshift(x.data.result);
                    console.log(x.data.result)
                    dispatch({type:'toggle', fieldName:'records', payload:tempRecords});
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
            await axios.post(process.env.NEXT_PUBLIC_CLIMAX_POST_EDIT_CLIENT, data).then((x)=>{
                if(x.data.status=='success'){
                    let tempRecords = [...state.records];
                    let i = tempRecords.findIndex((y=>data.id==y.id));
                    tempRecords[i] = x.data.result;
                    dispatch({type:'toggle', fieldName:'records', payload:tempRecords});
                    dispatch({type:'modalOff'});
                    reset(baseValues)
                    //openNotification('Success', `Client ${data.name} Updated!`, 'green')
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
        <form onSubmit={handleSubmit(state.edit?onEdit:onSubmit, onError)}>
        <Row>
            <Col md={6} className='py-1'>
                <InputComp  register={register} name='name' control={control} label='Name' />
                {errors.name && <div className='error-line'>{errors.name.message}*</div>}
            </Col>
            <Col md={6} className='py-1'>
                <InputComp  register={register} name='price' control={control} label='Price' />
                {errors.price && <div className='error-line'>{errors.price.message}*</div>}
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