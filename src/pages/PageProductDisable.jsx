import React, { useEffect, useState } from 'react'
import { axiosPoderJudicial } from '../utils/configAxios';
import Navbar from '../components/layout/Navbar';
import { formatDateDDMMYYYY } from '../utils/date';
import { Link } from 'react-router-dom';

const PageProductDisable = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([])
  const [marcaProduct, setMarcaProduct] = useState([])
  const [modelProduct, setModelProduct] = useState([])
  useEffect(() => {
    axiosPoderJudicial
      .get('/product')
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarcaProduct(res.data.marcas))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModelProduct(res.data.modelsProducts))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/user')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err));
    
  }, []);

  // Optener nombres 
  const handleNameMarca = (id) => {
    const marca = marcaProduct.find(item => item.id === id)
    return marca ? marca.name : "cargando"
  };
  const handleNameModel = (id) => {
    const model = modelProduct.find(item => item.id === id)
    return model ? model.name : "cargando"
  }
  const userName = (id) => {
    const user = users.find(item => item.id === id)
    return user ? user.userName.toUpperCase() : "cargando"
  }
  const sorted = products.sort((a, b) => b.id - a.id)

  return (
    <>
      <Navbar/>
{/* 
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowExportPdf ? "top-0 right-0" : "-right-full"}`}>
        <ExportPDFButton handleClickChangeShowExportPdf={handleClickChangeShowExportPdf} asignations={asignations} />
      </section> */}

      <section className='ml-[80px] px-10 mt-[80px] fleustify-between'>

      <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[440px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/toner.png" alt="" />
            </div>
            <div className='w-[300px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>toner consumidos</p>
              <p className='font-semibold text-xl'>{(products.filter(item => item.state === 'disable' && item.amountPages !== null)).length}</p>
            </div>
          </section>
          <Link to={'/export'} className='w-[50px] h-[50px] hover:cursor-pointer hover:bg-green-400 rounded-md shadow-md p-2'>
            <img className='w-full h-full object-contain' src="/icons/download.png" alt="" />
          </Link>
        </section>

        <table className='m-auto text-xs text-center border-collapse border border-slate-700 mt-10 w-full'>
        <thead className='bg-gray-200'>
          <tr className='text-base uppercase'>
            <th className='p-2 w-[65px] border border-white'>Id</th>
            <th className='p-2 border border-white'>Marca</th>
            <th className='p-2 border border-white'>Modelo</th>
            <th className='p-2 border border-white'>Numero de Serie</th>
            <th className='p-2 border border-white'>Usuario</th>
            <th className='p-2 w-[100px] border border-white'>N° Hojas</th>
            <th className='p-2 w-[180px] border border-white'>Fecha de Ingreso</th>
            <th className='p-2 w-[180px] border border-white'>Fecha de Salida</th>
          </tr>
        </thead>
        <tbody>
          {(products.filter(item => item.state === 'disable' && item.amountPages !== null))?.map((product) => (
            <tr key={product.id}>
              <td className="font-normal border border-slate-700 p-2">{product.id}</td>
              <td className="font-normal border border-slate-700 p-2 uppercase">{handleNameMarca(product.marcaId)}</td>
              <td className="font-normal border border-slate-700 p-2 uppercase">{handleNameModel(product.modelId)}</td>
              <td className="font-normal border border-slate-700 p-2 uppercase">{product.numSerie}</td>
              <td className="font-normal border border-slate-700 p-2">{userName(product.userId)}</td>
              <td className="font-normal border border-slate-700 p-2">{product.amountPages}</td>
              <td className="font-normal border border-slate-700 p-2">{formatDateDDMMYYYY(product.dateInitial)}</td>
              <td className="font-normal border border-slate-700 p-2">{formatDateDDMMYYYY(product.dateFinal)}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </section>


    </>
  )
}

export default PageProductDisable