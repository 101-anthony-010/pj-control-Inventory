import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

//Components
import CreateProduct from '../components/productComponent/CreateProduct';
import ProductTableComponent from '../components/productComponent/ProductTableComponent';
import EditProduct from '../components/productComponent/EditProduct';

//Slices
import { changeIsShowCreateProduct } from '../store/slices/product.Slice';

const PageProduct = () => {
  const dispatch = useDispatch()
  const { isShowCreateProduct } = useSelector(store => store.productSlice);

  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct())
  }
  return (
    <>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <CreateProduct/>
      </section>
      
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <EditProduct/>
      </section>

      <section className='m-4  flex justify-between'>
        <h1 className='text-center text-xl m-auto'>Tablas de Productos</h1>
        
        <section className='grid grid-cols-[1fr_auto_auto] gap-2'>
          <input type="text" className='bg-gray-100 rounded-md p-2'/>
          <button className='p-2 flex items-center justify-center bg-green-500 rounded-md'>
            <box-icon color="white" name='search-alt-2' ></box-icon>
          </button>
          <button onClick={handleClickChangeShowCreateProduct} className='flex items-center justify-center bg-green-500 rounded-md p-2'>
            <box-icon color='white' type='solid' name='user-plus'></box-icon>
          </button>
        </section>
      </section>

      <section className='grid items-center justify-center'>
        <ProductTableComponent/>
      </section>
    </>
  )
}

export default PageProduct