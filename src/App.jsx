import { Route, Routes } from 'react-router-dom';
import './App.css'

//Componentes
import ProtectedUser from './components/auth/ProtectedUser';
import PageProduct from './pages/PageProduct';
import PageAsignation from './pages/PageAsignation';
import PageUser from './pages/PageUser';
import PageLogin from './pages/PageLogin';
import PageEmployee from './pages/PageEmployee';
import PageNotFound from './pages/PageNotFound';
import PageAdd from './pages/PageAdd';
import PageExport from './pages/PageExport';
import PageControlPanel from './pages/PageControlPanel';
import ProtectedEmployee from './components/auth/ProtectedEmployee';
import PageProductDisable from './pages/PageProductDisable';
import PageSede from './pages/PageSede';
import PageDependencia from './pages/PageDependencia';
import PageCargo from './pages/PageCargo';
import PageMarca from './pages/PageMarca';

//Slices

function App() {
  return (
    <div className='text-slate-700'>
      {/* <Navbar/> */}
      <Routes>
        
        <Route element={<ProtectedUser/>}>
          <Route path='/control' element={<PageControlPanel/>}/>
          <Route path='/marca' element={<PageMarca/>}/>
          <Route path='/product' element={<PageProduct/>}/>
          <Route path='/productDisable' element={<PageProductDisable/>}/>
          <Route path='/asignation' element={<PageAsignation/>}/>
          <Route path='/user' element={<PageUser/>}/>
          <Route path='/dependencia' element={<PageDependencia/>}/>
          <Route path='/cargo' element={<PageCargo/>}/>
          <Route path='/sede' element={<PageSede/>}/>
          <Route path='/export' element={<PageExport/>}/>
        </Route>
        
        <Route element={<ProtectedEmployee/>}>
          <Route path='/employee' element={<PageEmployee/>}/>
        </Route>

        <Route path='/' element={<PageLogin/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
