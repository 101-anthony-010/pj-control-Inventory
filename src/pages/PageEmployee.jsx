import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
// import NetInfo from '@react-native-community/netinfo';

//Components

//Slices
import { logOut } from '../store/slices/auth.slice';

//Utils
import { axiosPoderJudicial } from '../utils/configAxios';
import getLocalIp from '../utils/getLocalIp';

const PageEmployee = () => {
  const [localIp, setLocalIp] = useState('');
  const [cargo, setCargo] = useState()
  const [dependencia, setDependencia] = useState()
  const [sede, setSede] = useState()
  const { user } = useSelector(store => store.authSlice)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   NetInfo.fetch().then((state) => {
  //     if (state.isConnected) {
  //       NetInfo.getIPAddress().then((ipAddress) => {
  //         setLocalIp(ipAddress);
  //       });
  //     }
  //   });
  // }, []);

  const handleClickLogOut = () => {
    dispatch(logOut())
  }

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

  return (
    <>
      <section className='flex mx-10 my-2 justify-between'>
        <div className='w-[100px] h-[100px]'>
          <img className='w-full h-full object-contain' src="/img/logoPJ.png" alt="" />
        </div>
        <h2 className='text-2xl font-bold m-auto'>Solicitud de Tonner</h2>
        <Link className='bg-red-500 hover:bg-red-500/75 rounded-md shadow grid items-center justify-center w-[80px] h-[30px]' to={'/'} onClick={() => handleClickLogOut()}><p className='font-semibold text-white'>Salir</p></Link>
      </section>
      {/* <p>Local IP: {localIp}</p> */}
      <section className='grid'>
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
          <p>{ cargo?.name }</p>

          <h5>Dependencia</h5>
          <p>{ dependencia?.name }</p>

          <h5>Sede</h5>
          <p>{ sede?.name }</p>
        </section>
        <section className='grid gap-6 text-center'>
          <button>Solicitar</button>
          
        </section>
      </section>
    </>
  );
};

export default PageEmployee;
