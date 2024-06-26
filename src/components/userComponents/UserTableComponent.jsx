import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

//Slice
import { changeIsShowUpdatedUser, setUser } from '../../store/slices/user.slice';
import { lowerUpperCase } from '../../utils/lowerUpperCase';
import axios from 'axios';

const UserTableComponent = ({handleChangeIsShowDeleteUser}) => {
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
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        try {
          await axiosPoderJudicial.delete(`/user/${id}`);
          const updatedUsers = users.filter(user => user.id !== id);
          setUsers(updatedUsers);
          console.log(`Usuario con ID ${id} eliminado exitosamente.`);
        } catch (error) {
          console.error(`Error al eliminar el usuario con ID ${id}:`, error);
        }
      } catch (error) {
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
      }
    } else {
      console.log("Eliminación cancelada.");
    }
  };

  const getItemName = (itemsArray, itemId) => {
    if (!itemsArray) return "Cargando...";
    const item = itemsArray.find(item => item.id === itemId);
    return item ? lowerUpperCase(item.name) : "No encontrado";
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  const sortedUsers = users.sort((a, b) => b.id - a.id)

  return (
    <table className="w-full text-center my-10">
      <thead>
        <tr className="bg-gray-200 uppercase text-base">
          <th className="px-4 py-2 border border-white">ID</th>
          <th className="px-4 py-2 border border-white">Nombre</th>
          <th className="px-4 py-2 border border-white">Apellido</th>
          <th className="px-4 py-2 border border-white">Usuario</th>
          <th className="px-4 py-2 border border-white">Sede</th>
          <th className="px-4 py-2 border border-white">Dependencia</th>
          <th className="px-4 py-2 border border-white">Cargo</th>
          <th className="px-4 py-2 border border-white">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td className="font-normal text-xs border border-slate-700">{user.id}</td>
            <td className="font-normal text-xs border border-slate-700">{lowerUpperCase(user.name)}</td>
            <td className="font-normal text-xs border border-slate-700">{lowerUpperCase(user.lastName)}</td>
            <td className="font-normal text-xs border border-slate-700">{user.userName.toUpperCase()}</td>
            <td className="font-normal text-xs border border-slate-700 uppercase">{getItemName(sedes, user.sedeId)}</td>
            <td className="font-normal text-xs border border-slate-700 uppercase">{getItemName(dependencias, user.dependenciaId)}</td>
            <td className="font-normal text-xs border border-slate-700 uppercase">{getItemName(cargos, user.cargoId)}</td>
            <td className="border m-auto border-slate-700">
              <div className="grid grid-cols-2 justify-center items-center my-1 mx-4">
                <div className='w-[25px] h-[25px] inline-block p-[3px] rounded-md hover:cursor-pointer m-auto' onClick={() => handleChangeIsShowUpdatedUser(user)}>
                  <img className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                </div>
                <div className='w-[25px] h-[25px] inline-block text-center p-[3px] rounded-md hover:cursor-pointer m-auto' onClick={() => handleClickDeletedUser(user.id)}>
                  <img className='w-full h-full object-contain' src="/icons/trash.png" alt="" />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTableComponent;
