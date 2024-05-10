import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Navbar from '../components/layout/Navbar'
import AddSede from '../components/addComponents/AddSede'
import EditSede from '../components/editComponents/EditSede'

// Slices
import { changeIsShowCreateSede, changeIsShowUpdatedSede } from '../store/slices/user.slice'

// Utils
import { axiosPoderJudicial } from '../utils/configAxios'

const PageSede = () => {
  const [dataSede, setDataSede] = useState([])
  const [sede, setSede] = useState([])
  const { isShowCreateSede, isShowUpdatedSede } = useSelector(store => store.userSlice);
  const dispacth = useDispatch()

  const handleChangeShowIsSede = () => {
    dispacth(changeIsShowCreateSede())
  }
  const handleChangeShowIsSedeUpdated = (data) => {
    setDataSede(data)
    dispacth(changeIsShowUpdatedSede())
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/sede')
      .then(res => setSede(res.data.sedes))
      .catch(err => console.log(err))
  }, [])

  const handleClickDeletedSede = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta sede?")) {
      try {
        try {
          await axiosPoderJudicial.delete(`/sede/${id}`);
          const updated = sede.filter(item => item.id !== id);
          setSede(updated);
          console.log(`Sede con ID ${id} eliminado exitosamente.`);
        } catch (error) {
          console.error(`Error al eliminar la sede con ID ${id}:`, error);
        }
      } catch (error) {
        console.error(`Error al eliminar la sede con ID ${id}:`, error);
      }
    } else {
      console.log("Eliminación cancelada.");
    }
  };

  const sorted = sede.sort((a, b) => b.id - a.id)
  
  return (
    <>
      <Navbar/>

      <section className={`${isShowCreateSede ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20`}>
        <AddSede/>
      </section>
      <section className={`${isShowUpdatedSede ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20`}>
        <EditSede dataSede={dataSede} />
      </section>

      <section className='ml-[80px] px-10 mt-[80px]'>

        <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[440px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/map.png" alt="" />
            </div>
            <div className='w-[300px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>Registro de Sedes</p>
              <p className='font-semibold text-xl'>{ sede?.length }</p>
            </div>
          </section>
          <div className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md' onClick={handleChangeShowIsSede}>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </div>
        </section>

        <table className='m-auto text-xs text-center border-collapse border my-10 border-slate-700 w-full'>
        <thead className='bg-gray-200'>
          <tr className='text-base uppercase'>
            <th className='p-2 w-[65px] border border-white'>Id</th>
            <th className='p-2 border border-white'>Sede</th>
            <th className='p-2 border border-white'>Direccion</th>
            <th className='p-2 w-[180px] border border-white'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            sede?.map( item => (
                <tr key={item.id}>
                  <th className='font-normal border border-slate-700 p-1 w-[65px]'>{item.id}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>{item.name}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>{item.address}</th>
                  <th className='border border-slate-700 p-1 w-[180px] relative'>
                    <div className="grid grid-cols-2 justify-center items-center p-1 mx-4">
                      <div onClick={() => handleChangeShowIsSedeUpdated(item)} className='w-[20px] h-[20px] inline-block rounded-md hover:cursor-pointer m-auto' >
                        <img className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                      </div>
                      <div onClick={() => handleClickDeletedSede(item.id)} className='w-[20px] h-[20px] inline-block text-center rounded-md hover:cursor-pointer m-auto' >
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

export default PageSede