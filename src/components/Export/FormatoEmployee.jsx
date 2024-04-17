import React from 'react'

const FormatoEmployee = () => {
  return (
    <div>
      <section className='flex justify-around'>
        <div className='flex items-center justify-center w-36 h-36'>
          <img src="/public/img/logoPJ.png" className='object-contain w-full h-full' alt="" />
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

      <section className='grid grid-cols-2 m-4 border-2 border-black'>
        <section className='p-2'>
          <h3 className='font-semibold'>DATOS DEL USUARIO</h3>
          <div className='grid grid-cols-2'>
            <p>NOMBRE:</p>
            <p>NOMBRE:</p>
            <p>SEDE:</p>
            <p>SEDE:</p>
            <p>DEPENDENCIA:</p>
            <p>DEPENDENCIA:</p>
            <p>CARGO:</p>
            <p>CARGO:</p>
          </div>
        </section>
        <section className='border-l-2 border-black p-2'>
          <h3 className='font-semibold'>MOTIVO DE LA ATENCION</h3>
          <div className='grid grid-cols-2'>
            <p>EQUIPO:</p>
            <p>EQUIPO:</p>
            <p>MARCA:</p>
            <p>MARCA:</p>
            <p>MODELO:</p>
            <p>MODELO:</p>
            <p>Nº SERIE:</p>
            <p>Nº SERIE:</p>
          </div>
        </section>
      </section>
    </div>
  )
}

export default FormatoEmployee