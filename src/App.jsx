import { useState } from 'react'
import './App.css'
import ProductTableComponent from './components/ProductTableComponent'
import axios from 'axios'

function App() {
  const [data, setData] = useState();


  axios.get('')

  return (
    <>
      <h1>tabla de product</h1>
      <ProductTableComponent/>
    </>
  )
}

export default App
