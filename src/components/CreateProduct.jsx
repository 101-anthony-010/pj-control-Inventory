import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';

//Slices
import { changeIsShowCreateProduct } from '../store/slices/createProduct.slice';

const DEFAULT_VALUES = {

} 

const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  
  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct())
  }

  const submit = (data) => {
    console.log(data)
    reset(DEFAULT_VALUES)
  }
  
  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
        <button className='font-bold text-2xl absolute right-0 top-0 px-2 text-white bg-red-500 rounded-md m-2' onClick={handleClickChangeShowCreateProduct}>X</button>
        <form className='grid grid-cols-2 gap-5'>
            <label htmlFor="marca">Marca:</label>
            <select name="marca" id="marcaId">
                <option value="Lenovo">Lenovo</option>
                <option value="Hp">Hp</option>
            </select>

            <label htmlFor="modelId">Modelo del Producto:</label>
            <select name="modelo" id="modelId">
                <option value="Lenovo">Lenovo</option>
                <option value="Hp">Hp</option>
            </select>
            
            <label htmlFor="numSerie">Número de Serie:</label>
            <input type="text" id="numSerie" name="numSerie" required />
            
            <label htmlFor="userId">Nombre de Usuario:</label>
            <input type="text" id="userId" name="userId" required />
            
            <label htmlFor="date">Fecha:</label>
            <input type="date" id="date" name="date" required />
            
            <label htmlFor="description">Descripción:</label>
            <textarea type="text" id="description" name="description" required ></textarea>
            
            <label htmlFor="amount">Cantidad:</label>
            <input type="number" id="amount" name="amount" required />
            
            <button className='bg-green-500 text-white rounded-md col-span-2 p-2 font-bold' type="submit">Crear Producto</button>
    </form>
    </section>
  )
}

export default CreateProduct