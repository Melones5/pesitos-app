import React from 'react'
import { useGlobalState } from '../context/GlobalState'


const Balance = () => {

  const { transactions } = useGlobalState();

  //Recorro el array de transactions y creo uno nuevo con los montos
  const montos = transactions.map(transaction => transaction.monto)

  //utilizo el reduce para obtener el total de la diferencia entre gastos y ingresos
  const total = montos.reduce((acc, item) => (acc+=item), 0).toFixed(2)

  return (
    <div className='flex justify-between items-center text-[#023749] font-jost border border-[#023749] p-4'>
      <h3 className='font-bold '>Balance Gastos / Ingresos</h3>      
      <span className='font-bold text-center py-2 font-jost text-2xl'>${total}</span>
    </div>
  )
}

export default Balance