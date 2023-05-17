import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import { addProduct } from '../../redux/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { destroyCart, retrieveCart } from '../../functions/cartFunction';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

const PaySuccess = ({email, payment_intent_client_secret, payment_intent, name, image}) => {

  const {data:session} = useSession();
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [count, setCount] = useState(0);

  useEffect(() => {
    Aos.init({duration:600});
    afterPay();
  }, [email])

  const afterPay = async() => {
    await delay(2000);
    let id = await createReservation();
    await sendMail(id);
  }
  
  const sendMail = (id) => {
    axios.post(process.env.NEXT_PUBLIC_CREATE_BOOKING,{
      user:email, booking_id:id
    }).then((x)=>{
      dispatch(addProduct([]));
      destroyCart();
      Cookies.remove("promoDiscount", { path: '' });
      Router.push("/");
    })
  }

  const priceCalc = (cartData, disc) => {
    let base_price = 0;
    let final_price = 0;

    let discObj = disc==undefined?'none':JSON.parse(disc);
    cartData.forEach(x => {
      x.options.forEach((y)=>{
        base_price = parseFloat(base_price) + parseFloat(y.price)
      })
    });
    final_price = disc==undefined?base_price:(discObj.byPercentage? (base_price-(base_price/100)*discObj.price).toFixed(2) : parseFloat(base_price-discObj.price).toFixed(2));
    return { base_price, final_price }
  }

  const createReservation = async() => {
    let booking_id = '';
    let cartData = [];
    let reserve = {};
    cartData = await retrieveCart();
    let disc = await Cookies.get('promoDiscount');
    reserve.promo = disc==undefined?'none':disc;
    reserve.base_price = priceCalc(cartData, disc).base_price;
    reserve.final_price = priceCalc(cartData, disc).final_price;
    reserve.payment_intent_client_secret = payment_intent_client_secret;
    reserve.payment_intent = payment_intent;
    reserve.name = name;
    reserve.email = email;
    reserve.image = image;

    await axios.post(process.env.NEXT_PUBLIC_CREATE_RESERVATION,{
      bookedTours:cartData,
      reservation:reserve
    }).then((x)=>{
      booking_id = x.data.result
    })
    setCount(count+1);
    return booking_id;
  }

  return (
    <div style={{backgroundColor:"white", padding:100}}>
      <div className='text-center' data-aos="fade-in">
          <img src={"/other-assets/payment_done.png"} height={200} />
          <h1 style={{color:"#20bf55", fontWeight:700}} className="my-3">Thank You!</h1>
          <p style={{color:"grey"}}>Payment done successfully</p>
          <p style={{color:"silver"}}>
            A confirmation E-mail will be sent in a moment, and you'll be directed towards the home page shortly!
          </p>
      </div>
    </div>
  )
}

export default PaySuccess