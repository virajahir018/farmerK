
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { userProfile } from '../../api/userApi'
import axios from 'axios'

export default function Profile({ setIsLogin }) {
    const [user, setUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        role: "user",
        Contact: "",
        location: {
            city: "",
            state: "",
            country: "",
            pinCode: ""
        },
        information: "",
        Preferences: "",
        Produce: "",
    });

    const fetchData = async () => {
        try {
            const response = await userProfile(data)
            setUser(response.data.user)
            console.log(response.data)
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    useEffect(() => {
        fetchData()

    }, [])

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

                console.log(userLocation);

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
                            state: address.state || "",
                            country: address.country || "",
                            pinCode: address.postcode || "",
                        },
                    }));

                    const data = await response.data;
                    console.log(data.address);
                } catch (error) {

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

        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
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

    if (!user) {
        return <div className="p-10">Loading profile...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    Edit Profile
                </h1>

                <p className="mb-8 text-sm text-gray-500">
                    Update your personal information below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Role */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Select Role
                        </label>

                        <select
                            name="role"
                            value={data.role}
                            onChange={changeSubmit}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        >
                            <option value="user">User</option>
                            <option value="farmer">Farmer</option>
                        </select>
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Contact Number
                        </label>

                        <input
                            type="tel"
                            name="Contact"
                            value={data.Contact}
                            onChange={changeSubmit}
                            placeholder="Enter contact number"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <button onClick={getLocation}
                            type="button"
                            className="w-full tex-c bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-200"
                        >
                            Get Current Location
                        </button>

                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}

                        <h2 className="mb-4 text-lg font-bold text-gray-800">
                            Location Details
                        </h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <input
                                type="text"
                                name="city"
                                value={data.location.city}
                                onChange={changeLocation}
                                placeholder="City"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />

                            <input
                                type="text"
                                name="state"
                                value={data.location.state}
                                onChange={changeLocation}
                                placeholder="State"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />

                            <input
                                type="text"
                                name="country"
                                value={data.location.country}
                                onChange={changeLocation}
                                placeholder="Country"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />

                            <input
                                type="text"
                                inputMode="numeric"
                                name="pinCode"
                                value={data.location.pinCode}
                                onChange={changeLocation}
                                placeholder="PIN Code"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                    </div>

                    {/* Information */}
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
                            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Preferences */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Preferences
                        </label>

                        <input
                            type="text"
                            name="Preferences"
                            value={data.Preferences}
                            onChange={changeSubmit}
                            placeholder="e.g. Vegetables, Fruits, Organic food"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Farmer-only field */}
                    {data.role === "farmer" && (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                            <label className="mb-2 block text-sm font-semibold text-green-800">
                                Produce
                            </label>

                            <input
                                type="text"
                                name="Produce"
                                value={data.Produce}
                                onChange={changeSubmit}
                                placeholder="e.g. Wheat, Rice, Cotton"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Enter the crops or products you grow or sell.
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={fetchData}
                        type="submit"
                        className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 sm:w-auto"
                    >
                        Save Changes
                    </button>

                </form>
            </div>
        </div>
    )
}
