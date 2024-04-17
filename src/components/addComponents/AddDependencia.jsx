import React from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../../utils/configAxios'

const AddDependencia = () => {
  const { register, handleSubmit, reset, setValue } = useForm()

  const submit = (data) => {
    axiosPoderJudicial
      .post('/dependencia',data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='gap-2 grid-cols-2 grid' action="">
      <h4>DEPENDENCIA</h4>
      <input {...register('name')} className='bg-slate-200 rounded-md p-2' type="text" />
      <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
    </form>
  )
}

export default AddDependencia