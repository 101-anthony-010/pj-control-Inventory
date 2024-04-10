import React, { useEffect, useState } from 'react'

//Utils
import { formatDateDDMMYYYY } from '../../utils/date';
import { axiosPoderJudicial } from '../../utils/configAxios';

function AsignationTableComponent({ asignations }) {
  const [users, setUsers] = useState()

  const getUserName = (userId) => {
    if (!users) return "Cargando...";

    const user = users.find(user => user.id === userId);
    return user ? user.userName : "Usuario no encontrado"
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then((data) => setUsers(data.data.users))
      .catch((err) => console.log(err))
  }, [])

  return (
    <table className="m-auto text-center">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Producto Id</th>
            <th className="px-4 py-2">Fecha Asignada</th>
          </tr>
        </thead>
        <tbody>
          {
            asignations?.map((asignation) => (
              <tr className='hover:bg-slate-300 cursor-pointer' key={asignation.id}>
                <td className="border px-4 py-2">{ asignation.id}</td>
                <td className="border px-4 py-2">{ getUserName(asignation.userId) }</td>
                <td className="border px-4 py-2">{ asignation.productId}</td>
                <td className="border px-4 py-2">{ formatDateDDMMYYYY(asignation.date)}</td>
              </tr>
            ))
          }
        </tbody>
        <tbody>
        
        </tbody>
      </table>
  )
}

export default AsignationTableComponent