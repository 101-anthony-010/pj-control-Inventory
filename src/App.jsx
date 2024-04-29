import { Route, Routes } from 'react-router-dom';
import './App.css'

//Componentes
// import Navbar from './components/layout/Navbar';
import ProtectedUser from './components/auth/ProtectedUser';
import PageProduct from './pages/PageProduct';
import PageAsignation from './pages/PageAsignation';
import PageUser from './pages/PageUser';
import PageLogin from './pages/PageLogin';
import PageEmployee from './pages/PageEmployee';
import PageNotFound from './pages/PageNotFound';
import PageAdd from './pages/PageAdd';
import PageExport from './pages/PageExport';

//Slices

function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Routes>
        
        <Route element={<ProtectedUser/>}>
          <Route path='/product' element={<PageProduct/>}/>
          <Route path='/asignation' element={<PageAsignation/>}/>
          <Route path='/user' element={<PageUser/>}/>
          <Route path='/add' element={<PageAdd/>}/>
          <Route path='/export' element={<PageExport/>}/>
        </Route>

        <Route path='/' element={<PageLogin/>}/>
        <Route path='/employee' element={<PageEmployee/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
