import React, { useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import {CloseCircleOutlined} from '@ant-design/icons'

const ImageUpload = ({state, setValues, dispatch}) => {

  return (
    <div style={{minHeight:542}}>
    <Row>
      <Col md={12}>
          <p className=''><strong>Upload Cover Image</strong></p>
          {!state.main_image &&<>{state.edit && <img src={state.selectedRecord.main_image} className="mb-2" height={120} alt="Tour" />}<br/></>}
          <input type="file" 
          onChange={(e) => {
              setValues(e.target.files[0], 'main_image')
              setValues(URL.createObjectURL(e.target.files[0]), 'show_image')
          }} //required
          ></input>
          <br/>
          {state.show_image!="" &&
          <div style={{border:'1px solid grey', textAlign:'center', paddingTop:10, paddingBottom:10}}>
              <img src={state.show_image} height={120} alt="Image" />
          </div>
          }
      </Col>
      <hr className='mt-3' />
      {state.edit &&
        <Col md={12}>
        <Row>
            {state.prev_images.map((x, i)=>{
                return(
                <Col md={3} onClick={()=>{
                    let tempDeleteList = [...state.deleted_images];
                    let tempImageList = [...state.prev_images];
                    tempDeleteList.push(x)
                    tempImageList.splice(i,1);
                    dispatch({ type: 'field', fieldName: 'deleted_images', payload: tempDeleteList })
                    dispatch({ type: 'field', fieldName: 'prev_images', payload: tempImageList })
                }}>
                    <div className='img-box'>
                        <CloseCircleOutlined className="img-cross" />
                        <img src={x} height={100} width={200} alt="Tour" />
                    </div>
                </Col>
                )
            })}
        </Row>
        </Col>
      }

      <Col md={12}>
          <p className=''><strong>Upload More Images</strong></p>
          <input type="file" 
          onChange={(e) => {
              setValues(e.target.files, 'more_images')
              let tempUrls = []
              for(let i = 0; i<e.target.files.length; i++){
                  tempUrls.push(URL.createObjectURL(e.target.files[i]))
              }
              setValues(tempUrls, 'show_images')
          }}   multiple //required
          ></input>
          <br/>
          {state.show_images.length>0 &&
          <div style={{border:'1px solid grey', textAlign:'center'}}>
              {state.show_images.length>0 &&
                  state.show_images.map((x, i)=>{
                      return(
                          <img src={x} height={100} className="m-1 " alt="Image" />
                      )
                  })
              }
          </div>
          }
      </Col>
      </Row>
    </div>
  )
}

export default ImageUpload
