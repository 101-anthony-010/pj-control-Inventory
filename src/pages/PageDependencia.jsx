import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Navbar from '../components/layout/Navbar'
import AddDependencia from '../components/addComponents/AddDependencia'

// Utils
import { axiosPoderJudicial } from '../utils/configAxios'

// Slices
import { changeIsShowCreateDependencia, changeIsShowUpdatedDependencia } from '../store/slices/user.slice'
import EditDependencia from '../components/editComponents/EditDependencia'

const PageDependencia = () => {
  const [dataDependencias, setDataDependencias] = useState([])
  const [dependencias, setDependencias] = useState([])
  const { isShowCreateProduct, isShowUpdatedProduct } = useSelector(store => store.productSlice);
  const { isShowCreateDependencia, isShowUpdatedDependencia } = useSelector(store => store.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosPoderJudicial
      .get('/dependencia')
      .then(res => setDependencias(res.data.dependencias))
      .catch(err => console.log(err))
  }, [])
  
  const handleChangeShowIsDependencia = () => {
    dispatch(changeIsShowCreateDependencia())
  }
  const handleChangeShowIsDependenciaUpdated = (data) => {
    setDataDependencias(data)
    dispatch(changeIsShowUpdatedDependencia())
  }

  const handleClickDeletedDependencia = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta Dependencia?")) {
      try {
        try {
          await axiosPoderJudicial.delete(`/dependencia/${id}`);
          const updatedDependencia = dependencias.filter(item => item.id !== id);
          setDependencias(updatedDependencia);
          console.log(`Producto con ID ${id} eliminado exitosamente.`);
        } catch (error) {
          console.error(`Error al eliminar la dependencia con ID ${id}:`, error);
        }
      } catch (error) {
        console.error(`Error al eliminar la dependencia con ID ${id}:`, error);
      }
    } else {
      console.log("Eliminación cancelada.");
    }
  };

  const sorted = dependencias.sort((a, b) => b.id - a.id)

  return (
    <>
      <Navbar/>

      <section className={`${isShowCreateDependencia ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20`}>
        <AddDependencia/>
      </section>
      <section className={`${isShowUpdatedDependencia ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20`}>
        <EditDependencia dataDependencias={dataDependencias}/>
      </section>

      <section className='ml-[80px] px-10 mt-[80px]'>

        <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[500px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/weights.png" alt="" />
            </div>
            <div className='w-[360px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>Registro de dependencia</p>
              <p className='font-semibold text-xl'>{dependencias.length}</p>
            </div>
          </section>
          <div onClick={handleChangeShowIsDependencia} className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md'>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </div>
        </section>

        <table className='m-auto mt-10 w-full text-xs text-center border-collapse border border-slate-700'>
        <thead className='bg-gray-200'>
          <tr className='text-base uppercase'>
            <th className='p-2 w-[65px] border border-white'>Id</th>
            <th className='p-2 border border-white'>Dependencia</th>
            <th className='p-2 w-[180px] border border-white'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            dependencias?.map( item => (
                <tr key={item.id} className='font-light text-xs'>
                  <th className='font-normal border border-slate-700 p-2'>{item.id}</th>
                  <th className='font-normal border border-slate-700 p-2 uppercase'>{item.name}</th>
                  <th className='border border-slate-700 p-2 relative'>
                    <div className="grid grid-cols-2 justify-center items-center p-1 mx-4">
                      <div onClick={() => handleChangeShowIsDependenciaUpdated(item)} className='w-[20px] h-[20px] inline-block rounded-md hover:cursor-pointer m-auto' >
                        <img className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                      </div>
                      <div onClick={() => handleClickDeletedDependencia(item.id)} className='w-[20px] h-[20px] inline-block text-center rounded-md hover:cursor-pointer m-auto' >
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

export default PageDependencia