import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

//Slices
import { changeIsShowUpdatedProduct, setProduct } from '../../store/slices/product.Slice'

const ProductTableComponent = () => {
  const [products, setProducts] = useState()
  const [modelProduct, setModelProduct] = useState()
  const [marcas, setMarcas] = useState()
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const handleClickUpdatedProduct = (data) => {
    dispatch(setProduct(data))
    dispatch(changeIsShowUpdatedProduct())
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/product/')
      .then((data) => {
        setProducts(data.data.products)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])
  
  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/product/modelProduct')
      .then((data) => setModelProduct(data.data.modelsProducts))
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
      .get('http://127.0.0.1:3000/api/v1/user')
      .then((data) => setUsers(data.data.users))
      .catch((err) => console.log(err))
  }, [])

  const handleClickDeletedProduct = async (id) => { 
    try {
      await axios.delete(`http://127.0.0.1:3000/api/v1/product/${id}`);
      const updatedProduct = products.filter(product => product.id !== id);
      setProducts(updatedProduct);
      console.log(`Producto con ID ${id} eliminado exitosamente.`);
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
    }
  }

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

  const getMarca = (marcaId) => {
    if (!marcas) return "Cargando...";

    const marca = marcas.find(marca => marca.id === marcaId);
    return marca ? marca.name : "Marca no encontrada"
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
            <td className="border px-4 py-2">{ getMarca(product.marcaId) } </td>
            <td className="border px-4 py-2">{ getModelName(product.modelId) } </td>
            <td className="border px-4 py-2">{ product.numSerie} </td>
            <td className="border px-4 py-2">{ getUserName(product.userId) }</td>
            <td className="border px-4 py-2">{ 
              new Date(product.date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
            }
            </td>
            <td className="border px-4 py-2">{ product.description }</td>
            <td className="border px-4 py-2">{ product.amount }</td>

            <td className="w-32 border px-4 py-2 grid grid-cols-2 justify-between">
              <button onClick={() => handleClickUpdatedProduct(product)} className='grid items-center justify-center m-auto text-2xl bg-yellow-500 hover:bg-yellow-600 w-10 h-10 rounded-md'>
                <box-icon color="white" name='edit-alt'></box-icon>
              </button>
              <button  onClick={() => handleClickDeletedProduct(product.id)} className='grid items-center justify-center m-auto text-2xl bg-blue-500 hover:bg-blue-600 w-10 h-10 rounded-md'>
                <box-icon color="white" name='trash'></box-icon>
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTableComponent