import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { logOut, loginAuth } from '../store/slices/auth.slice';

const PageLogin = () => {
  const { register, handleSubmit, reset, setValue } = useForm()

  const { token } = useSelector(store => store.authSlice)

  const dispatch = useDispatch()

  const submit = (data) => {
    console.log(first)
    dispatch(loginAuth(data))
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-full top-0 h-full absolute bg-cover bg-[url('/img/PJ.jpg')]">
        <div className='w-full h-full bg-white/30'></div>
      </div>
      
      <form className='shadow-xl absolute w-[350px] top-1/2 -translate-y-1/2 grid left-10 translate-x-10 gap-6 bg-white p-4 rounded-md'  onSubmit={handleSubmit(submit)} action="" >
        <div className='m-auto w-[180px] h-[180px]'>
          <img src="/img/logoPJ.png" className='object-contain w-full h-full ' alt="" />
        </div>

        <label htmlFor="email">Correo: </label>
        <input className='bg-slate-100 p-2 rounded-md' type="text" {...register("email")} id="email" name='email' required />

        <label htmlFor="password">Contraseña: </label>
        <input className='bg-slate-100 p-2 rounded-md' type="password" {...register("password")} id="password" name='password' required />

        <button className='m-2 rounded-md p-2 bg-blue-500 text-white font-bold'>Ingresar</button>
      </form>
    </section>
  )
}

export default PageLogin