import React from 'react'
import LogoImg from '../../assets/logo.png'

const Logo = () => {
  return (
    <div className='flex items-center'>
      <div className='flex items-center justify-center h-10 w-10'>
        <img src={LogoImg} alt="logo app" />
      </div>
      <h1 className='font-jost font-bold text-2xl'>Pesitos</h1>
    </div>
  )
}

export default Logo