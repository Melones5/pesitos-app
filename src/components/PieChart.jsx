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

  const categoryColors = {
    'Sueldo':  '#f44336', // Rojo,
    'Compras': '#e91e63', // Rosa fuerte,
    'Entretenimientos': '#9c27b0', // Púrpura,
    'Restaurantes y bares': '#673ab7', // Azul violeta,
    'Salud y deporte': '#3f51b5', // Azul índigo,
    'Varios': '#2196f3', // Azul,
    'Servicios': '#03a9f4', // Azul cielo,
    'Supermercado': '#00bcd4', // Cian,
    'Transporte': '#009688', // Verde esmeralda,
    'Vacaciones': '#4caf50' // Verde
  };

  // Mapear las categorías a los colores correspondientes
  const backgroundColors = labels.map(category => categoryColors[category]);

  const doughnutLabel = {
    id: 'centerTotalText',
    afterDraw(chart, args, options) {
      const { datasets } = chart.data;
      const { color, font } = options;
      const total = datasets[0].data.reduce((acc, value) => acc + value, 0);

      const { chartArea: { left, top, right, bottom }, ctx } = chart;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;

      ctx.fillStyle = color || '#3A2834';
      ctx.font = `${font.weight || 'normal'} ${font.size || 12}px ${font.family || "'Fredoka', sans-serif"}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Total`, centerX, centerY - 20);
      ctx.font = `bold ${font.size + 6 || 14}px ${font.family || "'Fredoka', sans-serif"}`;
      ctx.fillText(`$${total}`, centerX, centerY + 4);
    }
  };

  const plugin = {
    id: 'emptyDoughnut',
    afterDraw(chart, args, options) {
      const { datasets } = chart.data;
      const { color, width, radiusDecrease } = options;
      let hasData = false;

      for (let i = 0; i < datasets.length; i += 1) {
        const dataset = datasets[i];
        hasData |= dataset.data.length > 0;
      }

      if (!hasData) {
        const { chartArea: { left, top, right, bottom }, ctx } = chart;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        const r = Math.min(right - left, bottom - top) / 2;

        ctx.beginPath();
        ctx.lineWidth = width || 2;
        ctx.strokeStyle = color || '#3A2834';
        ctx.arc(centerX, centerY, (r - radiusDecrease || 0), 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };


  return (
    <div className='flex justify-center items-center rounded-md shadow-md bg-white mx-auto pb-4 pt-4 h-96'>
      <Doughnut
        data={{
          labels,
          datasets: [{
            label: 'total',
            data,
            backgroundColor: backgroundColors,
            usePointStyle: true,
            hoverOffset: 8,
            spacing: 2,
            borderColor: '#fff'
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            centerTotalText: {
              font: {
                weight: 'bolder',
                size: 14,
                family: "'Lato', sans-serif",
              },
            },
            emptyDoughnut: {
              color: '#3A2834',
              width: 1,
              radiusDecrease: 20
            },
            legend: {
              position: 'top',
              labels: {
                font: {
                  weight: 'normal',
                  size: 12,
                  family: "'Fredoka', sans-serif",
                },

                boxWidth: 10,
                pointStyle: 'rect',
                usePointStyle: true,
              }
            },
            title: {
              display: true,
              text: "Análisis de gastos",
              color: '#2FAE7D',
              font: {
                weight: 'bolder',
                size: 22,
                family: "'Fredoka', sans-serif",
              },
              padding: {
                top: 0,
                bottom: 10
              }
            }
          }
        }}
        plugins={
          [plugin, doughnutLabel]
        }
      />
    </div>
  )
}

export default PieChart