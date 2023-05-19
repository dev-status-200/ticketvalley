import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from "axios";
import moment from "moment"

const Reviews = ({reservationData}) => {

    const [records, setRecords] = useState([]);

    useEffect(() => {
      console.log(reservationData);
      setRecords(reservationData.result)
    }, [])

    const sendRequest = async(data) => {
        await axios.post(process.env.NEXT_PUBLIC_POST_SEND_REVIEW,data)
        .then((x)=>console.log(x))
    }

  return (
    <div>
            <div className='table-sm-1' style={{maxHeight:"60vh", overflowY:'auto', overflowX:'hidden'}}>
                <Table className='tableFixHead'>
                <tbody>
                {records.map((x, index) => {
                return (
                <tr key={index} className=' my-0 py-0'>
                    <td className='fs-16' style={{maxWidth:1}}>
                        {index+1}
                    </td>
                    <td className='fs-16' style={{maxWidth:20}}>
                    </td>
                    <td >{x.name}</td>
                    <td>
                    {x.reviewsSent=="0"?
                    <span style={{color:'silver'}}>No Invitations Sent</span>
                    :x.reviewed=="0"?<span style={{color:'yellow'}}>Review Pending...</span>:
                    <span style={{color:'green'}}>x.review</span>
                    }
                    </td>
                    <td><button onClick={()=>sendRequest(x)}>Send</button></td>
                    <td>{moment(x.createdAt).format("DD - MMM - YYYY")}</td>
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
