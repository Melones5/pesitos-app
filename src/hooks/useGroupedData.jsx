import { useState, useEffect } from 'react';

const useGroupedData = (transactions) => {
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

  return groupedData;
};

export default useGroupedData;