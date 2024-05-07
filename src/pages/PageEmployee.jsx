import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Components
import AddInfoUser from '../components/addComponents/AddInfoUser';
import Navbar from '../components/layout/Navbar';
// import FormatoEmployee from '../components/Export/FormatoEmployee';


// Slices
import { logOut } from '../store/slices/auth.slice';
import { changeIsShowInfoUser } from '../store/slices/user.slice';

// Utils
import { axiosPoderJudicial } from '../utils/configAxios';
import { lowerUpperCase } from '../utils/lowerUpperCase';
import PJImage from './../../public/img/logoPJ.png'

const PageEmployee = () => {
  const [cargo, setCargo] = useState()
  const [dependencia, setDependencia] = useState()
  const [sede, setSede] = useState()

  const { user } = useSelector(store => store.authSlice)
  const { isShowInfoUser } = useSelector(store => store.userSlice);
  const dispatch = useDispatch();
  
  useEffect(() => {
    axiosPoderJudicial
      .get(`/sede/${user.sedeId}`)
      .then(res => setSede(res.data.sede))
    axiosPoderJudicial
      .get(`/cargo/${user.cargoId}`)
      .then(res => setCargo(res.data.cargo))
    axiosPoderJudicial
      .get(`/dependencia/${user.dependenciaId}`)
      .then(res => setDependencia(res.data.dependencia))  
  }, []) 

  const handleClickLogOut = () => {
    dispatch(logOut());
    history.push('/')
  };

  const handleChangeIsShowInfoUser = () => {
    dispatch(changeIsShowInfoUser());
  };

  const handleExportPDF = () => {
    var doc = new jsPDF({
      orientation: 'landscape', // Change the orientation to landscape
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true
    });
    
    // Add an image to the left side of the page
    doc.addImage(PJImage, 'PNG', 230, 10, 45, 30);
  

    // Add a title to the PDF
    doc.setFont('helvetica','bold');
    doc.setFontSize(18);
    doc.text('CORTE SUPERIOR DE JUSTICIA', 140, 20, { align: 'center' });
    doc.setFont('helvetica','normal');
    doc.setFontSize(10);
    doc.text('Area de Informatica y Sistemas', 140, 26, { align: 'center' });
    doc.setFont('helvetica','bold');
    doc.setFontSize(11);
    doc.text('FICHA DE REQUERIMIENTOS', 140, 32, { align: 'center' });
    
    // Add the date to the right side of the page
    doc.autoTable({
      head: [['N°', '0000001']],
      body: [
        ['Fecha', '20/06/2024'],
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

    // Add a large table to the PDF
    doc.autoTable({
      head: [['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7', 'Column 8', 'Column 9', 'Column 10']],
      body: [
        ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3', 'Row 1, Col 4', 'Row 1, Col 5', 'Row 1, Col 6', 'Row 1, Col 7', 'Row 1, Col 8', 'Row 1, Col 9', 'Row 1, Col 10'],
        ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3', 'Row 2, Col 4', 'Row 2, Col 5', 'Row 2, Col 6', 'Row 2, Col 7', 'Row 2, Col 8', 'Row 2, Col 9', 'Row 2, Col 10'],
        // Add more rows as needed...
      ],
      startY: 100,
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
      scale: 0.8 // Adjust the scale of the table
    });
  
  
  
    doc.save('table.pdf');
  };

  return (
    <>
      <Navbar/>
      <section>
        <div className='relative'>
        <section className='flex mx-10 my-2 justify-between'>
          <div className='w-[120px] h-[120px]'>
            <img className='w-full h-full object-contain' src="/img/logoPJ.png" alt="" />
          </div>
          <Link className='bg-red-500 hover:bg-red-500/75 rounded-md shadow grid items-center justify-center w-[80px] h-[30px]' to={'/'} onClick={() => handleClickLogOut()}>
            <p className='font-semibold text-white'>Salir</p>
          </Link>
        </section>

        <section className='grid gap-4 items-center justify-center rounded-md shadow-lg max-w-xs bg-blue-100 m-auto p-4'>
          <h2 className='text-2xl font-bold m-auto'>Solicitud de Tonner</h2>
          <div className='w-[100px] h-[100px] m-auto'>
            <img className='rounded-full w-full h-full object-contain' src="/img/user.png" alt="" />
          </div>
          <section className='grid gap-2'>
            <h5>{lowerUpperCase(user.lastName)} {lowerUpperCase(user.name)}</h5>
            <h5>{sede ? lowerUpperCase(sede.name) : "cargando"}</h5>
            <h5>{dependencia ? lowerUpperCase(dependencia.name) : "cargando"}</h5>
            <h5>{cargo ? lowerUpperCase(cargo.name) : "cargando"}</h5>
          </section>
          <section className='grid gap-2'>
            <button onClick={() => handleChangeIsShowInfoUser()} className='font-semibold p-2 rounded-md bg-yellow-400 hover:bg-yellow-400/70 shadow-md'>Información</button>
            <button onClick={() => handleExportPDF()} className='font-semibold p-2 rounded-md bg-green-500 hover:bg-green-500/70 shadow-md'>Solicitar</button>
          </section>
        </section>

        <section className={`absolute -top-2 bg-black/15 w-full h-screen grid items-center justify-center ${isShowInfoUser ? "left-0" : "-left-full"}`}>
          <AddInfoUser handleChangeIsShowInfoUser={handleChangeIsShowInfoUser} user={user}/>
        </section>

        {/* <Test/> */}
      </div>
      </section>
    </>
  );
};

export default PageEmployee;
