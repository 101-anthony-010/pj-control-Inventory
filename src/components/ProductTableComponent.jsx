import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductTableComponent = () => {
  const [products, setProducts] = useState()
  const [modelProduct, setModelProduct] = useState()
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/product/')
      .then((data) => {
        setProducts(data.data.products)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])
  
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/product/modelProduct')
      .then((data) => setModelProduct(data.data.modelsProducts))
      .catch((err) => console.log(err))
  }, [])
  
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/user')
      .then((data) => setUsers(data.data.users))
      .catch((err) => console.log(err))
  }, [])

  const getModelName = (modelId) => {
    if (!modelProduct) return "Cargando..."; 

    const model = modelProduct.find(model => model.id === modelId);
    return model ? model.name : "Modelo no encontrado";
  };

  const getUserName = (userId) => {
    if (!users) return "Cargando...";

    const user = users.find(user => user.id === userId);
    return user ? user.userName : "Usuario no encontrado"
  }

  if (loading) {
    return <p>Cargando...</p>; 
  }

  return (
    <table className="w-full text-center">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Marca</th>
          <th className="px-4 py-2">Modelo ID</th>
          <th className="px-4 py-2">Número de Serie</th>
          <th className="px-4 py-2">Usuario ID</th>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Descripción</th>
          <th className="px-4 py-2">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {products?.map(product => (
          <tr key={product.id}>
            <td className="border px-4 py-2">{ product.id} </td>
            <td className="border px-4 py-2">{ product.marca} </td>
            <td className="border px-4 py-2">{ getModelName(product.modelId)} </td>
            <td className="border px-4 py-2">{ product.numSerie} </td>
            <td className="border px-4 py-2">{ getUserName(product.userId) }</td>
            <td className="border px-4 py-2">{ product.date }</td>
            <td className="border px-4 py-2">{ product.description }</td>
            <td className="border px-4 py-2">{ product.amount }</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTableComponent