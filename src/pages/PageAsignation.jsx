import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Utils
import { axiosPoderJudicial } from '../utils/configAxios';

// Components
import CreateAsignation from '../components/asignationComponent/CreateAsignation';
import AsignationTableComponent from '../components/asignationComponent/AsignationTableComponent';

// Slice
import { changeIsShowCreateAsignation } from '../store/slices/asignation.slice';

const PageAsignation = () => {
  const [asignations, setAsignations] = useState([]);
  const [filteredAsignations, setFilteredAsignations] = useState([]);
  const [isInUseSelected, setIsInUseSelected] = useState(true); // Estado para el botón "En uso"
  const { isShowCreateAsignation } = useSelector(store => store.asignationSlice); // Accede a isShowCreateAsignation desde el estado global
  const dispatch = useDispatch();

  const handleClickChangeShowCreateAsignation = () => {
    dispatch(changeIsShowCreateAsignation());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axiosPoderJudicial.get('/product');
        const enableProductIds = productResponse.data.products.filter(product => product.state === 'enable').map(product => product.id);
        const disableProductIds = productResponse.data.products.filter(product => product.state === 'disable').map(product => product.id);

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
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateAsignation ? "top-0" : "-top-full"}`}>
        <CreateAsignation handleClickChangeShowCreateAsignation={handleClickChangeShowCreateAsignation} />
      </section>

      <section className='flex gap-4 justify-between p-2'>
        <div className='flex gap-4'>
          <button onClick={() => setIsInUseSelected(true)} className={`rounded-md ${isInUseSelected ? 'bg-blue-500 text-white' : 'bg-slate-200'} px-4`}>En uso</button>
          <button onClick={() => setIsInUseSelected(false)} className={`rounded-md ${!isInUseSelected ? 'bg-blue-500 text-white' : 'bg-slate-200'} px-4`}>De baja</button>
        </div>

        <section className='grid grid-cols-[1fr_auto_auto] gap-2'>
          <input type="text" className='bg-gray-100 rounded-md p-2'/>
          <button className='p-2 flex items-center justify-center bg-green-500 rounded-md'>
            <box-icon color="white" name='search-alt-2' ></box-icon>
          </button>
          <button onClick={handleClickChangeShowCreateAsignation}  className='flex items-center justify-center bg-green-500 rounded-md p-2'>
            <box-icon color='white' type='solid' name='user-plus'></box-icon>
          </button>
        </section>
      </section>

      <section className='grid items-center justify-center'>
        <AsignationTableComponent asignations={filteredAsignations} />
      </section>
    </>
  )
}

export default PageAsignation;
