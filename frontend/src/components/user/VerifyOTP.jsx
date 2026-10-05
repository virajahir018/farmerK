import axios from 'axios';
import React from 'react'
import { useState } from 'react'

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/user/verify-otp",
                { otp }
            )

            console.log(res.data)
        } catch (error) {
            console.log(error.res?.data)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-200"
                >
                    Submit
                </button>

            </form>
        </div>
    )
}