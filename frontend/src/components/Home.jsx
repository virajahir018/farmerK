import React, { useState } from 'react'
import { productAll } from '../api/userApi';

export default function Home() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await productAll();

      console.log(response.data)
    } catch (error) {
      console.log(error.response?.data)
    }
  }


  return (
    <div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-200"
      >
        Product
      </button>
    </div>
  )
}
