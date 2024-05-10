import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Navbar from '../components/layout/Navbar'
import AddMarca from '../components/addComponents/AddMarca'

// Slices
import { changeIsShowCreateMarca, changeIsShowCreateModel, changeIsShowUpdatedModel } from '../store/slices/user.slice'

// Utils
import { axiosPoderJudicial } from '../utils/configAxios'
import AddModel from '../components/addComponents/AddModel'
import EditModel from '../components/editComponents/EditModel'

const PageMarca = () => {
  const [models, setModels] = useState([])
  const [dataModels, setDataModels] = useState([])
  const [marcas, setMarcas] = useState([])
  const [loadMarcas, setLoadMarcas] = useState([])
  const { isShowCreateMarca, isShowCreateModel, isShowUpdatedModel } = useSelector(store => store.userSlice);
  const dispacth = useDispatch()

  const handleChangeShowIsMarca = () => {
    dispacth(changeIsShowCreateMarca())
  }
  const handleChangeShowIsModel = () => {
    dispacth(changeIsShowCreateModel())
  }
  const handleChangeShowIsModelUpdated = (data) => {
    setDataModels(data)
    dispacth(changeIsShowUpdatedModel())
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModels(res.data.modelsProducts))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarcas(res.data.marcas))
      .catch(err => console.log(err))
  }, [])

  const handleNameMarca = (id) => {
    const name = marcas.find(item => item.id === id)
    return name ? name.name : "cargando"
  }

  const handleClickDeletedModels = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este modelo?")) {
      try {
        try {
          await axiosPoderJudicial.delete(`/modelProduct/${id}`);
          const updated = models.filter(item => item.id !== id);
          setModels(updated);
          console.log(`Modelo con ID ${id} eliminado exitosamente.`);
        } catch (error) {
          console.error(`Error al eliminar el producto con ID ${id}:`, error);
        }
      } catch (error) {
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
      }
    } else {
      console.log("Eliminación cancelada.");
    }
  };

  const sorted = models.sort((a, b) => b.id - a.id)
  
  return (
    <>
      <Navbar/>

      <section className={`${isShowCreateMarca ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20 flex items-center justify-center`}>
        <AddMarca setLoadMarcas={setLoadMarcas} handleChangeShowIsMarca={handleChangeShowIsMarca}/>
      </section>

      <section className={`${isShowCreateModel ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20 flex items-center justify-center`}>
        <AddModel loadMarcas={loadMarcas} handleChangeShowIsModel={handleChangeShowIsModel}/>
      </section>

      <section className={`${isShowUpdatedModel ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20 flex items-center justify-center`}>
        <EditModel dataModels={dataModels} handleChangeShowIsModelUpdated={handleChangeShowIsModelUpdated}/>
      </section>

      <section className='ml-[80px] px-10 mt-[80px]'>

      <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[440px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/3d-modeling.png" alt="" />
            </div>
            <div className='w-[300px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>marcas y modelos</p>
              {/* <p className='font-semibold text-xl'>{ models.length }</p> */}
            </div>
          </section>
          <section className='grid gap-4 items-center justify-center grid-cols-2'>
            <h2>Agregar Marca</h2>
            <div onClick={handleChangeShowIsMarca} className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md'>
              <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
            </div>
            <h2>Agregar Modelo</h2>
            <div onClick={handleChangeShowIsModel} className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md'>
              <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
            </div>
          </section>
        </section>

        <table className='m-auto my-10 text-xs text-center border-collapse border border-slate-700 w-full'>
        <thead className='bg-gray-200'>
          <tr className='text-base uppercase'>
            <th className='p-2 w-[65px] border border-white'>Id</th>
            <th className='p-2  border border-white'>Marca</th>
            <th className='p-2  border border-white'>Modelo</th>
            <th className='p-2 w-[180px] border border-white'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            models?.map( item => (
                <tr key={item.id}>
                  <th className='font-normal border border-slate-700 p-2'>{item.id}</th>
                  <th className='font-normal border border-slate-700 p-2 uppercase'>{handleNameMarca(item.marcaId)}</th>
                  <th className='font-normal border border-slate-700 p-2 uppercase'>{item.name}</th>
                  <th className='border border-slate-700 p-2 relative'>
                    <div className="grid grid-cols-2 justify-center items-center p-1 mx-4">
                      <div className='w-[20px] h-[20px] inline-block rounded-md hover:cursor-pointer m-auto' >
                        <img onClick={() => handleChangeShowIsModelUpdated(item)} className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                      </div>
                      <div onClick={() => handleClickDeletedModels(item.id)} className='w-[20px] h-[20px] inline-block text-center rounded-md hover:cursor-pointer m-auto' >
                        <img className='w-full h-full object-contain' src="/icons/trash.png" alt="" />
                      </div>
                    </div>
                  </th>
                </tr>
            )
            )
          }
        </tbody>
      </table>
      </section>
    </>
  )
}

export default PageMarca