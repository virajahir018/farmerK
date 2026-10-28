import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productId } from "../../api/userApi";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);

            const response = await productId(id);
            setProduct(response.data.product);
            setSelectedImage(0);

        } catch (error) {

            console.log(error?.response?.data || error.message);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="animate-pulse text-lg font-medium text-green-700">
                    Loading product...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Product not found
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const images = product.images || [];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                >
                    <span>←</span> Back to products
                </button>

                {/* Product Section */}
                <div className="grid grid-cols-1 gap-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
                    {/* Product Images */}
                    <div>
                        <div className="flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 sm:h-96 lg:h-[460px]">
                            {images.length > 0 ? (
                                <img
                                    src={images[selectedImage]?.image}
                                    alt={product.name}
                                    className="h-full w-full object-contain transition duration-300"
                                />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <p className="text-5xl">🌱</p>
                                    <p className="mt-3">No image available</p>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {images.map((img, index) => (
                                    <button
                                        key={img.imageId || index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition sm:h-24 sm:w-24 ${selectedImage === index
                                            ? "border-green-600 ring-2 ring-green-100"
                                            : "border-gray-200 hover:border-green-400"
                                            }`}
                                    >
                                        <img
                                            src={img.image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                ✓ Available
                            </span>

                            <span className="text-sm text-gray-400">
                                Fresh from the farmer
                            </span>

                            <button
                                onClick={() => navigate("/profile")}
                                className="ml-auto rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
                            >
                                View Profile
                            </button>
                        </div>

                        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                            {product.name}
                        </h1>

                        <p className="mt-4 whitespace-pre-line text-base leading-7 text-gray-600">
                            {product.description}
                        </p>

                        <div className="my-6 rounded-xl border border-green-100 bg-green-50 p-5">
                            <p className="text-sm font-medium text-green-800">
                                Product Price
                            </p>
                            <p className="mt-1 text-3xl font-extrabold text-green-700">
                                ₹{product.price}
                            </p>
                        </div>

                        {/* Farmer Details */}
                        <div className="mt-2 rounded-2xl border border-gray-200 p-5">
                            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
                                <span>👨‍🌾</span> Farmer Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400">Farmer Name</p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {product.user?.name || "Not available"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Contact</p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {product.user?.contact || "Not available"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Location</p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {[
                                            product.user?.location?.city,
                                            product.user?.location?.district,
                                            product.user?.location?.state,
                                            product.user?.location?.pinCode,
                                        ]
                                            .filter(Boolean)
                                            .join(", ") || "Location not available"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Product Date */}
                        <div className="mt-5 border-t border-gray-100 pt-4">
                            <p className="text-sm text-gray-400">
                                Last updated :{" "}
                                <span className="font-medium text-gray-600">
                                    {product.updatedAt
                                        ? new Date(product.updatedAt).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "Not available"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}