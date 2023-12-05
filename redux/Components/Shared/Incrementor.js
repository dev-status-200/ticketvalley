import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"

const Incrementor = ({value, field, dispatchReducer}) => {
  return (
    <Row>
        <Col md={3} className="text-center">
            <PlusCircleOutlined style={{position:"relative", bottom:2, color:'#4a9fe8'}}
                onClick={()=>{
                    dispatchReducer({
                        type: 'field',
                        fieldName: field,
                        payload: value+1
                      });
            }}/>
        </Col>
        <Col md={4} className="prevent-select text-center" style={{color:value==0?"silver":"black"}}>
            <strong>{value}</strong>
        </Col>
        <Col md={3} className="text-center" style={{position:"relative", bottom:2, color:"#4a9fe8"}}>
            <MinusCircleOutlined
                onClick={()=>{
                    if(value>0){
                        dispatchReducer({
                            type: 'field',
                            fieldName: field,
                            payload: value-1
                        });
                    }
            }} />
        </Col>
    </Row>
  )
}

export default React.memo(Incrementor)