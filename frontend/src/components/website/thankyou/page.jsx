"use client";

import React from "react";
import {
    Check,
    Package,
    Calendar,
    Truck,
    CreditCard,
    Mail,
    Headphones,
    Phone,
    HelpCircle,
    Heart,
    ShoppingCart,
    ArrowRight,
} from "lucide-react";

// ==========================================
// STATUS PILL
// ==========================================

function StatusPill({ status }) {
    const normalized = (status || "").toLowerCase();

    const styles = {
        pending: "bg-amber-100 text-amber-700",
        paid: "bg-emerald-100 text-emerald-700",
        failed: "bg-rose-100 text-rose-700",
    };

    const className =
        styles[normalized] ||
        "bg-stone-100 text-stone-700";

    const label = status
        ? status.charAt(0).toUpperCase() +
          status.slice(1)
        : "Unknown";

    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${className}`}
        >
            {label}
        </span>
    );
}

// ==========================================
// INFO CARD
// ==========================================

function InfoCard({
    icon: Icon,
    label,
    primary,
    secondary,
}) {
    return (
        <div className="flex flex-col items-center gap-1 px-2 py-4 text-center sm:py-2">
            <Icon
                className="mb-1 h-6 w-6 text-stone-800"
                strokeWidth={1.75}
            />

            <span className="text-xs text-stone-500 sm:text-sm">
                {label}
            </span>

            <span className="max-w-full break-words text-sm font-semibold text-stone-900 sm:text-base">
                {primary || "-"}
            </span>

            {secondary ? (
                <span className="text-xs text-stone-400">
                    {secondary}
                </span>
            ) : null}
        </div>
    );
}

// ==========================================
// TRACKING STEPS
// ==========================================

const TRACKING_STEPS = [
    {
        key: "placed",
        label: "Order Placed",
        sub: "Your order has been placed",
    },
    {
        key: "confirmed",
        label: "Confirmed",
        sub: "Your order has been confirmed",
    },
    {
        key: "processing",
        label: "Processing",
        sub: "We're preparing your items",
    },
    {
        key: "shipped",
        label: "Shipped",
        sub: "Your order is on the way",
    },
    {
        key: "delivered",
        label: "Delivered",
        sub: "Enjoy your purchase",
    },
];

// ==========================================
// TRACKING TIMELINE
// ==========================================

function TrackingTimeline({
    status,
    placedAt,
}) {
    let currentIndex =
        TRACKING_STEPS.findIndex(
            (step) => step.key === status
        );

    if (currentIndex === -1) {
        currentIndex = 0;
    }

    return (
        <div className="relative">

            {/* ================================
                MOBILE
            ================================= */}

            <ol className="flex flex-col gap-6 sm:hidden">
                {TRACKING_STEPS.map(
                    (step, index) => {
                        const done =
                            index <= currentIndex;

                        const isLast =
                            index ===
                            TRACKING_STEPS.length - 1;

                        return (
                            <li
                                key={step.key}
                                className="relative flex gap-4 pl-1"
                            >
                                {!isLast && (
                                    <span
                                        className={`absolute left-[15px] top-8 h-full w-0.5 ${
                                            index <
                                            currentIndex
                                                ? "bg-[#7a4a2b]"
                                                : "bg-stone-200"
                                        }`}
                                    />
                                )}

                                <span
                                    className={`z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                                        done
                                            ? "border-[#7a4a2b] bg-[#7a4a2b] text-white"
                                            : "border-stone-200 bg-white text-stone-300"
                                    }`}
                                >
                                    {done ? (
                                        <Check className="h-4 w-4" />
                                    ) : null}
                                </span>

                                <div className="pt-1">
                                    <p
                                        className={`text-sm font-semibold ${
                                            done
                                                ? "text-stone-900"
                                                : "text-stone-400"
                                        }`}
                                    >
                                        {step.label}
                                    </p>

                                    <p className="text-xs text-stone-400">
                                        {index === 0 &&
                                        placedAt
                                            ? placedAt
                                            : step.sub}
                                    </p>
                                </div>
                            </li>
                        );
                    }
                )}
            </ol>

            {/* ================================
                DESKTOP
            ================================= */}

            <ol className="hidden sm:flex sm:items-start sm:justify-between">
                {TRACKING_STEPS.map(
                    (step, index) => {
                        const done =
                            index <= currentIndex;

                        const isLast =
                            index ===
                            TRACKING_STEPS.length - 1;

                        return (
                            <li
                                key={step.key}
                                className="relative flex flex-1 flex-col items-center text-center"
                            >
                                {!isLast && (
                                    <span
                                        className={`absolute left-1/2 top-[19px] h-0.5 w-full ${
                                            index <
                                            currentIndex
                                                ? "bg-[#7a4a2b]"
                                                : "bg-stone-200"
                                        }`}
                                    />
                                )}

                                <span
                                    className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                                        done
                                            ? "border-[#7a4a2b] bg-[#7a4a2b] text-white"
                                            : "border-stone-200 bg-white text-stone-300"
                                    }`}
                                >
                                    {done ? (
                                        <Check className="h-5 w-5" />
                                    ) : null}
                                </span>

                                <p
                                    className={`mt-3 text-sm font-semibold md:text-base ${
                                        done
                                            ? "text-stone-900"
                                            : "text-stone-400"
                                    }`}
                                >
                                    {step.label}
                                </p>

                                <p className="mt-1 max-w-[9rem] text-xs text-stone-400">
                                    {index === 0 &&
                                    placedAt
                                        ? placedAt
                                        : step.sub}
                                </p>
                            </li>
                        );
                    }
                )}
            </ol>
        </div>
    );
}

