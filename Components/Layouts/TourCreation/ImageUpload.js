import React from 'react';
import {Row, Col} from 'react-bootstrap'

const ImageUpload = ({state, setValues}) => {
  return (
    <div>
        <Row>
        <Col md={12}>
            <input type="file" 
            onChange={(e) => {
                setValues(e.target.files[0], 'main_image')
                setValues(URL.createObjectURL(e.target.files[0]), 'show_image')
            }} required
            ></input>
            <br/>
            {state.show_image!="" &&
            <div style={{border:'1px solid grey', textAlign:'center', paddingTop:10, paddingBottom:10}}>
                <img src={state.show_image} height={300} />
            </div>
            }
        </Col>
        {/* <Col md={12}>
            <input type="file" 
            onChange={(e) => {
                setValues(e.target.files, 'more_images')
                let tempUrls = []
                for(let i = 0; i<e.target.files.length; i++){
                    tempUrls.push(URL.createObjectURL(e.target.files[i]))
                }
                console.log(tempUrls)
                setValues(tempUrls, 'show_images')
            }}  required multiple
            ></input>
            <br/>
            <div style={{border:'1px solid grey'}}>
                {state.show_images.length>0 &&
                    state.show_images.map((x, i)=>{
                        return(
                            <img src={x} height={100} />
                        )
                    })
                }
            </div>
        </Col> */}
        </Row>
    </div>
  )
}

export default ImageUpload