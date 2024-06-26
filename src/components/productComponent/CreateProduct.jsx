import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios'

//Slices
import { changeIsShowCreateProduct } from '../../store/slices/product.Slice';

const CreateProduct = () => {
  const [marcas, setMarcas] = useState([])
  const [modelos, setModelos] = useState([])
  const [users, setUsers] = useState([])
  const { register, handleSubmit, reset, setValue } = useForm()
  const dispatch = useDispatch()
  
  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct())
  }

  const submit = (data) => {
    const dateParts = data.dateInitial.split('-'); // Dividir la fecha en partes
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Crear el formato dd/mm/yyyy

    const send = {
      amount: Number(data.amount),
      dateInitial: formattedDate,
      description: data.description,
      marcaId: Number(data.marcaId),
      modelId: Number(data.modelId),
      numSerie: data.numSerie,
      userId: Number(data.userId),
    }
    axiosPoderJudicial
      .post('/product', send)
      .then((res) => console.log(res.data.product))
      .catch((err) => console.log(err))    

    // console.log(data)
    window.confirm("Producto creado con exito")
    reset()
    window.location.reload();
  }
  
  useEffect(() => {
    axiosPoderJudicial
      .get('/marca')
      .then((res) => setMarcas(res.data.marcas))
      .catch((err) => console.log(err))
    axiosPoderJudicial
      .get('/modelProduct')
      .then((res) => setModelos(res.data.modelsProducts))
      .catch((err) => console.log(err))
    axiosPoderJudicial
      .get('/user')
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err))
  }, [])

  const handleMarcaChange = async (event) => {
    const marcaId = event.target.value;
    
    const response = await axiosPoderJudicial.get('/modelProduct');
    const allModelos = response.data.modelsProducts;
    const modelosFiltrados = allModelos.filter(modelo => modelo.marcaId === Number(marcaId));    
    setModelos(modelosFiltrados);
    setValue("modelId", "");
  };
  
  return (
    <section className='bg-white max-w-2xl rounded-md shadow p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md w-[35px] h-[35px] m-2' onClick={handleClickChangeShowCreateProduct}>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-2'>

        <label htmlFor="marcaId">Marca:</label>
        <select className='rounded-md p-2 bg-slate-100 shadow' name="marcaId" {...register("marcaId")} id="marcaId" onChange={handleMarcaChange}>
          <option value="">Selecione una marca</option>
          {marcas?.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
        </select>

        <label htmlFor="modelId">Modelo del Producto:</label>
        <select className='rounded-md p-2 bg-slate-100 shadow' name="modelId" {...register("modelId")} id="modelId">
          <option value="">Selecione un modelo</option>
          {modelos?.map(modelo => <option key={modelo.id} value={modelo.id}>{modelo.name}</option>)}
        </select>
        
        <label htmlFor="numSerie">Número de Serie:</label>
        <input className='bg-slate-100 shadow p-2 rounded-md' type="text" {...register("numSerie")} id="numSerie" name="numSerie" required />
        
        <label htmlFor="userId">Nombre de Usuario:</label>
        <select className='rounded-md p-2 bg-slate-100 shadow' name="userId" {...register("userId")} id="userId">
          <option value="">Selecione un usuario</option>
          {users?.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>
        
        <label htmlFor="dateInitial">Fecha de Ingreso:</label>
        <input className='bg-slate-100 shadow p-2 rounded-md' type="date" {...register("dateInitial")} id="dateInitial" name="dateInitial" required />
        
        <label htmlFor="description">Descripción:</label>
        <textarea className='bg-slate-100 shadow rounded-mdd-md p-2' type="text" {...register("description")} id="description" name="description" required ></textarea>
        
        <label htmlFor="amount">Cantidad:</label>
        <input className='bg-slate-100 shadow p-2 rounded-md' type="number" {...register("amount")} id="amount" name="amount" defaultValue={1} required />
        
        <button className='bg-green-500 text-white rounded-md shadow col-span-2 p-2 font-bold'>Crear Producto</button>
      </form>
    </section>
  )
}

export default CreateProduct
