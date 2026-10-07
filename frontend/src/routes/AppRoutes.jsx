import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import VerifyOTP from '../components/user/VerifyOTP'
import VerifyUser from '../components/user/VerifyUser'
import Register from '../components/user/Register'
import Login from '../components/user/Login'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/verify-user' element={<VerifyUser />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}
