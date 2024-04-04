import React, { useReducer, useEffect, useState } from 'react';
import { Card, Input, Select, Switch } from 'antd';
import { reducerFunctions, initialState } from './states';
import { Row, Col } from 'react-bootstrap';
import Router from 'next/router';

const TourCreation = ({productData, packageType}) => {

  const [state, dispatch] = useReducer(reducerFunctions, initialState);
  const { records } = state;
  const [ status, setStatus ] = useState(true)

  useEffect(() => {
    dispatch({
      type: 'field',
      fieldName: 'records',
      payload: productData.result
    });
  }, [])
    
  const onChange = (e) => {
    dispatch({
      type: 'field',
      fieldName: 'categorySearch',
      payload: e
    }); 
  }

  return (
  <>
    <Row>
      <Col className='' md={3}><h5>{!packageType?'Product':'Products'}</h5></Col>
      <Col>
      <Row className='pb-2'>
        {/* <Col md={1}></Col> */}
        <Col md={3} className='d-flex justify-content-end pt-1'>
          <div>Tours Status</div>
          <Switch className='mx-2 mt-1' checked={status} onChange={()=>setStatus(!status)} size='small' />
        </Col>
        <Col md={3}>
        <Select
          allowClear
          style={{width:'100%'}}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={onChange}
          options={[
            {value:'Theme Parks',  label:'Theme Parks' },
            {value:'Water Parks',  label:'Water Parks' },
            {value:'City Tours',   label:'City Tours'  },
            {value:'Luxury Tours', label:'Luxury Tours'},
            {value:'Adventure',    label:'Adventure'   },
          ]}
        />
        </Col>
          <Col md={4}>
          <Input value={state.search} placeholder="Search Packages"
            onChange={(e)=>dispatch({
              type: 'field',
              fieldName: 'search',
              payload: e.target.value
            })} />
          </Col>
          <Col md={2}>
            <button className='btn-custom mx-5' style={{float:'right'}} onClick={()=>Router.push(`/${packageType?'packageEditPage':'tourEditPage'}?id=new`)}>Create</button>
          </Col>
      </Row>
      </Col>
    </Row>
    <div style={{ maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
      <Row>
        {
        records.filter((x)=> {
          if(status){
            return x.status==1
          } else {
            return x.status!=1
          }
        } )
        .filter((x)=>{
          if(x.category.toLowerCase().includes(state.categorySearch?.toLowerCase())){
            return x
          }else if(state.categorySearch=="" || state.categorySearch==null){
            return x
          }
        }).filter((x)=>{
          if(x.title.toLowerCase().includes(state.search.toLowerCase())
            // || x.adult_price.toLowerCase().includes(state.search.toLowerCase())
          ){ return x }
          if(state.search==""){
            return x
          }
        })//.sort((secondItem, firstItem) => parseInt(firstItem.status) - parseInt(secondItem.status))
        .map((x, i)=>{
          return(
          <Col 
            md={3} 
            key={i} 
            className="my-3" 
            onClick={()=>Router.push(`/${packageType?'packageEditPage':'tourEditPage'}?id=${x.id}`)}
            style={{opacity:x.status!=1?0.5:1}}
          >
            <Card hoverable style={{ width: 240 }}
              cover={<img alt="example" style={{height:150, width:240}} src={x.main_image} />}
            >
              <Card.Meta title={x.title} />
              <p className='card-cntnt mt-2'>Tour Description Here..</p>
            </Card>
          </Col>
          )
        })}
      </Row>
    </div>
  </>
  );
}

export default React.memo(TourCreation)