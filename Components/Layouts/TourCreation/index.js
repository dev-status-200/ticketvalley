import React, { useReducer, useEffect } from 'react';
import { Modal, Card, Input } from 'antd';
import { reducerFunctions, initialState, baseValues } from './states';
import { Row, Col, Table } from 'react-bootstrap';
import CreateOrEdit from './CreateOrEdit';
import { EditOutlined } from '@ant-design/icons';

export default function TourCreation({productData}) {

  const [state, dispatch] = useReducer(reducerFunctions, initialState);
  const { records, visible, edit } = state;

  useEffect(() => {
    console.log(productData)
      dispatch({
        type: 'field',
        fieldName: 'records',
        payload: productData.result
      });
  }, [])
  
  return (
    <div className=''>
      <Row>
        <Col className='py-3' md={3}><h5>Product</h5></Col>
        <Col>
        <Row >
          <Col md={4}></Col>
            <Col md={4}>
            <Input value={state.search} placeholder="Search Packages"
            onChange={(e)=>dispatch({
              type: 'field',
              fieldName: 'search',
              payload: e.target.value
            })} />
            </Col>
            <Col md={2}>
              <button className='btn-custom mx-5' style={{float:'right'}} onClick={()=>dispatch({type:'create'})}>Create</button>
            </Col>
        </Row>
        </Col>
      </Row>
      <div style={{ maxHeight:"70vh", overflowY:'auto', overflowX:'hidden'}}>
        <Row>
          {
          records.filter((x)=>{
            if(
              x.title.toLowerCase().includes(state.search.toLowerCase())||
              x.adult_price.toLowerCase().includes(state.search.toLowerCase())||
              x.tour_detail.toLowerCase().includes(state.search.toLowerCase())
            ){
              return x
            }
            if(state.search==""){
              return x
            }
          }).map((x, i)=>{
            return(
            <Col md={3} className="my-3" key={i} onClick={()=>{
              dispatch({type:'edit', payload:x})
            }}>
            <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" style={{height:150, width:240}} src={x.main_image} />}
              >
                <Card.Meta title={x.title} />
                <p className='card-cntnt mt-2'>{x.tour_detail.slice(0,65)} .....</p>
              </Card>
            </Col>
            )
          })}
        </Row>
      </div>
      
      <Modal
        centered
        open={visible}
        onOk={() => dispatch({type: 'modalOff'}) }
        onCancel={() => dispatch({type: 'modalOff'}) }
        width={1000}
        footer={[]}
      >
        {!state.bulk && <CreateOrEdit state={state} dispatch={dispatch} baseValues={baseValues} />}
      </Modal>
    </div>
  );
}