import React from 'react'
import { Chart as ChartJS, plugins } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { useGlobalState } from '../context/GlobalState'

const PieChart = () => {

  const { transactions } = useGlobalState();

  const groupByCategory = Object.groupBy(transactions, transaction => {
    return transaction.categoria;
  });
  
  console.log(groupByCategory)
  
  return (
    <div className='w-[400px]'>
      <Doughnut
        data={{
          labels: transactions.map(transaction => transaction.categoria),
          datasets: [{
            label: 'My First Dataset',
            data: transactions.map(transaction => transaction.monto),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(255, 29, 122)',
              'rgb(255, 94, 232)',
            ],
            borderRadius: 2,
            hoverOffset: 4,
          }]
        }}
      />
    </div>
  )
}

export default PieChart