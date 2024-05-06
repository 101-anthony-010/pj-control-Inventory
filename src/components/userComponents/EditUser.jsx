import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

//Slice
import { setUser } from '../../store/slices/user.slice';
import { useSelector } from 'react-redux';

const EditUser = ({ handleChangeIsShowUpdatedUser }) => {
  const [sedes, setSedes] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [cargos, setCargos] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { id, name, lastName, dni, email, phone, userName } = useSelector(store => store.userSlice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sedesResponse, dependenciasResponse, cargosResponse] = await Promise.all([
          axiosPoderJudicial.get('/sede'),
          axiosPoderJudicial.get('/dependencia'),
          axiosPoderJudicial.get('/cargo')
        ]);

        setSedes(sedesResponse.data.sedes);
        setDependencias(dependenciasResponse.data.dependencias);
        setCargos(cargosResponse.data.cargos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const submit = async (data) => {
    axiosPoderJudicial
      .post(`/user/${data}`, data)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    handleChangeIsShowUpdatedUser();
    reset();
  };

  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2 w-[35px] h-[35px]' onClick={() => handleChangeIsShowUpdatedUser()}>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>

      <form className='grid grid-cols-2 gap-2' onSubmit={handleSubmit(submit)}>

        <label htmlFor="name">Nombre:</label>
        <input className='rounded-md bg-slate-100 p-2' defaultValue={name} type="text" {...register("name")} name="name" required />

        <label htmlFor="lastName">Apellidos:</label>
        <input className='rounded-md bg-slate-100 p-2' defaultValue={lastName} type="text" {...register("lastName")}  name="lastName" required />

        <label htmlFor="dni">DNI:</label>
        <input className='rounded-md bg-slate-100 p-2' defaultValue={dni} type="text" {...register("dni")}  name="dni" required />

        <label htmlFor="phone">Teléfono:</label>
        <input className='rounded-md bg-slate-100 p-2' defaultValue={phone} type="text" {...register("phone")} name="phone" required />

        <label htmlFor="email">Correo:</label>
        <input className='rounded-md bg-slate-100 p-2' defaultValue={email} type="email" {...register("email")}  name="email" required />

        <label htmlFor="password">Contraseña:</label>
        <input className='rounded-md bg-slate-100 p-2' defaultValue={''} type="password" {...register("password")} name="password" required />

        <label htmlFor="userName">Usuario:</label>
        <input className='rounded-md bg-slate-100 p-2' defaultValue={userName} type="text" {...register("userName")}  name="userName" required />

        <label htmlFor="sedeId">Sede:</label>
        <select className='rounded-md bg-slate-100 p-2' name="sedeId" {...register("sedeId")} >
          <option value="">Seleccione una sede</option>
          {sedes?.map(sede => <option key={sede.id} value={sede.id}>{sede.name}</option>)}
        </select>

        <label htmlFor="dependenciaId">Dependencia:</label>
        <select className='rounded-md bg-slate-100 p-2' name="dependenciaId" {...register("dependenciaId")} >
          <option value="">Seleccione una dependencia</option>
          {dependencias?.map(dependencia => <option key={dependencia.id} value={dependencia.id}>{dependencia.name}</option>)}
        </select>

        <label htmlFor="cargoId">Cargo:</label>
        <select className='rounded-md bg-slate-100 p-2' name="cargoId" {...register("cargoId")} >
          <option value="">Seleccione un cargo</option>
          {cargos?.map(cargo => <option key={cargo.id} value={cargo.id}>{cargo.name}</option>)}
        </select>

        <button type="submit" className='bg-yellow-500 text-white rounded-md col-span-2 p-2 font-bold'>Guardar Cambios</button>
      </form>

    </section>
  );
};

export default EditUser;
