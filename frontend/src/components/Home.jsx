import React, { useState } from 'react'
import { productAll } from '../api/userApi';
import { useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  const handleSubmit = async () => {

    try {
      const response = await productAll();

      setData(response.data);

    } catch (error) {
      console.log(error.response?.data)
    }
  }

  useEffect(() => {
    handleSubmit();
  }, [])

  return (

    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-4">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        FarmerK Products
      </h1>
      <p className="mb-8 text-gray-500">
        Explore products directly from our farmers.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((p) => (
          <div
            key={p._id}
            className="group overflow-hidden rounded-2xl border border-gray-50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="h-52 overflow-hidden p-0.5 relative">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <span className="absolute top-3 right-3 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Available
              </span>

            </div>

            <div className="p-5">

              <div className='flex justify-between items-start gap-4 '>

                <div>
                  <h2 className="mb-1 truncate text-xl font-bold text-gray-800">
                    {p.name}
                  </h2>

                  <p className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
                    {p.description}
                  </p>
                </div>

                <p className="text-xl font-bold text-green-700">
                  ₹{p.price}
                </p>

              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              </div>

              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Farmer</p>
                <p className="truncate font-semibold text-gray-700">
                  {p.user?.name || "Farmer"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 
              < div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg" >
                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-200"
                >
                  Product
                </button>
              </div > */}
    </div>



  )
}
