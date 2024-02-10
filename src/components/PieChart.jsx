import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, plugins } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { useGlobalState } from '../context/GlobalState'

const PieChart = () => {

  const { transactions } = useGlobalState();

  // Almacenar categorías agrupadas y sus importes totales
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const groupedTransactions = {};

    // Agrupamos las transacciones por categoria, sumando sus montos
    transactions.forEach((transaction) => {
      const category = transaction.categoria;
      if (!groupedTransactions[category]) {
        groupedTransactions[category] = 0;
      }
      groupedTransactions[category] += transaction.monto;
    });

    // Convertimos los datos agrupados en el formato deseado para el gráfico
    const chartData = Object.entries(groupedTransactions).map(([category, amount]) => ({
      category,
      amount,
    }));

    setGroupedData(chartData);
  }, [transactions]);  

  // Utilizar los datos agrupados para las etiquetas y los datos del gráfico
  const labels = groupedData.map((item) => item.category); //los labels en categorías
  const data = groupedData.map((item) => item.amount); // los labels por monto

  return (
    <div className='flex justify-center items-center border border-[#023749] mx-auto pb-4 pt-4 h-96'>
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
            // borderColor:[
            //   '#f44336', // Rojo
            //   '#e91e63', // Rosa fuerte
            //   '#9c27b0', // Púrpura
            //   '#673ab7', // Azul violeta
            //   '#3f51b5', // Azul índigo
            //   '#2196f3', // Azul
            //   '#03a9f4', // Azul cielo
            //   '#00bcd4', // Cian
            //   '#009688', // Verde esmeralda
            //   '#4caf50', // Verde
            // ],      
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
                  size: 12,
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
                weight: 'bold',
                size: 20
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