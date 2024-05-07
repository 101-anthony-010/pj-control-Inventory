import React from 'react'

const DeleteUser = ({ handleChangeIsShowDeleteUser }) => {
  return (
    <section className='flex items-center justify-center relative p-4 bg-white shadow-md max-w-3xl rounded-md'>
      <button className='w-[35px] h-[35px] p-2 absolute top-0 right-0 hover:cursor-pointer' onClick={handleChangeIsShowDeleteUser}>
        <img className='w-full h-full object-contain' src="/icons/close.png" alt="" />
      </button>
      <div className='grid items-center justify-center gap-4 p-2'>
        <h1 className='text-lg font-semibold'>Seguro que quiere eliminar este Usuario?</h1>
        <button className='mx-14 p-2 rounded-md m-auto bg-red-500 font-semibold text-white hover:bg-red-400'>Eliminar</button>
      </div>
    </section>
  )
}

export default DeleteUser