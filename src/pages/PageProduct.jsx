import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CreateProduct from '../components/productComponent/CreateProduct';
import ProductTableComponent from '../components/productComponent/ProductTableComponent';
import EditProduct from '../components/productComponent/EditProduct';
import Navbar from '../components/layout/Navbar';

// Slices
import { changeIsShowCreateProduct, changeIsShowUpdatedProduct } from '../store/slices/product.Slice';

// Utils
import { axiosPoderJudicial } from '../utils/configAxios';
import { formatDateDDMMYYYY } from '../utils/date';

const PageProduct = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([])
  const [marcas, setMarcas] = useState([])
  const [models, setModels] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEntradaSelected, setIsEntradaSelected] = useState(true); // Estado para el botón de Entrada
  const { isShowCreateProduct, isShowUpdatedProduct } = useSelector(store => store.productSlice);
  const dispatch = useDispatch();

  const handleClickChangeShowCreateProduct = () => {
    dispatch(changeIsShowCreateProduct());
  }
  const handleClickChangeShowUpdatedProduct = (data) => {
    setDataProducts(data)
    dispatch(changeIsShowUpdatedProduct());
  }

  useEffect(() => {
    axiosPoderJudicial
      .get('/product')
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/user')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/marca')
      .then(res => setMarcas(res.data.marcas))
      .catch(err => console.log(err));
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModels(res.data.modelsProducts))
      .catch(err => console.log(err));
  }, []);

  const handleNameId = (data, id) => {
    if (data) {
      const name = data.find(item => item.id === id)
      return name ? name : "cargando"
    }
  }

  // const handleFilterByState = (state) => {
  //   const filteredByState = products.filter(product => product.state === state);
  //   setFilteredProducts(filteredByState);
  //   if (state === 'enable') {
  //     setIsEntradaSelected(true);
  //   } else {
  //     setIsEntradaSelected(false);
  //   }
  // }

  const handleClickDeletedProduct = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        try {
          await axiosPoderJudicial.delete(`/product/${id}`);
          const updatedProduct = products.filter(item => item.id !== id);
          setProducts(updatedProduct);
          console.log(`Producto con ID ${id} eliminado exitosamente.`);
        } catch (error) {
          console.error(`Error al eliminar el producto con ID ${id}:`, error);
        }
      } catch (error) {
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
      }
    } else {
      console.log("Eliminación cancelada.");
    }
  };

  const sorted = products.sort((a, b) => b.id - a.id)

  return (
    <>
      <Navbar/>

      <section className={`bg-black/20 z-50 fixed w-full h-full flex items-center justify-center ${isShowCreateProduct ? "top-0" : "-top-full"}`}>
        <CreateProduct/>
      </section>
      
      <section className={`bg-black/20 z-50 fixed w-full h-full flex items-center justify-center ${isShowUpdatedProduct ? "top-0" : "-top-full"}`}>
        <EditProduct dataProducts={dataProducts}/>
      </section>

      <section className='ml-[80px] px-10 mt-[80px]'>

        <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[450px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/box.png" alt="" />
            </div>
            <div className='w-[340px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>Registro de productos</p>
              <p className='font-semibold text-xl'>{ products.filter(item => item.state === 'enable').length }</p>
            </div>
          </section>
          <div className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md' onClick={handleClickChangeShowCreateProduct}>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </div>
        </section>

        <table className='m-auto text-xs text-center border-collapse border my-10 border-slate-700 w-full'>
        <thead className='bg-gray-200'>
          <tr className='text-base'>
            <th className='uppercase p-2 w-[65px] border border-white'>Id</th>
            <th className='uppercase p-2 border border-white'>marca</th>
            <th className='uppercase p-2 border border-white'>modelo</th>
            <th className='uppercase p-2 border border-white w-[140px]'>N° de serie</th>
            <th className='uppercase p-2 border border-white'>usuario</th>
            <th className='uppercase w-[180px] p-2 border border-white'>fecha de ingreso</th>
            <th className='uppercase p-2 w-[180px] border border-white'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            products?.filter(item => item.state === 'enable')?.map( item => (
                <tr key={item.id}>
                  <th className='font-normal border border-slate-700 p-1 w-[65px]'>{item.id}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>{handleNameId(marcas, item.marcaId).name}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>{handleNameId(models, item.modelId).name}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>{item.numSerie}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>{handleNameId(users, item.userId).userName}</th>
                  <th className='font-normal border border-slate-700 p-1 uppercase'>{formatDateDDMMYYYY(item.dateInitial)}</th>
                  <th className='border border-slate-700 p-1 w-[180px] relative'>
                    <div className="grid grid-cols-2 justify-center items-center p-1 mx-4">
                      <div onClick={() => handleClickChangeShowUpdatedProduct(item)} className='w-[20px] h-[20px] inline-block rounded-md hover:cursor-pointer m-auto' >
                        <img className='w-full h-full object-contain' src="/icons/edit.png" alt="" />
                      </div>
                      <div className='w-[20px] h-[20px] inline-block text-center rounded-md hover:cursor-pointer m-auto' >
                        <img onClick={() => handleClickDeletedProduct(item.id)} className='w-full h-full object-contain' src="/icons/trash.png" alt="" />
                      </div>
                    </div>
                  </th>
                </tr>
            )
            )
          }
        </tbody>
      </table>

      </section>



      {/* <section className='m-auto mt-10 w-full'>
        <ProductTableComponent products={products} showDateSalida={!isEntradaSelected} />
      </section> */}
    </>
  );
}

export default PageProduct;
