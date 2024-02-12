import React from 'react'
import TransactionForm from '../transactions/TransactionForm'
import TransactionList from '../transactions/TransactionList'
import Balance from '../Balance'
import PieChart from '../PieChart'

const Main = () => {
  return (
    <div className='max-w-[940px] mx-auto p-2'>      
      <PieChart />
      <Balance />      
      <TransactionList />
      <TransactionForm />
    </div>
  )
}

export default Main