import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='relative flex justify-center items-center gap-10 p-4 shadow-md'>
      <box-icon type='logo' name='react'></box-icon>
      <Link to={'/asignation'}>Asignacion</Link>
      <Link to={'/product'}>Producto</Link>
      <Link to={'/user'}>Usuario</Link>

      <div className='absolute right-10 top-1/2 -translate-y-1/2'>
        o
      </div>
    </nav>
  )
}

export default Navbar