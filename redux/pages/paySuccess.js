import React from 'react';
import PaySuccess from '../Components/Layouts/PaySuccess';

const paySuccess = ({email, payment_intent_client_secret, payment_intent, name, image}) => {
  return (
    <PaySuccess email={email} payment_intent_client_secret={payment_intent_client_secret} payment_intent={payment_intent} name={name}  image={image} />
  )
}

export default paySuccess

export async function getServerSideProps({req, res, query}){
  const {email, payment_intent_client_secret, payment_intent, name, image} = query;
  return{
    props: { email, payment_intent_client_secret, payment_intent, name, image},
  }
}