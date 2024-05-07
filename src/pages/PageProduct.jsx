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
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err));
  }, []);

  // const handleFilterByState = (state) => {
  //   const filteredByState = products.filter(product => product.state === state);
  //   setFilteredProducts(filteredByState);
  //   if (state === 'enable') {
  //     setIsEntradaSelected(true);
  //   } else {
  //     setIsEntradaSelected(false);
  //   }
  // }

  return (
    <>
      <Navbar/>

      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <CreateProduct/>
      </section>
      
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowUpdatedProduct ? "top-0" : "-top-full"}`}>
        <EditProduct/>
      </section>

      <section className='ml-[100px] px-10 mt-[80px] flex justify-between'>

        <section className='text-center my-4'>
          <h2 className='font-bold text-2xl'>Registro de Toner</h2>
        </section>
          
        <section className='grid grid-cols-[1fr_auto_auto] gap-2'>
          <button onClick={handleClickChangeShowCreateProduct} className='w-[35px] h-[35px] bg-green-500 hover:bg-green-500/75 rounded-md p-2 shadow'>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </button>
        </section>
      </section>


      <section className='w-[80%] m-auto'>
        <ProductTableComponent products={products} showDateSalida={!isEntradaSelected} />
      </section>
    </>
  );
}

export default PageProduct;
