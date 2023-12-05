import React from 'react'

const MobileVideo = () => {
  return (
    <video autoPlay loop muted style={{ width:'100%' }}>
    <source src="/videos/video3.mp4"  />
  </video>
  )
}

export default MobileVideo