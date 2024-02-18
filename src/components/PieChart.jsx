import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, plugins } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { useGlobalState } from '../context/GlobalState'
import useGroupedData from '../hooks/useGroupedData'

const PieChart = () => {

  const { transactions } = useGlobalState();

  const groupedData = useGroupedData(transactions)

  // Utilizar los datos agrupados para las etiquetas y los datos del gráfico
  const labels = groupedData.map((item) => item.category); //los labels en categorías
  const data = groupedData.map((item) => item.amount); // los labels por monto

  console.log(labels, data)

  return (
    <div className='flex justify-center items-center rounded-md shadow-md bg-white mx-auto pb-4 pt-4 h-96'>
      <Doughnut
        data={{
          labels,
          datasets: [{
            label: 'total',
            data,
            backgroundColor: [
              '#f44336', // Rojo
              '#e91e63', // Rosa fuerte
              '#9c27b0', // Púrpura
              '#673ab7', // Azul violeta
              '#3f51b5', // Azul índigo
              '#2196f3', // Azul
              '#03a9f4', // Azul cielo
              '#00bcd4', // Cian
              '#009688', // Verde esmeralda
              '#4caf50', // Verde
            ],      
            hoverOffset: 8,            
            spacing: 2,     
            borderColor: '#fff'
          }]
        }}
        options={{
          responsive: true,          
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  weight: 'normal',
                  size: 12,
                  family: "'Fredoka', 'sans-serif'",
                },
                boxWidth: 10,              
                usePointStyle: true,
              }
            },
            title: {
              display:true,
              text: "Análisis de gastos",
              color: '#2FAE7D',
              font: {                
                weight: 'bolder',
                size: 22,
                family: "'Fredoka', 'sans-serif'",
              },    
              padding: {
                top: 0,
                bottom:10
              }
            }
          }
        }}
      />
    </div>
  )
}

export default PieChart