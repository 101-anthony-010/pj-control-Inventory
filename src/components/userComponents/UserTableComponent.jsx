import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

//Slice
import { changeIsShowUpdatedUser, setUser } from '../../store/slices/user.slice';

const UserTableComponent = () => {
  const [users, setUsers] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const handleChangeIsShowUpdatedUser = (data) => {
    dispatch(setUser(data));
    dispatch(changeIsShowUpdatedUser());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, sedesResponse, dependenciasResponse, cargosResponse] = await Promise.all([
          axiosPoderJudicial.get('/user/'),
          axiosPoderJudicial.get('/sede'),
          axiosPoderJudicial.get('/dependencia'),
          axiosPoderJudicial.get('/cargo')
        ]);

        setUsers(usersResponse.data.users);
        setSedes(sedesResponse.data.sedes);
        setDependencias(dependenciasResponse.data.dependencias);
        setCargos(cargosResponse.data.cargos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickDeletedUser = async (id) => {
    try {
      await axiosPoderJudicial.delete(`/user/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      console.log(`Usuario con ID ${id} eliminado exitosamente.`);
    } catch (error) {
      console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    }
  };

  const getItemName = (itemsArray, itemId) => {
    if (!itemsArray) return "Cargando...";
    const item = itemsArray.find(item => item.id === itemId);
    return item ? item.name : "No encontrado";
  };

  if (loading) {
    return <p>Cargando...</p>;
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
          <th className="px-4 py-2">Dependencia</th>
          <th className="px-4 py-2">Cargo</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr  key={user.id}>
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.lastName}</td>
            <td className="border px-4 py-2">{user.userName}</td>
            <td className="border px-4 py-2">{getItemName(sedes, user.sedeId)}</td>
            <td className="border px-4 py-2">{getItemName(dependencias, user.dependenciaId)}</td>
            <td className="border px-4 py-2">{getItemName(cargos, user.cargoId)}</td>
            <td className="w-32 border px-4 py-2 grid grid-cols-2 justify-between">
              <button onClick={() => handleChangeIsShowUpdatedUser(user)} className='grid items-center justify-center m-auto text-2xl bg-yellow-500 hover:bg-yellow-600 w-10 h-10 rounded-md'>
                <box-icon color="white" name='edit-alt'></box-icon>
              </button>
              <button onClick={() => handleClickDeletedUser(user.id)} className='grid items-center justify-center m-auto text-2xl bg-blue-500 hover:bg-blue-600 w-10 h-10 rounded-md'>
                <box-icon color="white" name='trash'></box-icon>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTableComponent;
