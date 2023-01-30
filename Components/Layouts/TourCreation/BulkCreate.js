import React from 'react';
import CSVReader from 'react-csv-reader'
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import Router from 'next/router';

const BulkCreate = ({ state, dispatch }) => {

    let val = [];
    const createRecordTree = (records) => {
        records.forEach((rec, index)=>{
            console.log(typeof rec[1])
            if(index>0 && (typeof rec[1]==String?rec[1].length>1:rec[1]!=undefined)){
                val.push({
                    title:rec[0],
                    availability:rec[1],
                    duration: rec[2],
                    time_slot: rec[3],
                    confirmation: rec[4],
                    refund: rec[5],
                    voucher: rec[6],
                    lang: rec[7],
                    prevPrice: rec[8],
                    adult_price:parseFloat(rec[9]),
                    child_price:rec[10],
                    tour_detail:rec[11],
                    inclusions:rec[12],
                    why_shoulds:rec[13],
                    departure:rec[14],
                    reporting:rec[15],
                    imp_infos:rec[16],
                    policies:rec[17],
                    category:rec[18],
                    advCategory:rec[19],
                    cancellation_polices:rec[20],
                    terms_conditions:rec[21],
                    stock:rec[22],
                    status:1,
                    timeSlots:"",
                    main_image:"a",
                    more_images:"a"
                })
            }
        })
        console.log(val);
        console.log('request made')
    }

  return (
   <div>
     <CSVReader onFileLoaded={(data, fileInfo, originalFile) => createRecordTree(data) } />
     <div className='pt-3'>
        <button className='btn-custom'  disabled={state.load?true:false}
            onClick={async()=>{
                dispatch({type:'field', fieldName:'load', payload:true})
                await axios.post(process.env.NEXT_PUBLIC_BULK_CREATE_PRODUCT,val).then((x)=>{
                    console.log(x.data)
                    dispatch({type:'field', fieldName:'load', payload:false})
                    Router.push("/productCreation")
                })
            }}
        >{state.load?<Spinner animation="border" size='sm' className='mx-3' />:'Submit'}
        </button>
      </div>
   </div>
  )
}

export default BulkCreate