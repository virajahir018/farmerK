import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { useState } from 'react'
import { userProfile } from './api/userApi';

export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  async function fetchdata() {

    try {
      const response = await userProfile();

      if (response.data.message === 'User profile') {
        setIsLogin(true);
      }
    } catch (error) {
      console.log('Profile API error:', error.response?.status, error.response?.data);

      if (error?.response?.status === 401) {
        setIsLogin(false);
      }
    }

  }


  useEffect(() => {

    fetchdata()

  }, [])

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Navbar isLogin={isLogin} />
      <div className="min-w-0 flex-1">
        <AppRoutes setIsLogin={setIsLogin} />
      </div>
    </div>
  )
}