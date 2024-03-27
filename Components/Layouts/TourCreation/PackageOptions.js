import React from 'react';
import { Row, Col } from 'react-bootstrap';
import InputComp from '../../Shared/Form/InputComp';
import InputNum from '../../Shared/Form/InputNumComp';
import SelectComp from '../../Shared/Form/SelectComp';
import InputAreaComp from '../../Shared/Form/InputAreaComp';
import { Input } from 'antd';
import { CloseCircleOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';

const PackageOptions = ({register, control, state, setValues, dispatch}) => {

  const inclusionList = [
    {name:'transport', src:'package-icons/transport@2x.png'},
    {name:'food', src:'package-icons/lunch@2x.png'},
    {name:'plane', src:'package-icons/plane@2x.png'},
    {name:'hotel', src:'package-icons/hotel@2x.png'},
    {name:'potography', src:'package-icons/photography@2x.png'},
  ];

  const set = (value) => {
    dispatch({
      type: 'set',
      payload: value
    })
  };

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

  const ValueDownshift = (variable, arr, i) => {
    let tempState = [...arr];
    if(i==tempState.length-1 && arr.length>0){
      let firstValue = tempState[0]
      tempState[0] = tempState[tempState.length-1]
      tempState[tempState.length-1] = firstValue;
      dispatch({ type: 'field', fieldName:variable, payload: tempState })
    } else {
      let bottomValue = tempState[i+1]
      tempState[i+1] = tempState[i]
      tempState[i] = bottomValue;
      dispatch({ type: 'field', fieldName:variable, payload: tempState })
    }
  }

  return(
    <Row>
      <Col md={5}>
        <Row>
          <Col className='' md={12}>
          <InputAreaComp register={register} name='packageDescription' control={control} label='Travel Desciption*' width={"100%"} />
          </Col>
          <Col className='' md={4}>
            <InputNum register={register} name='packageTravel' control={control} label='Total Days*' width={"100%"} />
          </Col>
          <Col className='' md={4}>
            <InputNum register={register} name='packageCountry' control={control} label='Total Countries*' width={"100%"} />
          </Col>
          <Col className='' md={4}>
            <InputNum register={register} name='packageCity' control={control} label='Total Cities*' width={"100%"} />
          </Col>
          <Row>
            <div className='mt-4'><b>Select Inclusions</b></div>
            {inclusionList.map((x)=>{
              return(
                <Col md={'auto'} key={x.name} 
                  onClick={()=>{
                    // console.log(x.name);
                    let obj = {...state.packageIncludes}
                    obj[x.name] = obj[x.name]==1?0:1;
                    set({ packageIncludes:obj })
                  }}
                  style={{
                    border:state.packageIncludes[x.name]==1?'2px solid green':'2px solid silver',
                    opacity:state.packageIncludes[x.name]==1?1:0.5,
                    height:52, height:56, 
                    borderRadius:100, 
                    cursor:'pointer',
                    padding:2, 
                    margin:10,
                  }}
                >
                  <img src={x.src} height={50} width={50} />
                </Col>
              )
            })}
          </Row>
        </Row>
      </Col>
      <Col className='px-4'>
        <div className='mt-4'>Per Day Detail</div>
        <Row>
        <Col md={9}>
        <Input className='mb-2' placeholder="Type Package Detail" value={state.packageDay} 
          onChange={(e)=>setValues(e.target.value,'packageDay')} 
        />
        </Col>
          <Col md={3}>
          <div className='btn-custom text-center'
            onClick={()=>{
            if(state.packageDay!=""){
              let tempState = [...state.packageDetail];
              tempState.push(state.packageDay)
              dispatch({type: 'field', fieldName:'packageDetail', payload: tempState })
              setValues("",'packageDay')
            }}}
          >Add</div>
          </Col>
        </Row>
        {state.packageDetail.map((x, i)=>{
          return(
          <Row key={i} className='my-2'>
            <Col md={"auto"}>
              <UpCircleOutlined className='row-hov' onClick={()=>ValueUpshift('packageDetail', state.packageDetail, i)} />
              <br/>
              <DownCircleOutlined className='row-hov' onClick={()=>ValueDownshift('packageDetail', state.packageDetail, i)} />
            </Col>
            <Col md={10} className='list-items'>{x}</Col>
            <Col md={1}>
                <CloseCircleOutlined className='cross-icon' 
                onClick={()=>{
                    let tempState = [...state.packageDetail];
                    tempState.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'packageDetail', payload: tempState })
                }}/>
            </Col>
          </Row>
        )})}
      </Col>
    </Row>
  )
}

export default React.memo(PackageOptions)