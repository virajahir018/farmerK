
import React, { useEffect, useState } from "react";
import { productSearch } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function SearchProduct({ search }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    console.log("Search : ", search)

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await productSearch(search);

                const products = Array.isArray(response.data)
                    ? response.data
                    : response.data.products ?? [];

                setData(products);

            } catch (error) {
                console.log(error?.response?.data);
                setData([]);
                setError("Products fetch unsuccessful");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search]);

    if (loading) {
        return <p className="m-6">Searching products...</p>;
    }

    if (error) {
        return <p className="m-6 text-red-600">{error}</p>;
    }

    if (data.length === 0) {
        return <p className="m-6">No products found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
                Search Results
            </h1>

            <p className="mb-8 text-gray-500">
                Products matching
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((p) => (
                    <div
                        key={p._id}
                        onClick={() => navigate(`/product/${p._id}`)}
                        className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative h-56 overflow-hidden bg-gray-100">
                            <img
                                src={p.images?.[0]?.image}
                                alt={p.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <span className="absolute left-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                Available
                            </span>

                            {p.images?.length > 1 && (
                                <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                                    +{p.images.length - 1}
                                </span>
                            )}
                        </div>

                        <div className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="mb-1 truncate text-xl font-bold text-gray-800">
                                        {p.name}
                                    </h2>

                                    <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                                        {p.description}
                                    </p>
                                </div>

                                <p className="text-xl font-bold text-green-700">
                                    ₹{p.price}
                                </p>
                            </div>

                            <div className="mt-4 rounded-lg bg-gray-50 p-3">
                                <p className="text-xs text-gray-400">Farmer</p>
                                <p className="truncate font-semibold text-gray-700">
                                    {p.user?.name || "Farmer"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
