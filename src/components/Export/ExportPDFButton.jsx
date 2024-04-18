import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

//Components
import Formato from './Formato';

const ExportPDFButton = ({ handleClickChangeShowExportPdf }) => {
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
    <div className="p-8 bg-white relative m-2 rounded-md">
      <button onClick={() => handleClickChangeShowExportPdf()}  className='absolute rounded-full w-[20px] h-[20px] top-4 right-4'> 
        <img src="/icons/close.png" className='w-full h-full object-contain' alt="" />
      </button>
      
      <button onClick={handleExportPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Exportar a PDF
      </button>

      <div className="mt-8" id="component-to-export">
        <Formato/>
      </div>
    </div>
  );
};

export default ExportPDFButton;
