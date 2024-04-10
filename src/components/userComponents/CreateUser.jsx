import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../../utils/configAxios'

const CreateUser = ({ handleChangeIsShowCreateUser, setUsers }) => {
  const [sedes, setSedes] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [cargos, setCargos] = useState([]);
  const { register, handleSubmit, reset } = useForm();

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
    try {
      const response = await axiosPoderJudicial.post('/user/', data);
      console.log('Usuario creado:', response.data);

      // En lugar de hacer un check de Array.isArray(prevUsers), podemos utilizar un ternario
      setUsers(prevUsers => (Array.isArray(prevUsers) ? [...prevUsers, response.data] : [response.data]));


      // Resetear el formulario después de la creación exitosa
      // reset();

    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };


  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' onClick={handleChangeIsShowCreateUser}>
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>

      <form className='grid grid-cols-2 gap-5' onSubmit={handleSubmit(submit)} action="">
        
        <label htmlFor="name">Nombre:</label>
        <input type="text"{...register("name")} id="name" name="name" required />
        
        <label htmlFor="name">Apellidos:</label>
        <input type="text"{...register("lastName")} id="lastName" name="lastName" required />

        <label htmlFor="name">DNI:</label>
        <input type="dni"{...register("dni")} id="dni" name="dni" required />
  
        <label htmlFor="name">Telefono:</label>
        <input type="number"{...register("phone")} id="phone" name="phone" required />
        
        <label htmlFor="name">Correo:</label>
        <input type="email"{...register("email")} id="email" name="email" required />
        
        <label htmlFor="name">Contraseña:</label>
        <input type="password"{...register("password")} id="password" name="password" required />
        
        <label htmlFor="name">Usuario:</label>
        <input type="text"{...register("userName")} id="userName" name="userName" required />
        
        <label htmlFor="sedeId">Sede:</label>
        <select name="sedeId" {...register("sedeId")} id="sedeId">
          <option value="">Seleccione una sede</option>
          {sedes?.map(sede => <option key={sede.id} value={sede.id}>{sede.name}</option>)}
        </select>       

        <label htmlFor="dependenciaId">Dependencia:</label>
        <select name="Id" {...register("dependenciaId")} id="dependenciaId">
          <option value="">Selecciona una dependencia</option>
          {dependencias?.map(dependencia => <option key={dependencia.id} value={dependencia.id}>{dependencia.name}</option>)}
        </select>

        <label htmlFor="modelId">Cargo:</label>
        <select name="cargoId" {...register("cargoId")} id="cargoId">
          <option value="">Seleccione un cargo</option>
          {cargos?.map(cargo => <option key={cargo.id} value={cargo.id}>{cargo.name}</option>)}
        </select>

        <button onClick={handleChangeIsShowCreateUser} className='bg-green-500 text-white rounded-md col-span-2 p-2 font-bold'>Crear Usuario</button>
      </form>
    </section>
  )
}

export default CreateUser