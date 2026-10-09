import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";

export default function Navbar({ isLogin }) {

    // console.log(isLogin)
    return (
        <div className="w-full h-16 bg-green-800 text-white flex items-center justify-between px-8 shadow-md">

            <Link to="/">
                <h1 className="text-2xl font-bold">
                    FarmerK
                </h1>
            </Link>

            {!isLogin ?
                (
                    <button className="bg-white text-green-800 px-5 py-2 rounded-lg font-semibold transition duration-200 shadow-sm">
                        <Link to="/login">Login</Link>
                    </button>
                ) :
                (
                    <Link to="/logout">
                        <FaUser/>
                    </Link>
                )
            }

        </div>
    )
}
