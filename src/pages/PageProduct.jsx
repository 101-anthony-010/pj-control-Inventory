import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { axiosPoderJudicial } from '../utils/configAxios';

//Components
import CreateProduct from '../components/productComponent/CreateProduct';
import ProductTableComponent from '../components/productComponent/ProductTableComponent';
import EditProduct from '../components/productComponent/EditProduct';

//Slices
import { changeIsShowCreateProduct } from '../store/slices/product.Slice';

const PageProduct = () => {
  const [products, setProducts] = useState()
  const [entrada, setEntrada] = useState({state: "enable"})
  const [salida, setSalida] = useState({state: "disable"})
  const { isShowCreateProduct } = useSelector(store => store.productSlice);
  const { isShowUpdatedProduct } = useSelector(store => store.productSlice);
  const dispatch = useDispatch()

  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct())
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/product')
      .then((data) => {
        setProducts(data.data.products)
        // setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleClickEntradaProducts = () => {
    setEntrada(products.filter(product => product.state === "enable"))
    console.log(entrada)
  }

  return (
    <>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <CreateProduct/>
      </section>
      
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowUpdatedProduct ? "top-0" : "-top-full"}`}>
        <EditProduct/>
      </section>

      <section className='m-4  flex justify-between'>
        <div className='grid grid-cols-2 gap-4'>
          <button onClick={() => handleClickEntradaProducts()} className='rounded-md bg-slate-200 px-4'>Entrada</button>
          <button className='rounded-md bg-slate-200 px-4'>Salida</button>
        </div>
        
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
        <ProductTableComponent products={products} />
      </section>
    </>
  )
}

export default PageProduct