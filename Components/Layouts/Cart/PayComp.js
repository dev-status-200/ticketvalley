import React, { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js"
import Checkout from './Checkout';

const PayComp = ({price, email}) => {

    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_CREATE_CONFIG)
        .then((x)=>{
            if(x.data.status=="success"){
                console.log("publishable Key",x.data.publishableKey)
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
                console.log("client secret", x.data.client_secret)
                setClientSecret(x.data.client_secret)
            }
        })
    }, []);

  return (
    <div>
        {stripePromise && clientSecret &&
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <Checkout email={email} />
        </Elements>
        }
    </div>
  )
}

export default PayComp