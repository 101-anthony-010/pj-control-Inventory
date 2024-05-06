import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// Utils
import { axiosPoderJudicial } from '../../utils/configAxios';
import { formatDateDDMMYYYY } from '../../utils/date';

// Slices
import { changeIsShowUpdatedProduct, setProduct } from '../../store/slices/product.Slice';

const ProductTableComponent = ({ products, showDateSalida }) => {
  const [modelProduct, setModelProduct] = useState();
  const [marcas, setMarcas] = useState();
  const [users, setUsers] = useState();
  const dispatch = useDispatch();

  const handleClickUpdatedProduct = (data) => {
    dispatch(setProduct(data));
    dispatch(changeIsShowUpdatedProduct());
  };

  const handleClickDeletedProduct = async (id) => { 
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        try {
          await axiosPoderJudicial.delete(`/product/${id}`);
          const updatedProduct = products.filter(product => product.id !== id);
          setProduct(updatedProduct);
          console.log(`Producto con ID ${id} eliminado exitosamente.`);
        } catch (error) {
          console.error(`Error al eliminar el producto con ID ${id}:`, error);
        }
        console.log("Eliminado")
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
    }
  } else {
    console.log("Eliminación cancelada.");
  }
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/modelProduct')
      .then((data) => setModelProduct(data.data.modelsProducts))
      .catch((err) => console.log(err));
    axiosPoderJudicial
      .get('/marca')
      .then((data) => setMarcas(data.data.marcas))
      .catch((err) => console.log(err));
    axiosPoderJudicial
      .get('/user')
      .then((data) => setUsers(data.data.users))
      .catch((err) => console.log(err));
  }, []);

  const getModelName = (modelId) => {
    if (!modelProduct) return "Cargando..."; 

    const model = modelProduct.find(model => model.id === modelId);
    return model ? model.name : "Modelo no encontrado";
  };

  const getUserName = (userId) => {
    if (!users) return "Cargando...";

    const user = users.find(user => user.id === userId);
    return user ? user.userName : "Usuario no encontrado"
  };

  const getMarca = (marcaId) => {
    if (!marcas) return "Cargando...";

    const marca = marcas.find(marca => marca.id === marcaId);
    return marca ? marca.name : "Marca no encontrada"
  };

  return (
    <table className="w-full text-center">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2 border border-white">ID</th>
          <th className="px-4 py-2 border border-white">Marca</th>
          <th className="px-4 py-2 border border-white">Modelo</th>
          <th className="px-4 py-2 border border-white">Número de Serie</th>
          <th className="px-4 py-2 border border-white">Usuario</th>
          <th className="px-4 py-2 border border-white">Fecha de entrada</th>
          {showDateSalida && <th className="px-4 py-2 border border-white">Fecha de salida</th>}
          {!showDateSalida && <th className="px-4 py-2 border border-white">Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id}>
            <td className="border border-black">{product.id}</td>
            <td className="border border-black">{getMarca(product.marcaId)}</td>
            <td className="border border-black">{getModelName(product.modelId)}</td>
            <td className="border border-black">{product.numSerie}</td>
            <td className="border border-black">{getUserName(product.userId)}</td>
            <td className="border border-black">{formatDateDDMMYYYY(product.dateInitial)}</td>
            {showDateSalida && <td className="border border-black">{formatDateDDMMYYYY(product.dateFinal)}</td>}
            {!showDateSalida && (
              <td className="border m-auto border-black">
                <div className="grid grid-cols-2 justify-center items-center my-1 mx-4">
                  <div className='w-[25px] h-[25px] inline-block p-[3px] rounded-md hover:cursor-pointer m-auto' onClick={() => handleClickUpdatedProduct(product)}>
                    <img className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                  </div>
                  <div className='w-[25px] h-[25px] inline-block text-center p-[3px] rounded-md hover:cursor-pointer m-auto' onClick={() => handleClickDeletedProduct(product.id)}>
                    <img className='w-full h-full object-contain' src="/icons/trash.png" alt="" />
                  </div>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTableComponent;
