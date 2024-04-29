import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Utils
import { axiosPoderJudicial } from '../utils/configAxios';

// Components
import CreateAsignation from '../components/asignationComponent/CreateAsignation';
import AsignationTableComponent from '../components/asignationComponent/AsignationTableComponent';
import Navbar from '../components/layout/Navbar';
import ExportPDFButton from '../components/Export/ExportPDFButton';

// Slice
import { changeIsShowCreateAsignation, changeIsShowExportPdf, changeIsShowInfoAsignation } from '../store/slices/asignation.slice';
import { Link } from 'react-router-dom';

const PageAsignation = () => {
  const [asignations, setAsignations] = useState([]);
  const [filteredAsignations, setFilteredAsignations] = useState([]);
  const [isInUseSelected, setIsInUseSelected] = useState(true); 
  const { isShowCreateAsignation, isShowExportPdf } = useSelector(store => store.asignationSlice);
  const dispatch = useDispatch();

  const handleClickChangeShowCreateAsignation = () => {
    dispatch(changeIsShowCreateAsignation());
  }

  const handleClickChangeShowInfoAsignation = () => {
    dispatch(changeIsShowInfoAsignation())
  }

  const handleClickChangeShowExportPdf = () => {
    dispatch(changeIsShowExportPdf())
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axiosPoderJudicial.get('/product');
        const enableProductIds = productResponse.data.products.filter(product => product.amountPages === null).map(product => product.id);
        const disableProductIds = productResponse.data.products.filter(product => product.amountPages !== null).map(product => product.id);

        const asignationResponse = await axiosPoderJudicial.get('/asignation');
        const filteredByState = isInUseSelected ? asignationResponse.data.asignations.filter(asignation => enableProductIds.includes(asignation.productId)) : asignationResponse.data.asignations.filter(asignation => disableProductIds.includes(asignation.productId));
        
        setAsignations(asignationResponse.data.asignations);
        setFilteredAsignations(filteredByState);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isInUseSelected]);

  return (
    <>
      <Navbar/>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateAsignation ? "top-0" : "-top-full"}`}>
        <CreateAsignation handleClickChangeShowCreateAsignation={handleClickChangeShowCreateAsignation} />
      </section>

      {/* <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowExportPdf ? "top-0 right-0" : "-right-full"}`}>
        <ExportPDFButton handleClickChangeShowExportPdf={handleClickChangeShowExportPdf} asignations={asignations} />
      </section> */}

      <section className='flex gap-4 justify-between p-2'>
        <div className='flex gap-4'>
          <button onClick={() => setIsInUseSelected(true)} className={`rounded-md ${isInUseSelected ? 'bg-blue-500 text-white' : 'bg-slate-200'} px-4`}>En uso</button>
          <button onClick={() => setIsInUseSelected(false)} className={`rounded-md ${!isInUseSelected ? 'bg-blue-500 text-white' : 'bg-slate-200'} px-4`}>De baja</button>
        </div>

        <section className='grid grid-cols-[1fr_auto_auto] gap-2'>
          {/* <input type="text" className='bg-gray-100 rounded-md p-2'/>
          <button className='p-2 flex items-center justify-center bg-green-500 rounded-md'>
            <box-icon color="white" name='search-alt-2' ></box-icon>
          </button> */}
          <button onClick={handleClickChangeShowCreateAsignation}  className='rounded-md p-2 w-[35px] h-[35px] shadow bg-green-500/90 hover:bg-green-500/60'>
            <img src="/icons/add_user.png" alt="" />
          </button>
          <Link to={'/export'} className='rounded-md p-2 w-[35px] h-[35px] shadow bg-red-500/90 hover:bg-red-500/60'>
            <img src="/icons/download.png" className='w-full h-full object-contain ' alt="" />
          </Link>
        </section>
      </section>
      
      <section className='text-center'>
        <h2 className='font-bold text-2xl my-4'>Tabla de asignacion de Tonner</h2>
      </section>

      <section className='m-auto w-[80%]'>
        <AsignationTableComponent handleClickChangeShowInfoAsignation={handleClickChangeShowInfoAsignation} asignations={filteredAsignations} isInUseSelected={isInUseSelected} />
      </section>

    </>
  )
}

export default PageAsignation;
