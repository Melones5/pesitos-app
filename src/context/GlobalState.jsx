import  React, {useContext, createContext, useReducer, useEffect} from "react";
import AppReducer from './AppReducer'

const initialState = {
  transactions: [] 
}

export const Context = createContext()

export const useGlobalState = () => {
  const context = useContext(Context)
  return context
}

export const GlobalState = ({children}) => {

  const [state, dispatch] = useReducer(AppReducer, initialState,
    () => {
      const localData = localStorage.getItem('transactions')
      return localData ? JSON.parse(localData) : initialState;
    })

    useEffect(() => {
      localStorage.setItem('transactions', JSON.stringify(state))
    }, [state])

  const addTransaction = (data) =>{
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: data
    })    
  }  

  const deleteTransaction = (id) =>{
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    })    
  }  

  const calculateTotalIncome = () => {
    // Filtra las transacciones que son ingresos
    const incomeTransactions = state.transactions.filter(transaction => transaction.tipo === 'ingreso');
    // Suma los montos de todas las transacciones de ingresos
    const totalIncome = incomeTransactions.reduce((acc, item) => (acc += item.monto), 0).toFixed(2)
    return totalIncome;
  }

  const calculateTotalExpense = () => {
    // Filtra las transacciones que son gastos
    const expenseTransactions = state.transactions.filter(transaction => transaction.tipo === 'gasto');
    // Suma los montos de todas las transacciones de gastos
    const totalExpense = expenseTransactions.reduce((acc, item) => (acc += item.monto), 0).toFixed(2)
    return totalExpense;
  }

  const calculateBalance = () => {
    const total = (calculateTotalIncome() - calculateTotalExpense()).toFixed(2)
    return total;
  }

  return (
    <Context.Provider value={{
      transactions: state.transactions,
      addTransaction,
      deleteTransaction,
      calculateTotalIncome,
      calculateTotalExpense,
      calculateBalance
      }}>
      {children}
    </Context.Provider>
  )
}

export default GlobalState