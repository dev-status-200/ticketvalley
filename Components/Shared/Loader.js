import React, { useEffect } from 'react';
import Aos from 'aos';

const Loader = () => {

    useEffect(() => {
        Aos.init({duration:300})
      }, [])

  return (
    <div className='svg-styles'> 
        <div className="text-center">
            <div className="container" data-aos="zoom-in">
            <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#00e5fa"/>
                <circle cx="170" cy="170" r="135" stroke="#0096a3"/>
                <circle cx="170" cy="170" r="110" stroke="#00e5fa"/>
                <circle cx="170" cy="170" r="85" stroke="#0096a3"/>
            </svg>
            </div>
        </div>
    </div>
  )
}

export default Loader