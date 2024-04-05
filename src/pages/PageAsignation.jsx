import React, { useEffect, useState } from 'react'
import { axiosPoderJudicial } from '../utils/configAxios';
import { formatDateDDMMYYYY } from '../utils/date';
import AsignationComponent from '../components/asignationComponent/AsignationComponent';

const PageAsignation = () => {
  const [asignations, setAsignations] = useState()
  const [entrance, setEntrance ] = useState("enable")
  const [exit, setExit] = useState("disabled")

  useEffect(() => {
    axiosPoderJudicial
      .get('/asignation')
      .then((res) => {
        setAsignations(res.data.asignations)
      })
      .catch((err) => console.log(err))

    axiosPoderJudicial
      .get('product')
      .then((res) => console.log(res.data.products.filter(asignation => asignation.state === entrance)))
      .catch((err) => console.log(err))
  }, [])

  console.log(asignations)
  return (
    <>
    <section className='flex gap-4 justify-between p-2'>
      <div className='flex gap-4'>
        <button>En uso</button>
        <button>De baja</button>
      </div>

      <div className='grid grid-cols-[auto_1fr_1fr] gap-4'>
        <input type="text" />
        <button>b</button>
        <button>c</button>
      </div>
    </section>

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
          <td className="border px-4 py-2">{ asignation.id} </td>
          <td className="border px-4 py-2">{ asignation.userId} </td>
          <td className="border px-4 py-2">{ asignation.productId} </td>
          <td className="border px-4 py-2">{ formatDateDDMMYYYY(asignation.date) } </td>
        </tr>
         ))

        }
      </tbody>
      <tbody>
        
      </tbody>
    </table>

    <AsignationComponent/>
    </>
  )
}

export default PageAsignation