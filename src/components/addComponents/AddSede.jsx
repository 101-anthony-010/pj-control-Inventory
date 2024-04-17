import React from 'react'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useForm } from 'react-hook-form'

const AddSede = () => {
  const { register, handleSubmit, reset, setValue } = useForm()

  const submit = (data) => {
    axiosPoderJudicial
      .post('/sede',data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  return (
        <form onSubmit={handleSubmit(submit)} className='gap-2 grid-cols-2 grid' action="">
          <h4>SEDE</h4>
          <input {...register('name')} className='bg-slate-200 rounded-md p-2' type="text" />
          <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
        </form>
  )
}

export default AddSede