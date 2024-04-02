import React from 'react'
import { useForm } from 'react-hook-form'

const PageLogin = () => {
  const { register, handleSubmit, reset, setValue } = useForm()

  const submit = (data) => {
    console.log(data)
  }
  
  return (
    <section className='flex justify-center items-center h-screen bg-slate-200'>
      <form className='grid justify-center items-center gap-4 bg-white p-4 rounded-md'  onSubmit={handleSubmit(submit)} action="" >
        <div className='m-auto'>
          <box-icon type='logo' name='react'></box-icon>
        </div>

        <label htmlFor="email">Correo: </label>
        <input className='bg-slate-100 p-2 rounded-md' type="text" {...register("email")} id="email" name='email' required />

        <label htmlFor="password">Contraseña: </label>
        <input className='bg-slate-100 p-2 rounded-md' type="password" {...register("password")} id="password" name='password' required />

        <button className='rounded-md p-2 bg-blue-500 text-white font-bold'>Ingresar</button>
      </form>
    </section>
  )
}

export default PageLogin