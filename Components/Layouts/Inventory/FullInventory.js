import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { Button } from "antd"
import exportFromJSON from 'export-from-json';
import { openNotification } from "/Components/Shared/Notification"

const FullInventory = ({from, to}) => {
// /NEXT_PUBLIC_GET_FULL_INVENTORY

    const getHistpry = async() => {
        await axios.get(process.env.NEXT_PUBLIC_GET_FULL_INVENTORY,{
            headers:{
                from:from, to:to
            }
        })
        .then((x)=>{
            if(x.data.result.length>0){
                console.log(x.data)
                const fileName = 'Full Inventory';
                const exportType = 'csv';
                const data = x.data.result.map((x)=>{
                    return {
                        'Tour Name':x.TourOption.name,
                        Code:x.code,
                        PNR:x.pnr,
                        'Uploaded Date':moment(x.createdAt).format("YYYY-MMM-DD"),
                        'Used Date':moment(x.updatedAt).format("YYYY-MMM-DD"),
                        Status:x.used?'Used':'Un-used',
                    }
                })
                exportFromJSON({ data, fileName, exportType })
            } else {
                openNotification("Error", "No record exists in thess dates", 'orange')
            }
        })
    }

  return (
    <>
    <button className='flex btn-custom' onClick={()=>getHistpry()}>
        Full Inventory <DownloadOutlined className='mx-2' />
    </button>
    </>
  )
}

export default React.memo(FullInventory)