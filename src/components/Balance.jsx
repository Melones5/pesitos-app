import React from 'react'
import { useGlobalState } from '../context/GlobalState'


const Balance = () => {

  const { transactions } = useGlobalState();

  //Recorro el array de transactions y creo uno nuevo con los montos
  const montos = transactions.map(transaction => transaction.monto)

  //utilizo el reduce para obtener el total de la diferencia entre gastos y ingresos
  const total = montos.reduce((acc, item) => (acc+=item), 0).toFixed(2)

  return (
    <div className='flex flex-col text-white font-jost border p-6 mt-5 rounded-md bg-green-400 shadow-lg'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold '>Balance Gastos / Ingresos</h2>  
        <p>$</p>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold py-2 font-jost text-2xl'>${total}</span>
      </div>
    </div>
  )
}

export default Balance