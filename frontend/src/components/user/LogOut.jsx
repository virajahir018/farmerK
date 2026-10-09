import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogOut({ setIsLogin }) {

    const navigate = useNavigate();

    const submit = async () => {

        try {
            const res = await axios.get("http://localhost:5000/user/logout",
                { withCredentials: true }
            )

            setIsLogin(false);

            console.log(res.data)

            navigate("/")

        } catch (error) {
            console.log(error.response?.data)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <button
                onClick={submit}
                className="w-50 bg-green-700 text-white py-3 rounded-lg font-semibold transition cursor-default duration-200"
            >
                Logout
            </button>
        </div>
    )
}
