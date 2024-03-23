import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PageAsignation = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/user/')
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err))
  }, [])

  // useEffect(() => {
  //   axios
  //     .get('')
  // }, [])
  
  
  console.log(users)
  return (
    <>
    <table className="w-full text-center">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Usuario</th>
          <th className="px-4 py-2">Prodcuto</th>
          <th className="px-4 py-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {/* {
         asignations?.map((asignation) => (
          <tr key={asignation.id}>
          <td className="border px-4 py-2">{ asignation.userId} </td>
          <td className="border px-4 py-2">{ asignation.productId} </td>
          <td className="border px-4 py-2">{ asignation.fecha} </td>
        </tr>
         ))

        } */}
      </tbody>
      <tbody>
        
      </tbody>
    </table>
    </>
  )
}

export default PageAsignation