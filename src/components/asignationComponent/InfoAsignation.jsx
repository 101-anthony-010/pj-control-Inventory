import React, { useEffect, useState } from 'react'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { formatDateDDMMYYYY } from '../../utils/date'

const InfoAsignation = ({ handleClickChangeShowInfoAsignation, infoAsignation }) => {
  const [user, setUser] = useState()
  const [product, setProduct] = useState()
  const [userSede, setUserSede] = useState()
  const [userDependencia, setUserDependencia] = useState()
  const [userCargo, setUserCargo] = useState()
  const [productModel, setProductModel] = useState()
  const [productMarca, setProductMarca] = useState()

  useEffect(() => {
    axiosPoderJudicial
      .get(`/user/${infoAsignation.userId}`)
      .then(res => setUser(res.data.user))
      .catch(err => console.log(err))

    axiosPoderJudicial
      .get(`/product/${infoAsignation.productId}`)
      .then(res => setProduct(res.data.product))
      .catch(err => console.log(err))

    axiosPoderJudicial
      .get(`/sede`)
      .then(res => setUserSede(res.data.sedes))
      .catch(err => console.log(err))
    
    axiosPoderJudicial
      .get(`/dependencia`)
      .then(res => setUserDependencia(res.data.dependencias))
      .catch(err => console.log(err))

    axiosPoderJudicial
      .get(`/cargo`)
      .then(res => setUserCargo(res.data.cargos))
      .catch(err => console.log(err))

    axiosPoderJudicial
      .get(`/modelProduct`)
      .then(res => setProductModel(res.data.modelsProducts))
      .catch(err => console.log(err))

    axiosPoderJudicial
      .get(`/marca`)
      .then(res => setProductMarca(res.data.marcas))
      .catch(err => console.log(err))
  }, [infoAsignation])
  


  const getItemName = (itemsArray, itemId) => {
    if (!itemsArray) return "Cargando...";
    const item = itemsArray.find(item => item.id === itemId);
    return item ? item.name : "No encontrado";
  };

  return (
    <section className='bg-white rounded-md p-10 relative grid grid-cols-2 gap-4'>
      <button onClick={() => handleClickChangeShowInfoAsignation({})} className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2'>
        <box-icon color='red' name='x-circle' type='solid'></box-icon>
      </button>

      <section className='p-4 gap-4 grid rounded-md shadow bg-white'>
        <h3 className='mx-auto font-semibold text-xl'>Informacion del usuario</h3>
        <table className="m-auto text-center border border-collapse">
          <tbody>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Nombre</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.name }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Apellido</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.lastName }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">DNI</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.dni }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Correo</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.email }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Telefono</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.phone }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Usuario</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.userName }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Sede</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.sedeId }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Dependencia</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.dependenciaId }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Cargo</th>
              <td className="px-4 py-2 border border-gray-700">{ user?.cargoId }</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className='p-4 gap-4 grid rounded-md shadow bg-white'>
        <h3 className='mx-auto font-semibold text-xl'>Informacion del Producto</h3>
        <table className="m-auto text-center border border-collapse">
          <tbody>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Marca</th>
              <td className="px-4 py-2 border border-gray-700">{ getItemName(productMarca, product?.marcaId) }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Modelo</th>
              <td className="px-4 py-2 border border-gray-700">{ getItemName(productModel, product?.modelId) }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Numero de Serie</th>
              <td className="px-4 py-2 border border-gray-700">{ product?.numSerie }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Fecha de Ingreso</th>
              <td className="px-4 py-2 border border-gray-700">{ formatDateDDMMYYYY(product?.dateInitial) }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Fecha de Salida</th>
              <td className="px-4 py-2 border border-gray-700">{ formatDateDDMMYYYY(product?.dateFinal) }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Descripción</th>
              <td className="px-4 py-2 border border-gray-700">{ product?.description }</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-800 text-white border border-gray-700">Cantidad</th>
              <td className="px-4 py-2 border border-gray-700">{ product?.amount }</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  )
}

export default InfoAsignation