"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import ThankYouComponent from "@/components/website/thankyou/page";

// ==========================================
// API
// ==========================================

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000/api/";

// ==========================================
// LOADING
// ==========================================

function LoadingPage() {
    return (
        <div className="min-h-screen w-full bg-[#f7f3ec]">
            <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">

                <div className="mx-auto h-16 w-16 rounded-full bg-stone-200" />

                <div className="mx-auto mt-6 h-7 w-64 rounded bg-stone-200" />

                <div className="mx-auto mt-3 h-4 w-80 max-w-full rounded bg-stone-200" />

                <div className="mt-10 h-40 rounded-2xl bg-stone-100" />

                <div className="mt-6 h-48 rounded-2xl bg-stone-100" />

                <div className="mt-6 h-64 rounded-2xl bg-stone-100" />
            </div>
        </div>
    );
}

// ==========================================
// ERROR
// ==========================================

function ErrorPage({
    message,
    onRetry,
}) {
    return (
        <div className="min-h-screen w-full bg-[#f7f3ec]">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600">
                    !
                </div>

                <h1 className="text-xl font-semibold text-stone-900">
                    We couldn't load your order
                </h1>

                <p className="text-sm text-stone-500">
                    {message ||
                        "Something went wrong while fetching your order details."}
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="rounded-lg bg-[#5c3a24] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a2f1d]"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}

// ==========================================
// PAGE
// ==========================================

export default function ThankYouPage() {
    const params = useParams();
    const router = useRouter();

    const orderId = params?.orderId;

    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // ==========================================
    // FETCH ORDER
    // ==========================================

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError("");

            if (!orderId) {
                setError(
                    "Order ID is missing."
                );
                return;
            }

            console.log(
                "FETCHING ORDER:",
                orderId
            );

            const response =
                await axios.get(
                    `${API_BASE_URL}order/${orderId}`,
                    {
                        withCredentials: true,
                    }
                );

            console.log(
                "ORDER RESPONSE:",
                response.data
            );

            if (
                !response?.data
                    ?.success
            ) {
                throw new Error(
                    response?.data
                        ?.message ||
                        "Order not found"
                );
            }

            setOrder(
                response.data.data
            );
        } catch (err) {
            console.error(
                "THANK YOU PAGE ERROR:",
                err
            );

            setError(
                err?.response?.data
                    ?.message ||
                    err?.message ||
                    "Failed to load order details."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // EFFECT
    // ==========================================

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return <LoadingPage />;
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
        return (
            <ErrorPage
                message={error}
                onRetry={fetchOrder}
            />
        );
    }

    // ==========================================
    // NO ORDER
    // ==========================================

    if (!order) {
        return (
            <ErrorPage
                message="No order found."
                onRetry={fetchOrder}
            />
        );
    }

    // ==========================================
    // VIEW ORDER DETAILS
    // ==========================================

    const handleViewOrderDetails = (
        id
    ) => {
        router.push(
            `/orders/${id}`
        );
    };

    // ==========================================
    // CONTINUE SHOPPING
    // ==========================================

    const handleContinueShopping =
        () => {
            router.push("/store");
        };

    // ==========================================
    // ADD TO CART
    // ==========================================

    const handleAddToCart = (
        item
    ) => {
        console.log(
            "ADD TO CART:",
            item
        );

        // Yahan tumhara existing
        // cart function connect hoga.
    };

    // ==========================================
    // COMPONENT
    // ==========================================

    return (
        <ThankYouComponent
            order={order}
            onViewOrderDetails={
                handleViewOrderDetails
            }
            onContinueShopping={
                handleContinueShopping
            }
            onAddToCart={
                handleAddToCart
            }
        />
    );
}