// ==========================================
// PRODUCT CARD
// ==========================================

function ProductCard({
    item,
    onAddToCart,
}) {
    const product = item?.product_id;

    const title =
        product?.title || "Product";

    const image =
        product?.thumbnail || "";

    const price =
        item?.price ??
        product?.salePrice ??
        product?.price ??
        0;

    const qty = item?.qty || 1;

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white">

            {/* IMAGE */}

            <div className="relative aspect-square w-full bg-stone-100">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-stone-300">
                        <Package className="h-10 w-10" />
                    </div>
                )}

                <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm"
                >
                    <Heart className="h-4 w-4 text-stone-700" />
                </button>
            </div>

            {/* CONTENT */}

            <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="truncate text-sm text-stone-700 sm:text-[15px]">
                    {title}
                </p>

                <p className="text-sm font-semibold text-stone-900 sm:text-base">
                    ₹
                    {Number(
                        price
                    ).toLocaleString("en-IN")}
                </p>

                <p className="text-xs text-stone-400">
                    Qty: {qty}
                </p>

                {onAddToCart ? (
                    <button
                        type="button"
                        onClick={() =>
                            onAddToCart(item)
                        }
                        className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-stone-300 py-2 text-xs font-medium text-stone-800 transition-colors hover:bg-stone-50 sm:text-sm"
                    >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Add to Cart
                    </button>
                ) : null}
            </div>
        </div>
    );
}

// ==========================================
// THANK YOU COMPONENT
// ==========================================

