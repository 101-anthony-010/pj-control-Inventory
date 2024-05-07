import React from 'react'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changeIsShowSede } from '../../store/slices/user.slice'

const AddSede = () => {
  const dispacth = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  const handleChangeShowIsSede = () => {
    dispacth(changeIsShowSede())
  }

  const submit = (data) => {
    axiosPoderJudicial
      .post('/sede',data)
      .then(res => window.alert("Se creo la sede con Exito"))
      .catch(err => console.log(err))

    reset()
  }

  return (
        <>
          <section className='grid w-full h-full items-center justify-center'>
            <section className='relative max-w-md bg-white p-8 rounded-md shadow-md'>
              <div className='absolute w-[25px] h-[25px] top-0 right-0 p-1 hover:cursor-pointer' onClick={handleChangeShowIsSede}>
                <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
              </div>
              <form onSubmit={handleSubmit(submit)} className='gap-2 grid-cols-2 grid' action="">
                <h4>Sede</h4>
                <input required {...register('name')} className='bg-slate-200 rounded-md p-2' type="text" />
                <h4>Direccion</h4>
                <input required {...register('address')} className='bg-slate-200 rounded-md p-2' type="text" />
                <button className='col-span-2 p-2 bg-green-500 font-semibold text-white hover:bg-green-400 shadow-md rounded-md'>Agregar</button>
              </form>
            </section>
          </section>
        </>
  )
}

export default AddSede