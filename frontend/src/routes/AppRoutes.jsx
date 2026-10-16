import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import VerifyOTP from '../components/user/VerifyOTP'
import VerifyUser from '../components/user/VerifyUser'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import LogOut from '../components/profile/LogOut'
import Location from '../components/profile/Location'
import Profile from '../components/profile/Profile'
import ProductPagi from '../components/ProductPagi'

export default function AppRoutes({ setIsLogin }) {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/verify-user' element={<VerifyUser />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
            <Route path='/profile' element={<Profile setIsLogin={setIsLogin} />} />
            <Route path='/location' element={<Location />} />
            <Route path='/product_pagi' element={<ProductPagi />} />
        </Routes>
    )
}
