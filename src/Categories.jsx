import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, setProducts } from './store/products/productSlice'
import axios from 'axios'
import './Categories.css'

const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
]

function Categories() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.products.loading)

    async function fetchRemainingProducts(skip, url, total) {
        try {
            const response = await axios.get(`${url}&skip=${skip}`);
            dispatch(addProducts(response.data.products))
            skip += 10
            if (skip < total) {
                fetchRemainingProducts(skip, url, total);
            }
        } catch (e) { console.error(e) }
    }

    async function handleChange(event) {
        const category = event.target.value;
        const url = category == 'all' ? `https://dummyjson.com/products?limit=10` : `https://dummyjson.com/products/category/${category}?limit=10`

        try {
            const response = await axios.get(url);
            dispatch(setProducts(response.data.products))
            const total = response.data.total
            if (total > 10) await fetchRemainingProducts(10, url, total)
        } catch (e) { console.error(e) }
    }

    return (
        <div className={`categories-container ${isLoading && 'opacity-50'}`}>
            <div>
                <label className='categories' htmlFor={'all'}>
                    <input
                        type="radio"
                        id='all'
                        name="category"
                        value={'all'}
                        onChange={handleChange}
                        defaultChecked={true}
                        disabled={isLoading}
                    />
                    All
                </label>
            </div>
            {
                categories.map((category, index) => (
                    <div key={index}>
                        <label className='categories' htmlFor={category}>
                            <input
                                type="radio"
                                id={category}
                                name="category"
                                value={category}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {category}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}

export default Categories