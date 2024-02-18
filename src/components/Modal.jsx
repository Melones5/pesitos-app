import React from 'react'
import TransactionForm from './transactions/TransactionForm';

const Modal = ( {visible, onClose} ) => {

  const handleOnClose = (e) => {
    if(e.target.id === 'container') 
    onClose();
  };

  if(!visible) return null;

  return (
    <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
    flex justify-center items-center'>
      <div className='bg-white shadow-md border-[#3A2834] border-2 px-10 py-14 rounded text-black'>
        {/* <p>My Modal</p>           */}
        <TransactionForm onClose={onClose}/>
      </div>      
    </div>
  )
}

export default Modal