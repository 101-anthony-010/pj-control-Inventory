import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

//Slices
import { changeIsShowCreateProduct } from '../../store/slices/product.Slice'

const EditProduct = () => {
  const [marcas, setMarcas] = useState([])
  const [modelos, setModelos] = useState([])
  const [users, setUsers] = useState([])
  const { register, handleSubmit, reset, setValue } = useForm()
  const dispatch = useDispatch()
  
  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct())
  }

  const submit = (data) => {
    axios
      .post('http://localhost:3000/api/v1/product', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))    

    reset(DEFAULT_VALUES)
  }

  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' onClick={handleClickChangeShowCreateProduct}>
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-5'>

        <label htmlFor="marca">Marca:</label>
        <select name="marca" {...register("marcaId")} id="marcaId" onChange={handleMarcaChange}>
          {marcas.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
        </select>

        <label htmlFor="modelId">Modelo del Producto:</label>
        <select name="modelId" {...register("modelId")} id="modelId">
          {modelos.map(modelo => <option key={modelo.id} value={modelo.id}>{modelo.name}</option>)}
        </select>
        
        <label htmlFor="numSerie">Número de Serie:</label>
        <input type="text" {...register("numSerie")} id="numSerie" name="numSerie" required />
        
        <label htmlFor="userId">Nombre de Usuario:</label>
        <select name="userId" {...register("userId")} id="userId">
          {users.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>
        
        <label htmlFor="date">Fecha:</label>
        <input type="date" {...register("date")} id="date" name="date" required />
        
        <label htmlFor="description">Descripción:</label>
        <textarea type="text" {...register("description")} id="description" name="description" required ></textarea>
        
        <label htmlFor="amount">Cantidad:</label>
        <input type="number" {...register("amount")} id="amount" name="amount" defaultValue={1} required />
        
        <button onClick={handleClickChangeShowCreateProduct} className='bg-green-500 text-white rounded-md col-span-2 p-2 font-bold'>Crear Producto</button>
      </form>
    </section>
  )
}

export default EditProduct