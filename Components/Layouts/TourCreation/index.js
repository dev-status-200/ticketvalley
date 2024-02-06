import React, { useReducer, useEffect } from 'react';
import { Card, Input, Select } from 'antd';
import { reducerFunctions, initialState } from './states';
import { Row, Col } from 'react-bootstrap';
import Router from 'next/router';

const TourCreation = ({productData}) => {

  const [state, dispatch] = useReducer(reducerFunctions, initialState);
  const { records } = state;

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
      <Col className='' md={3}><h5>Product</h5></Col>
      <Col>
      <Row className='pb-2'>
        <Col md={2}></Col>
        <Col md={1}></Col>
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
            <button className='btn-custom mx-5' style={{float:'right'}} onClick={()=>Router.push(`/tourEditPage?id=new`)}>Create</button>
          </Col>
      </Row>
      </Col>
    </Row>
    <div style={{ maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
      <Row>
        {
        records.filter((x)=>{
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
        }).map((x, i)=>{
          return(
          <Col md={3} className="my-3" key={i} onClick={()=>Router.push(`/tourEditPage?id=${x.id}`)}>
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