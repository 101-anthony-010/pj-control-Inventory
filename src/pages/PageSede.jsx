import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import Navbar from '../components/layout/Navbar'
import AddSede from '../components/addComponents/AddSede'

// Slices
import { changeIsShowSede } from '../store/slices/user.slice'

// Utils
import { axiosPoderJudicial } from '../utils/configAxios'

const PageSede = () => {
  const [sede, setSede] = useState([])
  const { isShowSede } = useSelector(store => store.userSlice);

  const dispacth = useDispatch()

  const handleChangeShowIsSede = () => {
    dispacth(changeIsShowSede())
  }


  useEffect(() => {
    axiosPoderJudicial
      .get('/sede')
      .then(res => setSede(res.data.sedes))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <>
      <Navbar/>

      <section className={`${isShowSede ? "left-0" : "-left-full"} absolute w-full h-full z-50 top-0 bg-black/20`}>
        <AddSede/>
      </section>

      <section className='ml-[100px] px-10 mt-[80px]'>


        <section className='text-center my-4 flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Registro de Sedes</h2>
          <div className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md' onClick={handleChangeShowIsSede}>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </div>
        </section>

        <table className='m-auto text-xs text-center border-collapse border border-black'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='p-2 w-24 border border-white'>Id</th>
            <th className='p-2 w-32 border border-white'>Sede</th>
            <th className='p-2 w-32 border border-white'>Direccion</th>
            <th className='p-2 w-32 border border-white'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            sede?.map( item => (
                <tr key={item.id}>
                  <th className='border border-black p-2 w-24'>{item.id}</th>
                  <th className='border border-black p-2 w-32'>{item.name}</th>
                  <th className='border border-black p-2 w-32'>direccion</th>
                  <th className='border border-black p-2 w-32 relative'>
                    <div className="grid grid-cols-2 justify-center items-center p-1 mx-4">
                      <div className='w-[20px] h-[20px] inline-block rounded-md hover:cursor-pointer m-auto' >
                        <img className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                      </div>
                      <div className='w-[20px] h-[20px] inline-block text-center rounded-md hover:cursor-pointer m-auto' >
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