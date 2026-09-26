'use client'

import { decreaseQty, increaseQty, removeFromCart } from "@/redux/features/cartSlice";
import Link from "next/link";
import {
    FiMinus,
    FiPlus,
    FiTrash2,
    FiShoppingBag,
    FiArrowLeft,
    FiTag,
    FiTruck,
    FiShield,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";




export default function Cart() {
    const dispatcher = useDispatch()
    const cart = useSelector((store) => store.cart);

    const orderSummary = [
        {
            label: "Subtotal",
            value: cart.original_total,
        },
        {
            label: "Shipping",
            value: "FREE",
        },
        {
            label: "Discount",
            value: (cart.original_total - cart.final_total),
        },
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <FiShoppingBag className="text-2xl text-gray-900" />

                        <h1 className="text-xl font-bold text-gray-900">
                            MyStore
                        </h1>
                    </div>

                    <span className="text-sm text-gray-500">
                        Cart
                    </span>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Shopping Cart
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {cart?.items?.length || 0} items in your cart
                    </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
                    {/* Cart Items */}
                    <div>
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                            {cart?.items.map((item, index) => (
                                <div
                                    key={item._id}
                                    className={`p-5 sm:p-6 ${index !== 1
                                        ? "border-b border-gray-200"
                                        : ""
                                        }`}
                                >
                                    <div className="flex gap-4 sm:gap-6">
                                        {/* Image */}
                                        <div className="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-36 sm:w-32">
                                            <img
                                                src={`${item.thumbnail}?auto=format&fit=crop&w=400&q=80`}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        {item.category}
                                                    </p>

                                                    <h3 className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
                                                        {item.title}
                                                    </h3>
                                                </div>

                                                <button onClick={() => {
                                                    dispatcher(removeFromCart(item._id))
                                                }} className="text-gray-400 transition hover:text-red-500">
                                                    <FiTrash2 className="text-lg" />
                                                </button>
                                            </div>



                                            {/* Bottom */}
                                            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
                                                {/* Quantity */}
                                                <div className="flex items-center rounded-lg border border-gray-300">
                                                    <button onClick={() => dispatcher(decreaseQty(item._id))} className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-100">
                                                        <FiMinus />
                                                    </button>

                                                    <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-300 text-sm font-medium">
                                                        {item.qty}
                                                    </span>

                                                    <button onClick={() => dispatcher(increaseQty(item._id))} className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-100">
                                                        <FiPlus />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-base font-bold text-gray-900">
                                                        ₹{(item.salePrice ?? 0).toLocaleString("en-IN")}
                                                    </p>

                                                    <p className="text-xs text-gray-500 line-through">
                                                        ₹{(item.price ?? 0).toLocaleString("en-IN")} each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping */}
                        <button className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
                            <FiArrowLeft />
                            Continue Shopping
                        </button>

                        {/* Benefits */}
                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-5">
                                <FiTruck className="text-xl text-gray-700" />

                                <h3 className="mt-3 text-sm font-semibold text-gray-900">
                                    Free Shipping
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Free delivery on orders above ₹2,000
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-5">
                                <FiShield className="text-xl text-gray-700" />

                                <h3 className="mt-3 text-sm font-semibold text-gray-900">
                                    Secure Payment
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Your payment information is secure
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-5">
                                <FiShoppingBag className="text-xl text-gray-700" />

                                <h3 className="mt-3 text-sm font-semibold text-gray-900">
                                    Easy Returns
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    7 days easy return policy
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <aside>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                Order Summary
                            </h2>

                            {/* Coupon */}
                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Have a coupon?
                                </label>

                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                        <input
                                            type="text"
                                            placeholder="Coupon code"
                                            className="h-11 w-full rounded-lg border border-gray-300 pl-9 pr-3 text-sm outline-none focus:border-black"
                                        />
                                    </div>

                                    <button className="h-11 rounded-lg border border-gray-900 px-4 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                                {orderSummary.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-gray-500">
                                            {item.label}
                                        </span>

                                        <span
                                            className={`font-medium ${item.label === "Discount"
                                                ? "text-green-600"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                                <span className="text-base font-semibold text-gray-900">
                                    Total
                                </span>

                                <span className="text-xl font-bold text-gray-900">
                                    ₹{cart.final_total}
                                </span>
                            </div>

                            {/* Checkout */}
                            <Link href="/checkout" >
                                <button className="mt-6 h-12 w-full rounded-lg bg-black text-sm font-semibold text-white transition hover:bg-gray-800">
                                    Proceed to Checkout

                                </button>
                            </Link>

                            <p className="mt-4 text-center text-xs text-gray-500">
                                Secure checkout with encrypted payment
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}