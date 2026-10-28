import React, { useState } from 'react'
import { productAll } from '../api/userApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

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

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-6">
      {data.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/product/${p._id}`)}
          className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          {/* Product Image */}
          <div className="relative h-56 overflow-hidden bg-gray-100">
            <img
              src={p.images?.[0]?.image}
              alt={p.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
              Available
            </span>

            {p.images?.length > 1 && (
              <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white">
                +{p.images.length - 1}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-xl font-bold text-gray-800">
                  {p.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {p.description}
                </p>
              </div>

              <p className="whitespace-nowrap text-xl font-bold text-green-700">
                ₹{p.price}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400">Farmer</p>
              <p className="truncate font-semibold text-gray-700">
                {p.user?.name || "Farmer"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>



  )
}
