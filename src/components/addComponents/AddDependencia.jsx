import React from 'react'
import { useForm } from 'react-hook-form'

// Utils
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useDispatch } from 'react-redux'
import { changeIsShowCreateDependencia } from '../../store/slices/user.slice'

const AddDependencia = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispacth = useDispatch()

  const submit = (data) => {
    axiosPoderJudicial
      .post('/dependencia',data)
      .then(res => window.alert("Se creo la dependencia con Exito"))
      .catch(err => console.log(err))
  
    reset()
    window.location.reload()
  }

  const handleChangeShowIsDependencia = () => {
    dispacth(changeIsShowCreateDependencia())
  }

  return (
    <>
          <section className='grid w-full h-full items-center justify-center'>
            <section className='relative max-w-md bg-white p-8 rounded-md shadow-md'>
              <div className='absolute w-[35px] h-[35px] top-0 right-0 p-2 hover:cursor-pointer' onClick={handleChangeShowIsDependencia}>
                <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
              </div>
              <form onSubmit={handleSubmit(submit)} className='gap-4 grid-cols-2 grid items-center justify-center' action="">
                <h4>Dependencia</h4>
                <input required {...register('name')} className='bg-slate-100 rounded-md p-2 shadow' type="text" />
                <button className='col-span-2 p-2 bg-green-500 font-semibold text-white hover:bg-green-400 shadow-md rounded-md text-lg'>Agregar</button>
              </form>
            </section>
          </section>
        </>
  )
}

export default AddDependencia