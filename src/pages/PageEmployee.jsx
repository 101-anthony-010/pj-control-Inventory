import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import FormatoEmployee from '../components/Export/FormatoEmployee';

// Slices
import { logOut } from '../store/slices/auth.slice';

const PageEmployee = () => {
  const dispatch = useDispatch();
  const formatoRef = useRef(null);

  const handleClickLogOut = () => {
    dispatch(logOut());
  };

  const handleExportPDF = () => {
    if (!formatoRef.current) {
      return;
    }
  
    // Capturar el contenido del componente FormatoEmployee como imagen
    html2canvas(formatoRef.current).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
  
      // Crear un documento PDF en formato apaisado
      const pdf = new jsPDF("p", "mm", "a4", true);
      pdf.addImage(imageData, "PNG", 0, 0, 210, 297, "", "FAST");
  
      // Descargar el PDF
      pdf.save("FormatoEmployee.pdf");
    });
  };

  return (
    <>
      <section className='flex mx-10 my-2 justify-between'>
        <div className='w-[100px] h-[100px]'>
          <img className='w-full h-full object-contain' src="/img/logoPJ.png" alt="" />
        </div>
        <h2 className='text-2xl font-bold m-auto'>Solicitud de Tonner</h2>
        <Link
          className='bg-red-500 hover:bg-red-500/75 rounded-md shadow grid items-center justify-center w-[80px] h-[30px]'
          to={'/'}
          onClick={() => handleClickLogOut()}
        >
          <p className='font-semibold text-white'>Salir</p>
        </Link>
      </section>
      <section className='grid gap-6 text-center'>
        <button onClick={handleExportPDF}>Exportar a PDF</button>
        <div ref={formatoRef}>
          <FormatoEmployee />
        </div>
      </section>
    </>
  );
};

export default PageEmployee;
