import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { DownloadOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';

const History = ({to, from}) => {

    const [load, setLoad] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([{title:"", TourOption:{Tour:{title:""}}}]);
    const getHistpry = async() => {
        setLoad(true);
        setVisible(true)
        await axios.get(process.env.NEXT_PUBLIC_GET_INVENTORY_HISTORY,{
            headers:{
                from:from, to:to
            }
        })
        .then((x)=>{
            setData(x.data.result);
            setLoad(false);
        })
    }

  return (
    <>
    <button className='flex btn-custom' onClick={()=>getHistpry()}>
        History <DownloadOutlined className='mx-2' />
    </button>
    <Modal
        centered
        open={visible}
        onOk={() => setVisible(false) }
        onCancel={() => setVisible(false) }
        width={700}
        footer={[]}
    >
    {visible && <>
        <div>
            <h5>Upload History</h5><hr/>
            {load && <div className='text-center py-5' > <Spinner className='my-5' /> </div>}
            {!load && 
            <div style={{maxHeight:500, overflowY:"auto"}}>
            {data.map((x, i)=>{
                return(
                    <div key={i} className='history-list'>
                        <div style={{float:'right'}} className={x.type!="Delete"?'stock-number':"delete-stoc-number"}>{x.stock}</div>
                        <div><b>By: {x.by}</b></div>
                        <div>Product {x.TourOption.Tour.title}</div> 
                        <span>Option: {x.TourOption.name}</span>
                        <div style={{float:'right'}} className='grey-txt-2 px-2 py-1'>
                            <div className='fs-12'>
                                {moment(x.createdAt).format("YYYY- MMM -DD")}
                                <span className='mx-1'></span>
                                {moment(x.createdAt).format("hh:mm:ss A" )}
                            </div>
                        </div>
                    </div>
                )})}
            </div>
            }
        </div>
    </>}
    </Modal>
    </>
  )
}

export default React.memo(History)