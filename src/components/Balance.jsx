import React from 'react'
import { useGlobalState } from '../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import CardBalanceItem from './CardBalanceItem'

const Balance = () => {

  const { calculateTotalIncome, calculateTotalExpense, calculateBalance } = useGlobalState();

  const totalIngresos = calculateTotalIncome();
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