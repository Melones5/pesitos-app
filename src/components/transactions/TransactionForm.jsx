import React, { useState, useRef } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const TransactionForm = ({ onClose }) => {

  const form = useRef();

  const { addTransaction } = useGlobalState();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState(0);
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoría] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTransaction({
      id: window.crypto.randomUUID(),
      nombre,
      monto: +monto,
      tipo,
      categoria,
    })
    console.log(monto, tipo, categoria)
    form.current.reset();
    setTipo('')
    setCategoría('')
  }

  const handleChangeNombre = (e) => {
    console.log(e.target.value)
    setNombre(e.target.value)
  }

  const handleChangeMonto = (e) => {
    console.log(e.target.value)
    setMonto(e.target.value)
  }

  const handleChangeTipo = (value) => {
    // modo botón
    console.log(value)
    setTipo(value)

    // Modo select
    // console.log(e.target.value)
    // setTipo(e.target.value)
  }

  const handleChangeCategoria = (e) => {
    console.log(e.target.value)
    setCategoría(e.target.value)
  }


  const categorias = [
    'Sueldo',
    'Compras',
    'Entretenimientos',
    'Restaurantes y bares',
    'Salud y deporte',
    'Sin categoría',
    'Servicios',
    'Supermercado',
    'Transporte',
    'Vacaciones'
  ]


  const handleOnCloseForm = () => {
    onClose();
  };


  return (
    <div className=''>
      <div className='flex flex-col gap-2 w-full font-fredoka'>
        <button className='flex justify-end items-center' onClick={handleOnCloseForm}>x</button>
        <h2 className='flex justify-start font-semibold text-2xl'>Registrar una transacción</h2>
        <p className='text-start font-light text-gray-500 text-lg'>Rellene la siguiente información para registrar una nueva transacción</p>
        <form className='flex flex-col' ref={form} onSubmit={handleSubmit}>
          <div className='group flex w-full justify-start gap-2 rounded-md py-3'>
            <input className='rounded-md border px-6 py-5 w-full font-medium text-gray-700 border-gray-100 focus-within:border-[#3A2834] focus-within:ring-2 focus-within:ring-[#3A2834] focus:outline-none' required type="text" placeholder='Nombre' onChange={handleChangeNombre} />
          </div>
          <div className='group flex w-full justify-start gap-2 rounded-md py-3'>
            <input className='rounded-md border px-6 py-5 w-full font-medium text-gray-700 border-gray-100 focus-within:border-[#3A2834] focus-within:ring-2 focus-within:ring-[#3A2834] focus:outline-none' required type="number" placeholder='Ingrese monto' onChange={handleChangeMonto} step={0.01} />
          </div>
          {/* <div className='flex justify-between'>
          <button className='bg-green-600 active:bg-green-900 focus:outline-none focus:ring focus:ring-violet-300 text-white' type='button' onClick={() => handleChangeTipo('ingreso')}>Ingreso</button>
          <button className='bg-red-600 active:bg-red-900 focus:outline-none focus:ring focus:ring-violet-300 text-white' type='button' onClick={() => handleChangeTipo('gasto')}>Gasto</button>
          <p>Tipo actual: {tipo}</p>
        </div> */}
          <div className='flex justify-center items-center gap-2'>
            <button className='rounded-md border px-4 py-5 focus:bg-[#40d64c]  hover:bg-[#40d64c]  border-gray-100   block mb-2 text-xl w-full group' type='button' onClick={() => handleChangeTipo('ingreso')}><FontAwesomeIcon className='group-focus:text-white group-hover:text-white text-green-400 px-2' icon={faArrowDown}/> Ingreso</button>
            <button className='rounded-md border px-4 py-5 focus:bg-[#f85f5f] hover:bg-[#f85f5f]  border-gray-100   block mb-2 text-xl w-full group' type='button' onClick={() => handleChangeTipo('gasto')}><FontAwesomeIcon className='group-focus:text-white group-hover:text-white text-red-400 px-2' icon={faArrowUp}/> Gasto</button>
          </div>
          {/* <div className='w-full group flex py-3'>
            <select required name="" id="" value={tipo} onChange={handleChangeTipo} className='group flex w-full px-6 py-5 cursor-pointer items-center justify-between rounded-md border text-gray-700 shadow-sm outline-none transition-all duration-400 focus:border-[#3A2834] focus:ring-2 focus:ring-[#3A2834] hover:bg-white data-[state=open]:bg-white data-[placeholder]:text-[#3A2834] bg-white font-medium'>
              <option value="" disabled>Tipo</option>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
          </div> */}
          <div className='w-full group flex py-3'>
            <select required name="" id="" value={categoria} onChange={handleChangeCategoria} className='group flex w-full px-6 py-5 cursor-pointer items-center justify-between rounded-md border text-gray-700 shadow-sm outline-none transition-all duration-400 focus:border-[#3A2834] focus:ring-2 focus:ring-[#3A2834] hover:bg-white data-[state=open]:bg-white data-[placeholder]:text-[#3A2834] bg-white font-medium'>
              <option value="" disabled>Categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button className='rounded-md border px-4 py-5 bg-green-600 hover:bg-green-500 text-white w-full text-xl'>Añade una transacción</button>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm