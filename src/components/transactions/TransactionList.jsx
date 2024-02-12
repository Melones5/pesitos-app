import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import useGroupedData from '../../hooks/useGroupedData'

const TransactionList = () => {

  const { transactions } = useGlobalState()

  const groupedData = useGroupedData(transactions)

  return (
    <div className='py-6'>
      <ul>
        {transactions.map((transation) => (
            <div className='border-b-2 font-bold font-jost p-3 mt-3 rounded-md shadow-md bg-white' key={transation.id}>
              <li className='flex items-center'>
                {transation.tipo === 'ingreso'? (
                  <div  className='flex justify-between w-full'>
                      <span className='text-gray-700'>{transation.categoria}</span>
                      <p className='text-green-400'>${transation.monto}</p>
                      {/* <span>{transation.tipo}</span> */}
                  </div>
                  )
                  : (
                  <div  className='flex justify-between w-full'> 
                      <span className='text-gray-700'>{transation.categoria}</span>
                      <p className='text-red-400'>${transation.monto}</p>
                      {/* <span>{transation.tipo}</span> */}
                  </div>
                )}
              </li>
            </div>
          ))
        }
      </ul>
    </div>
  )
}

export default TransactionList