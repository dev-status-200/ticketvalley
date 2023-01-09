import React from 'react';
import {Row, Col} from 'react-bootstrap'

const ImageUpload = ({state, setValues}) => {
  return (
    <div>
        <Row>
        <Col md={12}>
            <p className=''><strong>Upload Cover Image</strong></p>
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
        <hr className='mt-3' />
        <Col md={12}>
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
            }}  required multiple
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
        </Col>
        </Row>
    </div>
  )
}

export default ImageUpload

/*

import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const App = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default App;

*/