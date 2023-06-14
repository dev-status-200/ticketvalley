import React from 'react';
import TicketPage from '../Components/Layouts/TicketPage';
import axios from 'axios';

const ticketPage = ({ticketData, bookingNo}) => {
  return (
    <TicketPage ticketData={ticketData} bookingNo={bookingNo} />
  )
}
export async function getServerSideProps(context) {
  const bookingNo = context.query.id
    const ticketData = await axios.get(process.env.NEXT_PUBLIC_GET_TICKET_INFO,{
      headers:{ "id": `${context.query.id}` }
    }).then((x)=>x.data)
  return {
    props: {
      ticketData:ticketData,
      bookingNo,
    }
  }
}
export default ticketPage