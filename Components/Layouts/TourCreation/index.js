import React, { useReducer, useEffect } from 'react';
import { Modal } from 'antd';
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
        <Col><h5>Product</h5></Col>
        <Col><button className='custom-btn' style={{float:'right'}} onClick={()=>dispatch({type: 'create'})}>Create</button></Col>
      </Row>
      <div className='table-sm-1 mt-3'>
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
      </div>
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