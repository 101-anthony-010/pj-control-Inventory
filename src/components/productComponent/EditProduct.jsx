import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

//Slice
import { changeIsShowUpdatedProduct, setProduct } from '../../store/slices/product.Slice';
const EditProduct = () => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const { register, handleSubmit, setValue } = useForm();
  const { id, numSerie, description } = useSelector(store => store.productSlice);
  const dispatch = useDispatch();

  const handleClickChangeShowUpdatedProduct = () => {
    dispatch(changeIsShowUpdatedProduct());
  }

  //Solucion
  const handleClickReset = () => {
    const data = ""
    dispatch(setProduct(data));
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/modelProduct')
      .then((data) => setModelos(data.data.modelsProducts))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosPoderJudicial
      .get('/marca')
      .then((data) => setMarcas(data.data.marcas))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  const submit = (data) => {
    console.log(id)
    axiosPoderJudicial
      .patch(`/product/${id}`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    
    handleClickChangeShowUpdatedProduct();
  };

  const handleMarcaChange = async (event) => {
    const marcaId = event.target.value;
    setSelectedMarca(marcaId);

    const response = await axiosPoderJudicial.get('/modelProduct');
    const allModelos = response.data.modelsProducts;
    const modelosFiltrados = allModelos.filter(modelo => modelo.marcaId === Number(marcaId));
    setModelos(modelosFiltrados);
    setValue('modelId', '');
  };

  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' onClick={handleClickChangeShowUpdatedProduct}>
        <box-icon color='red' name='x-circle' type='solid'></box-icon>
      </button>

      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-5'>

        <label htmlFor='marca'>Marca:</label>
        <select name='marca' {...register('marcaId')} id='marcaId' onChange={handleMarcaChange} value={selectedMarca}>
          <option value=''>Seleccione una Marca</option>
          {marcas?.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
        </select>

        <label htmlFor='modelId'>Modelo del Producto:</label>
        <select name='modelId' {...register('modelId')} id='modelId'>
          <option value=''>Seleccione un modelo</option>
          {modelos?.map(modelo => <option key={modelo.id} value={modelo.id}>{modelo.name}</option>)}
        </select>

        <label htmlFor='numSerie'>Número de Serie:</label>
        <input type='text' defaultValue={numSerie} {...register('numSerie')} id='numSerie' name='numSerie' required />

        <label htmlFor='userId'>Nombre de Usuario:</label>
        <select name='userId' {...register('userId')} id='userId'>
          <option value=''>Seleccione un Usuario</option>
          {users?.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>

        <label htmlFor='date'>Fecha:</label>
        <input type='date' {...register('date')} id='date' name='date' required />

        <label htmlFor='description'>Descripción:</label>
        <textarea type='text' defaultValue={description} {...register('description')} id='description' name='description' required></textarea>

        <label htmlFor='amount'>Cantidad:</label>
        <input type='number' {...register('amount')} id='amount' name='amount' defaultValue={1} required />

        <button onClick={handleClickReset} className='bg-yellow-500 text-white rounded-md col-span-2 p-2 font-bold'>Editar Producto</button>
      </form>
    </section>
  )
}

export default EditProduct;
