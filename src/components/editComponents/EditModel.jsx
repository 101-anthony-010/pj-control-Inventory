import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changeIsShowUpdatedModel } from '../../store/slices/user.slice'
import { axiosPoderJudicial } from '../../utils/configAxios'

const EditModel = ({dataModels}) => {
  const [marca, setMarca] = useState([])
  const dispacth = useDispatch()
  const { register, handleSubmit, reset, setValue } = useForm()

  const handleChangeShowIsModelUpdated = () => {
    dispacth(changeIsShowUpdatedModel())
  }
  const submit = (data) => {
    data.id = dataModels.id
    data.marcaId = dataModels.marcaId

    axiosPoderJudicial
      .patch('/modelProduct',data)
      .then(res => window.alert("Se edito el modelo con Exito"))
      .catch(err => console.log(err))
    // setLoading(false)
    reset()
    window.location.reload()
    // handleChangeShowIsSede()
  }
setValue('name', dataModels.name)
  const handleNameId = (data, id) => {
    if (id !== undefined && data.length !== 0 ) {
      const name = data.find(item => item.id === id)
      return name ? name.name : "cargando"
    }
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarca(res.data.marcas))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2 w-[35px] h-[35px]' onClick={() => handleChangeShowIsModelUpdated()}>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>

      <form className='grid grid-cols-[auto_auto_1fr] gap-2 items-center justify-center' onSubmit={handleSubmit(submit)}>

        <label >Modelo:</label>
        <label className='uppercase font-semibold'>{handleNameId(marca, dataModels?.marcaId)}</label>
        <input className='rounded-md bg-slate-100 p-2' type="text" {...register("name")} required />
        
        {/* <label htmlFor="cargoId">Cargo:</label>
        <select className='rounded-md bg-slate-100 p-2' name="cargoId" {...register("cargoId")} >
          <option value="">Seleccione un cargo</option>
          {cargos?.map(cargo => <option key={cargo.id} value={cargo.id}>{cargo.name}</option>)}
        </select> */}

        <button type="submit" className='bg-yellow-500 hover:bg-yellow-400 shadow text-white rounded-md col-span-3 py-2 mx-10 font-bold'>Guardar Cambios</button>
      </form>

    </section>
  )
}

export default EditModel