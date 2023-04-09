import React from 'react';
import TicketPage from '../Components/Layouts/TicketPage';
import axios from 'axios';

const ticketPage = ({ticketData}) => {
  return (
    <TicketPage ticketData={ticketData} />
  )
}
export async function getServerSideProps(context) {
  console.log(context.query.id)
    const ticketData = await axios.get(process.env.NEXT_PUBLIC_GET_TICKET_INFO,{
      headers:{ "id": `${context.query.id}` }
    }).then((x)=>x.data)
  return {
    props: {
      ticketData:ticketData
    }
  }
}
export default ticketPage