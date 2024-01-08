import React, { useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import {CloseCircleOutlined} from '@ant-design/icons'

const ImageUpload = ({state, setValues, dispatch, id}) => {

  useEffect(() => {
    console.log(state.prev_images)
  }, [])
  
  return (
    <div style={{minHeight:542}}>
    <Row>
      <Col md={12}>
          <p className=''><strong>Upload Cover Image</strong></p>
          <input type="file" 
            onChange={(e) => {
              dispatch({ type: 'set', payload:{
                main_image:e.target.files[0],
                show_image:URL.createObjectURL(e.target.files[0])
              }})
            }} //required
          ></input>
          <br/>
          <div style={{border:'1px solid grey', textAlign:'center', paddingTop:10, paddingBottom:10}}>
            <img src={state.show_image} height={120} alt="Image" />
          </div>
      </Col>
      <hr className='mt-3' />
      {id!='new' &&
        <Col md={12}>
        <Row>
          {state.prev_images.map((x, i)=>{
            return(
            <Col md={2} onClick={()=>{
              let tempDeleteList = [...state.deleted_images];
              let tempImageList = [...state.prev_images];
              tempDeleteList.push(x);
              tempImageList.splice(i,1);
              dispatch({ type: 'set', payload:{
                prev_images:tempImageList,
                deleted_images:tempDeleteList
              }})
            }}>
              <div className='img-box'>
                <CloseCircleOutlined className="img-cross" />
                <img src={x} height={120} width={230} style={{borderRadius:8}} alt="Tour" />
              </div>
            </Col>
          )})}
        </Row>
        </Col>
      }
      <Col md={12}>
          <p className=''><strong>Upload More Images</strong></p>
          <input type="file"
            onChange={(e) => {
              let tempUrls = []
              for(let i = 0; i<e.target.files.length; i++){
                tempUrls.push(URL.createObjectURL(e.target.files[i]))
              }
              dispatch({ type: 'set', payload:{
                show_images:tempUrls,
                more_images:e.target.files
              }})
            }} multiple />
          <br/>
          {state.show_images.length>0 &&
          <div style={{border:'1px solid grey', textAlign:'center'}}>
            {state.show_images.length>0 &&
              state.show_images.map((x, i)=> { return <img src={x} height={100} className="m-1 " alt="Image" /> })
            }
          </div>
          }
      </Col>
      </Row>
    </div>
  )
}

export default ImageUpload
