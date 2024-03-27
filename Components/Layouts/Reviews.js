import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import moment from "moment";
import axios from "axios";
import { openNotification } from '../Shared/Notification';
import { FieldTimeOutlined } from '@ant-design/icons';
import Router from 'next/router';

const Reviews = ({reservationData}) => {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(reservationData.result);
  }, [])

  const sendRequest = async(data) => {
    await axios.post(process.env.NEXT_PUBLIC_POST_SEND_REVIEW,{id:data.id, email:data.BookedTour.Reservation.email, reserveId:data.BookedTour.Reservation.id})
    .then((x)=>{
      if(x.data.status=="success"){
        openNotification("Success", "Review Sent!", "green")
      } else {
        openNotification("Error", "Something Went Wrong!", "Orange")
      }
      Router.push(`/reviews`)
    })
  }

  const allowReview = async(id, allowed) => {
    await axios.post(process.env.NEXT_PUBLIC_POST_ALLOW_REVIEW,{id, allowed})
    .then((x) => {
      if(x.data.status=="success"){
        openNotification("Success", "Review Toggled!", "green")
      } else {
        openNotification("Error", "Something Went Wrong!", "Orange")
      }
      Router.push(`/reviews`)
    })
  }

  return (
    <div>
      <div className='table-sm-1' style={{maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>#</th>
            <th>Tout Name</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Rating</th>
            <th className='text-center'>Send</th>
            <th>Authorize</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
        {records.map((x, index) => {
        return (
        <tr key={index} className={`my-0 py-0 ${x.allowed=="1"?"bg-green":""} `}>
            <td className='fs-16' style={{maxWidth:1}}>
              {index+1}
            </td>
            <td style={{maxWidth:120}}>{x.tourOptName}</td>
            <td className='px-3'>
              <div><span className='silver-txt'>Name:</span> {x?.BookedTour?.Reservation?.name}</div>
              <div><span className='silver-txt'>Email:</span> {x?.BookedTour?.Reservation?.email}</div>
            </td>
            <td>
            {x.reviewed=="0"?
            <>
            {x.reviewsSent=="0"?
            <span style={{color:'silver'}}>No Invitations Sent</span>
            :x.reviewed=="0"?<span style={{color:'orange'}}>Review Pending...</span>:
            <span style={{color:'green'}}>{x.review}</span>
            }
            </>:
            <>
              <span style={{color:'green'}}>Review Received:</span>
              <div>" {x.review} "</div>
            </>
            }
            </td>
            <td>{x.rating}</td>
            <td>
              {moment().diff(moment(x.date)) >= 0?
              <div className='text-center'>
                {x.reviewed=="0"? <>
                {x.reviewsSent=="0"?
                  <button className='btn-custom-sm' onClick={()=>sendRequest(x)}>Send</button>:
                ''
                }
                </>:''}
            </div>
              :
              <div className='text-center'>
                <FieldTimeOutlined/>
              </div>
              }
            </td>
            <td>
              {x.reviewed=="1" && 
                <button 
                  className='btn-custom-sm mt-2' 
                  onClick={()=>allowReview(x.id, x.allowed=="1"?"0":"1")}
                  >{x.allowed=="1"?'Remove':'Allow'}
                </button>
              }
            </td>
            <td>{moment(x.date).format("DD-MMM-YYYY")}</td>
        </tr>
        )
        })}
        </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Reviews
