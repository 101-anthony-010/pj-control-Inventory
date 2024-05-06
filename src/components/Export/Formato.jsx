import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PJImage from './../../../public/img/logoPJ.png'

// Utils
import { formatoNumberCode } from '../../utils/codeNumber';
import { axiosPoderJudicial } from '../../utils/configAxios';
import { formatDateDDMMYYYY } from '../../utils/date';
import { lowerUpperCase } from '../../utils/lowerUpperCase';

const Formato = ({ dataToShow }) => {
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
  }, [dataToShow]);

  const handleNameUser = (id) => {
    const name = userData.find(item => item.id === id);
    return `${lowerUpperCase(name.lastName)} ${lowerUpperCase(name.name)}`
  }

  const handleNameProduct = (id) => {
    const product = productData.find(item => item.id === id);
    const brand = brandData.find(item => item.id === product.marcaId);
    const model = modelData.find(item => item.id === product.modelId);
    return `${brand.name} - ${model.name}`
  };
  
  const handleNameProductSerie = (id) => {
    const name = productData.find(item => item.id === id);
    return `${name.numSerie.toUpperCase()}`
  }

  const handleDataId = (data, id) => {
    const item = data.find(item => item.id === id);
    return item
  }

  const handleStateProduct = (id) => {
    const state = productData.find(item => item.id === id)
    return state.amountPages ? 'De baja' : 'En uso'
  }

// console.log(dataToShow)
  const generatePDF = () => {
    
    const doc = new jsPDF({
      orientation: 'landscape', // Cambia la orientación a apaisado
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true
    });

    doc.addImage(PJImage, 'PNG', 230, 10, 45, 30);
    
    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

    doc.autoTable({
      head: [['N°', '0000001']],
      body: [
        ['Fecha', formattedCurrentDate],
      ],  
      startY: 20,
      startX: 100,
      theme: 'plain',
      tableWidth: 'wrap',
      columnWidth: '50px',
      styles: {
        fontSize: 10,
        cellPadding: 1,
        lineWidth: 0.1,
        lineColor: 0,
        fontStyle: 'bold',
        font: 'helvetica'
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
      scale: 0.8 // Adjust the scale of the table
    });

    // Add a title to the PDF
    doc.setFont('helvetica','bold');
    doc.setFontSize(18);
    doc.text('CORTE SUPERIOR DE JUSTICIA', 140, 20, { align: 'center' });
    doc.setFont('helvetica','normal');
    doc.setFontSize(10);
    doc.text('Area de Informatica y Sistemas', 140, 26, { align: 'center' });
    doc.setFont('helvetica','bold');
    doc.setFontSize(11);
    doc.text('REGISTRO DE CARTUCHOS DE TONER INGREZADOS Y DEVUELTOS', 140, 32, { align: 'center' });
    
    doc.autoTable({
      head: [['SEDE', 'SEDE']],
      body: [
        ['DEPENDENCIA', 'DEPENDENCIA'],
        ['CARGO', 'CARGO'],
      ],
      startY: 50,
      theme: 'plain',
      tableWidth: 200,
      columnWidth: '50px',
      styles: {
        fontSize: 10,
        cellPadding: 1,
        lineWidth: 0.1,
        lineColor: 0,
        fontStyle: 'bold',
        font: 'helvetica'
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
      scale: 0.8 // Adjust the scale of the table
    });
    
    doc.autoTable({
      head: [['Codigo', 'Fecha de solicitud', 'Apellidos y Nombres', 'Marca - Modelo', 'Numero de Serie', 'Area Solicitante', 'Fecha de  devolución', 'Estado']],
      body: dataToShow?.map(data => {
        return [
          `COD - ${formatoNumberCode(data.id)}`,
          formatDateDDMMYYYY(data.date),
          `${handleDataId(userData, data.userId).lastName} ${handleDataId(userData, data.userId).name}`,
          `${handleNameProduct(data.productId)}`,
          `${handleDataId(productData, data.productId).numSerie}`,
          'INFORMATICA',
          formatDateDDMMYYYY(data.date),
          handleStateProduct(data.productId)
        ]
      }),
      startY: 80,
      theme: 'plain',
      tableWidth: 'auto',
      styles: {
        fontSize: 10,
        cellPadding: 1,
        lineWidth: 0.1,
        lineColor: 0,
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 21 },
        2: { cellWidth: 80 },
        3: { cellWidth: 34 },
        4: { cellWidth: 'auto' },
        5: { cellWidth: 30 },
        6: { cellWidth: 21 },
        7: { cellWidth: 14 },
      },
      didParseCell: (data) => {
        data.cell.styles.valign = 'middle'; // Centra verticalmente
        data.cell.styles.halign = 'center'; // Centra horizontalmente
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

      
      <section className=''>
      <table className='m-auto text-xs text-center border-collapse border border-black'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='p-2 w-24'>Código</th>
            <th className='p-2'>Fecha de solicitud</th>
            <th className='p-2 w-40'>Apellidos y Nombres</th>
            <th className='p-2 w-32'>Marca - Modelo</th>
            <th className='p-2'>Número de Serie</th>
            <th className='p-2'>Área Solicitante</th>
            <th className='p-2'>Fecha de devolución</th>
            <th className='p-2'>Estado</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow?.map(asignation => (
            <tr key={asignation.id} className='bg-white'>
              <td className='p-2 border border-black'>COD-{formatoNumberCode(asignation.id)}</td>
              <td className='p-2 border border-black'>{formatDateDDMMYYYY(asignation.date)}</td>
              <td className='p-2 border border-black'>{handleNameUser(asignation.userId)}</td>
              <td className='p-2 border border-black'>{handleNameProduct(asignation.productId)}</td>
              <td className='p-2 border border-black'>{handleNameProductSerie(asignation.productId)}</td>
              <td className='p-2 border border-black'>INFORMATICA</td>
              <td className='p-2 border border-black'>{formatDateDDMMYYYY(asignation.date)}</td>
              <td className='p-2 border border-black'>{handleStateProduct(asignation.productId)}</td>
            </tr>
          ))}
        </tbody>
      </table>


    <button className='shadow-md py-2 px-6 m-4 rounded-md text-white font-semibold bg-green-600/90 hover:bg-green-500' onClick={generatePDF}>Descargar Informe</button>

      </section>
    </section>
  );
};

export default Formato;