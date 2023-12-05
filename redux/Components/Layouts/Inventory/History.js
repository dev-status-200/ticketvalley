import React, { useState } from 'react';
import axios from 'axios';
import { HistoryOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';

const History = () => {

    const [load, setLoad] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([{title:"", TourOption:{Tour:{title:""}}}]);
    const getHistpry = async() => {
        setLoad(true);
        setVisible(true)
        await axios.get(process.env.NEXT_PUBLIC_GET_INVENTORY_HISTORY)
        .then((x)=>{
            console.log(x.data);
            setData(x.data.result);
            setLoad(false);
        })
    }

  return (
    <>
        <HistoryOutlined style={{position:'relative', bottom:3, cursor:'pointer'}} onClick={()=>getHistpry()} />
        <Modal
            centered
            open={visible}
            onOk={() => setVisible(false) }
            onCancel={() => setVisible(false) }
            width={600}
            footer={[]}
        >
        {visible && <>
            <div>
                <h5>Upload History</h5><hr/>

                {load && <div className='text-center py-5' > <Spinner className='my-5' /> </div>}

                {!load && 
                <div style={{maxHeight:300, overflowY:"auto"}}>
                {data.map((x, i)=>{
                    return(
                        <div key={i} className='history-list'>
                            <div style={{float:'right'}} className='stock-number'>{x.stock}</div>
                            <div><b>By: {x.by}</b></div>
                            <div>Product {x.TourOption.Tour.title}</div> 
                            <span>Option: {x.TourOption.name}</span>
                            <div style={{float:'right'}} className='silver-txt px-2 py-1'>
                                <div className='fs-12'>
                                    {moment(x.createdAt).format("DD-MM-YYYY hh:mm:ss A" )}
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

export default History