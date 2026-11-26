
import React, { useEffect, useState } from "react";
import { getCart } from "../../api/userApi";

export default function Cart() {
    const [data, setData] = useState({
        product: [],
        total: 0
    });

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await getCart();

            console.log(response.data);
            setData(response.data);

        } catch (error) {
            console.log(error?.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="animate-pulse font-semibold text-green-700">
                    Loading Cart...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">

            <div className="mx-auto max-w-6xl">

                <h1 className="mb-8 text-3xl font-extrabold text-gray-800">
                    My Cart
                </h1>

                {data.product.length === 0 ? (

                    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                        <p className="text-5xl">🛒</p>
                        <h2 className="mt-4 text-xl font-bold text-gray-800">
                            Your Cart is Empty
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Add some products to your cart.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">

                        {/* Cart Products */}
                        <div className="space-y-5 lg:col-span-2">

                            {data.product.map((item) => (

                                <div
                                    key={item.product._id}
                                    className="w-full flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row"
                                >

                                    {/* Product Image */}
                                    <div className="h-40 w-full overflow-hidden rounded-xl bg-gray-100 sm:w-40">
                                        <img
                                            src={item.product.images?.[0]?.image}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-1 flex-col justify-between">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {item.product.name}
                                            </h2>

                                            <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                                {item.product.description}
                                            </p>

                                            <p className="mt-3 font-semibold text-green-700">
                                                ₹{item.product.price} / unit
                                            </p>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                                            <p className="text-sm font-medium text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>

                                            <p className="text-lg font-bold text-gray-800">
                                                ₹{item.subtotal}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* Order Summary */}
                        <div className="w-[50%] h-fit gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-xl font-bold text-gray-800">
                                Order Summary
                            </h2>

                            <div className="flex justify-between border-b border-gray-100 pb-4">
                                <span className="text-gray-500">
                                    Total Items
                                </span>

                                <span className="font-semibold text-gray-800">
                                    {data.product.reduce(
                                        (sum, item) => sum + item.quantity,
                                        0
                                    )}
                                </span>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <span className="font-medium text-gray-600">
                                    Total Amount
                                </span>

                                <span className="text-2xl font-extrabold text-green-700">
                                    ₹{data.total}
                                </span>
                            </div>

                            <button
                                className="mt-6 w-full rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white shadow-md transition hover:bg-green-700 active:scale-[0.98]"
                            >
                                Proceed to Checkout
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}
