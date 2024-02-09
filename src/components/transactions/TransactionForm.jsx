import React, { useState, useRef } from 'react'
import { useGlobalState } from '../../context/GlobalState'

const TransactionForm = () => {

  const form = useRef();

  const { addTransaction } = useGlobalState();

  const [id, setId] = useState("");
  const [monto, setMonto] = useState(0);
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoría] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ 
      id: window.crypto.randomUUID(),
      monto: +monto,
      tipo,
      categoria
    })
    console.log(monto, tipo, categoria)    
    form.current.reset();
  }

  const handleChangeTipo = (e) => {
    console.log(e.target.value)
    setTipo(e.target.value)
  }

  const handleChangeCategoria = (e) => {
    console.log(e.target.value)
    setCategoría(e.target.value)
  }


  return (
    <div>
      <form ref={form} onSubmit={handleSubmit}>
        <input required type="number" placeholder='ingrese monto' onChange={(e) => setMonto(e.target.value)} step={0.01}/>
        <select required name="" id="" value={tipo} onChange={handleChangeTipo}>
          <option value="" disabled>--Elige una opcion--</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <select required name="" id="" value={categoria} onChange={handleChangeCategoria}>
          <option value="" disabled>--Elige una opcion--</option>
          <option value="sueldo">Sueldo</option>
          <option value="comida">Comida</option>
          <option value="factura">Factura</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="ropa">Ropa</option>
        </select>
        <button className='bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full'>Añade una transacción</button>
      </form>
    </div>
  )
}

export default TransactionForm