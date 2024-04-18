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
  const [amountPages, setAmountPages] = useState({});
  const [infoAsignation, setInfoAsignation] = useState({})
  const { isShowInfoAsignation, isShowAmountAsignation } = useSelector(store => store.asignationSlice); // Accede a isShowCreateAsignation desde el estado global
  const dispatch = useDispatch()

  const getUserName = (userId) => {
    if (!users) return "Cargando...";

    const user = users.find(user => user.id === userId);
    return user ? user.userName : "Usuario no encontrado";
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then((data) => setUsers(data.data.users))
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
    // console.log(infoAsignation)
    // console.log(asignation)
  }

  return (
    <>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowInfoAsignation ? "top-0" : "-top-full"}`}>
        <InfoAsignation infoAsignation={infoAsignation} handleClickChangeShowInfoAsignation={handleClickChangeShowInfoAsignation} />
      </section>

      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowAmountAsignation ? "top-0" : "-top-full"}`}>
        <AmountAsignation infoAsignation={infoAsignation} handleClickChangeShowAmountAsignation={handleClickChangeShowAmountAsignation} />
      </section>

      <table className="m-auto text-center">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Producto Id</th>
              <th className="px-4 py-2">Fecha Asignada</th>
              {isInUseSelected && <th className="px-4 py-2">Agregar Hojas</th>}
              {!isInUseSelected && <th className="px-4 py-2">Cantidad</th>}
            </tr>
          </thead>
          <tbody>
            {
              asignations?.map((asignation) => (
                <tr className='hover:bg-slate-200/75 cursor-pointer' key={asignation.id}>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border px-4 py-2">{ asignation.id}</td>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border px-4 py-2">{ getUserName(asignation.userId) }</td>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border px-4 py-2">{ asignation.productId}</td>
                  <td onClick={() => handleClickChangeShowInfoAsignation(asignation)} className="border px-4 py-2">{ formatDateDDMMYYYY(asignation.date)}</td>
                  {isInUseSelected && <td className="border px-4 py-2"><button onClick={() => handleClickChangeShowAmountAsignation(asignation)} className='w-[40px] h-[40px] rounded-md bg-green-500/90 hover:bg-green-500/50 p-2'><img src="/icons/amount.png" className='w-full h-full object-contain' alt="" /></button></td>}
                  {!isInUseSelected && <td className="border px-4 py-2">{ amountPages[asignation.productId] }</td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
  )
}

export default AsignationTableComponent;
