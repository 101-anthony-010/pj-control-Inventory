import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../utils/configAxios'

//Components
import Navbar from '../components/layout/Navbar'
import AddSede from '../components/addComponents/AddSede'
import AddCargo from '../components/addComponents/AddCargo'
import AddDependencia from '../components/addComponents/AddDependencia'
import AddModel from '../components/addComponents/AddModel'
import AddMarca from '../components/addComponents/AddMarca'

const PageAdd = () => {

  return (
    <div>
      <Navbar/>
      <div className='w-96 grid gap-2 m-auto'>
        <h1 className='font-bold text-2xl'>User</h1>
        <AddSede/>
        <AddCargo/>
        <AddDependencia/>
      </div>
      <div className='w-96 gap-2 grid m-auto'>
        <h1 className='font-bold text-2xl'>Producto</h1>
        <AddModel/>
        <AddMarca/>
      </div>
    </div>
  )
}

export default PageAdd