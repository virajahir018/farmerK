import React, { useState } from 'react'

export default function ProductAdd() {
  const [data, setData] = useState({
    image: null,
    name: "",
    price: "",
    description: ""
  })

  const changeSubmit = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setData((prev) => ({
        ...prev,
        image: files?.[0] || null
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {

  }

  console.log('Product form ready:', {
    name: data.name,
    price: data.price,
    description: data.description,
    image: data.image
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Farmer Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Add New Product
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your product details to list it in the marketplace.
          </p>
        </div>

        {/* Product Image */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Product Image
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 transition hover:border-green-500 hover:bg-green-50">
            <svg
              className="mb-3 h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M4 16.5V19a1 1 0 001 1h14a1 1 0 001-1v-2.5M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5"
              />
            </svg>

            <span className="text-sm font-semibold text-gray-700">
              Click to upload an image
            </span>
            <span className="mt-1 text-xs text-gray-500">
              PNG, JPG or WEBP
            </span>

            <input
              type="file"
              name="image"
              accept="image/png,image/jpeg,image/webp"
              onChange={changeSubmit}
              className="sr-only"
            />
          </label>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            value={data.name}
            onChange={changeSubmit}
            type="text"
            placeholder="e.g. Fresh Tomatoes"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* Product Price */}
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-semibold text-gray-700">
            Product Price (₹)
          </label>
          <div className="flex items-center overflow-hidden rounded-xl border border-gray-300 transition focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-100">
            <span className="bg-gray-50 px-4 py-3 font-semibold text-gray-600">
              ₹
            </span>
            <input
              id="price"
              name="price"
              type="number"
              value={data.price}
              onChange={changeSubmit}
              min="0"
              step="0.01"
              placeholder="Enter price"
              className="w-full bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={changeSubmit}
            rows="4"
            placeholder="Describe your product, quality and freshness..."
            className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          + Add Product
        </button>

      </form>
    </div>
  )
}
