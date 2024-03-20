import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

//Components
import CreateProduct from '../components/CreateProduct';
import ProductTableComponent from '../components/ProductTableComponent';
import DeletedProduct from '../components/DeletedProduct';

//Slices
import { changeIsShowCreateProduct } from '../store/slices/createProduct.slice';
import { changeIsShowDeletedProduct } from '../store/slices/deletedProduct.slice';

const PageProduct = () => {
  const dispatch = useDispatch()
  const { isShowCreateProduct } = useSelector(store => store.createProductSlice);
  const { isShowDeletedProduct } = useSelector(store => store.deletedProductSlice);

  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct())
  }

  const handleClickChangeShowDeletedProduct = () => {
    dispatch(changeIsShowDeletedProduct())
  }
  return (
    <>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <CreateProduct/>
      </section>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowDeletedProduct ? "top-0" : "-top-full"}`}>
        <DeletedProduct/>
      </section>
      <section className='m-4  flex justify-between'>
        <h1 className='text-center text-xl m-auto'>Tablas de Productos</h1>
        <section className='flex gap-2'>
          <button onClick={handleClickChangeShowCreateProduct} className='text-2xl bg-green-500 text-white font-bold w-10 h-10 rounded-md'>+</button>
          <button onClick={handleClickChangeShowDeletedProduct} className='text-2xl bg-blue-500 text-white font-bold w-10 h-10 rounded-md'>-</button>
        </section>
      </section>
      <section className='px-2'>
        <ProductTableComponent/>
      </section>
    </>
  )
}

export default PageProduct