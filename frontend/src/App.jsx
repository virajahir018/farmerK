import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { useState } from 'react'
import axios from 'axios';

export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  async function fetchdata() {

    try {
      const response = await axios.get(
        'http://localhost:5000/user/profile',
        { withCredentials: true }
      );

      if (response.data.message === 'User profile') {
        setIsLogin(true);
      }
    } catch (error) {
      console.log('Profile API error:', error.response?.status, error.response?.data);

      if (error.response?.status === 401) {
        setIsLogin(false);
      }
    }

  }


  useEffect(() => {

    fetchdata()

  }, [])

  return (
    <>
      <Navbar isLogin={isLogin} />
      <AppRoutes setIsLogin={setIsLogin} />
    </>
  )
}