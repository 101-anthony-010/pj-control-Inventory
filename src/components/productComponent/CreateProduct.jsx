import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { axiosPoderJudicial } from '../../utils/configAxios'

//Slices
import { changeIsShowCreateProduct } from '../../store/slices/product.Slice';

const DEFAULT_VALUES = {
  marcaId: '',
  modelId: '',
  numSerie: '',
  userId: '',
  date: '',
  description: '',
  amount: '',
}

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
    axiosPoderJudicial
      .post('/product', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))    

    reset(DEFAULT_VALUES)
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
    try {
      // Obtener todos los modelos
      const response = await axiosPoderJudicial.get('/modelProduct');
      const allModelos = response.data.modelsProducts;
      // Filtrar los modelos por la marca seleccionada
      const modelosFiltrados = allModelos.filter(modelo => modelo.marcaId === Number(marcaId));
      // Actualizar el estado de los modelos con los modelos filtrados
      setModelos(modelosFiltrados);
      // Limpiar el valor seleccionado para el modelo
      setValue("modelId", "");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' onClick={handleClickChangeShowCreateProduct}>
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-5'>

        <label htmlFor="marca">Marca:</label>
        <select name="marca" {...register("marcaId")} id="marcaId" onChange={handleMarcaChange}>
          {marcas?.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
        </select>

        <label htmlFor="modelId">Modelo del Producto:</label>
        <select name="modelId" {...register("modelId")} id="modelId">
          {modelos?.map(modelo => <option key={modelo.id} value={modelo.id}>{modelo.name}</option>)}
        </select>
        
        <label htmlFor="numSerie">Número de Serie:</label>
        <input type="text" {...register("numSerie")} id="numSerie" name="numSerie" required />
        
        <label htmlFor="userId">Nombre de Usuario:</label>
        <select name="userId" {...register("userId")} id="userId">
          {users?.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>
        
        <label htmlFor="dateInitial">Fecha de Ingreso:</label>
        <input type="date" {...register("dateInitial")} id="dateInitial" name="dateInitial" required />
        
        <label htmlFor="description">Descripción:</label>
        <textarea type="text" {...register("description")} id="description" name="description" required ></textarea>
        
        <label htmlFor="amount">Cantidad:</label>
        <input type="number" {...register("amount")} id="amount" name="amount" defaultValue={1} required />
        
        <button onClick={handleClickChangeShowCreateProduct} className='bg-green-500 text-white rounded-md col-span-2 p-2 font-bold'>Crear Producto</button>
      </form>
    </section>
  )
}

export default CreateProduct
