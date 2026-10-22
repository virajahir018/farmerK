import React from 'react'
import { useState } from 'react'
import { productPagi } from '../api/userApi';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function ProductPagi() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await productPagi(page);

                setData(response.data.products);
                setTotalPages(response.data.totalPages);
                // console.log(response.data.products)

            } catch (error) {
                console.log(error.response?.data)
            }
        }

        fetchProducts();
    }, [page])

    const nextPage = () => {
        setPage(nextPage => nextPage + 1);
    }

    const prePage = () => {
        setPage(prePage => Math.max(1, prePage - 1));
    }

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
                        onClick={() => navigate(`/product/${p._id}`)}
                        className="group overflow-hidden rounded-2xl border border-gray-50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="h-52 overflow-hidden p-0.5 relative">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <span className="absolute top-2 right-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
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

            <div className='flex gap-3'>


                <button
                    onClick={prePage}
                    disabled={page === 1}
                    className="w-20 mt-5 ml-auto  bg-green-200 text-green-700 py-3 rounded-lg font-semibold  hover:bg-green-600 hover:text-white transition duration-200">
                    Preview
                </button>
                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className="w-20 mt-5  bg-green-200 text-green-700 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition duration-200">
                    Next
                </button>
            </div>

        </div>
        // <div>
        //     {/* <h1>${data.products[0].name}</h1> */}
        // </div>
    )
}
