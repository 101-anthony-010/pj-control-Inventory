import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './App.css'

//Componentes
import CreateProduct from './components/CreateProduct';
import ProductTableComponent from './components/ProductTableComponent'

//Slices
import { changeIsShowCreateProduct } from './store/slices/createProduct.slice';

function App() {
  const dispatch = useDispatch()
  const { isShowCreateProduct } = useSelector(store => store.createProductSlice);
  
  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct())
  }

// console.log(isShowCreateProduct)
  return (
    <>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <CreateProduct/>
      </section>
      <section className='m-4  flex justify-between'>
        <h1 className='text-center text-xl m-auto'>Tablas de Productos</h1>
        <button  onClick={handleClickChangeShowCreateProduct} className='text-2xl bg-green-500 text-white font-bold w-10 h-10 rounded-md'>+</button>
      </section>
      <section className='px-2'>
        <ProductTableComponent/>
      </section>
    </>
  )
}

export default App
