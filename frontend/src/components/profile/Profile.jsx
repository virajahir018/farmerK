import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import UpdateProfile from './UpdateProfile'
import { userProfile } from '../../api/userApi'
import LogOut from './LogOut'

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileError, setProfileError] = useState("")

    const fetchData = async () => {
        try {
            const response = await userProfile()
            setProfile(response.data.user)
        } catch (error) {
            setProfileError(error.response?.data?.message || "Could not load your profile.")
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-4">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(250px,0.8fr)_minmax(0,2fr)]">

                <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full">
                        <FaUserCircle className="text-8xl text-gray-500" />
                    </div>
                    <h1 className="mt-5 text-2xl font-bold text-slate-800">
                        {profile?.name || "Your Profile"}
                    </h1>
                    <p className="mt-2 mb-10 text-sm capitalize bg-green-100 px-3 py-2 font-medium rounded-2xl text-green-700">
                        {profile?.role || "Loading profile..."}
                    </p>

                </section>

                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    {profileError ? (
                        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {profileError}
                        </p>
                    ) : profile?.role === "farmer" ? (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Farmer Profile
                            </h2>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <h3 className="text-sm font-semibold text-slate-500">Contact</h3>
                                    <p className="mt-1 break-words text-slate-800">{profile.contact || "Not provided"}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <h3 className="text-sm font-semibold text-slate-500">Location</h3>
                                    <p className="mt-1 text-slate-800">
                                        {[profile.location?.city, profile.location?.district, profile.location?.state, profile.location?.pinCode]
                                            .filter(Boolean)
                                            .join(", ") || "Not provided"}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                                    <h3 className="text-sm font-semibold text-slate-500">About</h3>
                                    <p className="mt-1 whitespace-pre-wrap text-slate-800">{profile.information || "Not provided"}</p>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                                    <h3 className="text-sm font-semibold text-slate-500">Produce</h3>
                                    <p className="mt-1 text-slate-800">
                                        {profile.produce?.filter(Boolean).join(", ") || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : isEditing && profile?.role === "user" ? (
                        <>
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    Update Profile
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </div>
                            <UpdateProfile />
                        </>
                    ) : profile?.role === "user" ? (
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">
                                    Your Profile
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Manage your personal and location details.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                            >
                                Update Profile
                            </button>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">Loading profile...</p>
                    )}
                </section>

            </div>

        </main>
    )
}
