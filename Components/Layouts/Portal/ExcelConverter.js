import React, { useEffect } from 'react';  
import exportFromJSON from 'export-from-json';
import moment from 'moment';
  
//const data = [{ foo: 'foo' }, { bar: 'bar' }]  
const fileName = 'Sales Report'  
const exportType = 'csv'  

const ExcelConverter = ({jsonData}) => {

  useEffect(() => {
    //console.log(data)
    // console.log(jsonData)
  }, [])
  
  const getValues = (data) => {
    let result = "";
    // console.log(data)
    data.forEach((x)=>{
      result = result + `${x.name}, `
    })
    return result
  }

  const ExportToExcel = async() => {  
    let data = [];
    await jsonData.forEach((x)=>{
      data.push({
        Booking_No:x.booking_no,
        Price:x.base_price,
        Total_Price:x.final_price,
        Email:x.email,
        Contact:x?.BookedTours[0]?.customerContact||'None',
        Name:x?.BookedTours[0]?.customerName||'None',
        Tours:getValues(x.BookedTours),
        Dated:`${moment(x.createdAt).format("DD - MMM - YYYY")}`
      })
    })
    exportFromJSON({ data, fileName, exportType })
  }  

  return (
    <div>
      <button type="button" className='custom-btn' onClick={ExportToExcel}>Export To Excel</button>  
    </div>
  )
}

export default ExcelConverter