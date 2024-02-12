import React, { useState, useRef } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faShoppingCart, faGamepad, faDumbbell, faQuestion, faTools, faCar, faPlane, faUtensils } from '@fortawesome/free-solid-svg-icons';

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
      categoria,
    })
    console.log(monto, tipo, categoria)    
    form.current.reset();
    setTipo('')
    setCategoría('')
  }
  
  const handleChangeMonto = (e) => {
    console.log(e.target.value)
    setMonto(e.target.value)
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
        <input required type="number" placeholder='ingrese monto' onChange={handleChangeMonto} step={0.01}/>
        <select required name="" id="" value={tipo} onChange={handleChangeTipo}>
          <option value="" disabled>--Elige una opcion--</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <select required name="" id="" value={categoria} onChange={handleChangeCategoria}>
          <option value="" disabled>--Elige una opcion--</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className='flex justify-center items-center'>
            <button className='bg-[#024908] text-white py-2 rounded-lg block mb-2 font-jost text-xl w-24 mx-4'>+</button>
            <button className='bg-[#023749] text-white py-2 rounded-lg block mb-2 font-jost text-xl w-24 mx-4'>-</button>
        </div>
        <button className='bg-[#023749] text-white px-3 py-2 rounded-lg block mb-2 w-full font-jost text-xl'>Añade una transacción</button>
      </form>
    </div>
  )
}

export default TransactionForm