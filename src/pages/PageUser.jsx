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
import { axiosPoderJudicial } from '../utils/configAxios'

const PageUser = () => {
  const [users, setUsers] = useState([]);
  const { isShowCreateUser, isShowUpdatedUser, isShowDeleteUser } = useSelector(store => store.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosPoderJudicial
      .get('/user')
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err))
  }, [])
  

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

      <section className='ml-[80px] px-10 mt-[80px]'>

        <section className='text-center my-4 flex justify-between items-center'>
          <section className='shadow-md bg-slate-100 flex w-[440px] items-center justify-center'>
            <div className='w-[140px] h-[100px] bg-orange-200'>
              <img className='p-4 w-full h-full object-contain' src="/icons/team.png" alt="" />
            </div>
            <div className='w-[300px] h-[100px] font-semibold m-auto py-5 text-center items-center justify-center grid'>
              <p className='text-xl text-center uppercase'>Registro de Usuarios</p>
              <p className='font-semibold text-xl'>{users.length}</p>
            </div>
          </section>
          <div className='w-[35px] h-[35px] hover:cursor-pointer hover:bg-green-400 rounded-full shadow-md' onClick={handleChangeIsShowCreateUser}>
            <img className='w-full h-full object-contain' src="/icons/add_user.png" alt="" />
          </div>
        </section>

        <UserTableComponent handleChangeIsShowDeleteUser={handleChangeIsShowDeleteUser} />
      </section>
    </>
  )
}

export default PageUser