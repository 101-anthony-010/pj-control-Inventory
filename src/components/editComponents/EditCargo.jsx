import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changeIsShowUpdatedCargo } from '../../store/slices/user.slice'
import { axiosPoderJudicial } from '../../utils/configAxios'

export const EditCargo = ({dataCargo}) => {
  const dispacth = useDispatch()
  const { register, handleSubmit, reset, setValue } = useForm()

  const handleChangeShowIsCargoUpdated = () => {
    dispacth(changeIsShowUpdatedCargo())
  }

  setValue('name', dataCargo.name)
  const submit = (data) => {
    data.id = dataCargo.id
    axiosPoderJudicial
      .patch('/cargo',data)
      .then(res => window.alert("Se edito la sede con Exito"))
      .catch(err => console.log(err))
    // setLoading(false)
    reset()
    window.location.reload()
    // handleChangeShowIsSede()
  }
  return (
    <>
      <section className='grid w-full h-full items-center justify-center'>
        <section className='relative max-w-md bg-white p-8 rounded-md shadow-md'>
          <div className='absolute w-[35px] h-[35px] top-0 right-0 p-2 hover:cursor-pointer' onClick={handleChangeShowIsCargoUpdated}>
            <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
          </div>
          <form onSubmit={handleSubmit(submit)} className='gap-4 grid-cols-2 grid items-center justify-center' action="">
            <h4>Cargo</h4>
            <input required {...register('name')} className='bg-slate-100 rounded-md p-2 shadow' type="text" />
            <button className='col-span-2 p-2 bg-yellow-500 font-semibold text-white hover:bg-yellow-400 shadow-md rounded-md text-lg'>Editar</button>
          </form>
        </section>
      </section>
    </>
  )
}
