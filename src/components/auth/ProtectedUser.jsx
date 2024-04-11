import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedUser = () => {
    const { token } = useSelector((store) => store.authSlice)
    console.log(token)
    if (token) {
        return <Outlet/>
    } else {
        return <Navigate to="/"/>       
    }
}

export default ProtectedUser