
import express from "express";

const router = express.Router();

// =========================
// CONTROLLER IMPORTS
// =========================

import {
  register,
  login,
  otpVerify,
  getMe,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,

  // Contact Message
  createContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
} from "../controllers/user.controller.js";

// =========================
// MIDDLEWARE IMPORTS
// =========================

import {
  protect,
  authorized,
} from "../middleware/auth.js";


// =========================
// AUTH ROUTES
// =========================

// Register
router.post(
  "/register",
  register
);

// Login
router.post(
  "/login",
  login
);

// Verify OTP
router.post(
  "/verify-otp",
  otpVerify
);

// Get logged-in user
router.get(
  "/get-me",
  protect,
  getMe
);

// Logout
router.post(
  "/logout",
  protect,
  logout
);


// =========================
// PROFILE ROUTES
// =========================

// Get Profile
router.get(
  "/profile",
  protect,
  getProfile
);

// Update Profile
router.put(
  "/update-profile",
  protect,
  updateProfile
);


// =========================
// PASSWORD ROUTES
// =========================

// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);


// =========================
// ADDRESS ROUTES
// =========================

// Add Address
router.post(
  "/add-address",
  protect,
  addAddress
);

// Update Address
router.put(
  "/update-address/:addressId",
  protect,
  updateAddress
);

// Delete Address
router.delete(
  "/delete-address/:addressId",
  protect,
  deleteAddress
);

// Set Default Address
router.patch(
  "/set-default-address/:addressId",
  protect,
  setDefaultAddress
);


// =========================
// CONTACT MESSAGE ROUTES
// =========================

// Logged-in user submit contact message
router.post(
  "/contact",
  protect,
  createContactMessage
);


// =========================
// ADMIN CONTACT ROUTES
// =========================

// Get all contact messages
router.get(
  "/admin/contact-messages",
  protect,
  authorized("admin", "superAdmin"),
  getAllContactMessages
);


// Get single contact message
router.get(
  "/admin/contact-messages/:userId/:contactId",
  protect,
  authorized("admin", "superAdmin"),
  getSingleContactMessage
);


// Update contact message status
router.patch(
  "/admin/contact-messages/:userId/:contactId/status",
  protect,
  authorized("admin", "superAdmin"),
  updateContactMessageStatus
);


// Delete contact message
router.delete(
  "/admin/contact-messages/:userId/:contactId",
  protect,
  authorized("admin", "superAdmin"),
  deleteContactMessage
);


// =========================
// EXPORT ROUTER
// =========================

export default router;