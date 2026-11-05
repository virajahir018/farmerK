import React, { useState } from 'react'
import ProductPagi from "./product/ProductPagi"
import SearchProduct from './product/SearchProduct'
import { FaSearch } from "react-icons/fa";
import ProductLocation from './product/ProductLocation';


export default function Home() {

  const [search, setSearch] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [city, setCity] = useState("");
  const [cityValue, setCityValue] = useState("");

  const handleSearch = () => {
    const input = searchValue.trim();

    if (!input) return;

    setCity("");
    setCityValue("");

    if (!isNaN(input)) {

      setSearch({
        price: input
      })

    } else {

      setSearch({
        name: input
      })

    }

  }

  const handleCity = () => {
    const input = cityValue.trim();

    if (!input) return;

    setSearch(null);
    setSearchValue("");

    setCity(input);

  }

  return (
    <>
      <div className='flex items-center'>
        < div className="m-4 flex w-full max-w-2xl  items-center gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition" >

          <span className="pl-3 text-xl text-gray-400">
            <FaSearch />
          </span>

          <input
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            value={searchValue}
            type="text"
            placeholder="Search products name and price"
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:text-base"
          />

          <button
            type="button"
            onClick={handleSearch}
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700 active:scale-95 sm:px-7"
          >
            Search
          </button>
        </div >

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">

          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCity();
              }
            }}
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            placeholder="Search location..."
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:text-base"
          />

          <button
            type="button"
            onClick={handleCity}
            className="shrink-0 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-95 sm:px-7"
          >
            Search
          </button>
        </div>
      </div>


      {search === null && !city ? (
        <ProductPagi />
      ) : search !== null ? (
        <SearchProduct search={search} />
      ) : (
        <ProductLocation city={city} />
      )}

    </>
  )
}

