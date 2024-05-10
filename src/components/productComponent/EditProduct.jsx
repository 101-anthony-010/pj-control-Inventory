import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

//Slice
import { changeIsShowUpdatedProduct, setProduct } from '../../store/slices/product.Slice';
const EditProduct = ({dataProducts}) => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const { register, handleSubmit, setValue, reset } = useForm();
  const { id, numSerie, description } = useSelector(store => store.productSlice);
  const dispatch = useDispatch();

  const handleClickChangeShowUpdatedProduct = () => {
    dispatch(changeIsShowUpdatedProduct());
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/modelProduct')
      .then((data) => setModelos(data.data.modelsProducts))
      .catch((err) => console.log(err));
    axiosPoderJudicial
      .get('/marca')
      .then((data) => setMarcas(data.data.marcas))
    axiosPoderJudicial
      .get('/user')
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  setValue('name', dataProducts.marcaId)
  setValue('modelId', dataProducts.modelId)
  setValue('numSerie', dataProducts.numSerie)
  setValue('userId', dataProducts.userId)
  setValue('description', dataProducts.description)
  setValue('amount', dataProducts.amount)
  // setValue('dateInitial', dataProducts.dateInitial)

  // console.log(dataProducts)
  const submit = (data) => {
    data.id = dataProducts.id
    // console.log(data)
    // console.log(data.userId)
    axiosPoderJudicial
      .patch(`/product`, data)
      .then((res) => window.alert('Se edito el producto con exito'))
      .catch((err) => console.log(err));
    
    reset()
    window.location.reload()
    // handleClickChangeShowUpdatedProduct();
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
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 w-[35px] h-[35px] rounded-md m-2' onClick={handleClickChangeShowUpdatedProduct}>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>

      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-2 items-center justify-center'>

        <label htmlFor='marca'>Marca:</label>
        <select className='bg-slate-100 rounded-md p-2' name='marca' {...register('marcaId')} onChange={handleMarcaChange}>
          <option value=''>Seleccione una Marca</option>
          {marcas?.map(marca => <option key={marca.id} value={marca.id}>{marca.name}</option>)}
        </select>

        <label htmlFor='modelId'>Modelo del Producto:</label>
        <select className='bg-slate-100 rounded-md p-2' name='modelId' {...register('modelId')}>
          <option value=''>Seleccione un modelo</option>
          {modelos?.map(modelo => <option key={modelo.id} value={modelo.id}>{modelo.name}</option>)}
        </select>

        <label htmlFor='numSerie'>Número de Serie:</label>
        <input className='rounded-md bg-slate-100 p-2' type='text' {...register('numSerie')} required />

        <label htmlFor='userId'>Nombre de Usuario:</label>
        <select className='bg-slate-100 rounded-md p-2' {...register('userId')}>
          <option value=''>Seleccione un Usuario</option>
          {users?.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>

        {/* <label htmlFor='dateInitial'>Fecha:</label>
        <input className='rounded-md bg-slate-100 p-2' type='date' {...register('dateInitial')} required /> */}

        <label htmlFor='description'>Descripción:</label>
        <textarea className='rounded-md p-2 bg-slate-100' type='text' {...register('description')} required></textarea>

        <label htmlFor='amount'>Cantidad:</label>
        <input className='rounded-md bg-slate-100 p-2' type='number' {...register('amount')} defaultValue={1} required />

        <button className='bg-yellow-500 text-white rounded-md col-span-2 p-2 font-bold'>Editar Producto</button>
      </form>
    </section>
  )
}

export default EditProduct;
