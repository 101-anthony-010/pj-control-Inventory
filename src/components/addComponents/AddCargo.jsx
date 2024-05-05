import React from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../../utils/configAxios'

const AddCargo = () => {
  const { register, handleSubmit, reset, setValue } = useForm()

  const submit = (data) => {
    axiosPoderJudicial
      .post('/cargo',data)
      .then(res => window.alert("Se creo el cargo con Exito"))
      .catch(err => console.log(err))
    
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='gap-2 grid-cols-2 grid' action="">
      <h4>CARGO</h4>
      <input required {...register('name')} className='bg-slate-200 rounded-md p-2' type="text" />
      <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
    </form>
  )
}

export default AddCargo