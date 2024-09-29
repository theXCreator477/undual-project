import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts } from './store/products/productSlice'

function SearchBar() {
    const [inpValue, setInpValue] = useState("")
    const dispatch = useDispatch()

    async function handleSubmit() {
        if (inpValue == '') return;
        try {
            const response = await axios.get(`https://dummyjson.com/products/search?q=${inpValue}`)
            dispatch(setProducts(response.data.products))
            setInpValue("")
        } catch (e) { console.error(e); }
    }
    return (
        <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full max-w-md m-auto mt-4">
            <input
                type="search"
                placeholder="Search..."
                value={inpValue}
                onChange={(e) => setInpValue(e.target.value)}
                className="w-full text-gray-600 focus:outline-none px-2"
            />
            <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-full"
                onClick={handleSubmit}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar