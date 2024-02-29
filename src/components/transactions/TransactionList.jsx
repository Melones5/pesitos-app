import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import useGroupedData from '../../hooks/useGroupedData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheck, faShoppingCart, faGamepad, faUtensils, faBriefcaseMedical, faHome, faCar, faPlane, faFileInvoice, faStore, faTrash } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns';
import { Toaster, toast } from 'sonner'

const TransactionList = () => {

  const { transactions, deleteTransaction } = useGlobalState()

  const groupedData = useGroupedData(transactions)

  const handleDeleteClick = (transactionId) => {
    // Lógica para eliminar la transacción con el ID proporcionado 
    try {
      deleteTransaction(transactionId);
      toast.success('Eliminado correctamente', {
        position: 'bottom-right',
        // icon: <FontAwesomeIcon icon={faCheck} />,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Fallo al eliminar transacción. Por favor intente nuevamente.', {
        position: 'top-right',
        // icon: <FontAwesomeIcon icon={faXmark} />,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error adding transaction:', error);
    }

  }


  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Sueldo':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-red text-pie-red  w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faMoneyCheck} />;
      case 'Compras':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-pink text-pie-pink w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faShoppingCart} />;
      case 'Entretenimientos':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-purple text-pie-purple w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faGamepad} />;
      case 'Restaurantes y bares':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-deepPurple text-pie-deepPurple w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faUtensils} />;
      case 'Salud y deporte':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-indigo text-pie-indigo w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faBriefcaseMedical} />;
      case 'Varios':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-blue text-pie-blue w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faHome} />;
      case 'Servicios':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-lightBlue text-pie-lightBlue w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faFileInvoice} />;
      case 'Supermercado':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-cyan text-pie-cyan w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faStore} />
      case 'Transporte':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-teal text-pie-teal w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faCar} />;
      case 'Vacaciones':
        return <FontAwesomeIcon className='p-1 border-2 rounded-lg border-pie-green text-pie-green w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]' icon={faPlane} />;
      // Agrega más casos según tus categorías y los iconos correspondientes
      default:
        return null; // Puedes regresar null si no hay un ícono específico para la categoría
    }
  };

  return (
    <div className='py-6'>
      <ul className='hidden md:flex md:flex-col'>
        {/* <ul> */}
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
                    <p className='text-red-400'>- ${transaction.monto}</p>
                  )}
                  <div className='flex items-center justify-center ml-2'>
                    <button onClick={() => handleDeleteClick(transaction.id)}>
                      <FontAwesomeIcon className='p-1 rounded-lg hover:brightness-150  border-pie-teal transition-all duration-400 text-gray-500 w-[12px] h-[12px]' icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))
        }
      </ul>
      {/* Different layout md:breakpoint  */}
      <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden'>
        {/* Si el array de transactions es mayor a cero, muestro el parrafo con la lista  */}
        {transactions.length > 0 && (
          <p className='mt-0 font-jost font-semibold text-background-primary flex items-center justify-center uppercase'>
            Lista de gastos / ingresos 👇 {transactions.length}
          </p>
        )}
        {transactions.map((transaction) => (
          <div className='px-6 py-5 ring-1 ring-black ring-opacity-5 border-b-2 font-bold font-jost rounded-md shadow-md bg-white' key={transaction.id}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-center'>
                <span>{getCategoryIcon(transaction.categoria)}</span>
                <span className='pl-2 font-lato font-bold capitalize'>{transaction.nombre}</span>
              </div>
              <button onClick={() => handleDeleteClick(transaction.id)}>
                <FontAwesomeIcon className='p-1 rounded-lg hover:brightness-150  border-pie-teal transition-all duration-400 text-gray-500 w-[12px] h-[12px]' icon={faTrash} />
              </button>
            </div>
            <div className='mt-1'>
              {transaction.tipo === 'ingreso' ? (
                <p className='text-green-400'>${transaction.monto}</p>
              ) : (
                <p className='text-red-400'>- ${transaction.monto}</p>
              )}
            </div>
            <div className='mt-3 flex justify-between'>
              <p className='text-gray-500 font-normal'>{transaction.categoria}</p>
              <p className='text-gray-500 font-normal'>{format(transaction.fecha, 'dd/MM/yyyy')}</p>
            </div>
          </div>
        ))}
      </div>
      <Toaster richColors />
    </div>
  )
}

export default TransactionList