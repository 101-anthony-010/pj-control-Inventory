import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changeIsShowUpdatedDependencia } from '../../store/slices/user.slice'
import { axiosPoderJudicial } from '../../utils/configAxios'

const EditDependencia = ({ dataDependencias }) => {
  const dispacth = useDispatch()
  const { register, handleSubmit, reset, setValue } = useForm()

  const handleChangeShowIsDependenciaUpdated = () => {
    dispacth(changeIsShowUpdatedDependencia())
  }

  setValue('name', dataDependencias.name)

  const submit = (data) => {
    data.id = dataDependencias.id
    axiosPoderJudicial
      .patch('/dependencia',data)
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
          <div className='absolute w-[35px] h-[35px] top-0 right-0 p-2 hover:cursor-pointer' onClick={handleChangeShowIsDependenciaUpdated}>
            <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
          </div>
          <form onSubmit={handleSubmit(submit)} className='gap-4 grid-cols-2 grid items-center justify-center' action="">
            <h4>Dependencia</h4>
            <input required {...register('name')} className='bg-slate-100 rounded-md p-2 shadow' type="text" />
            <button className='col-span-2 p-2 bg-yellow-500 font-semibold text-white hover:bg-yellow-400 shadow-md rounded-md text-lg'>Editar</button>
          </form>
        </section>
      </section>
    </>
  )
}

export default EditDependencia