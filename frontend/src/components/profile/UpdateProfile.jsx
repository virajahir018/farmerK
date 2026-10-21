
import React, { useState } from 'react'
import { userProfile, userUpdate } from '../../api/userApi'
import axios from 'axios'

export default function UpdateProfile() {
    const [user, setUser] = useState(null)
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        role: "user",
        contact: "",
        location: {
            city: "",
            district: "",
            state: "",
            pinCode: ""
        },
        information: "",
        preferences: "",
        produce: "",
    });

    async function getLocation() {

        setError("");

        if (!navigator.geolocation) {
            setError("Browser not support location");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const userLocation = ({
                    type: "Point",
                    coordinates: [longitude, latitude]
                })

                setLocation(userLocation);

                try {
                    const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {

                        params: {
                            format: "jsonv2",
                            lat: latitude,
                            lon: longitude,
                            addressdetails: 1
                        },

                        headers: {
                            "Accept-Language": "en"
                        }
                    });

                    const address = response.data.address;

                    setData((prev) => ({
                        ...prev,
                        location: {
                            city:
                                address.city ||
                                address.town ||
                                address.village ||
                                address.county ||
                                "",
                            district: address.state_district || "",
                            state: address.state || "",
                            pinCode: address.postcode || "",
                        },
                    }));
                } catch (error) {
                    setError(error.response?.data?.message)
                    console.log(first)(error.response?.data?.message)
                }
            },

            (err) => {
                setError("allow Location permission");
                console.log(err.message);
            }
        )
    }

    const changeSubmit = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const changeLocation = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            location: {
                ...data.location,
                [name]: value
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await userUpdate(data)

            setUser(response.data.user)
            console.log(response.data)

        } catch (error) {
            setError(error.response?.data?.message)
            console.log(error)
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl py-2">

            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-6">

                <h1 className="mb-2 text-xl font-bold text-slate-800">
                    Edit Profile
                </h1>

                <p className="mb-6 text-sm leading-6 text-slate-500">
                    Update your personal information below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Select Role
                        </label>

                        <select
                            name="role"
                            value={data.role}
                            onChange={changeSubmit}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                        >
                            <option value="user">User</option>
                            <option value="farmer">Farmer</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Contact Number
                        </label>

                        <input
                            type="tel"
                            name="contact"
                            value={data.contact}
                            onChange={changeSubmit}
                            placeholder="Enter contact number"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-800">
                            Location Details
                        </h2>

                        <button onClick={getLocation}
                            type="button"
                            className="w-full rounded-lg border border-green-700 bg-white px-4 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 sm:w-auto"
                        >
                            Get Current Location
                        </button>

                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <input
                                type="text"
                                name="city"
                                value={data.location.city}
                                onChange={changeLocation}
                                placeholder="City"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />

                            <input
                                type="text"
                                name="district"
                                value={data.location.district}
                                onChange={changeLocation}
                                placeholder="District"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />

                            <input
                                type="text"
                                name="state"
                                value={data.location.state}
                                onChange={changeLocation}
                                placeholder="State"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />


                            <input
                                type="text"
                                inputMode="numeric"
                                name="pinCode"
                                value={data.location.pinCode}
                                onChange={changeLocation}
                                placeholder="PIN Code"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            About You
                        </label>

                        <textarea
                            name="information"
                            value={data.information}
                            onChange={changeSubmit}
                            rows="4"
                            placeholder="Tell us something about yourself..."
                            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    {data.role === "user" && (
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Preferences
                            </label>

                            <input
                                type="text"
                                name="preferences"
                                value={data.preferences}
                                onChange={changeSubmit}
                                placeholder="e.g. Vegetables, Fruits, Organic food"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />
                        </div>
                    )}

                    {data.role === "farmer" && (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                            <label className="mb-2 block text-sm font-semibold text-green-800">
                                Produce
                            </label>

                            <input
                                type="text"
                                name="produce"
                                value={data.produce}
                                onChange={changeSubmit}
                                placeholder="e.g. Wheat, Rice, Cotton"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Enter the crops or products you grow or sell.
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 sm:w-auto"
                    >
                        Save Changes
                    </button>

                </form>
            </div>
        </div>
    )
}
