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
import { changeIsShowInfoUser, changeIsShowInfoUserUpdated } from '../store/slices/user.slice';

// Utils
import { axiosPoderJudicial } from '../utils/configAxios';
import { lowerUpperCase } from '../utils/lowerUpperCase';
import PJImage from './../../public/img/logoPJ.png'
import EditInfo from '../components/editComponents/EditInfo';

const PageEmployee = () => {
  const [cargo, setCargo] = useState()
  const [dependencia, setDependencia] = useState()
  const [sede, setSede] = useState()
  const [info, setInfo] = useState()

  const { user } = useSelector(store => store.authSlice)
  const { isShowInfoUser, isShowInfoUserUpdated } = useSelector(store => store.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosPoderJudicial
      .get(`/sede/${user.sedeId}`)
      .then(res => setSede(res.data.sede))
    axiosPoderJudicial
      .get(`/info`)
      .then(res => setInfo(res.data.infos))
    axiosPoderJudicial
      .get(`/cargo/${user.cargoId}`)
      .then(res => setCargo(res.data.cargo))
    axiosPoderJudicial
      .get(`/dependencia/${user.dependenciaId}`)
      .then(res => setDependencia(res.data.dependencia))
  }, [isShowInfoUserUpdated])

// console.log(info)
  // const handleClickLogOut = () => {
  //   dispatch(logOut());
  //   history.push('/')
  // };

  const handleChangeIsShowInfoUser = () => {
    dispatch(changeIsShowInfoUser());
  };
  const handleChangeIsShowInfoUserUpdated = () => {
    dispatch(changeIsShowInfoUserUpdated());
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
  console.log(info)
  return (
    <>
      <Navbar/>
      <div className="bg-[url('/public/img/PJ.jpg')] bg-center bg-cover w-full h-full absolute top-0 left-0 z-10"></div>
      <section className={`absolute z-50 -top-2 bg-black/15 w-full h-screen grid items-center justify-center ${isShowInfoUser ? "left-0" : "-left-full"}`}>
        <AddInfoUser handleChangeIsShowInfoUser={handleChangeIsShowInfoUser} user={user}/>
      </section>

      <section className={`absolute z-50 -top-2 bg-black/15 w-full h-screen grid items-center justify-center ${isShowInfoUserUpdated ? "left-0" : "-left-full"}`}>
        <EditInfo info={info} handleChangeIsShowInfoUserUpdated={handleChangeIsShowInfoUserUpdated} user={user}/>
      </section>
      <section className="mt-[80px] ml-[80p] grid items-center justify-center gap-4">
        {/* <div className='relative'> */}
        {/* <div className='absolute w-full h-full z-10'>
          <img className='w-full h-full object-contain' src="/img/PJ.jpg" alt="" />
        </div> */}
        {/* <section className='flex mx-10 my-2 justify-between items-center relative'>
          <div className='w-[120px] h-[120px] absolute'>
            <img className='w-full h-full object-contain' src="/img/logoPJ.png" alt="" />
          </div>
        </section> */}

        <section className='grid gap-4 items-center justify-center w-[450px] rounded-md shadow max-w-xs bg-slate-100 m-auto p-4 z-30'>
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
            {
              info?.filter(item => item.userId === user.id) ? (
                <button onClick={() => handleChangeIsShowInfoUserUpdated()} className='font-semibold p-2 rounded-md bg-yellow-400 hover:bg-yellow-400/70 shadow-md'>Editar</button>
              ) : (
                <button onClick={() => handleChangeIsShowInfoUser()} className='font-semibold p-2 rounded-md bg-yellow-400 hover:bg-yellow-400/70 shadow-md'>Información</button>
              )
            }
            
            <button onClick={() => handleExportPDF()} className='font-semibold p-2 rounded-md bg-green-500 hover:bg-green-500/70 shadow-md'>Solicitar</button>
          </section>
        </section>
        {
          info?.filter(item => item.userId === user.id) ? (
            <section className='grid grid-cols-3 gap-4 rounded-md bg-slate-100 z-40 items-center justify-center p-2 text-center'>
                <p className='uppercase'>{info[0].marcaPrinter}</p>
                <p className='uppercase'>{info[0].modelPrinter}</p>
                <p className='uppercase'>{info[0].ip}</p>
            </section>
          ) : (<></>)
        }
        {/* <Test/> */}
      {/* </div> */}
      </section>
    </>
  );
};

export default PageEmployee;
