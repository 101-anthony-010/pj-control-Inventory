import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedUser = () => {
    const { token, user } = useSelector((store) => store.authSlice)
    // console.log(user.rol)
    if (token && (user.rol === 'admin')) {
        return <Outlet/>
    } else {
        return <Navigate to="/"/>       
    }
}

export default ProtectedUser