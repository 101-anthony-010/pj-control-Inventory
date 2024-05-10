import React, { useEffect, useState } from 'react'

// Components
import Navbar from '../components/layout/Navbar'

// Utils
import { axiosPoderJudicial } from '../utils/configAxios'
import { Link } from 'react-router-dom'

const PageControlPanel = () => {
  const [userCount, setUserCount] = useState([])
  const [productCount, setProductCount] = useState([])
  const [asignationCount, setAsignationCount] = useState([])

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then(res => setUserCount(res.data.users))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/product')
      .then(res => setProductCount(res.data.products))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/asignation')
      .then(res => setAsignationCount(res.data.asignations))
      .catch(err => console.log(err))
  }, [])
  
  // funciones de Filtro
  const productEnable = (data) => {
    const filter = data.filter(item => item.state === "enable")
    return filter.length
  }
  const asignationEnable = (data) => {
    const filter = data.filter(item => item.amountPages === null && item.state === "disable")
    return filter.length
  }

  return (
    <>
      <Navbar/>
      
      <section className='ml-[80px] mt-[90px]'>
        <section className='grid grid-cols-3 gap-6 w-[1000px] m-auto'>
          <Link to={'/user'} className='shadow-md grid-cols-2 bg-slate-100 cursor-pointer grid w-[280px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-green-400'>
              <img className='p-4 w-full h-full object-contain' src="/icons/team.png" alt="" />
            </div>
            <div className='text-center grid gap-1'>
              <p className='font-semibold text-lg'>{ userCount?.length }</p>
              <p>Usuarios</p>
            </div>
          </Link>
          <Link to={'/product'} className='shadow-md grid-cols-2 bg-slate-100 cursor-pointer grid w-[280px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-yellow-300'>
              <img className='p-4 w-full h-full object-contain' src="/icons/printer.png" alt="" />
            </div>
            <div className='text-center grid gap-1'>
              <p className='font-semibold text-lg'>{ productEnable(productCount) }</p>
              <p>Toners</p>
            </div>
          </Link>
          <Link to={'/asignation'} className='shadow-md grid-cols-2 bg-slate-100 cursor-pointer grid w-[280px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-blue-400'>
              <img className='p-4 w-full h-full object-contain' src="/icons/qa.png" alt="" />
            </div>
            <div className='text-center grid gap-1'>
              <p className='font-semibold text-lg'>{ asignationEnable(productCount) }</p>
              <p>Asignaciones</p>
            </div>
          </Link>
        </section>
      </section>
    </>
  )
}

export default PageControlPanel