import React, { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js"
import Checkout from './Checkout';

const PayComp = ({price, email, name, image}) => {

    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_CREATE_CONFIG)
        .then((x)=>{
            if(x.data.status=="success"){
                setStripePromise(loadStripe(x.data.publishableKey))
            }
        })
    }, []);
    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_CREATE_PAY_INTENT,{
            price:price
        })
        .then((x)=>{
            if(x.data.status=="success"){
                setClientSecret(x.data.client_secret)
            }
        })
    }, []);

  return (
    <div>
        {stripePromise && clientSecret &&
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <Checkout email={email} name={name} image={image} />
        </Elements>
        }
    </div>
  )
}

export default PayComp