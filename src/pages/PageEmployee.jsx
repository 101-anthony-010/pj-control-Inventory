import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Components
import AddInfoUser from '../components/addComponents/AddInfoUser';
// import FormatoEmployee from '../components/Export/FormatoEmployee';

// Slices
import { logOut } from '../store/slices/auth.slice';
import { changeIsShowInfoUser } from '../store/slices/user.slice';

// Utils
import { axiosPoderJudicial } from '../utils/configAxios';
import { lowerUpperCase } from '../utils/lowerUpperCase';

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
  };

  const handleChangeIsShowInfoUser = () => {
    dispatch(changeIsShowInfoUser());
  };

  const handleExportPDF = () => {
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
          <button onClick={() => handleChangeIsShowInfoUser()} className='font-semibold p-2 rounded-md bg-yellow-300 shadow-md'>Información</button>
          <button onClick={() => handleExportPDF()} className='font-semibold p-2 rounded-md bg-green-500 shadow-md'>Solicitar</button>
        </section>
      </section>

      <section className={`absolute -top-2 bg-black/15 w-full h-screen grid items-center justify-center ${isShowInfoUser ? "left-0" : "-left-full"}`}>
        <AddInfoUser handleChangeIsShowInfoUser={handleChangeIsShowInfoUser} user={user}/>
      </section>
    </div>
  );
};

export default PageEmployee;
