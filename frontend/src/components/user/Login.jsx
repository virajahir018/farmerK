import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setIsLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({});
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/user/login",
                { email, password },
                { withCredentials: true }
            )

            console.log(res.data)

            setData(res.data)


            if (res.data.message === "Login successfully") {

                setTimeout(() => {
                    navigate("/")
                }, 1000)

                setIsLogin(true)
            }

        } catch (error) {
            console.log(error.response?.data)
            setData(error.response?.data)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
            >
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />

                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-200"
                >
                    Login
                </button>

                {data?.message === "Login successfully" ?
                    (
                        <p className='text-center pt-3 text-green-700'>{data.message}</p>
                    ) :
                    (
                        <p className='text-center pt-3 text-red-600'>{data.message}</p>
                    )
                }

                <h1 className='text-center'>Not registered <Link to="/verify-user"><span className='text-green-600'>click here</span></Link> to register</h1>

            </form>
        </div>
    )
}
