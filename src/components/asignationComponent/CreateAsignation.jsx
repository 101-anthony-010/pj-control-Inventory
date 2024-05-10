import React, { useEffect, useState } from 'react'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const CreateAsignation = ({ handleClickChangeShowCreateAsignation }) => {
  const [users, setUsers] = useState()
  const [products, setProducts] = useState()
  const [marcas, setMarcas] = useState([])
  const [models, setModels] = useState([])
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/product')
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarcas(res.data.marcas))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModels(res.data.modelsProducts))
      .catch(err => console.log(err));
  }, [])
  
  // const handleProductChange = async (event) => {
  //   const userId = event.target.value;

  //   const response = await axiosPoderJudicial.get('/product')
  //   const allProduct = response.data.products;
  //   const productsFiltrados = allProduct.filter(product => product.userId === Number(userId) && product.state === "enable" );
  //   setProducts(productsFiltrados)
  //   setValue("productId","")
  // }
  const handleProductFilter = (data) => {
    if (data) {
      const newsProducts = products.filter(item => item.dateFinal === null && item.state === 'enable')
      return newsProducts ? newsProducts : {}
    }
  }

  const handleNameId = (data, id) => {
    if (data) {
      const name = data.find(item => item.id === id)
      return name ? name : "cargando"
    }
  }

  const submit = (data) => {
    const date = new Date()
    const send = {
      userId: Number(data.userId),
      productId: Number(data.productId),
      date: date.toLocaleDateString()
    }
    console.log(send)
    axiosPoderJudicial
      .post('/asignation',send)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .patch(`product/used/${send.productId}`,{ dateFinal: send.date })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
    reset()
    window.location.reload()
  }

  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      
      <button className='font-bold text-2xl absolute right-0 top-0 p-2 rounded-md m-2 w-[35px] h-[35px]' onClick={handleClickChangeShowCreateAsignation}>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>
      
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 gap-5 items-center justify-center'>

        <label htmlFor="userId">Nombre de Usuario</label>
        <select className='rounded-md p-2 bg-slate-100' name="userId" {...register("userId")} id="userId">
          <option value="">Seleccionar Usuario</option>
          {users?.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)}
        </select>
      
        <label htmlFor="productId">Producto</label>
        <select className='rounded-md p-2 bg-slate-100' name="productId" {...register("productId")} id="productId">
          <option value="">Seleccionar Toner</option>
          {handleProductFilter(products)?.map(product => <option className='uppercase text-xs' key={product.id} value={product.id}>{handleNameId(marcas, product.marcaId).name} - {handleNameId(models, product.modelId).name}</option>)}
        </select>

        <button onClick={handleClickChangeShowCreateAsignation} className='p-2 rounded-md text-white font-bold col-span-2 bg-green-500 '>Agregar</button>
      </form>
    </section>
  )
}

export default CreateAsignation