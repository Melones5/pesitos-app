import React from 'react'
import { useGlobalState } from '../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faArrowDown, faArrowUp  } from '@fortawesome/free-solid-svg-icons'
import CardBalanceItem from './CardBalanceItem'

const Balance = () => {

  const { calculateTotalIncome, calculateTotalExpense, calculateBalance  } = useGlobalState();

  // //Recorro el array de transactions y creo uno nuevo con los montos
  // const montos = transactions.map(transaction => transaction.monto)

  // //utilizo el reduce para obtener el total de la diferencia entre gastos y ingresos
  // const total = montos.reduce((acc, item) => (acc += item), 0).toFixed(2)

  //filtro por ingresos
  // const ingresos = transactions.filter(transaction => transaction.tipo === 'ingreso')
  // const totalIngresos = ingresos.reduce((acc, item) => (acc += item.monto), 0).toFixed(2)

  //filtro por gasto
  // const gastos = transactions.filter(transaction => transaction.tipo === 'gasto')
  // const totalGastos = gastos.reduce((acc, item) => (acc += item.monto), 0).toFixed(2)

  const totalIngresos =calculateTotalIncome();
  const totalGastos = calculateTotalExpense();
  const total = calculateBalance();

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,2fr))] gap-2 w-full'>      
        <CardBalanceItem title={"Ingresos"} amount={totalIngresos} icon={faArrowDown} />
        <CardBalanceItem title={"Gastos"} amount={totalGastos} icon={faArrowUp} />    
        <CardBalanceItem title={"Total"} amount={total} icon={faDollarSign} />
    </div>
  )
}

export default Balance