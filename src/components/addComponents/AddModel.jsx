import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useDispatch } from 'react-redux'
import { changeIsShowCreateModel } from '../../store/slices/user.slice'

const AddModel = ({ loadMarcas }) => {
  const [marcas, setMarcas] = useState([])
  const dispacth = useDispatch()

  // // const [modelos, setModelos] = useState([])
  const { register, handleSubmit, reset, setValue } = useForm()

  const submit = (data) => {
    axiosPoderJudicial
      .post('/modelProduct',data)
      .then(res => window.alert("Se creo el modelo con Exito"))
      .catch(err => console.log(err))

    reset()
    window.location.reload()
  }

  const handleMarcaChange = async (event) => {
    const marcaId = event.target.value;
    
    const response = await axiosPoderJudicial.get('/modelProduct');
    const allModelos = response.data.modelsProducts;
    const modelosFiltrados = allModelos.filter(modelo => modelo.marcaId === Number(marcaId));    
    setModelos(modelosFiltrados);
    setValue("modelId", "");
  };

  const handleChangeShowIsModel = () => {
    dispacth(changeIsShowCreateModel())
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/marca')
      .then((res) => setMarcas(res.data.marcas))
      .catch((err) => console.log(err))
  }, [loadMarcas])
  
  return (
    <form onSubmit={handleSubmit(submit)} className='gap-2 grid-cols-2 grid bg-white rounded-md p-8 items-center justify-center relative' action="">
      <div onClick={handleChangeShowIsModel} className='w-[35px] h-[35px] p-2 absolute top-0 right-0 hover:cursor-pointer'>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </div>
      <h4>MARCA</h4>
      <select className='rounded-md p-2 bg-slate-100' required {...register("marcaId")} id="marcaId" onChange={handleMarcaChange}>
        <option value="">Selecione una marca</option>
        {marcas?.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
      </select>
      <h4>MODELO MARCA</h4>
      <input required {...register('name')} className='bg-slate-100 rounded-md p-2' type="text" />
      <button className='col-span-2 p-2 bg-green-500 rounded-md text-white hover:bg-green-400 font-semibold shadow'>Agregar</button>
    </form>
  )
}

export default AddModel