import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/user/register",
                { name, password },
                { withCredentials: true }
            )

            console.log(res.data)

            navigate("/login")

        } catch (error) {
            console.log(error.response?.data)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
            >

                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    Verify
                </button>

            </form>
        </div>
    )
}
