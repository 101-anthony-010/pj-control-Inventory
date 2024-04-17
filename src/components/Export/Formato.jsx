import React from 'react';
import { formatoNumberCode } from '../../utils/codeNumber';

const Formato = () => {
  return (
    <section>
      <section className='flex justify-around'>
        <div className='flex items-center justify-center w-36 h-36'>
          <img src="/public/img/logoPJ.png" className='object-contain w-full h-full' alt="" />
        </div>

        <div className='text-center grid gap-1'>
          <h1 className='font-bold text-lg'>CORTE SUPERIOR DE JUSTICIA DE ICA</h1>
          <h3 className='text-sm'>Area de Informatica y Sistemas</h3>
          <h2 className='font-medium'>REGISTRO DE CARTUCHOS DE TONER ENGREDADOS Y DEVUELTOS</h2>
        </div>

        <div className='grid grid-cols-2 justify-center items-center'>
          <p>Nº</p>
          <p>CODATE0016</p>
          <p>Fecha</p>
          <p>27/03/2024</p>
        </div>
      </section>

      <section className='grid grid-cols-2 m-4 border-2 border-black p-2'>
        <p>SEDE:</p>
        <p>SEDE:</p>
        <p>DEPENDENCIA:</p>
        <p>DEPENDENCIA:</p>
        <p>CARGO:</p>
        <p>CARGO:</p>
      </section>

      <section>
      <table className='text-xs text-center'>
        <thead>
          <tr>
            <th className='border border-black'>Codigo</th>
            <th className='border border-black'>Fecha de solicitud</th>
            <th className='border border-black'>N° Apellidos y nombres</th>
            <th className='border border-black'>Marca Modelo</th>
            <th className='border border-black'>Serie del producto nuevo</th>
            <th className='border border-black'>Area solicitante(*)</th>
            <th className='border border-black'>Firma de recepción</th>
            <th className='border border-black'>Fecha de devolución</th>
            <th className='border border-black'>Firma del personal que entrega</th>
            <th className='border border-black'>Sello y firma del Administrador/Observaciones</th>
            <th className='border border-black'>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-black'>COD{formatoNumberCode(24)}</td>
            <td className='border border-black'>5/7/2023</td>
            <td className='border border-black'>MUÑOZ DE LA CRUZ GERALD ANTONIO</td>
            <td className='border border-black'>Lexmark MS415</td>
            <td className='border border-black'>SCAB221874263</td>
            <td className='border border-black'>INFORMATICA</td>
            <td className='border border-black'>NINGUNA</td>
            <td className='border border-black'>5/7/2023</td>
            <td className='border border-black'>NINGUNA</td>
            <td className='border border-black'>NINGUNA</td>
            <td className='border border-black'>NINGUNA</td>
          </tr>
          <tr>
            <td>COD0002</td>
            <td>2</td>
            <td>TAPIA CORDOVA CINTHIA GUEVARA AVALOS MARIA LIZZETH</td>
            <td>
              <p>Lexmark MS610</p>
            </td>
            <td>
              <p>SCAB221094F20</p>
            </td>
            <td>INFORMATICA</td>
            <td>NINGUNA</td>
            <td>5/7/2023</td>
            <td>NINGUNA</td>
            <td>NINGUNA</td>
            <td>NINGUNA</td>
          </tr>
        </tbody>
      </table>
      </section>
    </section>
  );
};

export default Formato;
