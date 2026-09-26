"use client";

import { useState } from "react";
import { Tag, Lock } from "lucide-react";

export default function CheckoutActions({
  onPlaceOrder,
}) {
  const [coupon, setCoupon] = useState("");

  return (
    <section className="bg-white rounded-2xl p-6 space-y-6">

      {/* COUPON */}

      <div>

        <div className="flex items-center gap-3 mb-4">

          <div className="h-9 w-9 rounded-full bg-[#3C2E22] text-white flex items-center justify-center">
            <Tag
              size={16}
              strokeWidth={1.75}
            />
          </div>

          <h2 className="font-semibold text-stone-900">
            Apply Coupon Code
          </h2>

        </div>

        <div className="flex items-center gap-3">

          <input
            type="text"
            value={coupon}
            onChange={(e) =>
              setCoupon(e.target.value)
            }
            placeholder="Enter coupon code"
            className="flex-1 rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />

          <button
            type="button"
            className="bg-[#3C2E22] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#2e2319] transition-colors shrink-0"
          >
            Apply
          </button>

        </div>

      </div>

      {/* PLACE ORDER */}

      <div>

        <button
          type="button"
          onClick={onPlaceOrder}
          className="w-full flex items-center justify-center gap-2 bg-[#3C2E22] text-white font-medium py-3.5 rounded-xl hover:bg-[#2e2319] transition-colors"
        >
          <Lock
            size={18}
            strokeWidth={1.75}
          />

          Place Order

          <span aria-hidden>
            →
          </span>
        </button>

        <p className="text-xs text-stone-500 text-center mt-3">
          By placing this order, you agree to our
          Terms &amp; Conditions and Privacy Policy.
        </p>

      </div>

    </section>
  );
}