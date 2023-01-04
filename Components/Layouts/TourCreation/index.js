import React, { useReducer, useEffect } from 'react';
import { Modal, Card, Input } from 'antd';
import { reducerFunctions, initialState } from './states';
import { Row, Col, Table } from 'react-bootstrap';
import CreateOrEdit from './CreateOrEdit';
import { EditOutlined } from '@ant-design/icons';

export default function TourCreation({productData}) {

  const [state, dispatch] = useReducer(reducerFunctions, initialState);
  const { records, visible, edit } = state;

  useEffect(() => {
      dispatch({
        type: 'field',
        fieldName: 'records',
        payload: productData.result
      })
  }, [])
  
  return (
    <div className=''>
      <Row>
        <Col className='py-3' md={3}><h5>Product</h5></Col>
        <Col>
        <Row >
          <Col md={6  }></Col>
            <Col md={4}>
            <Input value={state.search} placeholder="Search Packages"
            onChange={(e)=>dispatch({
              type: 'field',
              fieldName: 'search',
              payload: e.target.value
            })} />
            </Col>
            <Col md={2}>
              <button style={{float:'right'}} className='btn-custom' onClick={()=>dispatch({type: 'create'})}>Create</button>
            </Col>
        </Row>
        </Col>
      </Row>
      <Row>
        {records.filter((x)=>{
              if(
                x.title.toLowerCase().includes(state.search.toLowerCase())||
                x.price.toLowerCase().includes(state.search.toLowerCase())||
                x.tour_detail.toLowerCase().includes(state.search.toLowerCase())
              ){
                return x
              }
              if(state.search==""){
                return x
              }
            }).map((x, i)=>{
          return(
          <Col md={2} className="m-2">
          <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" style={{height:250, width:240}} src={x.main_image} />}
            >
              <Card.Meta title={x.title} description={x.tour_detail} />
              <div>AED. {x.price}</div>
            </Card>
          </Col>
          )
        })}
      </Row>
      {/* <div className='table-sm-1 mt-3'>
          <Table className='tableFixHead'>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Detail</th>
                      <th>Price</th>
                      <th>Refund</th>
                      <th>Modify</th>
                  </tr>
              </thead>
              <tbody>
                  {
                  records.map((x, index) => {
                  return (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{x.title}</td>
                          <td>{x.tour_detail}</td>
                          <td className='fw-700' style={{color:'green'}}>{x.price} AED</td>
                          <td>{x.refund}</td>
                          <td><EditOutlined className='edit-icon' onClick={()=>dispatch({type: 'edit', payload:x})} /></td>
                      </tr>
                  )
                  })
                  }
              </tbody>
          </Table>
      </div> */}
      <Modal
        title="Create A Product"
        open={visible}
        onOk={() => dispatch({type: 'modalOff'}) }
        onCancel={() => dispatch({type: 'modalOff'}) }
        width={1000}
        footer={[]}
      >
        <CreateOrEdit state={state} dispatch={dispatch} />
      </Modal>
    </div>
  );
}