import React, { useState } from 'react'

const Modal = () => {

  const [isopen, setIsopen] = useState(false);

  const handelOpenModal = (e) => {
    setIsopen(true)
  }

  const handleCloseModal = (e) => {
    setIsopen(false)
  }

  return (
    <div>
      <button className='bg-red-300 py-2 px-6 rounded-lg text-red font-bold m-5' onClick={handelOpenModal}>Open Modal</button>
      {
        isopen && (
          <div className='fixet inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-red p-5 rounded flex flex-col justify-center items-center gap-5'>
              <div>
                <label htmlFor="" className='mr-3 font-semibold'>Nombre</label>
                <input type="text" className='w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 duration-200' />
              </div>
              <div>
                <label htmlFor="" className='mr-3 font-semibold'>Apellido</label>
                <input type="text" className='w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 duration-200' />
              </div>
              <div>
                <button className='bg-red py-2 px-6 rounded-lg text-white font-bold m-5' onClick={handleCloseModal}>Close Modal</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Modal