import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Utils
import { formatDateDDMMYYYY } from '../../utils/date';
import { axiosPoderJudicial } from '../../utils/configAxios';

//Slices
import { changeIsShowAmountAsignation, changeIsShowInfoAsignation } from '../../store/slices/asignation.slice';

//Components
import InfoAsignation from './InfoAsignation';
import AmountAsignation from './AmountAsignation';

function AsignationTableComponent({ asignations, isInUseSelected }) {
  const [users, setUsers] = useState();
  const [productData, setProductData] = useState([])
  const [model, setModel] = useState([])
  const [marca, setMarca] = useState([])
  const [amountPages, setAmountPages] = useState({});
  const [infoAsignation, setInfoAsignation] = useState({})
  const { isShowInfoAsignation, isShowAmountAsignation } = useSelector(store => store.asignationSlice); // Accede a isShowCreateAsignation desde el estado global
  const dispatch = useDispatch()
  
  const getUserName = (userId) => {
    if (!users) return "Cargando...";

    const user = users.find(user => user.id === userId);
    return user ? `${(user.userName).toUpperCase()}` : "Usuario no encontrado";
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then((data) => setUsers(data.data.users))
      .catch((err) => console.log(err))
    axiosPoderJudicial
      .get('/product')
      .then((data) => setProductData(data.data.products))
      .catch((err) => console.log(err))
    axiosPoderJudicial
      .get('/marca')
      .then((data) => setMarca(data.data.marcas))
      .catch((err) => console.log(err))
    axiosPoderJudicial
      .get('/modelProduct')
      .then((data) => setModel(data.data.modelsProducts))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const fetchAmountPages = async () => {
      const newAmountPages = {};
      for (const asignation of asignations) {
        try {
          const productResponse = await axiosPoderJudicial.get(`/product/${asignation.productId}`);
          newAmountPages[asignation.productId] = productResponse.data.product.amountPages;
        } catch (error) {
          console.log(error);
          newAmountPages[asignation.productId] = "Error al obtener la cantidad de hojas";
        }
      }
      setAmountPages(newAmountPages);
    };
    fetchAmountPages();
  }, [asignations]);

  const handleClickChangeShowInfoAsignation = (asignation) => {
    dispatch(changeIsShowInfoAsignation())
    setInfoAsignation(asignation)
  }
  
  const handleClickChangeShowAmountAsignation = (asignation) => {
    dispatch(changeIsShowAmountAsignation())
    setInfoAsignation(asignation)
  }

  const handleNameMarcaModel = (id) => {
    const product = productData.find(item => item.id === id)
    const marcaName = marca.find(item => item.id === product.marcaId);
    const modelName = model.find(item => item.id === product.modelId);
    return `${marcaName.name} - ${modelName.name}`
  }
  return (
    <>
      <section className={`bg-black/20 fixed left-0 w-full h-full flex items-center justify-center ${isShowInfoAsignation ? "top-0" : "-top-full"}`}>
        <InfoAsignation infoAsignation={infoAsignation} handleClickChangeShowInfoAsignation={handleClickChangeShowInfoAsignation} />
      </section>

      <section className={`bg-black/20 fixed left-0 w-full h-full flex items-center justify-center ${isShowAmountAsignation ? "top-0" : "-top-full"}`}>
        <AmountAsignation infoAsignation={infoAsignation} handleClickChangeShowAmountAsignation={handleClickChangeShowAmountAsignation} />
      </section>

      <table className="m-auto text-center w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border border-white">ID</th>
              <th className="px-4 py-2 border border-white">Usuario</th>
              <th className="px-4 py-2 border border-white">Producto</th>
              <th className="px-4 py-2 border border-white">Fecha Asignada</th>
              {isInUseSelected && <th className="px-4 py-2 border border-white">Agregar Hojas</th>}
              {!isInUseSelected && <th className="px-4 py-2 border border-white">Cantidad</th>}
            </tr>
          </thead>
          <tbody>
            {
              asignations?.map((asignation) => (
                <tr className='hover:bg-slate-200/75 cursor-pointer' key={asignation.id}>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border border-black">{ asignation.id}</td>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border border-black">{ getUserName(asignation.userId) }</td>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border border-black">{ handleNameMarcaModel(asignation.productId)}</td>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border border-black">{ formatDateDDMMYYYY(asignation.date)}</td>
                  {isInUseSelected && 
                    <td className="border border-black py-1">
                      <div className='grid justify-center items-center'>
                        <button onClick={() => handleClickChangeShowAmountAsignation(asignation)} className='p-[3px] w-[25px] h-[25px] rounded-md'>
                          <img src="/icons/amount.png" className='w-full h-full object-contain' alt="" />
                        </button>
                      </div>
                    </td>}
                  {!isInUseSelected && 
                    <td className="border border-black">{ amountPages[asignation.productId] }</td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
  )
}

export default AsignationTableComponent;
