import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-center items-center gap-10 p-4'>
      <p>logo</p>
      <Link to={'/asignation'}>Asignacion</Link>
      <Link to={'/product'}>Producto</Link>
      <Link to={'/user'}>Usuario</Link>
    </nav>
  )
}

export default Navbar