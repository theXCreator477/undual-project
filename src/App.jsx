import React, { useEffect } from 'react'
import Categories from './Categories';
import Products from './Products';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProducts, setProducts, setLoading } from './store/products/productSlice';
import Cards from './Card';
import SearchBar from './SearchBar';

function App() {
    const dispatch = useDispatch()

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

    async function fetchProducts() {
        const url = 'https://dummyjson.com/products?limit=10'
        try {
            const response = await axios.get(url);
            dispatch(setProducts(response.data.products))
            const total = response.data.total
            if (total > 10) await fetchRemainingProducts(10, url, total)
        } catch (e) { console.error(e) }
    };

    useEffect(() => {
        fetchProducts()
        axios.interceptors.request.use(
            (config) => {
                dispatch(setLoading(true))
                return config;
            },
            (error) => {
                dispatch(setLoading(false))
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                dispatch(setLoading(false))
                return response;
            },
            (error) => {
                dispatch(setLoading(false))
                return Promise.reject(error);
            }
        );
    }, [])

    return (
        <div className='select-none'>
            <Categories />
            <SearchBar />
            <Products />
        </div>
    )
}

export default App