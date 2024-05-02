import React, { useEffect, useState } from 'react';
import { formatoNumberCode } from '../../utils/codeNumber';
import { axiosPoderJudicial } from '../../utils/configAxios';
import { formatDateDDMMYYYY } from '../../utils/date';
import { lowerUpperCase } from '../../utils/lowerUpperCase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Formato = ({ asignationsData }) => {
  const [userData, setUserData] = useState([])
  const [productData, setProductData] = useState([])
  const [brandData, setBrandData] = useState([])
  const [modelData, setModelData] = useState([])

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then(res => setUserData(res.data.users))
      .catch(res => console.log(res))
    axiosPoderJudicial
      .get('/product')
      .then(res => setProductData(res.data.products))
      .catch(res => console.log(res))
    axiosPoderJudicial
      .get('/marca')
      .then(res => setBrandData(res.data.marcas))
      .catch(res => console.log(res))
    axiosPoderJudicial
      .get('/modelProduct')
      .then(res => setModelData(res.data.modelsProducts))
      .catch(res => console.log(res))
  }, [asignationsData]);

  const handleNameUser = (id) => {
    const name = userData.find(item => item.id === id);
    return `${lowerUpperCase(name.lastName)} ${lowerUpperCase(name.name)}`
  }

  const handleNameProduct = (id) => {
    const product = productData.find(item => item.id === id);
    const brand = brandData.find(item => item.id === product.marcaId);
    const model = modelData.find(item => item.id === product.modelId);
    return `${brand.name.toUpperCase()} ${model.name.toUpperCase()}`
  };
  

  const handleNameProductSerie = (id) => {
    const name = productData.find(item => item.id === id);
    return `${name.numSerie.toUpperCase()}`
  }

console.log(asignationsData)
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape', // Cambia la orientación a apaisado
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true
    });
  
    doc.autoTable({
      head: [['Codigo', 'Fecha de solicitud', 'Apellidos y Nombres', 'Marca - Modelo', 'Numero de Serie', 'Area Solicitante', 'Firma recepción', 'Fecha devolución', 'Firma del personal de entrega', 'Sello y Firma del Administrador', 'Observaciones']],
      body: asignationsData.map(data => {
        return [
          formatoNumberCode(data.id),
          formatDateDDMMYYYY(data.dateInitial),
          `${data.lastName} ${data.name}`
        ]
      }),
      startY: 20,
      theme: 'grid',
      tableWidth: 'auto',
      columnWidth: 'wrap',
      styles: {
        fontSize: 10,
        cellPadding: 1,
        lineWidth: 0.1,
        lineColor: 0,
      },
      didParseCell: (data) => {
        if (data.column.index === 0) {
          data.cell.styles.fontStyle = 'bold';
        }
      },
      margin: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      },
      scale: 0.8 // Ajusta la escala de la tabla
    });
  
    doc.save('table.pdf');
  };


  return (
    <section className='my-table'>

    <button onClick={generatePDF}>Generate PDF</button>
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