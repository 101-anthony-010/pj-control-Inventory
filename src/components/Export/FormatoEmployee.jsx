import React, { useEffect, useState } from 'react'
import { axiosPoderJudicial } from '../../utils/configAxios'
import { useSelector } from 'react-redux'
import { jsPDF } from 'jspdf'; // Asegúrate de importar jsPDF aquí
import 'jspdf-autotable';
import html2canvas from 'html2canvas';


const FormatoEmployee = () => {
  const [cargo, setCargo] = useState()
  const [dependencia, setDependencia] = useState()
  const [sede, setSede] = useState()
  const { user } = useSelector(store => store.authSlice)
  
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

  const exportToPdf = (ref) => {
    const doc = new jsPDF();
    doc.setTextColor('#000000'); // Set text color to black
  
    // Add header
    doc.setFontSize(16);
    doc.text('CORTE SUPERIOR DE JUSTICIA DE ICA', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Area de Informatica y Sistemas', 105, 30, { align: 'center' });
    doc.text('FICHA DE REQUERIMIENTOS', 105, 40, { align: 'center' });
  
    // Datos del Usuario
    doc.setFontSize(12);
    doc.text('DATOS DEL USUARIO', 20, 60);
    doc.setFontSize(10);
    doc.text(`NOMBRE: ${(user.name).toUpperCase()} ${(user.lastName).toUpperCase()}`, 20, 70);
    doc.text(`SEDE: ${sede?.name.toUpperCase()}`, 20, 80);
    doc.text(`DEPENDENCIA: ${dependencia?.name.toUpperCase()}`, 20, 90);
    doc.text(`CARGO: ${cargo?.name.toUpperCase()}`, 20, 100);
  
    // Configuración Actual de Hardware
    doc.addPage(); // Add a new page for hardware configuration
    doc.setFontSize(12);
    doc.text('CONFIGURACION ACTUAL DE HARDWARE', 105, 20, { align: 'center' });
    // Add more hardware configuration details as needed...
  
    // Configuración de la Red
    doc.addPage(); // Add a new page for network configuration
    doc.setFontSize(12);
    doc.text('CONFIGURACION DE LA RED', 105, 20, { align: 'center' });
    // Add network configuration details as needed...
  
    // Tipo de Servicio
    doc.addPage(); // Add a new page for service type
    doc.setFontSize(12);
    doc.text('TIPO DE SERVICIO', 105, 20, { align: 'center' });
    // Add service type details as needed...
  
    // Estado Final
    doc.addPage(); // Add a new page for final state
    doc.setFontSize(12);
    doc.text('ESTADO FINAL', 105, 20, { align: 'center' });
    // Add final state details as needed...
  
    // Observaciones
    doc.addPage(); // Add a new page for observations
    doc.setFontSize(12);
    doc.text('OBSERVACIONES', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text('REQUIERE CAMBIO DE TONNER ---------', 20, 30);
  
    // Nota
    doc.addPage(); // Add a new page for note
    doc.setFontSize(12);
    doc.text('NOTA: Devolver ficha de atencion tecnica firmada a la brevedad posible, bajo responsabilidad.', 20, 20);
    doc.text('Firma y sello - Soporte Tecnico', 20, 50);
    doc.text('Firma y Sello del Usuario', 105, 50);
  
    // Save the PDF
    doc.save('formato_employee.pdf');
  
    // Convert the FormatoEmployee component to an image using html2canvas
    html2canvas(ref.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 15, 15, 180, 160); // Add the image to the PDF
      doc.save('formato_employee.pdf');
    });
  };

  return (
    <div className='text-xs w-[21cm] h-[29.7cm] my-0 mx-auto'>

      <section className='flex justify-around'>
        <div className='flex items-center justify-center w-[100px] h-[100px]'>
          <img className='w-full h-full object-contain' src="/img/logoPJ.png" alt="" />
        </div>

        <div className='text-center grid gap-1'>
          <h1 className='font-bold text-lg'>CORTE SUPERIOR DE JUSTICIA DE ICA</h1>
          <h3 className='text-sm'>Area de Informatica y Sistemas</h3>
          <h2 className='font-medium'>FICHA DE REQUERIMIENTOS</h2>
        </div>

        <div className='grid grid-cols-2 justify-center items-center'>
          <p>Nº</p>
          <p>CODATE0016</p>
          <p>Fecha</p>
          <p>27/03/2024</p>
        </div>
      </section>

        <section className="p-4 text-xs">
              <table className="w-full border-collapse border-black border text-center">
                <tbody>
                  <tr>
                    <td className="border-black border p-1 font-semibold" colSpan={2}>DATOS DEL USUARIO</td>
                    <td className="border-black border p-1 font-semibold" colSpan={2}>MOTIVO DE LA ATENCIÓN</td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={1}>NOMBRE:</td>
                    <td className="text-start" colSpan={1}>{`${(user.name).toUpperCase()} ${(user.lastName).toUpperCase()}`}</td>
                    <td className="text-start" colSpan={1}>EQUIPO:</td>
                    <td className="text-start" colSpan={1}></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={1}>SEDE:</td>
                    <td className="text-start" colSpan={1}>{sede?.name.toUpperCase()}</td>
                    <td className="text-start" colSpan={1}>MARCA:</td>
                    <td className="text-start" colSpan={1}></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={1}>DEPENDENCIA:</td>
                    <td className="text-start" colSpan={1}>{dependencia?.name.toUpperCase()}</td>
                    <td className="text-start" colSpan={1}>MODELO:</td>
                    <td className="text-start" colSpan={1}></td>
                  </tr>
                  <tr>
                    <td className="text-start" colSpan={1}>CARGO:</td>
                    <td className="text-start" colSpan={1}>{cargo?.name.toUpperCase()}</td>
                    <td className="text-start" colSpan={1}>N° SERIE:</td>
                    <td className="text-start" colSpan={1}></td>
                  </tr>
                </tbody>
              </table>
        </section>

        <section className="p-4 text-xs">
          <h2 className="font-bold mb-2">1.- </h2>
              <table className="w-full border-collapse border-black border text-center">
                <tbody>
                  <tr>
                    <td className="border-black border p-1" colSpan={2}>Falla reportada:</td>
                    <td className="border-black border p-1" colSpan={6}>IMPRESIÓN TENUE</td>
                  </tr>
                </tbody>
              </table>
        </section>

        <section className="p-4 text-xs">
          <h2 className="font-bold mb-2">2.- CONFIGURACION ACTUAL DE HARDWARE</h2>
              <table className="w-full border-collapse border-black border text-center">
                <tbody>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>Código de inventario</td>
                    <td className="border-black border p-1" colSpan={3}></td>
                    <td className="border-black border p-1 text-start" colSpan={2}>Marca Monitor</td>
                    <td className="border-black border p-1" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>Modelo de CPU</td>
                    <td className="border-black border p-1" colSpan={3}></td>
                    <td className="border-black border p-1 text-start" colSpan={2}>Modelo</td>
                    <td className="border-black border p-1" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>Serie</td>
                    <td className="border-black border p-1" colSpan={3}></td>
                    <td className="border-black border p-1 text-start" colSpan={2}>Serie</td>
                    <td className="border-black border p-1" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>Procesador</td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1" colSpan={1}>Velocidad</td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1 text-start" colSpan={2}>Teclado</td>
                    <td className="border-black border p-1" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>Memoria RAM</td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1 w-[100px]" colSpan={1}>Velocidad</td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1 w-[200px] text-start" colSpan={2}>Contometro</td>
                    <td className="border-black border p-1" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1} rowSpan={2}>Disco Duro / Capacidad</td>
                    <td className="border-black border p-1" colSpan={1}>Capacidad</td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1" colSpan={1}>Tecnologia</td>
                    <td className="border-black border p-1 text-start" colSpan={2} rowSpan={2}>Impresora / Multifuncional</td>
                    <td className="border-black border p-1" colSpan={2} rowSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1"></td>
                    <td className="border-black border p-1"></td>
                    <td className="border-black border p-1">IDE <input type="radio" name='tecnologia'/> SATA <input type="radio" defaultChecked={true} name='tecnologia'/></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>Tarjeta de Video</td>
                    <td className="border-black border p-1" colSpan={3}></td>
                    <td className="border-black border p-1 text-start" colSpan={2}>Modelo</td>
                    <td className="border-black border p-1" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>CDROM</td>
                    <td className="border-black border p-1" colSpan={3}></td>
                    <td className="border-black border p-1 text-start" colSpan={2}>Serie</td>
                    <td className="border-black border p-1" colSpan={2}>text</td>
                  </tr>
                </tbody>
              </table>
        </section>
        
        <section className="p-4 text-xs">
          <h2 className="font-bold mb-2">3.- CONFIGURACION DE LA RED</h2>
              <table className="w-full border-collapse border-black border text-center">
                <tbody>
                  <tr>
                    <td className="border-black border p-1" colSpan={2}>Modelo</td>
                    <td className="border-black border p-1" colSpan={1}>En Red</td>
                    <td className="border-black border p-1" colSpan={1}>Direccion IP</td>
                    <td className="border-black border p-1" colSpan={2}>Direccion MAC</td>
                    <td className="border-black border p-1" colSpan={1}>Contador</td>
                    <td className="border-black border p-1" colSpan={1}>Contador Firware</td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={2}></td>
                    <td className="border-black border p-1" colSpan={1}>SI <input type="radio" name='red' defaultChecked={true} /> NO <input type="radio" name='red' /></td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1" colSpan={2}></td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1" colSpan={1}></td>
                  </tr>
                </tbody>
              </table>
        </section>

        <section className="p-4 text-xs">
          <h2 className="font-bold mb-2">4.- TIPO DE SERVICIO</h2>
              <table className="w-full border-collapse border-black border text-center">
                <tbody>
                  <tr>
                    <td className="border-black border p-1 font-semibold" colSpan={4}>Mantenimiento</td>
                    <td className="border-black border p-1 font-semibold" colSpan={4}>Partes Instaladas</td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={2}>Tipo de Mantenimiento</td>
                    <td className="border-black border p-1" colSpan={1}>Preventivo</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='mantenimiento' defaultChecked={true}></input></td>
                    <td className="border-black border p-1" colSpan={1}>N°</td>
                    <td className="border-black border p-1" colSpan={1}></td>
                    <td className="border-black border p-1" colSpan={1}>Nuevo</td>
                    <td className="border-black border p-1" colSpan={1}>Usado</td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={2}>Fecha</td>
                    <td className="border-black border p-1" colSpan={1}>Correctivo</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='mantenimiento'></input></td>
                    <td className="border-black border p-1" colSpan={1}>1.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Kit de Mantenimiento</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='kitMantenimiento'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='kitMantenimiento'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1 font-semibold" colSpan={4}>Observaciones</td>
                    <td className="border-black border p-1" colSpan={1}>2.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Fusor</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='fusor'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='fusor'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={4} rowSpan={2}></td>
                    <td className="border-black border p-1" colSpan={1}>3.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Roller</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='roller'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='roller'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>4.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Autodispensador</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='autodispensador'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='autodispensador'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1 font-semibold" colSpan={4}>Reparación</td>
                    <td className="border-black border p-1" colSpan={1}>5.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Mainboard</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='mainboard'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='mainboard'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={2}>Tipo de Reparación</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Logica</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='reparacion'></input></td>
                    <td className="border-black border p-1" colSpan={1}>6.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Fuente de Poder</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='fuente'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='fuente'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>Cambios de Partes</td>
                    <td className="border-black border p-1" colSpan={1}>SI <input type="radio" name='partes' /> / NO <input type="radio" name='partes' defaultChecked={true} /></td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Mecanica</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='reparacion'></input></td>
                    <td className="border-black border p-1" colSpan={1}>7.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Unidad Laser</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='laser'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='laser'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1 font-semibold" colSpan={4}>Observaciones</td>
                    <td className="border-black border p-1" colSpan={1}>8.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Media ACM Drive ASSY</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='media'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='media'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={4} rowSpan={2}>Atasco de hojas, Impresión con lineas blancas, enrollamiento de hojas en el fusor</td>
                    <td className="border-black border p-1" colSpan={1}>9.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Fotoconductor</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='fotoconductor'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='fotoconductor'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={1}>10.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Toner</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='toner' defaultChecked={true}></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='toner'></input></td>
                  </tr>
                  <tr>
                    <td className="border-black border p-1" colSpan={4}></td>
                    <td className="border-black border p-1" colSpan={1}>11.-</td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Otros</td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='otros'></input></td>
                    <td className="border-black border p-1" colSpan={1}><input type='radio' name='otros'></input></td>
                  </tr>
                </tbody>
              </table>
        </section>

        <section className="p-4 text-xs">
          <h2 className="font-bold mb-2">5.- ESTADO FINAL</h2>
              <table className="w-full border-collapse border-black border text-center">
                <tbody>
                  <tr>
                    <td className="border-black border p-1 text-start" colSpan={1}>Operativa</td>
                    <td className="border-black border p-1" colSpan={1}><input type="radio" name='estado' /></td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Inoperativa</td>
                    <td className="border-black border p-1" colSpan={1}><input type="radio" name='estado' /></td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Por repuesto</td>
                    <td className="border-black border p-1" colSpan={1}><input type="radio" name='repuesto' defaultChecked={true}/></td>
                    <td className="border-black border p-1 text-start" colSpan={1}>Por garantia</td>
                    <td className="border-black border p-1" colSpan={1}><input type="radio" name='repuesto' /></td>
                  </tr>
                </tbody>
              </table>
        </section>

        <section className="p-4 text-xs">
          <h2 className="font-bold mb-2">6.- OBSERVACIONES</h2>
              <table className="w-full border-collapse border-black border text-center">
                <tbody>
                  <tr>
                    <td className="border-black border p-1" colSpan={8}>REQUIERE CAMBIO DE TONNER ---------</td>
                  </tr>
                </tbody>
              </table>
        </section>

        <section className="p-4 text-xs">
          <h2 className="font-bold mb-2">NOTA: Devolver ficha de atencion tecnica firmada a la brevedad posible, bajo responsabilidad.</h2>
          <section className='grid grid-cols-2 gap-20 max-w-xl m-auto'>
            <div className='h-[100px] text-center grid items-end'>
              <p className='border-t-2 border-black'>Firma y sello - Soporte Tecnico</p>
            </div>
            <div className='h-[100px] text-center grid items-end'>
              <p className='border-t-2 border-black'>Firma y Sello del Usuario</p>
            </div>
          </section>
        </section>

        <button onClick={exportToPdf}>Export to PDF</button>
    </div>
  )
}

export default FormatoEmployee;