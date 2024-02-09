import React from 'react'
import TransactionForm from '../transactions/TransactionForm'
import TransactionList from '../transactions/TransactionList'
import Balance from '../Balance'
import PieChart from '../PieChart'

const Main = () => {
  return (
    <div>
      <p className='text-center pt-2 pb-2'>Toda la lógica y gráficos</p>
      <TransactionForm />
      <Balance />
      <PieChart />
      <TransactionList />
    </div>
  )
}

export default Main