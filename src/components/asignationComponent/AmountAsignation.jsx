import React from 'react'
import { useEffect } from 'react'

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';
import { useForm } from 'react-hook-form';

const AmountAsignation = ({ handleClickChangeShowAmountAsignation, infoAsignation }) => {
  const { register, handleSubmit, reset, setValue } = useForm()
  
  const submit = (data) => {
    axiosPoderJudicial
      .patch(`/asignation/amountPages/${infoAsignation.productId}`,data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
    reset()
    handleClickChangeShowAmountAsignation({})
  }

  return (
    <section className='bg-white max-w-2xl rounded-md p-10 relative'>
      <button onClick={() => handleClickChangeShowAmountAsignation({})} className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' >
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid gap-4'>
        <label htmlFor="">Cantidad de Hojas de Toner</label>
        <input type="number" {...register('amountPages')} id='amountPages' name='amountPages' className='p-2 bg-slate-100 rounded-md' />

        <button className='bg-green-500 text-white font-bold p-2 rounded-md'>Agregar</button>
      </form>
     
    </section>
  )
}

export default AmountAsignation