import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedEmployee = () => {
    const { token, user } = useSelector((store) => store.authSlice)
    if (token && (user.rol === 'employee')) {
        return <Outlet/>
    } else {
        return <Navigate to="/"/>       
    }
}

export default ProtectedEmployee