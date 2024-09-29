import React from 'react'

function Card({ product }) {
    return (
        <div className="border border-zinc-300 rounded-xl w-[250px] p-4">
            <img className="" src={product.thumbnail} alt={product.title} />
            <div className="">
                <h5 className="py-0.5 text-lg font-medium truncate">{product.title}</h5>
                <p className="py-0.5 text-ellipsis line-clamp-3 text-sm text-zinc-500">{product.description}</p>
                <p className="py-0.5 text-lg font-medium">{product.price}</p>
            </div>
        </div>
    )
}

export default Card