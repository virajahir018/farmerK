import React, { useState, useEffect } from "react";
import { productAdd } from "../../api/userApi";

export default function ProductAdd() {
  const [data, setData] = useState({
    images: [],
    name: "",
    price: "",
    description: ""
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);


  const changeSubmit = (e) => {
    const { name, value, files } = e.target;


    if (name === "images") {
      setData((prev) => ({
        ...prev,
        images: Array.from(files || [])
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    const urls = data.images.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [data.images]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    if (
      !data.name.trim() ||
      !data.description.trim() ||
      data.price === "" ||
      Number(data.price) < 0
    ) {
      alert("Please enter valid product details");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      data.images.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("name", data.name.trim());
      formData.append("price", data.price);
      formData.append("description", data.description.trim());

      const response = await productAdd(formData);

      console.log(response.data);
      alert("Product added successfully!");

      setData({
        images: [],
        name: "",
        price: "",
        description: ""
      });

      e.target.reset();
    } catch (error) {
      console.error(
        "Product upload failed:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Unable to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Farmer Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter product details and select multiple images.
          </p>
        </div>

        {/* Multiple image upload */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Product Images
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
              Click to select images
            </span>

            <span className="mt-1 text-xs text-gray-500">
              PNG, JPG or WEBP · Select multiple files
            </span>

            <input
              type="file"
              name="images"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={changeSubmit}
              className="sr-only"
            />
          </label>
        </div>

        {/* Image previews */}
        {data.images.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">
              Selected images ({data.images.length})
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data.images.map((image, index) => (
                <div
                  key={`${image.name}-${image.lastModified}-${index}`}
                  className="min-w-0 rounded-xl border border-green-200 bg-green-50 p-3"
                >
                  {imagePreviews[index] && (
                    <img
                      src={imagePreviews[index]}
                      alt={image.name}
                      className="h-32 w-full rounded-lg object-contain"
                    />
                  )}

                  <p className="mt-2 truncate text-sm font-semibold text-gray-700">
                    {image.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {(image.size / 1024).toFixed(2)} KB
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setData((prev) => ({
                        ...prev,
                        images: prev.images.filter(
                          (_, i) => i !== index
                        )
                      }));
                    }}
                    className="mt-2 text-xs font-semibold text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Product Name
          </label>

          <input
            id="name"
            name="name"
            value={data.name}
            onChange={changeSubmit}
            type="text"
            required
            placeholder="e.g. Fresh Tomatoes"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Product Price (₹)
          </label>

          <input
            id="price"
            name="price"
            type="number"
            value={data.price}
            onChange={changeSubmit}
            min="0"
            step="0.01"
            required
            placeholder="Enter price"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Product Description
          </label>

          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={changeSubmit}
            rows={4}
            required
            placeholder="Describe your product..."
            className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Product..." : "+ Add Product"}
        </button>
      </form>
    </div>
  );
}

// import React, { useState } from 'react'

// export default function ProductAdd() {
//   const [images, setImages] = useState([]);

//   const handleSubmit = (e) => {
//     // const file = e.target.files[0];
//     const files = Array.from(e.target.files);

//     setImages(files)
//   }

//   let imagesUrl = images.map((image) => URL.createObjectURL(image));

//   console.log(imagesUrl)

//   // images.map((index, image) => {
//   //   return console.log(index, " : ", image);
//   // })

//   return (
//     <div>

//       <input
//         type="file"
//         accept='image'
//         multiple
//         onChange={handleSubmit}
//       />

//       {images && (

//         imagesUrl.map((image, index) => (
//           <div key={index}>
//             <img src={image} alt="Preview" onChange={handleSubmit} />
//           </div>
//         ))

//       )}
//     </div>
//   )
// }
