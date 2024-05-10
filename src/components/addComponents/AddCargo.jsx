import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

// Utils
import { axiosPoderJudicial } from '../../utils/configAxios'

// Slices
import { changeIsShowCreateCargo } from '../../store/slices/user.slice'

const AddCargo = () => {
  const dispacth = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  const handleChangeShowIsCargo = () => {
    dispacth(changeIsShowCreateCargo())
  }

  const submit = (data) => {
    axiosPoderJudicial
      .post('/cargo',data)
      .then(res => window.alert("Se creo el cargo con Exito"))
      .catch(err => console.log(err))
    
    reset()
    window.location.reload()
  }

  return (
    <>
          <section className='grid w-full h-full items-center justify-center'>
            <section className='relative max-w-md bg-white p-8 rounded-md shadow-md'>
              <div className='absolute w-[35px] h-[35px] top-0 right-0 p-2 hover:cursor-pointer' onClick={handleChangeShowIsCargo}>
                <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
              </div>
              <form onSubmit={handleSubmit(submit)} className='gap-4 grid-cols-2 grid items-center justify-center' action="">
                <h4>Cargo</h4>
                <input required {...register('name')} className='bg-slate-100 rounded-md p-2 shadow' type="text" />
                <button className='col-span-2 p-2 bg-green-500 font-semibold text-white hover:bg-green-400 shadow-md rounded-md text-lg'>Agregar</button>
              </form>
            </section>
          </section>
        </>
  )
}

export default AddCargo