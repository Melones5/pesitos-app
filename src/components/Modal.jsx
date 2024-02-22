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
      <div className='bg-white shadow-lg lg:border-background-primary lg:border-2 px-10 py-5 lg:rounded-lg rounded-t-2xl text-black fixed bottom-0 lg:static'>
        {/* <p>My Modal</p>           */}
        <TransactionForm onClose={onClose}/>
      </div>      
    </div>
  )
}

export default Modal