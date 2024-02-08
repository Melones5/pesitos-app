import { useState } from 'react'
import Home from './components/Home'
import GlobalState from './context/GlobalState'

function App() {

  return (
    <>
      <GlobalState>
        <Home />
      </GlobalState>
    </>
  )
}

export default App
