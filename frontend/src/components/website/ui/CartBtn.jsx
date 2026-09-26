'use client'

import { addToCart } from '@/redux/features/cartSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function CartBtn({ product }) {
    const dispatcher = useDispatch()

    function cartHandler() {
        // if (user) {
        //  API call
        // }
        dispatcher(addToCart({
            _id: product._id,
            name: product.name,
            slug: product.slug,
            salePrice: product.salePrice,
            price: product.price,
            thumbnail: product.thumbnail,
            qty: 1
        }))
    }

    return (
        <button onClick={cartHandler} className="rounded-lg bg-[#8B5E3C] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#6F472D]">
            Add to Cart
        </button>
    )
}