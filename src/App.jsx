import { Route, Routes } from 'react-router-dom';
import './App.css'

//Componentes
import PageProduct from './pages/PageProduct';
import PageAsignation from './pages/PageAsignation';
import PageUser from './pages/PageUser';

//Slices

function App() {
  return (
    <>
      <Routes>
        <Route path='/product' element={<PageProduct/>}/>
        <Route path='/asignation' element={<PageAsignation/>}/>
        <Route path='/user' element={<PageUser/>}/>
        {/* <Route path='/*' element={<NotFound/>}/> */}
      </Routes>
    </>
  )
}

export default App
