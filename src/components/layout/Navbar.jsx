import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logOut } from '../../store/slices/auth.slice';

const Navbar = () => {
  const dispatch = useDispatch()

  const handleClickLogOut = () => {
    dispatch(logOut())
  }
  return (
    <nav className='relative flex justify-center items-center gap-10 p-4 shadow-md'>
      <div className='w-12 h-12 absolute left-6 top-1/2 -translate-y-1/2'>
        <img src="/img/logoPJ.png" className='w-full h-full object-contain' alt="" />
      </div>
      <Link to={'/asignation'}>Asignacion</Link>
      <Link to={'/product'}>Producto</Link>
      <Link to={'/user'}>Usuario</Link>

      <div onClick={() => handleClickLogOut()} className='absolute w-10 h-10 bg-slate-200 rounded-full hover:cursor-pointer right-10 top-1/2 -translate-y-1/2 '>
        
      </div>
    </nav>
  )
}

export default Navbar