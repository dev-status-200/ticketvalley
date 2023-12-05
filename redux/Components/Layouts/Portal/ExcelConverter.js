import React, { useEffect } from 'react';  
import exportFromJSON from 'export-from-json';
import moment from 'moment';
  
//const data = [{ foo: 'foo' }, { bar: 'bar' }]  
const fileName = 'download'  
const exportType = 'csv'  

const ExcelConverter = ({jsonData}) => {

  useEffect(() => {
    //console.log(data)
    console.log(jsonData)
  }, [])
  
  const getValues = (data) => {
    let result = "";
    console.log(data)
    data.forEach((x)=>{
      result = result + `${x.name}, `
    })
    return result
  }

  const ExportToExcel = async() => {  
    let data = [];
    await jsonData.forEach((x)=>{
      data.push({
        bookingno:x.booking_no,
        price:x.base_price,
        totalPrice:x.final_price,
        email:x.email,
        number:x.BookedTours[0].customerContact,
        name:x.BookedTours[0].customerName,
        tours:getValues(x.BookedTours),
        date:`${moment(x.createdAt).format("DD - MMM - YYYY")}`
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