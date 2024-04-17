import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

//Components
import FormatoEmployee from '../components/Export/FormatoEmployee';
import { logOut } from '../store/slices/auth.slice';
const PageEmployee = () => {
  const { user } = useSelector(store => store.authSlice)
  const dispatch = useDispatch()

  const handleClickLogOut = () => {
    dispatch(logOut())
  }

  const handleExportPDF = () => {
    const input = document.getElementById('component-to-export');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth - 20, imgHeight - 20);
      pdf.save('Ficha de Requerimientos.pdf');
    });
  };

  return (
    <>
      <h2>Informacion de Usuario</h2>
      <section className='grid grid-cols-2'>
        <section className='m-auto w-[400px] grid gap-2 grid-cols-2'>
          <h5>Nombre</h5>
          <p>{ user?.name }</p>

          <h5>Apellidos</h5>
          <p>{ user?.lastName }</p>

          <h5>DNI</h5>
          <p>{ user?.dni }</p>

          <h5>Telefono</h5>
          <p>{ user?.phone }</p>

          <h5>Cargo</h5>
          <p>{ user?.cargoId }</p>

          <h5>Dependencia</h5>
          <p>{ user?.dependenciaId }</p>

          <h5>Sede</h5>
          <p>{ user?.sedeId }</p>
        </section>
        <section className='grid gap-6 text-center'>
          <button>Solicitar</button>
          <Link to={'/'} onClick={() => handleClickLogOut()}>Salir</Link>
        </section>
      </section>

      <div className="p-8">
        <button onClick={handleExportPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Exportar a PDF
        </button>
        <div className="mt-8" id="component-to-export">
          <FormatoEmployee/>
        </div>
      </div>
    </>
  );
};

export default PageEmployee;
