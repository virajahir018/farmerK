import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productId } from '../../api/userApi';

export default function ProductDetails() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

        const fetchProduct = async () => {
            setLoading(true);
            setError('');
            setData(null);

            try {
                const response = await productId(id);
                const product = response?.data?.product;

                if (!product) {
                    throw new Error('Product not found.');
                }

                if (!ignore) {
                    setData(product);
                }
            } catch (err) {
                if (!ignore) {
                    setError(
                        err.response?.data?.message ||
                        err.message ||
                        'Unable to load product. Please try again.'
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        if (id) {
            fetchProduct();
        } else {
            setError('Invalid product ID.');
            setLoading(false);
        }

        return () => {
            ignore = true;
        };
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div
                        className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-600"
                        role="status"
                        aria-label="Loading product"
                    />
                    <p className="mt-4 font-medium text-gray-600">
                        Loading product details...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <span className="text-5xl" aria-hidden="true">⚠️</span>

                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    Unable to load product
                </h2>

                <p className="mt-2 text-gray-600">{error}</p>

                <Link
                    to="/"
                    className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    const farmer = data?.user;
    const location = farmer?.location;

    const price = Number(data?.price);
    const formattedPrice = Number.isFinite(price)
        ? new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(price)
        : 'Price unavailable';

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-6xl">

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-6 text-sm">
                    <Link
                        to="/"
                        className="font-medium text-green-700 hover:text-green-900"
                    >
                        Home
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-500">Product Details</span>
                </nav>

                {/* Heading */}
                <header className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                        Fresh from the Farm
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Product Details
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Explore the product and learn more about its farmer.
                    </p>
                </header>

                {/* Product Section */}
                <section className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:grid-cols-2">

                    {/* Image */}
                    <div className="flex min-h-72 items-center justify-center bg-green-50 p-6 sm:p-10">
                        {data?.image ? (
                            <img
                                src={data.image}
                                alt={data.name || 'Product image'}
                                className="h-72 w-full rounded-2xl object-contain sm:h-96"
                                onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.style.visibility = 'hidden';
                                }}
                            />
                        ) : (
                            <div className="text-center text-gray-400">
                                <span className="text-6xl" aria-hidden="true">🌱</span>
                                <p className="mt-3">No image available</p>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center p-6 sm:p-10">
                        <span className="w-fit rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-800">
                            Farm Product
                        </span>

                        <h2 className="mt-5 break-words text-3xl font-bold capitalize text-gray-900 sm:text-4xl">
                            {data?.name || 'Unnamed Product'}
                        </h2>

                        <p className="mt-5 text-sm font-medium text-gray-500">
                            Product Price
                        </p>

                        <p className="mt-1 text-3xl font-extrabold text-green-700">
                            {formattedPrice}
                        </p>

                        <div className="my-7 border-t border-gray-200" />

                        {/* Farmer Info */}
                        <h3 className="mb-5 flex items-center gap-3 text-xl font-bold text-gray-900">
                            <span
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-2xl"
                                aria-hidden="true"
                            >
                                👨‍🌾
                            </span>
                            Farmer Information
                        </h3>

                        <div className="space-y-4">
                            <InfoItem
                                label="Farmer Name"
                                value={farmer?.name}
                            />

                            <InfoItem
                                label="Contact"
                                value={farmer?.contact}
                            />

                            <InfoItem
                                label="About Farmer"
                                value={farmer?.information}
                            />
                        </div>
                    </div>
                </section>

                {/* Location */}
                <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                            📍
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Farm Location
                            </h2>
                            <p className="text-sm text-gray-500">
                                Farmer's location details
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <InfoItem
                            label="City"
                            value={location?.city}
                        />

                        <InfoItem
                            label="District"
                            value={location?.district}
                        />

                        <InfoItem
                            label="State"
                            value={location?.state}
                        />
                    </div>
                </section>

            </div>
        </main>
    );
}

// Reusable information card
function InfoItem({ label, value }) {
    return (
        <div className="min-w-0 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">
                {label}
            </p>

            <p className="mt-1 whitespace-pre-wrap break-words font-semibold text-gray-900">
                {value !== undefined && value !== null && String(value).trim() !== ''
                    ? value
                    : 'Not available'}
            </p>
        </div>
    );
}