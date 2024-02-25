import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import useGroupedData from '../../hooks/useGroupedData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheck, faShoppingCart, faGamepad, faUtensils, faBriefcaseMedical, faHome, faCar, faPlane, faFileInvoice, faStore } from '@fortawesome/free-solid-svg-icons'

const TransactionList = () => {

  const { transactions } = useGlobalState()

  const groupedData = useGroupedData(transactions)

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Sueldo':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-red text-pie-red  w-[24px] h-[24px]' icon={faMoneyCheck} />;
      case 'Compras':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-pink text-pie-pink w-[24px] h-[24px]' icon={faShoppingCart} />;
      case 'Entretenimientos':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-purple text-pie-purple w-[24px] h-[24px]' icon={faGamepad} />;
      case 'Restaurantes y bares':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-deepPurple text-pie-deepPurple w-[24px] h-[24px]' icon={faUtensils} />;
      case 'Salud y deporte':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-indigo text-pie-indigo w-[24px] h-[24px]' icon={faBriefcaseMedical} />;
      case 'Varios':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-blue text-pie-blue w-[24px] h-[24px]' icon={faHome} />;
      case 'Servicios':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-lightBlue text-pie-lightBlue w-[24px] h-[24px]' icon={faFileInvoice} />;
      case 'Supermercado':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-cyan text-pie-cyan w-[24px] h-[24px]' icon={faStore} />
      case 'Transporte':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-teal text-pie-teal w-[24px] h-[24px]' icon={faCar} />;
      case 'Vacaciones':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-green text-pie-green w-[24px] h-[24px]' icon={faPlane} />;
      // Agrega más casos según tus categorías y los iconos correspondientes
      default:
        return null; // Puedes regresar null si no hay un ícono específico para la categoría
    }
  };

  return (
    <div className='py-6'>
      <ul>
        {transactions.map((transaction) => (
          <div className='border-b-2 font-bold font-jost p-3 mt-3 rounded-md shadow-md bg-white' key={transaction.id}>
            <li className='flex items-center'>
              <div className='flex justify-between w-full'>
                <div className='flex items-center'>
                  {getCategoryIcon(transaction.categoria)}
                  <span className='pl-5 text-gray-700'>{transaction.categoria}</span>
                </div>
                <div className='flex items-center justify-center'>
                  {transaction.tipo === 'ingreso' ? (
                    <p className='text-green-400'>${transaction.monto}</p>
                  ) : (
                    <p className='text-red-400'>${transaction.monto}</p>
                  )}
                </div>
              </div>
            </li>
          </div>
        ))
        }
      </ul>
    </div>
  )
}

export default TransactionList