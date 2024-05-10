import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/slices/auth.slice';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false); 
  const [showText, setShowText] = useState(false); 
  const { user } = useSelector(store => store.authSlice);

  const handleClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <nav className={`${(user.rol === 'admin') ? 'fixed' : 'hidden'} ${expanded ? 'w-[180px]' : 'w-[70px]'} h-screen z-30 top-0 left-0 bg-slate-700 grid items-center justify-center transition-all duration-300`}>
        <div className={`absolute top-0 left-0 ${expanded ? 'w-[180px]' : 'w-[70px]'} h-[50px] flex items-center justify-center transition-all duration-300 bg-slate-400`}>
          <div onClick={() => {
            setExpanded(!expanded);
            setShowText(!showText); 
          }} className={`${expanded ? 'w-[120px]' : 'w-[30px]'} m-auto hover:cursor-pointer`}>
            {showText ? <p className='font-semibold'>INVENTORY PJ</p> : <img src="/icons/ui-element.png" className='w-full h-full object-contain' alt="" />}
          </div>
        </div>
        <div className={`absolute top-16 ${expanded ? 'w-[180px]' : 'w-[70px]'} transition-all duration-200 grid gap-2 items-center justify-center`}>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/control' ? 'bg-blue-300' : ''}`} to='/control' title="Panel de Control">{showText ? <p>Panel de Control</p> : <img src="/icons/dashboard.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/user' ? 'bg-blue-300' : ''}`} to='/user' title='Accesos'>{showText ? <p>Accesos</p> : <img src="/icons/authorization.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/marca' ? 'bg-blue-300' : ''}`} to='/marca' title='Categorias'>{showText ? <p>Categorias</p> : <img src="/icons/3d-modeling.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/product' ? 'bg-blue-300' : ''}`} to='/product' title='Productos'>{showText ? <p>Productos</p> : <img src="/icons/box.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/dependencia' ? 'bg-blue-300' : ''}`} to='/dependencia' title='Dependencias'>{showText ? <p>Dependencias</p> : <img src="/icons/weights.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/cargo' ? 'bg-blue-300' : ''}`} to='/cargo' title='Cargo'>{showText ? <p>Cargo</p> : <img src="/icons/portfolio.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/asignation' ? 'bg-blue-300' : ''}`} to='/asignation' title='Asignaciones'>{showText ? <p>Asignaciones</p> : <img src="/icons/qa.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/productDisable' ? 'bg-blue-300' : ''}`} to='/productDisable' title='Toner consumidos'>{showText ? <p>Toner Consumidos</p> : <img src="/icons/toner.png" alt="" />}</Link>
          <Link className={`rounded-md p-2 hover:bg-white/50 text-white ${expanded ? 'w-[140px]' : 'w-[50px]'} transition-all duration-300 ${location.pathname === '/sede' ? 'bg-blue-300' : ''}`} to='/sede' title='Sede'>{showText ? <p>Sedes</p> : <img src="/icons/map.png" alt="" />}</Link>
        </div>

        <div onClick={() => handleClickLogOut()} className={`${expanded ? 'w-[180px]' : 'w-[70px]'} m-auto h-[30px] absolute bottom-4 hover:cursor-pointer transition-all duration-300`}>
        {showText ? <p className='font-semibold rounded-md m-auto p-2 bg-red-500 w-[80px] text-center text-white shadow-md hover:bg-blue-300 transition-all duration-300'>Salir</p> : <img src="/icons/logout.png" className='w-full h-full object-contain transition-all duration-300' alt="" />}
        </div>
      </nav>
      <nav className='w-full h-[50px] shadow-md z-20 bg-white fixed top-0 left-0 flex justify-end items-center gap-6 px-6 py-2 transition-all duration-300'>
        <div className={`w-[30px] h-[30px]`}>
          <img src="/icons/perfil.png" alt="" />
        </div>
        <p>{(user.rol === "admin") ? "Administrador" : "Usuario"}</p>
        <div onClick={() => handleClickLogOut()} className={`${(user.rol === 'employee' ? 'none' : 'hidden')} w-[40px] h-[40px] hover:cursor-pointer hover:bg-red-400 transition-all duration-300 p-1 rounded-full`}>
          <img src="/icons/logout.png" className='w-full h-full object-contain transition-all duration-300' alt="" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
