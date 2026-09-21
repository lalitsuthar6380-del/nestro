import express from "express";

const router = express.Router();

import {
    Orderplace,
    getOrders,
    myOrders,
    verifyPayment,
    getOrderById,
} from "../controllers/order.controller.js";

import {
    protect,
    authorized,
} from "../middleware/auth.js";

// ==========================================
// PLACE ORDER
// ==========================================

router.post(
    "/place",
    protect,
    Orderplace
);

// ==========================================
// GET ALL ORDERS - ADMIN
// ==========================================

router.get(
    "/",
    protect,
    authorized("admin", "superAdmin"),
    getOrders
);

// ==========================================
// MY ORDERS
// ==========================================

router.get(
    "/my-orders",
    protect,
    myOrders
);

// ==========================================
// GET SINGLE ORDER
// ==========================================

router.get(
    "/:id",
    protect,
    getOrderById
);

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

router.post(
    "/verify",
    protect,
    verifyPayment
);

export default router;