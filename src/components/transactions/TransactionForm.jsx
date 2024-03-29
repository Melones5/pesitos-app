import React, { useState, useRef } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faCheck, faXmark, faX } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import DatePicker from '../DatePicker/DatePicker'


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
      fecha:"" ,
    },
  });

  const form = useRef();

  const { addTransaction } = useGlobalState();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState(0);
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoría] = useState("");
  const [fecha, setFecha] = useState(new Date());

  const handleChangeNombre = (e) => {    
    setNombre(e.target.value)
  }

  const handleChangeMonto = (e) => {    
    setMonto(e.target.value)
  }

  const handleChangeTipo = (value) => {
    // modo botón    
    setTipo(value)
  }

  const handleChangeCategoria = (e) => {    
    setCategoría(e.target.value)
  }

  const handleChangeDate = (selectedDate) => {    
    setFecha(selectedDate)
  }

  const categorias = [
    'Sueldo',
    'Compras',
    'Entretenimientos',
    'Restaurantes y bares',
    'Salud y deporte',
    'Varios',
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
    data.fecha = fecha
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
      <div className='flex flex-col w-full font-fredoka'>
        <button className='flex justify-end items-center py-0' onClick={handleOnCloseForm}>
          <FontAwesomeIcon className='p-2 text-gray-400 hover:text-background-primary hover:rounded-md hover:bg-slate-100 hover:transition-all hover:delay-100 hover:duration-100 w-[16px] h-[16px]' icon={faX}/>
        </button>
        <h2 className='flex justify-start font-normal text-2xl'>Registrar una transacción</h2>
        <p className='text-start font-light text-gray-500 text-md lg:text-lg mb-2'>Complete los campos para registrar un nuevo movimiento financiero</p>
        <form className='flex flex-col gap-3 sm:gap-4' ref={form} onSubmit={onSubmit}>
          <div className='group flex-col w-full justify-start gap-2 rounded-md'>
            <input
              className='rounded-md border-2 px-6 py-5 w-full font-medium bg-slate-100 text-gray-700 border-gray-200 focus-within:border-background-primary focus-within:ring-1 focus-within:ring-background-primary focus:outline-none'
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
            <div className='flex justify-start text-red-600 text-sm mt-1'>
              {errors.nombre?.type === "required" && <span>El nombre requerido</span>}
              {errors.nombre?.type === "maxLength" && (
                <span>El nombre no debe ser mayor a 20 caracteres</span>
              )}
              {errors.nombre?.type === "minLength" && (
                <span>Nombre debe ser mayor a 2 caracteres</span>
              )}
            </div>
          </div>
          <div className='group flex-col w-full justify-start gap-2 rounded-md'>
            <input
              className='rounded-md border-2 px-6 py-5 w-full font-medium bg-slate-100 text-gray-700 border-gray-200 focus-within:border-background-primary focus-within:ring-1 focus-within:ring-background-primary focus:outline-none'
              type="number"
              placeholder='$ 0,00'
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
            <div className='flex justify-start text-red-600 text-sm mt-1'>
              {errors.monto?.type === 'required' && <p>El campo monto es requerido</p>}
              {errors.monto?.type === 'maxLength' && <p>El campo monto debe tener menos de 10 caracteres</p>}
              {errors.monto?.type === 'minLength' && <p>El campo monto debe tener menos de 1 caracter</p>}
            </div>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <button className='rounded-md border px-4 py-5 focus:bg-button-green  hover:bg-button-green  border-gray-100   block mb-2 text-md w-full group transition-all duration-400 bg-green-75 ' type='button' onClick={() => handleChangeTipo('ingreso')}
            ><FontAwesomeIcon className='group-focus:text-white group-hover:text-white text-green-400 px-2' icon={faArrowDown} /> Ingreso</button>
            <button className='rounded-md border px-4 py-5 focus:bg-button-red hover:bg-button-red  border-gray-100   block mb-2 text-md w-full group transition-all duration-400' type='button' onClick={() => handleChangeTipo('gasto')}><FontAwesomeIcon className='group-focus:text-white group-hover:text-white text-red-400 px-2' icon={faArrowUp} /> Gasto</button>
          </div>
          <div className='w-full group flex-col'>
            <select
              name=""
              id=""
              onChange={handleChangeCategoria}
              className='group flex w-full px-6 py-5 cursor-pointer items-center justify-between rounded-md border-2 bg-slate-100 text-gray-700 shadow-sm outline-none transition-all duration-400 focus:border-background-primary focus:ring-1 focus:ring-background-primary hover:bg-white font-medium appearance-none group'
              data-state=''
              {...register('categoria', {
                required: true,
                minLength: {
                  value: 1,
                }
              })}
            >
              <option value="" disabled>Categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat} className='font-bold text-sm text-background-primary'>{cat}</option>
              ))}
            </select>
            <div className='flex justify-start text-red-600 text-sm mt-1'>
              {errors.categoria?.type === 'required' && <p>El campo categoria es requerido</p>}
              {errors.categoria?.type === 'minLength' && <p>El campo categoria debe tener al menos 1</p>}
            </div>
          </div>
          <div>
            <DatePicker 
              selectedDate={fecha}
              onDateChange={handleChangeDate}
            />
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