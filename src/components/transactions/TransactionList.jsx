import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import useGroupedData from '../../hooks/useGroupedData'

const TransactionList = () => {

  const { transactions } = useGlobalState()

  const groupedData = useGroupedData(transactions)

  return (
    <div className='py-6'>
      <ul>
        {transactions.map((transaction) => (
            <div className='border-b-2 font-bold font-jost p-3 mt-3 rounded-md shadow-md bg-white' key={transaction.id}>
              <li className='flex items-center'>
                {transaction.tipo === 'ingreso'? (
                  <div  className='flex justify-between w-full'>                      
                      <span className='text-gray-700'>{transaction.categoria}</span>
                      <p className='text-green-400'>${transaction.monto}</p>
                      {/* <span>{transation.tipo}</span> */}
                  </div>
                  )
                  : (
                  <div  className='flex justify-between w-full'> 
                      <span className='text-gray-700'>{transaction.categoria}</span>
                      <p className='text-red-400'>${transaction.monto}</p>
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