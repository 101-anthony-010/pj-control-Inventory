import React, { useEffect, useState } from 'react'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const CreateAsignation = ({ handleClickChangeShowCreateAsignation }) => {
  const [users, setUsers] = useState()
  const [products, setProducts] = useState()
  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err))
  }, [])
  
  const handleProductChange = async (event) => {
    const userId = event.target.value;

    const response = await axiosPoderJudicial.get('/product')
    const allProduct = response.data.products;
    const productsFiltrados = allProduct.filter(product => product.userId === Number(userId) && product.state === "enable" );
    setProducts(productsFiltrados)
    setValue("productId","")
  }

  const submit = (data) => {
    const date = new Date()
    const send = {
      userId: Number(data.userId),
      productId: Number(data.productId),
      date: date.toLocaleDateString()
    }

    axiosPoderJudicial
      .post('/asignation',send)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    axiosPoderJudicial
      .patch(`product/used/${send.productId}`,send.date)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' onClick={handleClickChangeShowCreateAsignation}>
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-5'>

        <label htmlFor="userId">Nombre de Usuario:</label>
        <select name="userId" {...register("userId")} id="userId" onChange={handleProductChange}>
          <option value="">Seleccionar Usuario</option>
          {users?.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>
      
        <label htmlFor="productId">Nombre de Usuario:</label>
        <select name="productId" {...register("productId")} id="productId">
          {products?.map(product => <option key={product.id} value={product.id}>{product.id}</option>)}
        </select>

        <button className='col-span-2'>Agregar</button>
      </form>
    </section>
  )
}

export default CreateAsignation