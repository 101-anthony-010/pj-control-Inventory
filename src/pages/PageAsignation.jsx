import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


// Components
import CreateAsignation from '../components/asignationComponent/CreateAsignation';
import Navbar from '../components/layout/Navbar';
import InfoAsignation from '../components/asignationComponent/InfoAsignation';
import AmountAsignation from '../components/asignationComponent/AmountAsignation';
import AsignationTableComponent from '../components/asignationComponent/AsignationTableComponent';
import ExportPDFButton from '../components/Export/ExportPDFButton';

// Slices
import { changeIsShowAmountAsignation, changeIsShowCreateAsignation, changeIsShowExportPdf, changeIsShowInfoAsignation } from '../store/slices/asignation.slice';

// Utils
import { axiosPoderJudicial } from '../utils/configAxios';
import { formatDateDDMMYYYY } from '../utils/date';

const PageAsignation = () => {
  const [asignations, setAsignations] = useState([]);
  const [users, setUsers] = useState([]);
  const [models, setModels] = useState([])
  const [marcas, setMarcas] = useState([])
  const [products, setProducts] = useState([]);
  const [amountId, setAmountId] = useState([]);
  const [filteredAsignations, setFilteredAsignations] = useState([]);
  const [infoAsignation, setInfoAsignation] = useState([])

  const { isShowCreateAsignation, isShowExportPdf } = useSelector(store => store.asignationSlice);
  const { isShowInfoAsignation, isShowAmountAsignation } = useSelector(store => store.asignationSlice); // Accede a isShowCreateAsignation desde el estado global

  // const [isInUseSelected, setIsInUseSelected] = useState(true); 
  
  const dispatch = useDispatch();

  useEffect(() => {
    axiosPoderJudicial
      .get('/asignation')
      .then(res => setAsignations(res.data.asignations))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/user')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/product')
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarcas(res.data.marcas))
      .catch(err => console.log(err))
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModels(res.data.modelsProducts))
      .catch(err => console.log(err))
  }, [])
  
  
  // filtro de asignation en uso
  const filterProductDisableAndAmountNull = () => {
    const productsFilter = products.filter(item => item.state === 'disable' && item.amountPages === null)
    const asignacionFilter = asignations.filter(asignation => {
      return productsFilter.some(product => product.id === asignation.productId);
    });
    
    setFilteredAsignations(asignacionFilter);
  }
  useEffect(() => {
    filterProductDisableAndAmountNull()
  }, [products])

  const handleClickChangeShowCreateAsignation = () => {
    dispatch(changeIsShowCreateAsignation());
  }
  const handleClickChangeShowAmountAsignation = (data) => {
    dispatch(changeIsShowAmountAsignation())
    setAmountId(data)
  }
  const handleNameId = (data, id) => {
    const name = data.find(item => item.id === id)
    return name ? name : "Cargando"
  }

  const handleClickChangeShowInfoAsignation = (data) => {
    setInfoAsignation(data)
    dispatch(changeIsShowInfoAsignation())
  }

  const handleClickChangeShowExportPdf = () => {
    dispatch(changeIsShowExportPdf())
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const productResponse = await axiosPoderJudicial.get('/product');
  //       const enableProductIds = productResponse.data.products.filter(product => product.amountPages === null).map(product => product.id);
  //       const disableProductIds = productResponse.data.products.filter(product => product.amountPages !== null).map(product => product.id);

  //       const asignationResponse = await axiosPoderJudicial.get('/asignation');
  //       const filteredByState = isInUseSelected ? asignationResponse.data.asignations.filter(asignation => enableProductIds.includes(asignation.productId)) : asignationResponse.data.asignations.filter(asignation => disableProductIds.includes(asignation.productId));
        
  //       setAsignations(asignationResponse.data.asignations);
  //       setFilteredAsignations(filteredByState);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [isInUseSelected]);
  const sorted = filteredAsignations.sort((a, b) => b.id - a.id)

  return (
    <>
      <Navbar/>

      <section className={`bg-black/20 z-50 fixed w-full h-full flex items-center justify-center ${isShowCreateAsignation ? "top-0" : "-top-full"}`}>
        <CreateAsignation handleClickChangeShowCreateAsignation={handleClickChangeShowCreateAsignation} />
      </section>

      <section className={`bg-black/20 z-50 fixed left-0 w-full h-full flex items-center justify-center ${isShowAmountAsignation ? "top-0" : "-top-full"}`}>
        <AmountAsignation amountId={amountId} handleClickChangeShowAmountAsignation={handleClickChangeShowAmountAsignation} />
      </section>

      <section className={`bg-black/20 z-50 fixed left-0 w-full h-full flex items-center justify-center ${isShowInfoAsignation ? "top-0" : "-top-full"}`}>
        <InfoAsignation infoAsignation={infoAsignation} />
      </section>

      {/* <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowExportPdf ? "top-0 right-0" : "-right-full"}`}>
        <ExportPDFButton handleClickChangeShowExportPdf={handleClickChangeShowExportPdf} asignations={asignations} />
      </section> */}

      <section className='px-10 mt-[80px] ml-[80px]'>

        <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[620px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/qa.png" alt="" />
            </div>
            <div className='w-[480px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>Registro de asignacion de toner</p>
              <p className='font-semibold text-xl'>{filteredAsignations?.length}</p>
            </div>
          </section>
          <div className='grid grid-cols-2 items-center justify-center gap-2 h-[80px]'>
            {/* <div className='grid gap-2'>
              <button className='bg-slate-100 py-1 rounded-md px-8 shadow text-slate-700 hover:bg-blue-400 hover:text-white font-semibold'>Todos</button>
              <button className='bg-slate-100 py-1 rounded-md px-8 shadow text-slate-700 hover:bg-blue-400 hover:text-white font-semibold'>En uso</button>
            </div> */}
            <div className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md' onClick={handleClickChangeShowCreateAsignation}>
              <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
            </div>
          </div>
        </section>

        <table className='m-auto text-xs text-center border-collapse border my-10 border-slate-700 w-full'>
          <thead className='bg-gray-200'>
            <tr className='text-base uppercase'>
              <th className='uppercase p-2 w-[65px] border border-white'>Id</th>
              <th className='uppercase p-2 border border-white'>producto</th>
              <th className='uppercase p-2 border border-white'>usuario</th>
              <th className='uppercase p-2 w-[120px] border border-white'> n° hojas</th>
              <th className='uppercase p-2 w-[230px] border border-white'>fecha de instalación</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredAsignations?.map( item => (
                <tr className='hover:bg-slate-100 hover:cursor-pointer' key={item.id}>
                  <th onClick={() => handleClickChangeShowInfoAsignation(item)} className='font-normal border border-slate-700 p-1 w-[65px]'>{item.id}</th>
                  <th onClick={() => handleClickChangeShowInfoAsignation(item)} className='font-normal border border-slate-700 p-1 uppercase'>{handleNameId(marcas , handleNameId(products, item.productId).marcaId).name} - {handleNameId(models , handleNameId(products, item.productId).modelId).name}</th>
                  <th onClick={() => handleClickChangeShowInfoAsignation(item)} className='font-normal border border-slate-700 p-1 uppercase'>{handleNameId(users, item.userId).userName}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>
                    <div className='grid justify-center items-center'>
                      <button onClick={() => handleClickChangeShowAmountAsignation(item)} className='p-[3px] w-[25px] h-[25px] rounded-md'>
                        <img src="/icons/add.png" className='w-full h-full object-contain' alt="" />
                      </button>
                    </div>
                  </th>
                  <th onClick={() => handleClickChangeShowInfoAsignation(item)} className='font-normal border border-slate-700 p-1 uppercase'>{formatDateDDMMYYYY(item.date)}</th>
                </tr>
              )
              )
            }
          </tbody>
        </table>
      </section>

      {/* <section className='m-auto w-[80%]'>
        <AsignationTableComponent handleClickChangeShowInfoAsignation={() => handleClickChangeShowInfoAsignation(item)} asignations={filteredAsignations} isInUseSelected={isInUseSelected} />
      </section> */}

    </>
  )
}

export default PageAsignation;
