import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBoxOpen, FaHome, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Navbar({ isLogin }) {
    return (
        <aside className="z-20 flex w-full shrink-0 flex-col border-b border-green-900/10 bg-green-900 px-4 py-4 text-white shadow-lg md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r md:px-5 md:py-7">
            <Link to="/" className="mb-3 flex items-center gap-3 md:mb-10">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl font-black text-white">
                    F
                </span>
                <span className="text-2xl font-bold tracking-tight">FarmerK</span>
            </Link>

            <nav aria-label="Main navigation" className="flex items-center gap-2 overflow-x-auto pb-1 md:flex-1 md:flex-col md:items-stretch md:gap-2 md:overflow-visible">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white text-green-900 shadow-sm" : "text-green-50 hover:bg-white/10"
                        }`
                    }
                >
                    <FaHome className="text-lg" />
                    Home
                </NavLink>
                <NavLink
                    to="/product_pagi"
                    className={({ isActive }) =>
                        `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white text-green-900 shadow-sm" : "text-green-50 hover:bg-white/10"
                        }`
                    }
                >
                    <FaBoxOpen className="text-lg" />
                    Products
                </NavLink>
                {isLogin ? (
                    <div >
                        <div className='mb-2'>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white text-green-900 shadow-sm" : "text-green-50 hover:bg-white/10"
                                    }`
                                }
                            >
                                <FaUser className="text-lg" />
                                Profile
                            </NavLink>
                        </div>

                        <div>
                            <NavLink
                                to="/logout"
                                className={({ isActive }) =>
                                    `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white text-green-900 shadow-sm" : "text-green-50 hover:bg-white/10"
                                    }`
                                }
                            >
                                <FaSignOutAlt className="text-lg" />
                                Logout
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white text-green-900 shadow-sm" : "text-green-50 hover:bg-white/10"
                            }`
                        }
                    >
                        <FaSignInAlt className="text-lg" />
                        Login
                    </NavLink>
                )}
            </nav>
        </aside >
    )
}
