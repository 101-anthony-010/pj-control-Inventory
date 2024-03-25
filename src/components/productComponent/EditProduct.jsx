import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useForm } from 'react-hook-form'

//Slices
import { changeIsShowUpdatedProduct } from '../../store/slices/product.Slice'

const DEFAULT_VALUES = {
  marcaId: '',
  modelId: '',
  numSerie: '',
  userId: '',
  date: '',
  description: '',
  amount: '',
}

const EditProduct = () => {
  const [marcas, setMarcas] = useState([])
  const [modelos, setModelos] = useState([])
  const [users, setUsers] = useState([])
  const { register, handleSubmit, reset, setValue } = useForm()
  const { id, numSerie, description } = useSelector(store => store.productSlice)
  const dispatch = useDispatch()
  
  const handleClickChangeShowUpdatedProduct = () => {
    dispatch(changeIsShowUpdatedProduct())
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/product/modelProduct')
      .then((data) => setModelos(data.data.modelsProducts))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/product/marca')
      .then((data) => setMarcas(data.data.marcas))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/user')
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err))
  }, [])

  const submit = (data) => {
    console.log(data)
    axios
      .patch(`http://localhost:3000/api/v1/product/${id}`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))    

  }

  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' onClick={handleClickChangeShowUpdatedProduct}>
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-5'>

        <label htmlFor="marca">Marca:</label>
        <select name="marca" {...register("marcaId")} id="marcaId" >
          {marcas.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
        </select>

        <label htmlFor="modelId">Modelo del Producto:</label>
        <select name="modelId" {...register("modelId")} id="modelId">
          {modelos.map(modelo => <option key={modelo.id} value={modelo.id}>{modelo.name}</option>)}
        </select>
        
        <label htmlFor="numSerie">Número de Serie:</label>
        <input type="text" defaultValue={numSerie} {...register("numSerie")} id="numSerie" name="numSerie" required />
        
        <label htmlFor="userId">Nombre de Usuario:</label>
        <select name="userId" {...register("userId")} id="userId">
          {users.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>
        
        <label htmlFor="date">Fecha:</label>
        <input type="date" {...register("date")} id="date" name="date" required />
        
        <label htmlFor="description">Descripción:</label>
        <textarea type="text" defaultValue={description} {...register("description")} id="description" name="description" required ></textarea>
        
        <label htmlFor="amount">Cantidad:</label>
        <input type="number" {...register("amount")} id="amount" name="amount" defaultValue={1} required />
        
        <button onClick={handleClickChangeShowUpdatedProduct} className='bg-yellow-500 text-white rounded-md col-span-2 p-2 font-bold'>Editar Producto</button>
      </form>
    </section>
  )
}

export default EditProduct