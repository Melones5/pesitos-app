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

  const [state, dispatch] = useReducer(AppReducer, initialState)

  const addTransaction = (transaction) =>{
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    })
    console.log("addTransaction")
  }

  return (
    <Context.Provider value={{
      transactions: state.transactions,
      addTransaction 
      }}>
      {children}
    </Context.Provider>
  )
}

export default GlobalState