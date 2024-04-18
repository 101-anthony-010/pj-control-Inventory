import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//Components
import UserTableComponent from '../components/userComponents/UserTableComponent'
import CreateUser from '../components/userComponents/CreateUser'
import EditUser from '../components/userComponents/EditUser'
import Navbar from '../components/layout/Navbar'

//Slices
import userSlice, { changeIsShowCreateUser, changeIsShowUpdatedUser } from '../store/slices/user.slice'

const PageUser = () => {
  const [users, setUsers] = useState();
  const { isShowCreateUser, isShowUpdatedUser } = useSelector(store => store.userSlice);
  const dispatch = useDispatch();

  const handleChangeIsShowCreateUser = () => {
    dispatch(changeIsShowCreateUser());
  };

  const handleChangeIsShowUpdatedUser = () => {
    dispatch(changeIsShowUpdatedUser());
  };

  return (
    <>
      <Navbar/>
      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowCreateUser ? "top-0" : "-top-full"}`}>
        <CreateUser handleChangeIsShowCreateUser={handleChangeIsShowCreateUser} setUsers={setUsers} />
      </section>

      <section className={`bg-black/20 fixed w-full h-full flex items-center justify-center ${isShowUpdatedUser ? "top-0" : "-top-full"}`}>
        <EditUser handleChangeIsShowUpdatedUser={handleChangeIsShowUpdatedUser} />
      </section>

      <section className='m-2 flex justify-end'>
        <section className='grid grid-cols-[1fr_auto_auto] gap-2'>
          {/* <input type="text" className='bg-gray-100 rounded-md p-2'/>
          <button className='p-2 flex items-center justify-center bg-green-500 rounded-md'>
            <box-icon color="white" name='search-alt-2' ></box-icon>
          </button> */}
          <button onClick={handleChangeIsShowCreateUser} className='w-[35px] h-[35px] bg-green-500 rounded-md p-2 hover:bg-green-500/75 shadow'>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </button>
        </section>
      </section>

      <section className='m-4'>
        <h1 className='text-center text-2xl font-bold'>Tablas de Usuarios</h1>
      </section>

      <section className='w-[80%] m-auto'>
        <UserTableComponent users={users} setUsers={setUsers} handleChangeIsShowUpdatedUser={handleChangeIsShowUpdatedUser} />
      </section>
    </>
  )
}

export default PageUser