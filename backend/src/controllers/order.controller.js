import cartModel from "../models/cart.model.js";
import OrderModel from "../models/order.model.js";
import mongoose from "mongoose";

import {
    sendBadRequest,
    sendNotFound,
    sendServerError,
} from "../utils/response.js";

import Razorpay from "razorpay";
import crypto from "crypto";

// ==========================================
// RAZORPAY
// ==========================================

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================================
// PLACE ORDER
// ==========================================

export const Orderplace = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            shippingAddress,
            payment_method,
        } = req.body;

        // Validate payment method
        if (!payment_method) {
            return sendBadRequest(
                res,
                "Payment method is required"
            );
        }

        // Validate shipping address
        if (!shippingAddress) {
            return sendBadRequest(
                res,
                "Shipping address is required"
            );
        }

        // Find cart
        const cart = await cartModel
            .findOne({ userId })
            .populate(
                "items.productId",
                "_id title slug price salePrice thumbnail"
            );

        if (!cart) {
            return sendNotFound(
                res,
                "Cart not found"
            );
        }

        // Empty cart
        if (
            !cart.items ||
            cart.items.length === 0
        ) {
            return sendBadRequest(
                res,
                "Cart is empty"
            );
        }

        // Prepare items
        const items = cart.items.map((item) => {
            if (!item.productId) {
                throw new Error(
                    "Product not found in cart"
                );
            }

            const product = item.productId;

            const productId = product._id;

            const price =
                product.salePrice ??
                product.price;

            if (
                price === undefined ||
                price === null
            ) {
                throw new Error(
                    `Price not found for product ${productId}`
                );
            }

            const qty = item.qty || 1;

            const itemTotal = price * qty;

            console.log(
                "--------------------------------------"
            );

            console.log(
                "PRODUCT:",
                product.title
            );

            console.log(
                "PRODUCT ID:",
                productId.toString()
            );

            console.log(
                "PRICE:",
                price
            );

            console.log(
                "QTY:",
                qty
            );

            console.log(
                "ITEM TOTAL:",
                itemTotal
            );

            console.log(
                "--------------------------------------"
            );

            return {
                product_id: productId,
                qty,
                price,
                total: itemTotal,
            };
        });

        // Calculate total
        const total = items.reduce(
            (sum, item) =>
                sum + item.total,
            0
        );

        console.log(
            "======================================"
        );

        console.log(
            "FINAL TOTAL:",
            total
        );

        console.log(
            "RAZORPAY AMOUNT:",
            Math.round(total * 100)
        );

        console.log(
            "======================================"
        );

        // ==========================================
        // CREATE MONGODB ORDER
        // ==========================================

        const createdOrder =
            await OrderModel.create({
                user_id: userId,

                items,

                shippingAddress,

                payment_method,

                subtotal: total,

                total_amount: total,

                payment_status:
                    payment_method === "cod"
                        ? "pending"
                        : "pending",

                order_status: "placed",
            });

        // ==========================================
        // COD
        // ==========================================

        if (payment_method === "cod") {
            await cartModel.findOneAndUpdate(
                { userId },
                {
                    $set: {
                        items: [],
                    },
                }
            );

            return res.status(201).json({
                success: true,

                message:
                    "Order created successfully",

                orderId:
                    createdOrder._id,
            });
        }

        // ==========================================
        // ONLINE PAYMENT
        // ==========================================

        if (payment_method === "online") {
            const options = {
                amount:
                    Math.round(total * 100),

                currency: "INR",

                receipt:
                    createdOrder._id.toString(),
            };

            console.log(
                "RAZORPAY OPTIONS:",
                options
            );

            const razorpayOrder =
                await instance.orders.create(
                    options
                );

            console.log(
                "RAZORPAY ORDER:",
                razorpayOrder
            );

            // Save Razorpay order ID
            createdOrder.razorpay_order_id =
                razorpayOrder.id;

            await createdOrder.save();

            return res.status(200).json({
                success: true,

                message:
                    "Razorpay order created successfully",

                orderId:
                    razorpayOrder.id,

                mongoOrderId:
                    createdOrder._id,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,
            });
        }

        return sendBadRequest(
            res,
            "Invalid payment method"
        );

    } catch (error) {
        console.error(
            "ORDER PLACE ERROR:",
            error
        );

        return sendServerError(res);
    }
};

// ==========================================
// GET ALL ORDERS - ADMIN
// ==========================================

