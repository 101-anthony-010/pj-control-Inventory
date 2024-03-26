import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserTableComponent = () => {
  const [users, setUsers] = useState()
  const [sedes, setSedes] = useState()
  const [dependencias, setDependencias] = useState()
  const [cargos, setCargos] = useState()

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/user/')
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err))
  }, [])

  const handleClickDeletedUser = async (id) => { 
    try {
      await axios.delete(`http://127.0.0.1:3000/api/v1/user/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      console.log(`Usuario con ID ${id} eliminado exitosamente.`);
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    }
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/sede')
      .then((res) => setSedes(res.data.sedes))
      .catch((err) => console.log(err))
  }, [])
  
  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/dependencia')
      .then((res) => setDependencias(res.data.dependencias))
      .catch((err) => console.log(err))
  }, [])
  
  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/api/v1/cargo')
      .then((res) => setCargos(res.data.cargos))
      .catch((err) => console.log(err))
  }, [])
  

  const getSede = (sedeId) => {
    if (!sedes) return "Cargando...";
    
    const sede = sedes.find(sede => sede.id === sedeId);
    return sede ? sede.name : "Sede no encontrada"
  }

  const getDependecia = (dependenciaId) => {
    if (!dependencias) return "Cargando...";
    
    const dependencia = dependencias.find(dependencia => dependencia.id === dependenciaId);
    return dependencia ? dependencia.name : "Sede no encontrada"
  }

  const getCargo = (cargoId) => {
    if (!cargos) return "Cargando...";
    
    const cargo = cargos.find(cargo => cargo.id === cargoId);
    return cargo ? cargo.name : "Sede no encontrada"
  }
  

  return (
    <table className="w-full text-center">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Apellido</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Sede</th>
            <th className="px-4 py-2">dependencia</th>
            <th className="px-4 py-2">cargo</th>
          </tr>
        </thead>
        <tbody>
          {
          users?.map((user) => (
            <tr key={user.id}>
            <td className="border px-4 py-2">{ user.id } </td>
            <td className="border px-4 py-2">{ user.name } </td>
            <td className="border px-4 py-2">{ user.lastName } </td>
            <td className="border px-4 py-2">{ user.userName } </td>
            <td className="border px-4 py-2">{ getSede(user.sedeId) } </td>
            <td className="border px-4 py-2">{ getDependecia(user.dependenciaId) } </td>
            <td className="border px-4 py-2">{ getCargo(user.cargoId) } </td>

            <td className="w-32 border px-4 py-2 grid grid-cols-2 justify-between">
              <button  className='grid items-center justify-center m-auto text-2xl bg-yellow-500 hover:bg-yellow-600 w-10 h-10 rounded-md'>
                <box-icon color="white" name='edit-alt'></box-icon>
              </button>
              <button onClick={() => handleClickDeletedUser(user.id)} className='grid items-center justify-center m-auto text-2xl bg-blue-500 hover:bg-blue-600 w-10 h-10 rounded-md'>
                <box-icon color="white" name='trash'></box-icon>
              </button>
            </td>

          </tr>
          ))

          }
        </tbody>
        <tbody>
          
        </tbody>
      </table>
  )
}

export default UserTableComponent