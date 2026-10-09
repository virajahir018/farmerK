import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { useState } from 'react'
import axios from 'axios';


export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  async function fetchdata(){

    let data= await axios.get("http://localhost:5000/user/profile",
      { withCredentials: true }
    )
    let res = await data.data
if(data.message=="Login successfully"){
  setIsLogin(true)
}

    console.log(res)
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