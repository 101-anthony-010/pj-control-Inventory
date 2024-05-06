import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/auth.slice';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <nav className='absolute w-[80px] h-screen top-0 left-0 bg-slate-100 grid items-center justify-center'>
      <div className='w-[40px] h-[40px] m-auto'>
        <img src="/img/ico.png" className='w-full h-full object-contain' alt="" />
      </div>
      <div className='grid gap-4 items-center justify-center'>
        <Link className={`rounded-md p-2 hover:bg-red-50 w-[50px] h-[50px] ${location.pathname === '/asignation' ? 'bg-red-400' : ''}`} to='/asignation'><img src="/icons/evaluacion.png" alt="" /></Link>
        <Link className={`rounded-md p-2 hover:bg-red-50 w-[50px] h-[50px] ${location.pathname === '/product' ? 'bg-red-400' : ''}`} to='/product'><img src="/icons/bienes.png" alt="" /></Link>
        <Link className={`rounded-md p-2 hover:bg-red-50 w-[50px] h-[50px] ${location.pathname === '/user' ? 'bg-red-400' : ''}`} to='/user'><img src="/icons/perfil.png" alt="" /></Link>
        <Link className={`rounded-md p-2 hover:bg-red-50 w-[50px] h-[50px] ${location.pathname === '/add' ? 'bg-red-400' : ''}`} to='/add'><img src="/icons/perfil.png" alt="" /></Link>
      </div>

      <div className='grid gap-4 items-center justify-center'>
        <div  className='w-[30px] m-auto h-[30px] hover:cursor-pointer'>
          <img src="/icons/configuraciones.png" className='w-full h-full object-contain' alt="" />        
        </div>
        <div onClick={() => handleClickLogOut()} className='w-[30px] m-auto h-[30px]'>
          <img src="/icons/log-out.png" className='w-full h-full object-contain' alt="" />        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
