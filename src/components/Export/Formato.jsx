import React, { useEffect, useState } from 'react';
import { formatoNumberCode } from '../../utils/codeNumber';
import { axiosPoderJudicial } from '../../utils/configAxios';
import { formatDateDDMMYYYY } from '../../utils/date';

const Formato = ({ asignationsData }) => {
  const [userData, setUserData] = useState([])
  const [productData, setProductData] = useState([])
  const [brandData, setBrandData] = useState([])
  const [modelData, setModelData] = useState([])

  useEffect(() => {
    const userPromises = asignationsData.map(asignation =>
      axiosPoderJudicial
        .get(`/user/${asignation.userId}`)
        .then(res => res.data.user)
    );
  
    const productPromises = asignationsData.map(asignation =>
      axiosPoderJudicial
        .get(`/product/${asignation.productId}`)
        .then(res => res.data.product)
    );
  
    Promise.all([Promise.all(userPromises), Promise.all(productPromises)])
      .then(([userData, productData]) => {
        setUserData(userData);
        setProductData(productData);
        
        // Fetch brand and model data
        const brandPromises = productData.map(product =>
          axiosPoderJudicial
            .get(`/marca/${product.marcaId}`)
            .then(res => res.data.marca)
        );
        const modelPromises = productData.map(product =>
          axiosPoderJudicial
            .get(`/modelProduct/${product.modelId}`)
            .then(res => res.data.modelProduct)
        );
        
        Promise.all([Promise.all(brandPromises), Promise.all(modelPromises)])
          .then(([brandData, modelData]) => {
            setBrandData(brandData);
            setModelData(modelData);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [asignationsData]);

  const handleNameUser = (id) => {
    const name = userData.find(item => item.id === id);
    return name ? `${name.lastName.toLowerCase().replace(/(\b\w)(\w*)/g, (match, firstLetter, restOfWord) => firstLetter.toUpperCase() + restOfWord)} ${name.name.toLowerCase().replace(/(\b\w)(\w*)/g, (match, firstLetter, restOfWord) => firstLetter.toUpperCase() + restOfWord)}` : "Cargando";
  }

  const handleNameProduct = (id) => {
    const product = productData.find(item => item.id === id)
    const brand = brandData.find(item => item.id === product.marcaId)
    const model = modelData.find(item => item.id === product.modelId)
    return product && brand && model ? `${brand.name} ${model.name.toUpperCase()}` : "Cargando";
  }

  const handleNameProductSerie = (id) => {
    const name = productData.find(item => item.id === id)
    return name ? `${name.numSerie.toUpperCase()}` : "Cargando";
  }

  return (
    <section className=''>
      <section className='flex justify-around'>
        <div className='flex items-center justify-center w-36 h-36'>
          <img src="/img/logoPJ.png" className='object-contain w-full h-full' alt="" />
        </div>

        <div className='text-center grid gap-1'>
          <h1 className='font-bold text-lg'>CORTE SUPERIOR DE JUSTICIA DE ICA</h1>
          <h3 className='text-sm'>Area de Informatica y Sistemas</h3>
          <h2 className='font-medium'>REGISTRO DE CARTUCHOS DE TONER ENGREDADOS Y DEVUELTOS</h2>
        </div>

        <div className='grid grid-cols-2 justify-center items-center'>
          <p>Nº</p>
          <p>CODATE0016</p>
          <p>Fecha</p>
          <p>27/03/2024</p>
        </div>
      </section>

      <section className='grid grid-cols-2 m-4 border-2 border-black p-2'>
        <p>SEDE:</p>
        <p>SEDE:</p>
        <p>DEPENDENCIA:</p>
        <p>DEPENDENCIA:</p>
        <p>CARGO:</p>
        <p>CARGO:</p>
      </section>

      <section>
      <table className='text-xs text-center'>
        <thead>
          <tr>
            <th className='border border-black w-[80px]'>Codigo</th>
            <th className='border border-black'>Fecha de solicitud</th>
            <th className='border border-black w-[250px]'>Apellidos y Nombres</th>
            <th className='border border-black w-[120px]'>Marca Modelo</th>
            <th className='border border-black'>Numero de Serie</th>
            <th className='border border-black'>Area solicitante(*)</th>
            <th className='border border-black'>Firma de recepción</th>
            <th className='border border-black'>Fecha de devolución</th>
            <th className='border border-black'>Firma del personal que entrega</th>
            <th className='border border-black'>Sello y firma del Administrador/Observaciones</th>
            <th className='border border-black'>Observaciones</th>
          </tr>
        </thead>
        <tbody>
            {
              asignationsData?.map(asignation => (
                <tr key={asignation.id}>
                  <td className='border border-black'>COD-{formatoNumberCode(asignation.id)}</td>
                  <td className='border border-black'>{formatDateDDMMYYYY(asignation.date)}</td>
                  <td className='border border-black'>{handleNameUser(asignation.userId)}</td>
                  <td className='border border-black'>{handleNameProduct(asignation.productId)}</td>
                  <td className='border border-black'>{handleNameProductSerie(asignation.productId)}</td>
                  <td className='border border-black'>INFORMATICA</td>
                  <td className='border border-black'></td>
                  <td className='border border-black'>{formatDateDDMMYYYY(asignation.date)}</td>
                  <td className='border border-black'></td>
                  <td className='border border-black'></td>
                  <td className='border border-black'></td>
                </tr>
              ))
            }
        </tbody>
      </table>
      </section>
    </section>
  );
};

export default Formato;