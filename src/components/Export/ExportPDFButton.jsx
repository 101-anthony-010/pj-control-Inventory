import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

//Components
import Formato from './Formato';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

const ExportPDFButton = () => {
  const [asignationsData, setAsignationsData] = useState([])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Start date: ${startDate}`);
    console.log(`End date: ${endDate}`);
  };
  
  useEffect(() => {
    axiosPoderJudicial
      .get('/asignation')
      .then(res => setAsignationsData(res.data.asignations))
      .catch(err =>console.log(err))
  }, [])

// console.log(asignationsData)
  const handleExportPDF = () => {
    const input = document.getElementById('component-to-export');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth - 20, imgHeight - 20);
      pdf.save('exported_component.pdf');
    });
  };

  return (
    <div className="bg-white relative m-2 rounded-md h-screen overflow-y-auto p-4">
      <Link to={'/asignation'}  className='absolute rounded-full w-[20px] h-[20px] top-4 right-4'> 
        <img src="/icons/close.png" className='w-full h-full object-contain' alt="" />
      </Link>
      
      <button onClick={handleExportPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Exportar a PDF
      </button>
  

      <div className="mt-8" id="component-to-export">
        {
          asignationsData ? 
            <Formato asignationsData={asignationsData} /> : 
            <div>Cargando</div>
        }
      </div>
    </div>
  );
};

export default ExportPDFButton;
