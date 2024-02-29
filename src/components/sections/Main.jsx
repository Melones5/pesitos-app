import React from 'react'
import TransactionList from '../transactions/TransactionList'
import Balance from '../Balance'
import PieChart from '../PieChart'

const Main = () => {
  return (
    <div className='max-w-[940px] mx-auto p-2'>            
      <PieChart />
      <Balance />      
      <TransactionList />
    </div>
  )
}

export default Main