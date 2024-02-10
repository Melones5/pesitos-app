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


  const categorias = [
    'sueldo',
    'compras',
    'entretenimientos',
    'restaurantes y bares',
    'salud y deporte',
    'sin categoría',
    'servicios',
    'supermercado',
    'transporte',
    'vacaciones'
  ] 

  return (
    <div className='py-5'>
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
          <option value="compras">Compras</option>
          <option value="entretenimientos">Entretenimientos</option>
          <option value="restaurantes y bares">Restaurantes y bares</option>
          <option value="salud y deporte">Salud y deporte</option>
          <option value="sin categoría">Sin categoría</option>
          <option value="servicios">Servicios</option>
          <option value="supermercado">Supermercado</option>          
          <option value="transporte">Transporte</option>
          <option value="vacaciones">Vacaciones</option>
        </select>
        <button className='bg-[#023749] text-white px-3 py-2 rounded-lg block mb-2 w-full font-jost text-xl'>Añade una transacción</button>
      </form>
    </div>
  )
}

export default TransactionForm