import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-center items-center gap-10 p-4 shadow-md'>
      <box-icon type='logo' name='react'></box-icon>
      <Link to={'/asignation'}>Asignacion</Link>
      <Link to={'/product'}>Producto</Link>
      <Link to={'/user'}>Usuario</Link>
    </nav>
  )
}

export default Navbar