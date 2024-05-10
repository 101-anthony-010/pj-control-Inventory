import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { axiosPoderJudicial } from '../../utils/configAxios'

// Slices
import { changeIsShowCreateMarca, changeIsShowCreateModel } from '../../store/slices/user.slice'

const AddMarca = ({ setLoadMarcas }) => {
  const { register, handleSubmit, reset } = useForm()
  const { isShowCreateMarca, isShowCreateModel } = useSelector(store => store.userSlice);

  const dispacth = useDispatch()

  const handleChangeShowIsMarca = () => {
    dispacth(changeIsShowCreateMarca())
    // dispacth(changeIsShowCreateModel())
  }
  const submit = (data) => {
    axiosPoderJudicial
      .post('/marca',data)
      .then(res => setLoadMarcas(res.data.marca))
      .catch(err => console.log(err))
    
    reset()
    window.location.reload()
    // dispacth(changeIsShowCreateMarca())
    // dispacth(changeIsShowCreateModel())
  }

  // const submitModel = (data) => {
  //   console.log(data)
  //   // axiosPoderJudicial
  //   //   .post('/modelProduct',data)
  //   //   .then(res => window.alert("Se creo la marca con Exito"))
  //   //   .catch(err => console.log(err))
      
  //   // reset()
  // }

  return (
    <section className='relative flex items-center justify-center bg-white rounded-md p-8'>
      <div onClick={handleChangeShowIsMarca} className='hover:cursor-pointer absolute w-[35px] h-[35px] top-0 p-2 right-0'>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </div>
      <form onSubmit={handleSubmit(submit)} className='gap-4 grid-cols-2 grid items-center justify-center' action="">
        <h4>MARCA</h4>
        <input required {...register('name')} className='bg-gray-100 rounded-md p-2' type="text" />
        <button className='col-span-2 p-2 bg-green-500 rounded-md text-white hover:bg-green-400 font-semibold shadow-md'>Agregar</button>
      </form>
    </section>
  )
}

export default AddMarca