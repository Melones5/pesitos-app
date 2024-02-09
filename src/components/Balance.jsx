import React from 'react'
import { useGlobalState } from '../context/GlobalState'


const Balance = () => {

  const { transactions } = useGlobalState();

  //Recorro el array de transactions y creo uno nuevo con los montos
  const montos = transactions.map(transaction => transaction.monto)

  //utilizo el reduce para obtener el total de la diferencia entre gastos y ingresos
  const total = montos.reduce((acc, item) => (acc+=item), 0).toFixed(2)

  return (
    <div>
      <h3>Balance Gastos / Ingresos</h3>      
      <button className='font-bold text-center py-2 font-jost text-2xl'>${total}</button>
    </div>
  )
}

export default Balance