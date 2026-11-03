import React, { useState } from 'react'
import ProductPagi from "./product/ProductPagi"
import SearchProduct from './product/SearchProduct'
import { FaSearch } from "react-icons/fa";


export default function Home() {

  const [search, setSearch] = useState(null);
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const input = value.trim();

    if (!input) return;

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

  return (
    <>
      < div className="mb-8 mt-5 flex w-full max-w-2xl mx-auto items-center gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition" >

        <span className="pl-3 text-xl text-gray-400">
          <FaSearch />
        </span>

        <input
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          value={value}
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

      {search === null ? (
        <ProductPagi />
      ) : (
        <SearchProduct search={search} />
      )
      }
    </>
  )
}

