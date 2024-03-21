import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

//Slice
import { changeIsShowDeletedProduct } from '../store/slices/deletedProduct.slice'
import axios from 'axios'

const DeletedProduct = () => {
  const { register, handleSubmit, reset, setValue } = useForm()
  const dispatch = useDispatch()
  
  const handleClickChangeShowDeletedProduct = () => {
    dispatch(changeIsShowDeletedProduct())
  }

  const submit = (data) => {
    axios
      .delete(`http://localhost:3000/api/v1/product/${data.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }
  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 text-white bg-red-500 rounded-md m-2' onClick={handleClickChangeShowDeletedProduct}>X</button>
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-5'>
      
        <label htmlFor="id">Numero de Id: </label>
        <input type="number" {...register("id")} id="id" name="id" required />

        <button onClick={handleClickChangeShowDeletedProduct} className='bg-blue-500 text-white rounded-md col-span-2 p-2 font-bold'>Borrar Producto</button>
      </form>
    </section>
  )
}

export default DeletedProduct