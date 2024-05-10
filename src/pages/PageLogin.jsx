import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

// Slices
import { loginAuth } from '../store/slices/auth.slice';

// Components
import Loader from '../components/layout/loader';

const PageLogin = () => {
  const { register, handleSubmit } = useForm();
  const { token, user } = useSelector(store => store.authSlice);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    dispatch(loginAuth(data));

  };


  if (loading) {
    return <Loader/>;
  } else if (token && (user.rol === 'admin')) {
    return <Navigate to="/control" />;
  } else if (token && (user.rol === 'employee')) {
    return <Navigate to="/employee" />;
  } else {
    return (
      <section className="flex justify-center items-center h-screen">
        <div className="w-full top-0 h-full absolute bg-cover bg-[url('/img/PJ.jpg')]">
          <div className='w-full h-full bg-white/30'></div>
        </div>
        <form className='shadow-xl absolute w-[350px] top-1/2 -translate-y-1/2 grid left-10 translate-x-10 gap-6 bg-white p-4 rounded-md' onSubmit={handleSubmit(submit)} action="" >
          <div className='m-auto w-[180px] h-[180px]'>
            <img src="/img/logoPJ.png" className='object-contain w-full h-full ' alt="" />
          </div>

          <label htmlFor="email">Correo: </label>
          <input className='bg-slate-100 p-2 rounded-md' type="text" {...register("email")} id="email" name='email' required />

          <label htmlFor="password">Contraseña: </label>
          <input className='bg-slate-100 p-2 rounded-md' type="password" {...register("password")} id="password" name='password' required />

          <button className='m-2 rounded-md p-2 bg-blue-500 hover:bg-blue-500/85 text-white font-bold'>Ingresar</button>
        </form>
      </section>
    );
  }
}

export default PageLogin;
