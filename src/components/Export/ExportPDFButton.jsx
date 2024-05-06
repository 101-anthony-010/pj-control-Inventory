import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

//Components
import Formato from './Formato';

//Utils
import { axiosPoderJudicial } from '../../utils/configAxios';

const ExportPDFButton = () => {
  
  const [asignationsData, setAsignationsData] = useState([])
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const [selectedDateInit, setSelectedDateInit] = useState(new Date());
  const [dateFilter, setDateFilter] = useState([]);

  const handleDateChangeEnd = (date) => {
    setSelectedDateEnd(date);
  };
  const handleDateChangeInit = (date) => {
    setSelectedDateInit(date);
  };
  useEffect(() => {
    axiosPoderJudicial
      .get('/asignation')
      .then(res => setAsignationsData(res.data.asignations))
      .catch(err =>console.log(err))
  }, [])

  const handleExportPDF = () => {
    if (selectedDateEnd && selectedDateInit) {
      // Convertir las fechas seleccionadas a objetos Date
      const startDate = new Date(selectedDateInit);
      const endDate = new Date(selectedDateEnd);
  
      // Filtrar los datos por el rango de fechas
      const filteredData = asignationsData.filter(data => {
        const date = new Date(data.date);
        return date >= startDate && date <= endDate;
      });
  
      // Mostrar los datos filtrados en la consola (o aplicar lógica para exportar a PDF)
      setDateFilter(filteredData)
    } else {
      alert('Por favor selecciona una fecha de inicio y una fecha de fin antes de exportar.');
    }
  };

  return (
    <div className="bg-white relative m-2 rounded-md h-screen overflow-y-auto p-4">
      <section className='flex mx-10 justify-between'>
        <div className='flex items-center gap-6'>
          <div className='w-[100px] h-[100px]'>
            <img className='w-full h-full object-contain' src="/img/logoPJ.png" alt="" />
          </div>
          <h2 className='font-semibold text-2xl'>Informe general de toner registrados</h2>  
        </div>
        <Link className='bg-red-500 hover:bg-red-500/75 shadow-md rounded-md grid items-center justify-center w-[80px] h-[30px]' to={'/asignation'}>
          <p className='font-semibold text-white'>Salir</p>
        </Link>
      </section>
      <section className="grid grid-cols-2 justify-center items-center m-auto gap-4 max-w-3xl">
        <div className='grid items-center justify-center m-auto text-center gap-2 shadow-md rounded-md p-2'>
          <h2 className='text-lg font-semibold'>Inicio</h2>
          <DatePicker
            selected={selectedDateInit}
            onChange={handleDateChangeInit}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            calendarClassName="custom-datepicker"
            minDate={null}
            maxDate={new Date()} 
          />
        </div>
        <div className='grid items-center justify-center m-auto text-center gap-2 shadow-md rounded-md p-2'>
          <h2 className='text-lg font-semibold'>Fin</h2>
          <DatePicker
            selected={selectedDateEnd}
            onChange={handleDateChangeEnd}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            calendarClassName="custom-datepicker"
            minDate={null}
            maxDate={new Date()} 
          />  
        </div>

        <button className='col-span-2 rounded-md p-2 w-[200px] bg-blue-500 hover:bg-blue-500/80 m-auto font-semibold text-white shadow-md' onClick={handleExportPDF}>Ver Datos</button>
      </section>

      <div className="mt-8" id="component-to-export">
        {dateFilter.length > 0 ? (
            <Formato dataToShow={dateFilter} />
          ) : (
            <Formato dataToShow={asignationsData} />
          )}
      </div>
    </div>
  );
};

export default ExportPDFButton;
