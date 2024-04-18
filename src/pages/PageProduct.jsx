import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Utils
import { axiosPoderJudicial } from '../utils/configAxios';

//Components
import CreateProduct from '../components/productComponent/CreateProduct';
import ProductTableComponent from '../components/productComponent/ProductTableComponent';
import EditProduct from '../components/productComponent/EditProduct';
import Navbar from '../components/layout/Navbar';

//Slices
import { changeIsShowCreateProduct } from '../store/slices/product.Slice';

const PageProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEntradaSelected, setIsEntradaSelected] = useState(true); // Estado para el botón de Entrada
  const { isShowCreateProduct } = useSelector(store => store.productSlice);
  const { isShowUpdatedProduct } = useSelector(store => store.productSlice);
  const dispatch = useDispatch();

  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct());
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/product')
      .then((response) => {
        const allProducts = response.data.products;
        setProducts(allProducts);
        setFilteredProducts(allProducts.filter(product => product.state === 'enable'));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilterByState = (state) => {
    const filteredByState = products.filter(product => product.state === state);
    setFilteredProducts(filteredByState);
    if (state === 'enable') {
      setIsEntradaSelected(true);
    } else {
      setIsEntradaSelected(false);
    }
  }

  return (
    <>
      <Navbar/>

      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <CreateProduct/>
      </section>
      
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowUpdatedProduct ? "top-0" : "-top-full"}`}>
        <EditProduct/>
      </section>

      <section className='m-2 flex justify-between'>
        <div className='grid grid-cols-2 gap-4'>
          <button onClick={() => handleFilterByState('enable')} className={`rounded-md ${isEntradaSelected ? 'bg-blue-500 text-white' : 'bg-slate-200'} px-4`}>Entrada</button>
          <button onClick={() => handleFilterByState('disable')} className={`rounded-md ${!isEntradaSelected ? 'bg-blue-500 text-white' : 'bg-slate-200'} px-4`}>Salida</button>
        </div>
        
        <section className='grid grid-cols-[1fr_auto_auto] gap-2'>
          {/* <input type="text" className='bg-gray-100 rounded-md p-2'/>
          <button className='p-2 flex items-center justify-center bg-green-500 rounded-md'>
            <box-icon color="white" name='search-alt-2' ></box-icon>
          </button> */}
          <button onClick={handleClickChangeShowCreateProduct} className='w-[35px] h-[35px] bg-green-500 hover:bg-green-500/75 rounded-md p-2 shadow'>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </button>
        </section>
      </section>

      <section className='text-center my-4'>
        <h2 className='font-bold text-2xl'>Tabla de productos</h2>
      </section>

      <section className='w-[80%] m-auto'>
        <ProductTableComponent products={filteredProducts} showDateSalida={!isEntradaSelected} />
      </section>
    </>
  );
}

export default PageProduct;
