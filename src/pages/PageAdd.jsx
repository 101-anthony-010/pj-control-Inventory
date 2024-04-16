import React, { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../utils/configAxios'

const PageAdd = () => {
  const { register, handleSubmit, reset, setValue } = useForm()

  const submitSede = (data) => {
    console.log(data)
    axiosPoderJudicial
      .post('/sede',data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
  return (
    <div>
      <Navbar/>
      <div className='w-96 grid gap-2 m-auto'>
        <h1 className='font-bold text-2xl'>User</h1>
        <form onSubmit={handleSubmit(submitSede)} className='gap-2 grid-cols-2 grid' action="">
          <h4>SEDE</h4>
          <input {...register('sede')} className='bg-slate-200 rounded-md p-2' type="text" />
          <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
        </form>
        <form className='gap-2 grid-cols-2 grid' action="">
          <h4>CARGO</h4>
          <input {...register('cargo')} className='bg-slate-200 rounded-md p-2' type="text" />
          <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
        </form>
        <form className='gap-2 grid-cols-2 grid' action="">
          <h4>DEPENDENCIA</h4>
          <input {...register('dependencia')} className='bg-slate-200 rounded-md p-2' type="text" />
          <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
        </form>
      </div>
      <div className='w-96 gap-2 grid m-auto'>
        <h1 className='font-bold text-2xl'>Producto</h1>
        <form className='gap-2 grid-cols-2 grid' action="">
          <h4>MODELO MARCA</h4>
          <input className='bg-slate-200 rounded-md p-2' type="text" />
          <h4>MARCA ID</h4>
          <input className='bg-slate-200 rounded-md p-2' type="number" />
          <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
        </form>
        <form className='gap-2 grid-cols-2 grid' action="">
          <h4>MARCA</h4>
          <input className='bg-slate-200 rounded-md p-2' type="text" />
          <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
        </form>
      </div>
    </div>
  )
}

export default PageAdd