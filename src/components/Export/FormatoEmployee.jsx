import React from 'react'

const FormatoEmployee = () => {
  return (
    <div className='text-xs'>

        {/* Diseño con flexbox y alineación centrada */}
      <section className='flex justify-around'>
        <div className='flex items-center justify-center'>
          <box-icon type='logo' name='react'></box-icon>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------- */}

        {/* ENCABEZADO DE LA HOJA */}
        <div className='text-center grid gap-1'>
          <h1 className='font-bold text-lg'>CORTE SUPERIOR DE JUSTICIA DE ICA</h1>
          <h3 className='text-sm'>Area de Informatica y Sistemas</h3>
          <h2 className='font-medium'>FICHA DE REQUERIMIENTOS</h2>
        </div>

        {/* FECHA */}
        <div className='grid grid-cols-2 justify-center items-center'>
          <p>Nº</p>
          <p>CODATE0016</p>
          <p>Fecha</p>
          <p>27/03/2024</p>
        </div>
      </section>

        {/* -------------------------------------------------------------------------------------------------------------------- */}

        {/* Cuadrícula flexible y ordenada - CUADRO DE DATOS DE USUARIO Y MOTIVO DE ATENCION*/}
      <section className='grid grid-cols-2 m-4 border-black'>

        {/* COLUMNA DE LA IZQUIERDA */}
        <section className='p-2 border-2 border-black'>
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
        
        {/* COLUMNA DE LA DERECHA*/}
        <section className='border-2 border-black p-2'>
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

         {/* -------------------------------------------------------------------------------------------------------------------- */}

         {/* Espacio adicional */}
        <section className="m-5 font-semibold">1</section>

        {/* FALLA REPORTADA IMPRESION TENUE*/}
        <section>
           <div className='border-black grid grid-cols-2 border-2 m-4'>
            <p className='border-r-2 border-black px-4'>Falla reportada:</p>
            <p className='px-4'>Impresion Tenue</p>
           </div>

          </section>

         {/* -------------------------------------------------------------------------------------------------------------------- */}

          {/* Espacio adicional */}
        <section className="m-4 font-semibold">2 CONFIGURACIÓN ACTUAL DEL HARDWARE:</section>

         {/* Configuracion actual del hardware*/}
         {/* ----------------------------------------------------------1---------------------------------------------------------- */}
          <section className='grid grid-cols-2 m-4'>
          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Codigo-Inventario</p>
          <p className='px-4'>-</p>
          </div>

          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Marca Monitor</p>
          <p className='px-4'>-</p>
          </div>
         {/* ---------------------------------------------------------2----------------------------------------------------------- */}
          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Modelo de CPU</p>
          <p className='px-4'>-</p>
          </div>

          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Modelo</p>
          <p className='px-4'>-</p>
          </div>
         {/* ----------------------------------------------------------3---------------------------------------------------------- */}
          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Serie</p>
          <p className='px-4'>-</p>
          </div>

          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Serie</p>
          <p className='px-4'>-</p>
          </div>
         {/* ----------------------------------------------------------4---------------------------------------------------------- */}
          <div className='grid grid-cols-[auto_1fr_1fr_1fr] border-black border-2'>
          <p className='border-r-2 border-black px-4'>Procesador</p>
          <p className='px-4 border-r-2 border-black'>-</p>
          <p className='border-r-2 border-black px-4'>Velocidad</p>
          <p className='px-4'>-</p>
          </div>

          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Teclado</p>
          <p className='px-4'>-</p>
          </div>
         {/* -----------------------------------------------------------5--------------------------------------------------------- */}
          <div className='grid grid-cols-[auto_1fr_1fr_1fr] border-black border-2'>
          <p className='border-r-2 border-black px-4'>Memoria RAM</p>
          <p className='px-4 border-r-2 border-black'>-</p>
          <p className='border-r-2 border-black px-4'>Velocidad</p>
          <p className='px-4'>-</p>
          </div>

          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 border-black px-4'>Contometro</p>
          <p className='px-4'>-</p>
          </div>
         {/* ---------------------------------------------------------6----------------------------------------------------------- */}
          <div className='grid grid-cols-5 border-black border-2'>
          <p className='px-4 border-black border-r-2'>Disco Duro/ Marca</p>
          <p className='px-4 border-r-2 border-black'>Capaciadad</p>
          <p className='px-4 border-r-2 border-black'>-</p>
          <p className='px-4 border-r-2 border-black'>Tecnologia</p>
          <p className='px-4'>-</p>
          </div>

          <div className='grid grid-cols-2 border-black border-2'>
          <p className='px-4 border-black border-2'>Impresora/Multifuncional</p>
          <p className='px-4'>LEXMARK</p>
          </div>
         {/* ---------------------------------------------------------7----------------------------------------------------------- */} 
        <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 px-4 border-black'>Tarjeta de Video</p>
          <p className='px-4'>-</p>
        </div>
        <div className='grid grid-cols-2 border-black border-2'>
          <p className='px-4 border-r-2 border-black'>Modelo</p>
          <p className='px-4 border-r-2'>-</p>
        </div>
         {/* ---------------------------------------------------------8----------------------------------------------------------- */}
          <div className='grid grid-cols-2 border-black border-2'>
          <p className='border-r-2 px-4 border-black'>CDROM</p>
          <p className='px-4'>-</p>
          </div>
          <div className='grid grid-cols-2 border-black border-2'>
          <p className='px-4 border-r-2 border-black'>Serie</p>
          <p className='px-4 border-r-2'>-</p>
          </div>
         {/* CIERRA LA TABLA CONF. DEL HARDWARE*/}
        </section>
        
         {/* Espacio adicional */}
        <section className="m-4 font-semibold">3 CONFIGURACION DE LA RED:</section>


        {/* TABLA DE LA CONFIGURACION DE LA RED-------------------------------- TERMINAR */}

        <section className='grid-cols-2 grid m-4'>
        <div className='grid-cols-3 grid  border-black border-2'>
        <p className='px-4 border-r-2 border-black'>Modelo</p>
        <p className='px-4 border-r-2 border-black'>En Red</p>
        <p className='px-4'>Direccion IP</p>
        </div>
        
        <div className='grid-cols-3 grid border-black border-2'>
        <p className='px-4 border-r-2 border-black'>Direccion</p>
        <p className='px-4 border-r-2 border-black'>Contador</p>
        <p className='px-4'>Contador Firware</p>
        </div>
        </section>

        {/* Espacio adicional */}
        <section className="m-4 font-semibold">4 TIPO DE SERVICIO</section>

        {/* TABLA DE TIPO DE SERVICIO */}
        <section className='grid grid-cols-2 border-black border-2 m-4'>
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <p className='px-4 font-semibold border-r-2 border-black text-center'>Mantenimiento</p>
          <p className='px-4 font-semibold text-center'>Partes Instaladas</p>
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid-cols-3 grid border-black border-2'>
          <p className='px-4 border-r-2 border-black'>Tipo de mantenimiento</p>
          <p className='px-4 border-r-2 border-black'>Preventivo</p>
          <p className='px-4'>-</p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>N°</p>
          <p className='px-4 border-r-2 border-black'>-</p>
          <p className='px-4 border-r-2 border-black'>Nuevo</p>
          <p className='px-4'>Usado</p>
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid grid-cols-3 border-black border-2'>
          <p className='px-4 text-center'>Fecha(DD/MM/AA)</p>
          <p className='px-4 text-center'>Correctivo</p>
          <p className='px-4 text-center'>O</p>
          </div>

          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black'>
          <p className='px-4 border-r-2 p-2 border-black'>1.-</p>
          <p className='border-r-2 border-black p-2'>Kit de mantenimiento</p>
          <input className='w-[25px] h-[25px] m-auto' type="radio" id="kitMantenimiento" name="kitMantenimiento" value="nuevo"></input>
          <input className='w-[25px] h-[25px] m-auto' type="radio" id="kitMantenimiento" name="kitMantenimiento" value="usado"></input>
          </div>

          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'>Observaciones</p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>2</p>
          <p className='border-r-2 border-black'>Fusor O</p>
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'></p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>3</p>
          <p className='border-r-2 border-black'>Roller O</p>
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'></p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>4</p>
          <p className='border-r-2 border-black'>Autodispensador O</p>
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'>Reparación</p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>5</p>
          <p className='border-r-2 border-black'>Mainboard O</p>
          </div> 
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid  grid-cols-2 border-black border-2'>
          <p className='px-4 text-center border-black border-r-2'>Tipo de reparación lógica</p>
          <p className='px-4 text-center'>O</p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>6</p>
          <p className='border-r-2 border-black'>Fuente de Poder O</p>
          </div> 
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'></p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>7</p>
          <p className='border-r-2 border-black'>Unidad Laser O</p>
          </div> 
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'>Observaciones</p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>8</p>
          <p className='border-r-2 border-black'>Media ACM Drive ASSY O</p>
          </div> 
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'>Atasco de hojas, impresión con lineas blancas</p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>9</p>
          <p className='border-r-2 border-black'>Fotoconductor O</p>
          </div> 
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'>Enrollamiento de hojas en el fusor</p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>10</p>
          <p className='border-r-2 border-black'>Toner O</p>
          </div> 
          {/* -------------------------------------------------------------------------------------------------------------------- */}
          <div className='grid border-black border-2'>
          <p className='px-4 text-center'></p>
          </div>
          <div className='grid-cols-[auto_1fr_1fr_1fr] grid border-black border-2'>
          <p className='px-4 border-r-2 border-black p-2'>11</p>
          <p className='border-r-2 border-black'>Otros O</p>
          </div>    
        </section>
        {/* -----------------------------------------------5 ESTADO FINAL------------------------------------------------------- */}

        {/* 5 ESTADO FINAL */}
          <section className='grid grid-cols-2 px-4 font-semibold'>5 ESTADO FINAL</section>
        {/* -------------------------------------------------------------------------------------------------------------------- */}
        <section className='grid grid-cols-[auto_1fr_1fr_1fr] border-black border-2 m-4'>
        <p>Operativa</p>
        <p>Inoperativa</p>
        <p>Por repuesto</p>
        <p>Por garantia</p>
        </section>
        {/* -----------------------------------------------6 OBERVACIONES------------------------------------------------------- */}

        {/* 6 OBSERVACIONES*/}
          <section className='grid grid-cols-2 font-semibold m-4'>6 OBSERVACIONES</section>

        {/* 2 LINEAS*/}
          <section className='grid m-4'>
          <p className='border-black border-2'>1.</p>
          <p className='border-black border-2'>2.</p>
          <p className='border-black border-2'>3.</p>
          </section>
        {/* -------------------------------------------------------------------------------------------------------------------- */}
        <section className='grid text-center'>
        <p>NOTA Devolver ficha de atención tecnica firmada a la brevedad posible, bajo responsabilidad.</p>
        <p>Alinear constantemente las hojas al momento de colocarlas en bandejas.</p>
        </section>
        {/* -------------------------------------------------------------------------------------------------------------------- */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className='text-center'>Poder Judicial</p>
      {/* cierra todo el div contenedor */}
    </div>
  )
}

export default FormatoEmployee;