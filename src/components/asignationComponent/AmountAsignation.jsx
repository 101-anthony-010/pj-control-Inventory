import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

const AmountAsignation = ({ handleClickChangeShowAmountAsignation, amountId }) => {
  const { register, handleSubmit, reset } = useForm()

  const submit = (data) => {
    axiosPoderJudicial
      .patch(`/asignation/amountPages/${amountId.productId}`,data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
    reset()
    window.location.reload();
    // handleClickChangeShowAmountAsignation({})
  }

  return (
    <section className='bg-white max-w-2xl rounded-md p-10 relative'>
      <button onClick={() => handleClickChangeShowAmountAsignation({})} className='font-bold text-2xl absolute right-0 top-0 p-2 w-[35px] h-[35px] rounded-md m-2' >
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid gap-4'>
        <label htmlFor="">Cantidad de Hojas de Toner</label>
        <input type="number" {...register('amountPages')} id='amountPages' name='amountPages' className='p-2 bg-slate-100 rounded-md' />

        <button className='hover:bg-green-400 text-base bg-green-500 text-white font-bold p-2 rounded-md'>Agregar</button>
      </form>
     
    </section>
  )
}

export default AmountAsignation