import React from 'react'

//Utils
import { formatDateDDMMYYYY } from '../../utils/date';

function AsignationTableComponent({ asignations }) {
  return (
    <table className="m-auto text-center">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Fecha Asignada</th>
          </tr>
        </thead>
        <tbody>
          {
            asignations?.map((asignation) => (
              <tr key={asignation.id}>
                <td className="border px-4 py-2">{ asignation.id}</td>
                <td className="border px-4 py-2">{ asignation.userId}</td>
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