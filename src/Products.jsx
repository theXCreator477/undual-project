import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function Products() {
    const products = useSelector(state => state.products.products)
    return (
        <div className='flex flex-wrap gap-12 m-6 justify-center'>
            {
                products.length ?
                    products.map((product, index) => <Card key={index} product={product} />)
                    :
                    <p>No products found</p>
            }
        </div>
    )
}

export default Products