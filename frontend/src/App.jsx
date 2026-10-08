import React from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { useState } from 'react'


export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Navbar isLogin={isLogin} />
      <AppRoutes setIsLogin={setIsLogin} />
    </>
  )
}