export default function ThankYouComponent({
    order,
    onViewOrderDetails,
    onContinueShopping,
    onAddToCart,
}) {
    // ==========================================
    // BASIC DATA
    // ==========================================

    const customerName =
        order?.shippingAddress?.fullName ||
        "there";

    const mongoOrderId =
        order?._id || "";

    const shortOrderId =
        mongoOrderId
            ? `#${String(
                  mongoOrderId
              )
                  .slice(-8)
                  .toUpperCase()}`
            : "-";

    // ==========================================
    // DATE
    // ==========================================

    const placedDate = order?.createdAt
        ? new Date(
              order.createdAt
          ).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "-";

    // ==========================================
    // PAYMENT
    // ==========================================

    const paymentMethod =
        order?.payment_method === "cod"
            ? "Cash on Delivery"
            : "Online Payment";

    const paymentNote =
        order?.payment_method === "cod"
            ? "Pay at your doorstep"
            : order?.payment_status === "paid"
            ? "Payment completed"
            : "Online payment";

    // ==========================================
    // DELIVERY
    // ==========================================

    const deliveryMethod =
        order?.payment_method === "cod"
            ? "Cash on Delivery"
            : "Online Payment";

    const deliveryNote =
        order?.payment_method === "cod"
            ? "Pay at your doorstep"
            : "Payment completed online";

    // ==========================================
    // ESTIMATED DELIVERY
    // ==========================================

    const getEstimatedDelivery = () => {
        if (!order?.createdAt) {
            return "-";
        }

        const date = new Date(
            order.createdAt
        );

        date.setDate(
            date.getDate() + 5
        );

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    const estimatedDelivery =
        getEstimatedDelivery();

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="w-full bg-[#f7f3ec]">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

                {/* ==========================================
                    SUCCESS HEADER
                ========================================== */}

                <div className="relative flex flex-col items-center text-center">

                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 sm:h-16 sm:w-16">
                        <Check
                            className="h-7 w-7 text-white sm:h-8 sm:w-8"
                            strokeWidth={3}
                        />
                    </span>

                    <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl md:text-4xl">
                        Thank You,{" "}
                        {customerName}!
                    </h1>

                    <p className="mt-3 max-w-md text-sm text-stone-500 sm:text-base">
                        Your order has been placed successfully.
                        We appreciate your trust in Nestro.
                    </p>
                </div>

                {/* ==========================================
                    ORDER INFORMATION
                ========================================== */}

                <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-4 sm:mt-10 sm:p-6">

                    <div className="grid grid-cols-2 divide-y divide-stone-100 sm:grid-cols-4 sm:divide-x sm:divide-y-0">

                        {/* ORDER ID */}

                        <div className="border-b border-stone-100 pb-4 sm:border-b-0 sm:pb-0">
                            <InfoCard
                                icon={Package}
                                label="Order ID"
                                primary={
                                    shortOrderId
                                }
                                secondary={
                                    placedDate
                                }
                            />
                        </div>

                        {/* DELIVERY */}

                        <div className="border-b border-stone-100 pb-4 sm:border-b-0 sm:pb-0">
                            <InfoCard
                                icon={Calendar}
                                label="Estimated Delivery"
                                primary={
                                    estimatedDelivery
                                }
                                secondary="3 - 5 Business Days"
                            />
                        </div>

                        {/* DELIVERY METHOD */}

                        <div className="pt-4 sm:pt-0">
                            <InfoCard
                                icon={Truck}
                                label="Delivery Method"
                                primary={
                                    deliveryMethod
                                }
                                secondary={
                                    deliveryNote
                                }
                            />
                        </div>

                        {/* PAYMENT */}

                        <div className="pt-4 sm:pt-0">
                            <div className="flex flex-col items-center gap-1 px-2 py-4 text-center sm:py-2">

                                <CreditCard
                                    className="mb-1 h-6 w-6 text-stone-800"
                                    strokeWidth={1.75}
                                />

                                <span className="text-xs text-stone-500 sm:text-sm">
                                    Payment Status
                                </span>

                                <StatusPill
                                    status={
                                        order?.payment_status
                                    }
                                />

                                <span className="text-xs text-stone-400">
                                    {paymentMethod}
                                </span>

                                <span className="text-xs text-stone-400">
                                    {paymentNote}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ==========================================
                    ADDRESS
                ========================================== */}

                <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">

                    <div className="flex items-start gap-3">

                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#f0e6da]">
                            <Package className="h-5 w-5 text-[#5c3a24]" />
                        </span>

                        <div>
                            <h2 className="text-base font-semibold text-stone-900 sm:text-lg">
                                Delivery Address
                            </h2>

                            <p className="mt-1 text-sm font-medium text-stone-700">
                                {
                                    order?.shippingAddress
                                        ?.fullName
                                }
                            </p>

                            <p className="mt-1 text-sm leading-6 text-stone-500">
                                {
                                    order?.shippingAddress
                                        ?.addressLine
                                }
                                <br />

                                {
                                    order?.shippingAddress
                                        ?.city
                                }
                                ,{" "}
                                {
                                    order?.shippingAddress
                                        ?.state
                                }{" "}
                                -{" "}
                                {
                                    order?.shippingAddress
                                        ?.pincode
                                }

                                <br />

                                {
                                    order?.shippingAddress
                                        ?.country
                                }
                            </p>

                            <p className="mt-2 text-sm text-stone-500">
                                Mobile:{" "}
                                {
                                    order?.shippingAddress
                                        ?.mobile
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* ==========================================
                    ACTIONS
                ========================================== */}

                <div className="mt-6 flex flex-col items-center gap-4 text-center">

                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                onViewOrderDetails?.(
                                    mongoOrderId
                                )
                            }
                            className="flex items-center justify-center gap-2 rounded-lg bg-[#5c3a24] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a2f1d] sm:text-base"
                        >
                            View Order Details

                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={
                                onContinueShopping
                            }
                            className="rounded-lg border border-stone-300 px-6 py-3 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-50 sm:text-base"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>

                {/* ==========================================
                    TRACKING + HELP
                ========================================== */}

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">

                    {/* TRACKING */}

                    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">

                        <div className="mb-6 flex items-start gap-3 sm:mb-8">

                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#f0e6da]">
                                <Truck className="h-5 w-5 text-[#5c3a24]" />
                            </span>

                            <div>
                                <h2 className="text-base font-semibold text-stone-900 sm:text-lg">
                                    Track Your Order
                                </h2>

                                <p className="text-xs text-stone-500 sm:text-sm">
                                    We'll keep you updated at every step.
                                </p>
                            </div>
                        </div>

                        <TrackingTimeline
                            status={
                                order?.order_status
                            }
                            placedAt={
                                placedDate
                            }
                        />
                    </div>

                    {/* HELP */}

                    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">

                        <h2 className="text-base font-semibold text-stone-900 sm:text-lg">
                            Need Help?
                        </h2>

                        <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                            Our support team is always here for you.
                        </p>

                        <a
                            href="mailto:support@nestro.com"
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#5c3a24] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4a2f1d] sm:w-auto"
                        >
                            <Headphones className="h-4 w-4" />
                            Contact Support
                        </a>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">

                            <a
                                href="mailto:support@nestro.com"
                                className="flex items-center gap-2 hover:text-stone-900"
                            >
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                support@nestro.com
                            </a>

                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-2 hover:text-stone-900"
                            >
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                +91 98765 43210
                            </a>

                            <a
                                href="/faq"
                                className="flex items-center gap-2 hover:text-stone-900"
                            >
                                <HelpCircle className="h-4 w-4 flex-shrink-0" />
                                FAQ & Help Center
                            </a>
                        </div>
                    </div>
                </div>

                {/* ==========================================
                    ORDERED PRODUCTS
                ========================================== */}

                {order?.items?.length > 0 ? (
                    <div className="mt-10">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">
                                Your Ordered Products
                            </h2>

                            <p className="text-xs text-stone-500 sm:text-sm">
                                Products included in your order.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                            {order.items.map(
                                (item, index) => (
                                    <ProductCard
                                        key={
                                            item
                                                ?.product_id
                                                ?._id ||
                                            index
                                        }
                                        item={item}
                                        onAddToCart={
                                            onAddToCart
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>
                ) : null}

                {/* ==========================================
                    TOTAL
                ========================================== */}

                <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">

                    <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                        <span className="text-sm text-stone-500">
                            Subtotal
                        </span>

                        <span className="font-medium text-stone-900">
                            ₹
                            {Number(
                                order?.subtotal ||
                                    0
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-stone-100 py-4">
                        <span className="text-sm text-stone-500">
                            Shipping
                        </span>

                        <span className="font-medium text-stone-900">
                            {Number(
                                order?.shipping_charge ||
                                    0
                            ) === 0
                                ? "FREE"
                                : `₹${Number(
                                      order.shipping_charge
                                  ).toLocaleString(
                                      "en-IN"
                                  )}`}
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <span className="text-base font-semibold text-stone-900">
                            Total Amount
                        </span>

                        <span className="text-lg font-bold text-[#5c3a24]">
                            ₹
                            {Number(
                                order?.total_amount ||
                                    0
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

