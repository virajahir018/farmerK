import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import VerifyOTP from '../components/user/VerifyOTP'
import VerifyUser from '../components/user/VerifyUser'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import UpdateProfile from '../components/profile/UpdateProfile'
import Profile from '../components/profile/Profile'
import LogOut from '../components/profile/LogOut'
import ProductAdd from '../components/product/ProductAdd'
import ProductPagi from '../components/product/ProductPagi'
import ProductDetails from '../components/product/ProductDetails'

export default function AppRoutes({ setIsLogin }) {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/verify-user' element={<VerifyUser />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update_profile' element={<UpdateProfile />} />
            <Route path='/product_pagi' element={<ProductPagi />} />
            <Route path='/logout' element={<LogOut setIsLogin={setIsLogin} />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/product-add' element={<ProductAdd />} />
        </Routes>
    )
}
