import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useSelector } from 'react-redux'

const EditInfo = ({handleChangeIsShowInfoUserUpdated, info}) => {
  const [marcas, setMarcas] = useState([])
  const [modelos, setModelos] = useState([])
  const { register, handleSubmit, reset, setValue } = useForm()

  // if ( info!==undefined ) {
  //   console.log(info[0].id)
  //   console.log(info[0].userId)

  // }
  const submit = (data) => {
    // console.log(data)
    data.id = info[0].id
    data.userId = info[0].userId
    data.count = ""
    data.contFirware = ""
    data.diskTechnology = "SATA"
    // console.log(data)
    axiosPoderJudicial
      .patch('/info',data)
      .then(res => window.alert("Editado con Exito"))
      .catch(err => console.log(err))
    
    window.location.reload()
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarcas(res.data.marcas))
      .catch(res => console.log(res))
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModelos(res.data.modelsProducts))
      .catch(res => console.log(res))
  }, [])

  return (
    <section className='max-w-5xl relative bg-white rounded-md p-8'>
      <button className='absolute top-0 right-0 p-2'>
        <div onClick={() => handleChangeIsShowInfoUserUpdated()} className='w-[20px] h-[20px]'>
          <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
        </div>
      </button>
      <form onSubmit={handleSubmit(submit)} className='grid grid-cols-2 w-full gap-4' action="">
        <div className='grid grid-cols-2 gap-2 items-center'>
          <label htmlFor="">Marca de la Impresora</label>
          <select {...register('marcaPrinter')} className='bg-slate-100 p-1 rounded-md'>
            <option>Seleccione una marca</option>
            {
              marcas?.map(marca => <option key={marca.id} value={marca.name}>{marca.name}</option>)
            }
          </select>

          <label htmlFor="">Modelo de la Impresora</label>
          <select {...register('modelPrinter')} className='bg-slate-100 p-1 rounded-md'>
            <option>Seleccione un modelo</option>
            {
              modelos?.map(model => <option key={model.id} value={model.name}>{model.name}</option>)
            }
          </select>

          <label htmlFor="">Codigo de Inventario CPU</label>
          <input {...register("codeInventory")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Modelo de CPU</label>
          <input {...register("modelCPU")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Serie de CPU</label>
          <input {...register("serieCPU")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Procesador</label>
          <input {...register("procesador")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Memoria RAM</label>
          <input {...register("memoryRAM")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Capacidad de Disco</label>
          <input {...register("diskCapacity")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Tecnologia del Disco</label>
          <input {...register("diskTechnology")} className='bg-slate-100 rounded-md p-1' type="text" />
        </div>

        <div className='grid grid-cols-2 gap-1 items-center'>
          <label htmlFor="">Direccion IP</label>
          <input {...register("ip")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Tarjeta Grafica</label>
          <input {...register("graphicTarget")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">CDROM</label>
          <input {...register("cdrom")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Marca del Monitor</label>
          <input {...register("marcaMonitor")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Modelo del Monitor</label>
          <input {...register("modeloMonitor")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Serie del Monitor</label>
          <input {...register("serieMonitor")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Teclado</label>
          <input {...register("teclado")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">Contometro</label>
          <input {...register("contometro")} className='bg-slate-100 rounded-md p-1' type="text" />

          <label htmlFor="">MAC</label>
          <input {...register("mac")} className='bg-slate-100 rounded-md p-1' type="text" />
        </div>
        <button className='col-span-2 bg-yellow-400 rounded-md font-semibold p-2 w-[250px] m-auto shadow-md'>Editar</button>
      </form>
    </section>
  )
}

export default EditInfo