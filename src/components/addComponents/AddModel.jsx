import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../../utils/configAxios'

const AddModel = () => {
  const [marcas, setMarcas] = useState([])
  // // const [modelos, setModelos] = useState([])
  const { register, handleSubmit, reset, setValue } = useForm()

  const submit = (data) => {
    axiosPoderJudicial
      .post('/modelProduct',data)
      .then(res => window.alert("Se creo el modelo con Exito"))
      .catch(err => console.log(err))

    reset()
  
  }

  const handleMarcaChange = async (event) => {
    const marcaId = event.target.value;
    
    const response = await axiosPoderJudicial.get('/modelProduct');
    const allModelos = response.data.modelsProducts;
    const modelosFiltrados = allModelos.filter(modelo => modelo.marcaId === Number(marcaId));    
    setModelos(modelosFiltrados);
    setValue("modelId", "");
  };

  useEffect(() => {
    axiosPoderJudicial
      .get('/marca')
      .then((res) => setMarcas(res.data.marcas))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <form onSubmit={handleSubmit(submit)} className='gap-2 grid-cols-2 grid' action="">
      <h4>MODELO MARCA</h4>
      <input required {...register('name')} className='bg-slate-200 rounded-md p-2' type="text" />
      <h4>MARCA ID</h4>
      <select className='rounded-md p-2 bg-slate-100' required {...register("marcaId")} id="marcaId" onChange={handleMarcaChange}>
        <option value="">Selecione una marca</option>
        {marcas?.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
      </select>
      <button className='col-span-2 p-2 bg-green-500 rounded-md'>Agregar</button>
    </form>
  )
}

export default AddModel