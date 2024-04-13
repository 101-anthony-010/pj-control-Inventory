import { Route, Routes } from 'react-router-dom';
import './App.css'

//Componentes
import PageProduct from './pages/PageProduct';
import PageAsignation from './pages/PageAsignation';
import PageUser from './pages/PageUser';
import Navbar from './components/layout/Navbar';
import PageLogin from './pages/PageLogin';
import PageEmployee from './pages/PageEmployee';
import PageNotFound from './pages/PageNotFound';
import ProtectedUser from './components/auth/ProtectedUser';

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
        </Route>

        <Route path='/' element={<PageLogin/>}/>
        <Route path='/employee' element={<PageEmployee/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
