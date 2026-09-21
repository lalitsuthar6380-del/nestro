
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =========================
    // USER BASIC DETAILS
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    mobile: {
      type: String,
      default: null,
      trim: true,
    },

    // =========================
    // USER ROLE
    // =========================

    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },

    // =========================
    // USER ADDRESSES
    // =========================

    addresses: {
      type: [
        {
          fullName: {
            type: String,
            required: true,
            trim: true,
          },

          mobile: {
            type: String,
            required: true,
            trim: true,
          },

          pincode: {
            type: String,
            required: true,
            trim: true,
          },

          addressLine: {
            type: String,
            required: true,
            trim: true,
          },

          city: {
            type: String,
            required: true,
            trim: true,
          },

          state: {
            type: String,
            required: true,
            trim: true,
          },

          country: {
            type: String,
            default: "India",
            trim: true,
          },

          isDefault: {
            type: Boolean,
            default: false,
          },
        },
      ],

      default: [],
    },

    // =========================
    // CONTACT MESSAGES
    // =========================

    contacts: {
      type: [
        {
          fullName: {
            type: String,
            required: true,
            trim: true,
          },

          email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
          },

          phone: {
            type: String,
            default: null,
            trim: true,
          },

          subject: {
            type: String,
            required: true,
            enum: [
              "Order Support",
              "Product Question",
              "Returns & Refunds",
              "Partnership",
              "Other",
            ],
          },

          message: {
            type: String,
            required: true,
            trim: true,
          },

          status: {
            type: String,
            enum: ["unread", "read"],
            default: "unread",
          },

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      default: [],
    },

    // =========================
    // OTP & VERIFICATION
    // =========================

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: Number,
    },

    otpExpire: {
      type: Date,
    },

    // =========================
    // ACCOUNT STATUS
    // =========================

    status: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);


// =========================
// EXPORT MODEL
// =========================

const UserModel = mongoose.model("User", userSchema);

export default UserModel;