import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../../utils/configAxios'

const CreateUser = ({ handleChangeIsShowCreateUser }) => {
  const [sedes, setSedes] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [cargos, setCargos] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosPoderJudicial
      .get('/sede')
      .then(res => setSedes(res.data.sedes))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/dependencia')
      .then(res => setDependencias(res.data.dependencias))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/cargo')
      .then(res => setCargos(res.data.cargos))
      .catch(err => console.log(err))
  }, []);

  const submit = (data) => {
    console.log(data)
    axiosPoderJudicial
      .post('/user', data)
      .then(res => console.log(res.data.user))
      .catch(err => console.log(err))

    handleChangeIsShowCreateUser()
    window.confirm("Usuario creado con exito")
    window.location.reload();
    
    }

  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2 w-[35px] h-[35px]' onClick={handleChangeIsShowCreateUser}>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>

      <form className='grid grid-cols-2 gap-2' onSubmit={handleSubmit(submit)}>
        
        <label htmlFor="name">Nombre:</label>
        <input className='rounded-md p-2 bg-slate-100' type="text"{...register("name")} required />
        
        <label htmlFor="name">Apellidos:</label>
        <input className='rounded-md p-2 bg-slate-100' type="text"{...register("lastName")} required />

        <label htmlFor="name">DNI:</label>
        <input className='rounded-md p-2 bg-slate-100' type="number"{...register("dni")} required />
  
        <label htmlFor="name">Telefono:</label>
        <input className='rounded-md p-2 bg-slate-100' type="number"{...register("phone")} required />
        
        <label htmlFor="name">Correo:</label>
        <input className='rounded-md p-2 bg-slate-100' type="email"{...register("email")} required />
        
        <label htmlFor="name">Contraseña:</label>
        <input className='rounded-md p-2 bg-slate-100' defaultValue={''} type="password"{...register("password")} required />
        
        <label htmlFor="name">Usuario:</label>
        <input className='rounded-md p-2 bg-slate-100' defaultValue={''} type="text"{...register("userName")} required />
        
        <label htmlFor="sedeId">Sede:</label>
        <select required className='rounded-md bg-slate-100 p-2' name="sedeId" {...register("sedeId")} id="sedeId">
          <option value="">Seleccione una sede</option>
          {sedes?.map(sede => <option key={sede.id} value={sede.id}>{sede.name}</option>)}
        </select>       

        <label htmlFor="dependenciaId">Dependencia:</label>
        <select required className='rounded-md bg-slate-100 p-2' name="Id" {...register("dependenciaId")} id="dependenciaId">
          <option value="">Selecciona una dependencia</option>
          {dependencias?.map(dependencia => <option key={dependencia.id} value={dependencia.id}>{dependencia.name}</option>)}
        </select>

        <label htmlFor="modelId">Cargo:</label>
        <select required className='rounded-md bg-slate-100 p-2' name="cargoId" {...register("cargoId")} id="cargoId">
          <option value="">Seleccione un cargo</option>
          {cargos?.map(cargo => <option key={cargo.id} value={cargo.id}>{cargo.name}</option>)}
        </select>

        <button className='bg-green-500 text-white rounded-md col-span-2 p-2 font-bold'>Crear Usuario</button>
      </form>
    </section>
  )
}

export default CreateUser