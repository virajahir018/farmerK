import React from 'react'
import { FaUser, FaUserAlt, FaUserCircle } from 'react-icons/fa'
import LogOut from './LogOut'
import { useEffect } from 'react'
import { userProfile } from '../../api/userApi'
import { useState } from 'react'

export default function Profile({ setIsLogin }) {
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userProfile();

                setUser(response.data.user)
                console.log(response.data.user)
            } catch (error) {
                console.log(error.response?.data)
            }
        }

        fetchData();
    }, []);

    return (

        <div className="min-h-screen p-10 grid grid-cols-[30%_60%] justify-between">

            <div className="h-[600px] rounded-xl border border-black p-4">
                <div className="flex flex-col items-center gap-3">

                    <FaUserCircle className="text-gray-400 text-9xl" />

                    <h1 className="text-lg font-semibold text-gray-800">
                        {user.name}
                    </h1>

                </div>
            </div>

            <div className="h-[600px] rounded-xl border border-black p-4">

            </div>

        </div>
    )
}