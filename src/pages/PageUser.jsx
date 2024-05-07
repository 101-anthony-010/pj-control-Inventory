import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//Components
import UserTableComponent from '../components/userComponents/UserTableComponent'
import CreateUser from '../components/userComponents/CreateUser'
import EditUser from '../components/userComponents/EditUser'
import DeleteUser from '../components/userComponents/DeleteUser'
import Navbar from '../components/layout/Navbar'

//Slices
import { changeIsShowCreateUser, changeIsShowDeleteUser, changeIsShowUpdatedUser } from '../store/slices/user.slice'

const PageUser = () => {
  const { isShowCreateUser, isShowUpdatedUser, isShowDeleteUser } = useSelector(store => store.userSlice);
  const dispatch = useDispatch();

  const handleChangeIsShowCreateUser = () => {
    dispatch(changeIsShowCreateUser());
  };
  const handleChangeIsShowUpdatedUser = () => {
    dispatch(changeIsShowUpdatedUser());
  };
  const handleChangeIsShowDeleteUser = () => {
    console.log(isShowDeleteUser)
    dispatch(changeIsShowDeleteUser());
  }

  return (
    <>
      <Navbar/>
      <section className={`bg-black/20 z-50 fixed w-full h-full flex items-center justify-center ${isShowCreateUser ? "top-0" : "-top-full"}`}>
        <CreateUser handleChangeIsShowCreateUser={handleChangeIsShowCreateUser} />
      </section>

      <section className={`bg-black/20 z-50 fixed w-full h-full flex items-center justify-center ${isShowUpdatedUser ? "top-0" : "-top-full"}`}>
        <EditUser handleChangeIsShowUpdatedUser={handleChangeIsShowUpdatedUser} />
      </section>

      <section className={`bg-black/20 z-50 fixed w-full h-full flex items-center justify-center ${isShowDeleteUser ? "top-0" : "-top-full"}`}>
        <DeleteUser handleChangeIsShowDeleteUser={handleChangeIsShowDeleteUser} />
      </section>

      <section className='l-[100px] px-10 mt-[80px]'>
        <section className='mx-16 max-w-5xl'>
          <section className='flex justify-between items-center gap-2'>
            <section className='m-4'>
              <h1 className='text-center text-2xl font-bold'>Tabla de Usuarios</h1>
            </section>

            <button onClick={handleChangeIsShowCreateUser} className='w-[45px] h-[45px] bg-green-500 rounded-md p-2 hover:bg-green-500/75 shadow'>
              <img className='w-full h-full object-contain' src="/icons/add.png" alt="" />
            </button>
          </section>
        </section>

        <section className='w-[80%] m-auto'>
          <UserTableComponent handleChangeIsShowDeleteUser={handleChangeIsShowDeleteUser} />
        </section>
      </section>
    </>
  )
}

export default PageUser