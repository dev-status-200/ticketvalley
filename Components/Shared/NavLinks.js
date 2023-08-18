import React from 'react';
import Link from 'next/link';

const NavLinks = () => {
  return (
    <div className='pb-2'>
    <Link className='menu-drop-links mx-3' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}>Theme Parks</Link>
    <Link className='menu-drop-links mx-3' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}>Water Parks</Link>
    <Link className='menu-drop-links mx-3' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours'  }}}>City Tours</Link>
    <Link className='menu-drop-links mx-3' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours'}}}>Luxury Tours</Link>
    <Link className='menu-drop-links mx-3' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure'   }}}>Adventure</Link>
    </div>
  )
}

export default React.memo(NavLinks)