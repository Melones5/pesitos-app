import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import Modal from '../Modal'

const Header = () => {

  const [showMyModal, setShowMyModal] = useState(false)


  const handleOnClose = () => setShowMyModal(false)

  
  return (
    <div className='text-center bg-background-primary p-4 text-white'>
      <div className='flex items-center justify-between mx-auto'>
        <Logo />
        <button onClick={() => setShowMyModal(true)} 
          className='rounded-md px-5 py-2 font-semibold transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-white text-background-primary shadow-md drop-shadow-md border-2 text-sm border-white hover:bg-background-primary hover:text-white hover:border-2 hover:shadow-lg hover:drop-shadow-xl'>
            Nueva transacción
        </button>
      </div>     
      <Modal onClose={handleOnClose} visible={showMyModal}/>    
    </div>
  )
}

export default Header