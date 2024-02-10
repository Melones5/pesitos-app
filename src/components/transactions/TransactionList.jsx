import React, {useState, useEffect} from 'react'
import { useGlobalState } from '../../context/GlobalState'

const TransactionList = () => {

  const { transactions } = useGlobalState()


  // // Almacenar categorías agrupadas y sus importes totales
  // const [groupedData, setGroupedData] = useState([]);

  // useEffect(() => {
  //   const groupedTransactions = {};

  //   // Agrupamos las transacciones por categoria, sumando sus montos
  //   transactions.forEach((transaction) => {
  //     const category = transaction.categoria;
  //     if (!groupedTransactions[category]) {
  //       groupedTransactions[category] = 0;
  //     }
  //     groupedTransactions[category] += transaction.monto;
  //   });

  //   // Convertimos los datos agrupados en el formato deseado para el gráfico
  //   const chartData = Object.entries(groupedTransactions).map(([category, amount]) => ({
  //     category,
  //     amount,
  //   }));

  //   setGroupedData(chartData);
  // }, [transactions]);  

  return (
    <div className='py-6'>
      <ul>
        {
          transactions.map((transation) => (
            <div className='border-b-2 border-[#0237499c] text-[#023749] font-bold font-jost p-3'>
              <li key={transation.id} className='flex justify-between items-center'>
                <span>{transation.categoria}</span>
                <p>{transation.monto}</p>
                {/* <span>{transation.tipo}</span> */}
              </li>
            </div>
          ))
        }
      </ul>
    </div>
  )
}

export default TransactionList