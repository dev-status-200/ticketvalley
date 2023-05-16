import React, { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useSession } from 'next-auth/react';
import Cookies from "js-cookie"
import Image from 'next/image';
import Router from 'next/router';

const CustomerLoin = ({providers, signIn}) => {

  const {data:session} = useSession();

  useEffect(() => {
    if(session){
      Router.push(`${Cookies.get("redirect")}`)
    }
  }, [session])
  
  return (
    <>
    {!session &&
    <div className='bg-login'>
      <div className='customer-login text-center'>
    <div className='cont'>
        <Image src={'/test-logo.png'} className="mb-5" width={150} height={75} alt="Image" />
    <div className='container-custom'>
        <div className='login-box'>
        <h1 className='text-center my-3 signup'></h1>
        Login To continue using <b>ticketsvalley</b>
        <div className='my-4 py-2'></div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
              <button className='google-btn' onClick={() => signIn(provider.id)}>
                  <span><FcGoogle className='mb-1' /></span> <span className='mx-4'>Login in with {provider.name}</span>
              </button>
              </div>
            ))}
            <p className='text-center mb-3 mt-5 privacy-text'>Privacy Protected Login</p>
        </div>
        </div>
    </div>
    <div className='text-center fs-15'>COPYRIGHT 2022 PEACELAND, ALL RIGHT RESERVED</div>
      </div>
      </div>
    }
    {
      session && 
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      }}>
        <div>
        <img src={'/loader.svg'}  />
        <p className='text-center silver-txt'>Please Wait...</p>
        </div>
      </div>
    }
    </>
  )
}

export default CustomerLoin