import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../components/user/Register'
import VerifyOTP from '../components/user/VerifyOTP'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
        </Routes>
    )
}
