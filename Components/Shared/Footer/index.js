import React from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Footer = () => {
  return (
    <div className=''>
    <div className="desktop" >
        <Desktop />
    </div>
    <div className="mobile" >
        <Mobile />
    </div>
    </div>
  )
}

export default React.memo(Footer)