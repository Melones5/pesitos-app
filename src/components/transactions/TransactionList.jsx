import React from 'react'
import { useGlobalState } from '../../context/GlobalState'

const TransactionList = () => {

  const { transactions } = useGlobalState()


  return (
    <>
    <ul>
      {
        transactions.map((transation) =>(
          <li key={transation.id}>
            <p>{transation.monto}</p>
            <span>{transation.tipo}</span>
            <span>{transation.categoria}</span>
          </li>
        ))
      }
    </ul>
    </>
  )
}

export default TransactionList