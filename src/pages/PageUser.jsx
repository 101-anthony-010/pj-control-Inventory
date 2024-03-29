import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//Components
import UserTableComponent from '../components/userComponents/UserTableComponent'
import CreateUser from '../components/userComponents/CreateUser'

//Slices
import userSlice, { changeIsShowCreateUser } from '../store/slices/user.slice'

const PageUser = () => {
  const { isShowCreateUser, isShowUpdatedUser } = useSelector(store => store.userSlice)
  const dispatch = useDispatch()

  const handleChangeIsShowCreateUser = () => {
    dispatch(changeIsShowCreateUser())
  }

  return (
    <>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateUser ? "top-0" : "-top-full"}`}>
        <CreateUser handleChangeIsShowCreateUser={handleChangeIsShowCreateUser}/>
      </section>

      <section className='m-4  flex justify-between'>
        <h1 className='text-center text-xl m-auto'>Tablas de Usuarios</h1>
        
        <section className='grid grid-cols-[1fr_auto_auto] gap-2'>
          <input type="text" className='bg-gray-100 rounded-md p-2'/>
          <button className='p-2 flex items-center justify-center bg-green-500 rounded-md'>
            <box-icon color="white" name='search-alt-2' ></box-icon>
          </button>
          <button onClick={handleChangeIsShowCreateUser} className='flex items-center justify-center bg-green-500 rounded-md p-2'>
            <box-icon color='white' type='solid' name='user-plus'></box-icon>
          </button>
        </section>
      </section>

      <section className='grid items-center justify-center'>
        <UserTableComponent/>
      </section>
    </>
  )
}

export default PageUser