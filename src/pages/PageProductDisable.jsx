import React, { useEffect, useState } from 'react'
import { axiosPoderJudicial } from '../utils/configAxios';
import Navbar from '../components/layout/Navbar';
import { formatDateDDMMYYYY } from '../utils/date';

const PageProductDisable = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([])
  const [marcaProduct, setMarcaProduct] = useState([])
  const [modelProduct, setModelProduct] = useState([])
  useEffect(() => {
    axiosPoderJudicial
      .get('/product')
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarcaProduct(res.data.marcas))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModelProduct(res.data.modelsProducts))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/user')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err));
    
  }, []);

  // Optener nombres 
  const handleNameMarca = (id) => {
    const marca = marcaProduct.find(item => item.id === id)
    return marca ? marca.name : "cargando"
  };
  const handleNameModel = (id) => {
    const model = modelProduct.find(item => item.id === id)
    return model ? model.name : "cargando"
  }
  const userName = (id) => {
    const user = users.find(item => item.id === id)
    return user ? user.userName.toUpperCase() : "cargando"
  }

  return (
    <>
      <Navbar/>

      <section className='ml-[100px] px-10 mt-[80px] fleustify-between'>

        <section className='text-center my-4'>
          <h2 className='font-bold text-2xl'>Registro de Toner Consumidos</h2>
        </section>

        <table className='m-auto text-xs text-center border-collapse border border-black'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='p-2 w-24'>Id</th>
            <th className='p-2 w-32'>Marca</th>
            <th className='p-2 w-32'>Modelo</th>
            <th className='p-2'>Numero de Serie</th>
            <th className='p-2 w-40'>Usuario</th>
            <th className='p-2'>N° Hojas</th>
            <th className='p-2'>Fecha de Ingreso</th>
            <th className='p-2'>Fecha de Salida</th>
          </tr>
        </thead>
        <tbody>
          {(products.filter(item => item.state === 'disable' && item.amountPages !== null))?.map((product) => (
            <tr key={product.id}>
              <td className="border border-black">{product.id}</td>
              <td className="border border-black">{handleNameMarca(product.marcaId)}</td>
              <td className="border border-black">{handleNameModel(product.modelId)}</td>
              <td className="border border-black">{product.numSerie}</td>
              <td className="border border-black">{userName(product.userId)}</td>
              <td className="border border-black">{product.amountPages}</td>
              <td className="border border-black">{formatDateDDMMYYYY(product.dateInitial)}</td>
              <td className="border border-black">{formatDateDDMMYYYY(product.dateFinal)}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </section>


    </>
  )
}

export default PageProductDisable