import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

//Components
import FormatoEmployee from '../components/Export/FormatoEmployee';

const PageEmployee = () => {
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
    <div className="p-8">
      <button onClick={handleExportPDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Exportar a PDF
      </button>
      <div className="mt-8" id="component-to-export">
        <FormatoEmployee/>
      </div>
    </div>
  );
};

export default PageEmployee;
