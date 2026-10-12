import axios from 'axios';
import React, { useState } from 'react'

export default function Location() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");

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


    return (
        <div className="text-center w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <button onClick={getLocation}
                type="submit"
                className="w-full tex-c bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-200"
            >
                Locaton
            </button>
        </div>
    )
}
