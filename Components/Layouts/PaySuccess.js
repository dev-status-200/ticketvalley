import React, { useEffect } from 'react';
import Aos from 'aos';
import { addProduct } from '../../redux/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { destroyCart } from '../../functions/cartFunction';
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from 'axios';

const PaySuccess = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
      Aos.init({duration:600});
      afterPay();
    }, [])

    const afterPay = async() => {
        dispatch(addProduct([]));
        destroyCart();
        await delay(5000);
        //Router.push("/")
        await axios.post(process.env.NEXT_PUBLIC_CREATE_BOOKING,{
            user:router.query.email
        }).then((x)=>{
            console.log(x.data)
        })
    }
    


  return (
    <div style={{backgroundColor:"white", padding:100}}>
        <div className='text-center' data-aos="fade-in">
            <img src={"/other-assets/payment_done.png"} height={200} />
            <h1 style={{color:"#20bf55", fontWeight:700}} className="my-3">Thank You!</h1>
            <p style={{color:"grey"}}>Payment done successfully</p>
            <p style={{color:"silver"}}>A confirmation E-mail will be sent in a moment, and you'll be directed towards the home page shortly!</p>
        </div>
    </div>
  )
}

export default PaySuccess