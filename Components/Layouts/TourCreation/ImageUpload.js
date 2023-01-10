import React, { useEffect } from 'react';
import {Row, Col} from 'react-bootstrap'

const ImageUpload = ({state, setValues}) => {

    useEffect(() => {
        console.log(state);
    }, [])

  return (
    <div>
    <Row>
      <Col md={12}>
        {!state.main_image &&<>
            {state.edit && <img src={state.selectedRecord.main_image} height={150} />}
        </>}
          <p className=''><strong>Upload Cover Image</strong></p>
          <input type="file" 
          onChange={(e) => {
              setValues(e.target.files[0], 'main_image')
              setValues(URL.createObjectURL(e.target.files[0]), 'show_image')
          }} //required
          ></input>
          <br/>
          {state.show_image!="" &&
          <div style={{border:'1px solid grey', textAlign:'center', paddingTop:10, paddingBottom:10}}>
              <img src={state.show_image} height={300} />
          </div>
          }
      </Col>
      <hr className='mt-3' />
      {!state.edit &&<Col md={12}>
          <p className=''><strong>Upload More Images</strong></p>
          <input type="file" 
          onChange={(e) => {
              setValues(e.target.files, 'more_images')
              let tempUrls = []
              for(let i = 0; i<e.target.files.length; i++){
                  tempUrls.push(URL.createObjectURL(e.target.files[i]))
              }
              console.log(tempUrls)
              setValues(tempUrls, 'show_images')
          }}   multiple //required
          ></input>
          <br/>
          {state.show_images.length>0 &&
          <div style={{border:'1px solid grey', textAlign:'center'}}>
              {state.show_images.length>0 &&
                  state.show_images.map((x, i)=>{
                      return(
                          <img src={x} height={100} className="m-1 " />
                      )
                  })
              }
          </div>
          }
      </Col>}
      </Row>
    </div>
  )
}

export default ImageUpload
