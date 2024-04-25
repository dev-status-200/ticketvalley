import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { Button } from "antd"
import exportFromJSON from 'export-from-json';
import { openNotification } from "/Components/Shared/Notification"

const AssignedHistory = ({from, to}) => {
// /NEXT_PUBLIC_GET_FULL_INVENTORY

    const getHistpry = async() => {
        await axios.get(process.env.NEXT_PUBLIC_GET_ASSIGNED_CODES,{
            headers:{
                from:from, to:to
            }
        })
        .then((x)=>{
            if(x.data.result.length>0){
                const fileName = 'Assigned Tickets';
                const exportType = 'csv';
                const data = x.data.result.map((x)=>{
                    return {
                        Codes:x.codes,
                        'Tour Name':x.tourOptName,
                        'Customer Name':x['BookedTour.Reservation.name'],
                        Email:x['BookedTour.Reservation.email'],
                        'Assigned Date':moment(x.updatedAt).format("YYYY-MMM-DD")
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
        Assigned Tickets <DownloadOutlined className='mx-2' />
    </button>
    </>
  )
}

export default React.memo(AssignedHistory)