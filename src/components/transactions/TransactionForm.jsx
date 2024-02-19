import React, { useState, useRef } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'



const TransactionForm = ({ onClose }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: "",
      nombre: "",
      monto: "",
      tipo: "",
      categoria: "",
    },
  });

  const form = useRef();

  const { addTransaction } = useGlobalState();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState(0);
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoría] = useState("");

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

  const onSubmit = handleSubmit(async (data, e) => {
    e.preventDefault();
    data.id = window.crypto.randomUUID(),
    data.tipo = tipo,
    data.monto = +data.monto
    try {
      addTransaction(data)     
      toast.success('Transacción añadida', {
        position: 'bottom-right',
        icon: <FontAwesomeIcon icon={faCheck}/>,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });      
      reset();
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      toast.error('Fallo al añadir transacción. Por favor intente nuevamente.', {
        position: 'top-right',
        icon: <FontAwesomeIcon icon={faXmark}/>, 
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });     
      console.error('Error adding transaction:', error);
    }
  });


  return (
    <div className=''>
      <div className='flex flex-col gap-2 w-full font-fredoka'>
        <button className='flex justify-end items-center' onClick={handleOnCloseForm}>x</button>
        <h2 className='flex justify-start font-semibold text-2xl'>Registrar una transacción</h2>
        <p className='text-start font-light text-gray-500 text-lg'>Rellene la siguiente información para registrar una nueva transacción</p>
        <form className='flex flex-col' ref={form} onSubmit={onSubmit}>
          <div className='group flex-col w-full justify-start gap-2 rounded-md py-3'>
            <input
              className='rounded-md border px-6 py-5 w-full font-medium text-gray-700 border-gray-100 focus-within:border-[#3A2834] focus-within:ring-2 focus-within:ring-[#3A2834] focus:outline-none'
              type="text"
              placeholder='Nombre'
              onChange={handleChangeNombre}
              {...register("nombre", {
                required: {
                  value: true,
                  message: "El Nombre es requerido",
                },
                maxLength: 20,
                minLength: 2,
              })}
            />
            <div className='flex justify-start text-red-600'>
              {errors.nombre?.type === "required" && <span>El nombre requerido</span>}
              {errors.nombre?.type === "maxLength" && (
                <span>El nombre no debe ser mayor a 20 caracteres</span>
              )}
              {errors.nombre?.type === "minLength" && (
                <span>Nombre debe ser mayor a 2 caracteres</span>
              )}
            </div>
          </div>
          <div className='group flex-col w-full justify-start gap-2 rounded-md py-3'>
            <input
              className='rounded-md border px-6 py-5 w-full font-medium text-gray-700 border-gray-100 focus-within:border-[#3A2834] focus-within:ring-2 focus-within:ring-[#3A2834] focus:outline-none'
              type="number"
              placeholder='Ingrese monto'
              onChange={handleChangeMonto}
              defaultValue="0"
              min="0"
              step={0.01}
              {...register("monto", {
                required: {
                  value: true,
                  message: "El monto es requerido",
                },
                maxLength: 10,
                minLength: 0,
              })}
            />
            <div className='flex justify-start text-red-600'>
              {errors.monto?.type === 'required' && <p className='text-danger text-small d-block mb-2'>El campo monto es requerido</p>}
              {errors.monto?.type === 'maxLength' && <p className='text-danger text-small d-block mb-2'>El campo monto debe tener menos de 10 caracteres</p>}
              {errors.monto?.type === 'minLength' && <p className='text-danger text-small d-block mb-2'>El campo monto debe tener menos de 1 caracter</p>}
            </div>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <button className='rounded-md border px-4 py-5 focus:bg-[#40d64c]  hover:bg-[#40d64c]  border-gray-100   block mb-2 text-xl w-full group' type='button' onClick={() => handleChangeTipo('ingreso')}><FontAwesomeIcon className='group-focus:text-white group-hover:text-white text-green-400 px-2' icon={faArrowDown} /> Ingreso</button>
            <button className='rounded-md border px-4 py-5 focus:bg-[#f85f5f] hover:bg-[#f85f5f]  border-gray-100   block mb-2 text-xl w-full group' type='button' onClick={() => handleChangeTipo('gasto')}><FontAwesomeIcon className='group-focus:text-white group-hover:text-white text-red-400 px-2' icon={faArrowUp} /> Gasto</button>
          </div>
          <div className='w-full group flex-col py-3'>
            <select
              name=""
              id=""
              onChange={handleChangeCategoria}
              className='group flex w-full px-6 py-5 cursor-pointer items-center justify-between rounded-md border text-gray-700 shadow-sm outline-none transition-all duration-400 focus:border-[#3A2834] focus:ring-2 focus:ring-[#3A2834] hover:bg-white data-[state=open]:bg-white data-[placeholder]:text-[#3A2834] bg-white font-medium'
              {...register('categoria', {
                required: true,
                minLength: {
                  value: 1,
                }
              })}
            >
              <option value="" disabled>Categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className='flex justify-start text-red-600'>
              {errors.categoria?.type === 'required' && <p className='text-danger text-small d-block mb-2'>El campo categoria es requerido</p>}
              {errors.categoria?.type === 'minLength' && <p className='text-danger text-small d-block mb-2'>El campo categoria debe tener al menos 1</p>}
            </div>
          </div>
          <button
            className='rounded-md border px-4 py-5 bg-green-600 hover:bg-green-500 text-white w-full text-xl'>
            Añade una transacción
          </button>
        </form>
        <Toaster richColors/>
      </div>
    </div>
  )
}

export default TransactionForm