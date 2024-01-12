import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoIosRemoveCircle } from "react-icons/io";

const ImageUpload = ({state, dispatch, id}) => {

  React.useEffect(() => {
    console.log(state.prev_images)
  }, [])
  
  
  return (
    <div style={{height:'65vh', overflowY:"auto", overflowX:"hidden"}}>
    <Row>
      <Col md={12}>
        <p className=''>
          <strong>Upload Cover Image</strong>
        </p>
        <input type="file" 
          onChange={(e) => {
            dispatch({ type: 'set', payload:{
              main_image:e.target.files[0],
              show_image:URL.createObjectURL(e.target.files[0])
            }})
          }}
        ></input>
        <br/>
        <div>
          <img src={state.show_image} height={180} alt="Image" className='mt-3' style={{borderRadius:15}} />
        </div>
      </Col>
      {id!='new' &&
        <Col md={12} className='mt-4'>
        <h6>Previous Images</h6>
        <Row className='px-2'>
          {state.prev_images.length>0 && state.prev_images.map((x, i)=>{
            return(
            <Col md={'auto'} className='mx-1' key={i}>
              <Row className='img-box'>
                <Col md={'auto'}>
                  <img src={x} height={100} style={{borderRadius:8}} alt="Tour" />
                </Col>
                <Col md={'auto'}>
                  <div className="img-cross text-center">
                  <IoIosRemoveCircle 
                    size={30}
                    onClick={()=>{
                      let tempDeleteList = [...state.deleted_images];
                      let tempImageList = [...state.prev_images];
                      tempDeleteList.push(x);
                      tempImageList.splice(i,1);
                      dispatch({ type: 'set', payload:{
                        prev_images:tempImageList,
                        deleted_images:tempDeleteList
                      }})
                    }}
                  />
                  <div className='fs-10'>Remove</div>
                  </div>
                </Col>
              </Row>
            </Col>
          )})}
          {(state.prev_images.length==0 && state.show_images.length==0) && <div className='silver-txt'>No Images uploaded yet to tour gallery</div>}
        </Row>
        </Col>
      }
      <hr className='mt-3' />
      <Col md={6}>
        <span className=''>
          <strong>Upload More Images</strong>
        </span>
        <br/>
        <input className='my-2' type="file"
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
        <>
        <Row style={{border:'1px solid silver', borderRadius:8}} className='mx-1'>
          {state.show_images.length>0 &&
          state.show_images.map((x, i)=> { 
            return (
            <Col key={i} md={"auto"} className='p-2'>
              <img src={x} height={80} className="" alt="Image" style={{borderRadius:8}} />
            </Col>
            )}
          )}
        </Row>
        </>
        }
      </Col>
    </Row>
  </div>
  )
}

export default React.memo(ImageUpload)