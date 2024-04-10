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
  }, [infoAsignation])
  


  // const getUserSede = (userSedeId) => {
  //   if (!userSede) return "Cargando...";

  //   const userS = users.find(user => user.id === userId);
  //   return user ? user.userName : "Usuario no encontrado";
  // }

  return (
    <section className='bg-white/85 rounded-md p-10 relative grid grid-cols-2 gap-4'>
      <button onClick={() => handleClickChangeShowInfoAsignation({})} className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' >
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>
      
      <section className='p-4 gap-4 grid grid-cols-2 rounded-md shadow bg-white'>
        <h5 htmlFor="">Nombre:</h5>
        <p htmlFor="">{user?.name}</p>

        <h5 htmlFor="">Apellidos:</h5>
        <p htmlFor="">{user?.lastName}</p>
        
        <h5 htmlFor="">DNI:</h5>
        <p htmlFor="">{user?.dni}</p>
        
        <h5 htmlFor="">Correo:</h5>
        <p htmlFor="">{user?.email}</p>
        
        <h5 htmlFor="">Telefono:</h5>
        <p htmlFor="">{user?.phone}</p>
        
        <h5 htmlFor="">Usuario:</h5>
        <p htmlFor="">{user?.userName}</p>

        <h5 htmlFor="">Sede:</h5>
        <p htmlFor="">{user?.sedeId}</p>

        <h5 htmlFor="">Dependecia:</h5>
        <p htmlFor="">{user?.dependenciaId}</p>

        <h5 htmlFor="">Cargo:</h5>
        <p htmlFor="">{user?.cargoId}</p>
      </section>
      
      <section className='p-4 gap-4 grid grid-cols-2 rounded-md shadow bg-white'>
        <h5 htmlFor="">Marca:</h5>
        <p htmlFor="">{product?.marcaId}</p>

        <h5 htmlFor="">Modelo:</h5>
        <p htmlFor="">{product?.modelId}</p>

        <h5 htmlFor="">Numero de Serie:</h5>
        <p htmlFor="">{product?.numSerie}</p>

        <h5 htmlFor="">Fecha de Ingreso:</h5>
        <p htmlFor="">{ formatDateDDMMYYYY(product?.dateInitial) }</p>

        <h5 htmlFor="">Fecha de salida:</h5>
        <p htmlFor="">{ formatDateDDMMYYYY(product?.dateFinal) }</p>

        <h5 htmlFor="">Descriccion:</h5>
        <p htmlFor="">{product?.description}</p>

        <h5 htmlFor="">Cantidad:</h5>
        <p htmlFor="">{product?.amount}</p>

      </section>
     
    </section>
  )
}

export default InfoAsignation