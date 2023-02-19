import React from 'react';
import PaySuccess from '../Components/Layouts/PaySuccess';

const paySuccess = ({email, payment_intent_client_secret, payment_intent, name}) => {
  return (
    <PaySuccess email={email} payment_intent_client_secret={payment_intent_client_secret} payment_intent={payment_intent} name={name} />
  )
}

export default paySuccess

export async function getServerSideProps({req, res, query}){
  const {email, payment_intent_client_secret, payment_intent, name} = query;
  return{
    props: { email, payment_intent_client_secret, payment_intent, name },
  }
}