export const getOrders = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            payment_method,
            payment_status,
            order_status,
            user_id,
            min_price,
            max_price,
            sort = "createdAt",
            order = "desc",
        } = req.query;

        // Pagination
        const pageNumber = Math.max(
            parseInt(page) || 1,
            1
        );

        const limitNumber = Math.min(
            Math.max(parseInt(limit) || 10, 1),
            100
        );

        const skip =
            (pageNumber - 1) *
            limitNumber;

        // ==========================================
        // FILTER
        // ==========================================

        const filter = {};

        // Payment method
        if (
            payment_method &&
            ["cod", "online"].includes(
                payment_method
            )
        ) {
            filter.payment_method =
                payment_method;
        }

        // Payment status
        if (
            payment_status &&
            ["pending", "paid", "failed"].includes(
                payment_status
            )
        ) {
            filter.payment_status =
                payment_status;
        }

        // Order status
        if (
            order_status &&
            [
                "pending",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
                "return",
                "placed",
            ].includes(order_status)
        ) {
            filter.order_status =
                order_status;
        }

        // User ID
        if (user_id) {
            filter.user_id = user_id;
        }

        // Price filter
        if (min_price || max_price) {
            filter.total_amount = {};

            if (min_price) {
                filter.total_amount.$gte =
                    Number(min_price);
            }

            if (max_price) {
                filter.total_amount.$lte =
                    Number(max_price);
            }
        }

        // ==========================================
        // SEARCH
        // ==========================================

        if (search.trim()) {
            filter.$or = [
                {
                    "shippingAddress.fullName": {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },

                {
                    "shippingAddress.mobile": {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },

                {
                    "shippingAddress.city": {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },

                {
                    "shippingAddress.pincode": {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },

                {
                    payment_method: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },

                {
                    payment_status: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },

                {
                    order_status: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
            ];
        }

        // ==========================================
        // SORT
        // ==========================================

        const allowedSortFields = [
            "createdAt",
            "updatedAt",
            "total_amount",
            "subtotal",
            "payment_status",
            "order_status",
        ];

        const sortField =
            allowedSortFields.includes(sort)
                ? sort
                : "createdAt";

        const sortOrder =
            order.toLowerCase() === "asc"
                ? 1
                : -1;

        // ==========================================
        // GET ORDERS + COUNT
        // ==========================================

        const [
            orders,
            totalOrders,
        ] = await Promise.all([
            OrderModel.find(filter)
                .populate(
                    "user_id",
                    "name email mobile role"
                )
                .populate(
                    "items.product_id",
                    "_id title slug price salePrice thumbnail"
                )
                .sort({
                    [sortField]: sortOrder,
                })
                .skip(skip)
                .limit(limitNumber)
                .lean(),

            OrderModel.countDocuments(
                filter
            ),
        ]);

        const totalPages =
            Math.ceil(
                totalOrders /
                limitNumber
            );

        return res.status(200).json({
            success: true,

            message:
                "Orders fetched successfully",

            data: orders,

            pagination: {
                currentPage:
                    pageNumber,

                limit:
                    limitNumber,

                totalOrders,

                totalPages,

                hasNextPage:
                    pageNumber <
                    totalPages,

                hasPrevPage:
                    pageNumber > 1,
            },
        });

    } catch (error) {
        console.error(
            "GET ORDERS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                "Failed to fetch orders",

            error:
                error.message,
        });
    }
};

// ==========================================
// MY ORDERS
// ==========================================

export const myOrders = async (
    req,
    res
) => {
    try {
        const userId =
            req.user._id;

        const limit =
            req.query.limit
                ? parseInt(
                    req.query.limit
                )
                : 3;

        const page =
            req.query.page
                ? parseInt(
                    req.query.page
                )
                : 0;

        const skip =
            page * limit;

        const orders =
            await OrderModel.find({
                user_id: userId,
            })
                .populate(
                    "items.product_id",
                    "_id title slug price salePrice thumbnail"
                )
                .limit(limit)
                .skip(skip)
                .sort({
                    createdAt: -1,
                });

        const total =
            await OrderModel.countDocuments({
                user_id: userId,
            });

        return res.status(200).json({
            success: true,

            message:
                "My orders found",

            data: orders,

            total,

            pages:
                Math.ceil(
                    total / limit
                ),

            limit,
        });

    } catch (error) {
        console.error(
            "MY ORDERS ERROR:",
            error
        );

        return sendServerError(res);
    }
};

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

export const verifyPayment = async (
    req,
    res
) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // Validate payment details
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,

                message:
                    "Payment details are required",
            });
        }

        // ==========================================
        // CREATE SIGNATURE BODY
        // ==========================================

        const body =
            `${razorpay_order_id}|${razorpay_payment_id}`;

        // ==========================================
        // GENERATE EXPECTED SIGNATURE
        // ==========================================

        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");

        // ==========================================
        // VERIFY SIGNATURE
        // ==========================================

        if (
            expectedSignature !==
            razorpay_signature
        ) {
            return res.status(400).json({
                success: false,

                message:
                    "Invalid payment signature",
            });
        }

        // ==========================================
        // FIND MONGODB ORDER
        // ==========================================

        const mongoOrder =
            await OrderModel.findOne({
                razorpay_order_id,
            });

        if (!mongoOrder) {
            return res.status(404).json({
                success: false,

                message:
                    "Order not found",
            });
        }

        // ==========================================
        // UPDATE PAYMENT
        // ==========================================

        mongoOrder.payment_status =
            "paid";

        mongoOrder.razorpay_payment_id =
            razorpay_payment_id;

        mongoOrder.razorpay_order_id =
            razorpay_order_id;

        mongoOrder.paidAt =
            new Date();

        mongoOrder.order_status =
            "confirmed";

        await mongoOrder.save();

        // ==========================================
        // EMPTY CART
        // ==========================================

        await cartModel.findOneAndUpdate(
            {
                userId:
                    mongoOrder.user_id,
            },
            {
                $set: {
                    items: [],
                },
            }
        );

        console.log(
            "PAYMENT SIGNATURE:",
            razorpay_signature
        );

        return res.status(200).json({
            success: true,

            message:
                "Payment verified successfully",

            paymentId:
                razorpay_payment_id,

            orderId:
                razorpay_order_id,

            mongoOrderId:
                mongoOrder._id,
        });

    } catch (error) {
        console.error(
            "VERIFY PAYMENT ERROR:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                "Payment verification failed",

            error:
                error.message,
        });
    }
};

// ==========================================
// GET SINGLE ORDER BY ID
// ==========================================

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendBadRequest(res, "Invalid order ID");
        }

        const order = await OrderModel.findOne({
            _id: id,
            user_id: req.user._id,
        })
            .populate(
                "items.product_id",
                "_id title slug price salePrice thumbnail"
            )
            .lean();

        if (!order) {
            return sendNotFound(res, "Order not found");
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    } catch (error) {
        console.error("GET ORDER BY ID ERROR:", error);

        return sendServerError(res);
    }
};