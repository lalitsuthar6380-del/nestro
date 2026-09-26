"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000/api/";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [orderStatus, setOrderStatus] = useState("");

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalOrders: 0,
        hasNextPage: false,
        hasPrevPage: false,
    });

    const [sort, setSort] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    // ==========================================
    // FETCH ORDERS
    // ==========================================

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            params.append("page", page);
            params.append("limit", limit);

            if (search.trim()) {
                params.append("search", search.trim());
            }

            if (paymentMethod) {
                params.append(
                    "payment_method",
                    paymentMethod
                );
            }

            if (paymentStatus) {
                params.append(
                    "payment_status",
                    paymentStatus
                );
            }

            if (orderStatus) {
                params.append(
                    "order_status",
                    orderStatus
                );
            }

            if (minPrice) {
                params.append(
                    "min_price",
                    minPrice
                );
            }

            if (maxPrice) {
                params.append(
                    "max_price",
                    maxPrice
                );
            }

            params.append("sort", sort);
            params.append("order", sortOrder);

            const response = await axios.get(
                `${API_BASE_URL}order?${params.toString()}`,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setOrders(
                    response.data.data || []
                );

                setPagination(
                    response.data.pagination || {
                        currentPage: 1,
                        totalPages: 1,
                        totalOrders: 0,
                        hasNextPage: false,
                        hasPrevPage: false,
                    }
                );
            }
        } catch (error) {
            console.error(
                "GET ORDERS ERROR:",
                error.response?.data ||
                    error.message
            );

            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FETCH ON CHANGE
    // ==========================================

    useEffect(() => {
        fetchOrders();
    }, [
        page,
        paymentMethod,
        paymentStatus,
        orderStatus,
        sort,
        sortOrder,
    ]);

    // ==========================================
    // SEARCH
    // ==========================================

    const handleSearch = (e) => {
        e.preventDefault();

        setPage(1);
        fetchOrders();
    };

    // ==========================================
    // RESET
    // ==========================================

    const handleReset = () => {
        setSearch("");
        setPaymentMethod("");
        setPaymentStatus("");
        setOrderStatus("");
        setMinPrice("");
        setMaxPrice("");
        setSort("createdAt");
        setSortOrder("desc");
        setPage(1);
    };

    // ==========================================
    // PRICE FILTER
    // ==========================================

    const handlePriceFilter = () => {
        if (
            minPrice &&
            maxPrice &&
            Number(minPrice) >
                Number(maxPrice)
        ) {
            alert(
                "Minimum price cannot be greater than maximum price"
            );

            return;
        }

        setPage(1);
        fetchOrders();
    };

    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-700";

            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "failed":
                return "bg-red-100 text-red-700";

            case "delivered":
                return "bg-green-100 text-green-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            case "shipped":
                return "bg-blue-100 text-blue-700";

            case "processing":
                return "bg-purple-100 text-purple-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Orders
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Manage and track all customer orders
                </p>
            </div>

            {/* ==========================================
                SEARCH + FILTERS
            ========================================== */}

            <div className="bg-white rounded-xl border p-4 mb-6">

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col lg:flex-row gap-3"
                >

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search name, mobile, city..."
                        className="flex-1 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-2.5 rounded-lg"
                    >
                        Search
                    </button>

                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">

                    {/* Payment Method */}

                    <select
                        value={paymentMethod}
                        onChange={(e) => {
                            setPaymentMethod(
                                e.target.value
                            );
                            setPage(1);
                        }}
                        className="border rounded-lg px-3 py-2.5"
                    >
                        <option value="">
                            All Payment Methods
                        </option>

                        <option value="cod">
                            Cash on Delivery
                        </option>

                        <option value="online">
                            Online
                        </option>
                    </select>

                    {/* Payment Status */}

                    <select
                        value={paymentStatus}
                        onChange={(e) => {
                            setPaymentStatus(
                                e.target.value
                            );
                            setPage(1);
                        }}
                        className="border rounded-lg px-3 py-2.5"
                    >
                        <option value="">
                            All Payment Status
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="paid">
                            Paid
                        </option>

                        <option value="failed">
                            Failed
                        </option>
                    </select>

                    {/* Order Status */}

                    <select
                        value={orderStatus}
                        onChange={(e) => {
                            setOrderStatus(
                                e.target.value
                            );
                            setPage(1);
                        }}
                        className="border rounded-lg px-3 py-2.5"
                    >
                        <option value="">
                            All Order Status
                        </option>

                        <option value="placed">
                            Placed
                        </option>

                        <option value="confirmed">
                            Confirmed
                        </option>

                        <option value="processing">
                            Processing
                        </option>

                        <option value="shipped">
                            Shipped
                        </option>

                        <option value="delivered">
                            Delivered
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>

                        <option value="return">
                            Return
                        </option>
                    </select>

                    {/* Sort */}

                    <select
                        value={`${sort}-${sortOrder}`}
                        onChange={(e) => {
                            const [
                                newSort,
                                newOrder,
                            ] =
                                e.target.value.split(
                                    "-"
                                );

                            setSort(newSort);
                            setSortOrder(
                                newOrder
                            );
                        }}
                        className="border rounded-lg px-3 py-2.5"
                    >
                        <option value="createdAt-desc">
                            Newest First
                        </option>

                        <option value="createdAt-asc">
                            Oldest First
                        </option>

                        <option value="total_amount-desc">
                            Highest Amount
                        </option>

                        <option value="total_amount-asc">
                            Lowest Amount
                        </option>
                    </select>
                </div>

                {/* Price */}

                <div className="flex flex-col sm:flex-row gap-3 mt-4">

                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(
                                e.target.value
                            )
                        }
                        placeholder="Min price"
                        className="border rounded-lg px-3 py-2.5"
                    />

                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(
                                e.target.value
                            )
                        }
                        placeholder="Max price"
                        className="border rounded-lg px-3 py-2.5"
                    />

                    <button
                        onClick={
                            handlePriceFilter
                        }
                        className="bg-gray-900 text-white px-5 py-2.5 rounded-lg"
                    >
                        Apply Price
                    </button>

                    <button
                        onClick={handleReset}
                        className="border px-5 py-2.5 rounded-lg"
                    >
                        Reset
                    </button>

                </div>
            </div>

            {/* ==========================================
                ORDER COUNT
            ========================================== */}

            <div className="mb-4 text-sm text-gray-500">
                Total Orders:{" "}
                <span className="font-semibold text-gray-900">
                    {pagination.totalOrders}
                </span>
            </div>

            {/* ==========================================
                TABLE
            ========================================== */}

            <div className="bg-white rounded-xl border overflow-hidden">

                {loading ? (
                    <div className="p-10 text-center text-gray-500">
                        Loading orders...
                    </div>
                ) : orders.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No orders found
                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-100">

                                <tr>
                                    <th className="text-left p-4">
                                        Order
                                    </th>

                                    <th className="text-left p-4">
                                        Customer
                                    </th>

                                    <th className="text-left p-4">
                                        Amount
                                    </th>

                                    <th className="text-left p-4">
                                        Payment
                                    </th>

                                    <th className="text-left p-4">
                                        Status
                                    </th>

                                    <th className="text-left p-4">
                                        Date
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {orders.map(
                                    (order) => (
                                        <tr
                                            key={
                                                order._id
                                            }
                                            className="border-t hover:bg-gray-50"
                                        >

                                            {/* Order */}

                                            <td className="p-4">

                                                <div className="font-medium">
                                                    #
                                                    {order._id
                                                        ?.toString()
                                                        .slice(
                                                            -8
                                                        )}
                                                </div>

                                                <div className="text-xs text-gray-400 mt-1">
                                                    {
                                                        order.items
                                                            ?.length
                                                    }{" "}
                                                    item(s)
                                                </div>

                                            </td>

                                            {/* Customer */}

                                            <td className="p-4">

                                                <div className="font-medium">
                                                    {
                                                        order
                                                            .user_id
                                                            ?.name
                                                    }
                                                </div>

                                                <div className="text-xs text-gray-500">
                                                    {
                                                        order
                                                            .user_id
                                                            ?.email
                                                    }
                                                </div>

                                                <div className="text-xs text-gray-500">
                                                    {
                                                        order
                                                            .shippingAddress
                                                            ?.mobile
                                                    }
                                                </div>

                                            </td>

                                            {/* Amount */}

                                            <td className="p-4 font-semibold">
                                                ₹
                                                {Number(
                                                    order.total_amount ||
                                                        0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>

                                            {/* Payment */}

                                            <td className="p-4">

                                                <div className="capitalize">
                                                    {
                                                        order.payment_method
                                                    }
                                                </div>

                                                <span
                                                    className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${getStatusClass(
                                                        order.payment_status
                                                    )}`}
                                                >
                                                    {
                                                        order.payment_status
                                                    }
                                                </span>

                                            </td>

                                            {/* Order Status */}

                                            <td className="p-4">

                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusClass(
                                                        order.order_status
                                                    )}`}
                                                >
                                                    {
                                                        order.order_status
                                                    }
                                                </span>

                                            </td>

                                            {/* Date */}

                                            <td className="p-4 text-gray-500">

                                                {order.createdAt
                                                    ? new Date(
                                                          order.createdAt
                                                      ).toLocaleDateString(
                                                          "en-IN"
                                                      )
                                                    : "-"}

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* ==========================================
                PAGINATION
            ========================================== */}

            {!loading &&
                orders.length > 0 && (
                    <div className="flex items-center justify-between mt-5">

                        <button
                            disabled={
                                !pagination.hasPrevPage
                            }
                            onClick={() =>
                                setPage(
                                    (prev) =>
                                        prev - 1
                                )
                            }
                            className="border px-4 py-2 rounded-lg disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <div className="text-sm">
                            Page{" "}
                            <span className="font-semibold">
                                {
                                    pagination.currentPage
                                }
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold">
                                {
                                    pagination.totalPages
                                }
                            </span>
                        </div>

                        <button
                            disabled={
                                !pagination.hasNextPage
                            }
                            onClick={() =>
                                setPage(
                                    (prev) =>
                                        prev + 1
                                )
                            }
                            className="border px-4 py-2 rounded-lg disabled:opacity-40"
                        >
                            Next
                        </button>

                    </div>
                )}

        </div>
    );
}
