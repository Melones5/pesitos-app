import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

const CardBalanceItem = ({ title, amount, icon }) => {
  // Lógica para determinar el tipo de transacción
  let cardColorClass = '';

  if (title === "Total") {
    cardColorClass = 'bg-green-600 text-white'; // Clase de color para ingresos
  } else {
    cardColorClass = 'bg-white text-gray-700'; // Clase de color para otros
  } 

  let iconColorClass = '';

  if (title === "Ingresos") {
    iconColorClass = 'text-green-400'; // Clase de color para ingresos
  } else if (title === "Gastos"){
    iconColorClass = 'text-red-400'; // Clase de color para otros
  } 

  return (
    <div className={`flex flex-col font-jost border p-6 mt-5 rounded-md  ${cardColorClass} shadow-lg`}>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold'>{title}</h2>
        <p><FontAwesomeIcon icon={icon} className={iconColorClass} size='2xl' /></p>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold py-2 font-jost text-2xl'><FontAwesomeIcon icon={faDollarSign} size='lg' /> {amount}</span>
      </div>
    </div>
  );
}

export default CardBalanceItem