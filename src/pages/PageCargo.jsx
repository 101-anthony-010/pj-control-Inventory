import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Navbar from '../components/layout/Navbar'
import AddCargo from '../components/addComponents/AddCargo'

// Slices
import { changeIsShowCreateCargo, changeIsShowUpdatedCargo } from '../store/slices/user.slice'

// Utils
import { axiosPoderJudicial } from '../utils/configAxios'
import { EditCargo } from '../components/editComponents/EditCargo'

const PageCargo = () => {
  const [dataCargos, setDataCargos] = useState([])
  const [cargos, setCargos] = useState([])
  const { isShowCreateCargo, isShowUpdatedCargo } = useSelector(store => store.userSlice);
  const dispacth = useDispatch()

  const handleChangeShowIsCargo = () => {
    dispacth(changeIsShowCreateCargo())
  }

  const handleChangeShowIsCargoUpdated = (data) => {
    setDataCargos(data)
    dispacth(changeIsShowUpdatedCargo())
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/cargo')
      .then(res => setCargos(res.data.cargos))
      .catch(err => console.log(err))
  }, [])
  
  const handleClickDeletedCargo = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este Cargo?")) {
      try {
        try {
          await axiosPoderJudicial.delete(`/cargo/${id}`);
          const updatedCargo = cargos.filter(item => item.id !== id);
          setCargos(updatedCargo);
          console.log(`Cargo con ID ${id} eliminado exitosamente.`);
        } catch (error) {
          console.error(`Error al eliminar el cargo con ID ${id}:`, error);
        }
      } catch (error) {
        console.error(`Error al eliminar el cargo con ID ${id}:`, error);
      }
    } else {
      console.log("Eliminación cancelada.");
    }
  };

  const sorted = cargos.sort((a, b) => b.id - a.id)


  return (
    <>
      <Navbar/>

      <section className={`${isShowCreateCargo ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20`}>
        <AddCargo/>
      </section>

      <section className={`${isShowUpdatedCargo ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20`}>
        <EditCargo dataCargo={dataCargos}/>
      </section>

      <section className='ml-[80px] px-10 mt-[80px]'>

        <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[440px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/portfolio.png" alt="" />
            </div>
            <div className='w-[300px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>Registro de cargos</p>
              <p className='font-semibold text-xl'>{ cargos?.length }</p>
            </div>
          </section>
          <div onClick={handleChangeShowIsCargo} className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md' >
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </div>
        </section>

        <table className='m-auto text-xs my-10 w-full text-center border-collapse border border-slate-700'>
        <thead className='bg-gray-200'>
          <tr className='uppercase text-base'>
            <th className='p-2 w-[65px] border border-white'>Id</th>
            <th className='p-2 border border-white'>Cargo</th>
            <th className='p-2 border w-[180px] border-white'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            cargos?.map( item => (
                <tr key={item.id}>
                  <th className='border border-slate-700 font-normal p-2 '>{item.id}</th>
                  <th className='border uppercase border-slate-700 font-normal p-2 '>{item.name}</th>
                  <th className='border border-slate-700 p-2  relative'>
                    <div className="grid grid-cols-2 justify-center items-center p-1 mx-4">
                      <div className='w-[20px] h-[20px] inline-block rounded-md hover:cursor-pointer m-auto' >
                        <img onClick={() => handleChangeShowIsCargoUpdated(item)} className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                      </div>
                      <div onClick={() => handleClickDeletedCargo(item.id)} className='w-[20px] h-[20px] inline-block text-center rounded-md hover:cursor-pointer m-auto' >
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

export default PageCargo