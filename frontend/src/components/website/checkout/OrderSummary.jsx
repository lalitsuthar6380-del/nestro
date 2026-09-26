"use client";

import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function OrderSummary() {
  const router = useRouter();

  const cart = useSelector((store) => store.cart);

  const items = cart?.items ?? [];

  // ==========================================
  // PRICE CALCULATION
  // USE CART TOTALS DIRECTLY
  // ==========================================

  const originalTotal = Number(
    cart?.original_total ?? 0
  );

  const finalTotal = Number(
    cart?.final_total ?? 0
  );

  // ==========================================
  // DISCOUNT
  // ==========================================

  const discount =
    Math.max(
      originalTotal - finalTotal,
      0
    );

  // ==========================================
  // SHIPPING
  // ==========================================

  const shipping = 0;

  // ==========================================
  // TOTAL
  // ==========================================

  const total =
    finalTotal + shipping;

  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString(
      "en-IN"
    )}`;
  };

  return (
    <section className="rounded-2xl bg-white p-6">

      {/* ==================================
          HEADER
      ================================== */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C2E22] text-white">

            <ShoppingBag
              size={18}
              strokeWidth={1.75}
            />

          </div>

          <div>

            <h2 className="font-semibold text-stone-900">
              Order Summary
            </h2>

            <p className="text-xs text-stone-500">
              {items.length}{" "}
              {items.length === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="text-sm font-semibold text-amber-700 hover:text-amber-800"
        >
          Edit Cart
        </button>

      </div>

      {/* ==================================
          EMPTY CART
      ================================== */}

      {items.length === 0 ? (

        <div className="rounded-xl border border-dashed border-stone-200 py-8 text-center">

          <ShoppingBag
            size={28}
            className="mx-auto mb-2 text-stone-400"
          />

          <p className="text-sm font-medium text-stone-700">
            Your cart is empty
          </p>

          <button
            type="button"
            onClick={() => router.push("/store")}
            className="mt-3 rounded-lg bg-[#3C2E22] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2f241b]"
          >
            Go to Store
          </button>

        </div>

      ) : (

        <>

          {/* ==================================
              CART ITEMS
          ================================== */}

          <div className="mb-5 space-y-4">

            {items.map((item, index) => {

              const product =
                item.product ?? item;

              const price = Number(
                item.salePrice ??
                  item.price ??
                  product.salePrice ??
                  product.price ??
                  0
              );

              const qty = Number(
                item.qty ??
                  item.quantity ??
                  1
              );

              const itemTotal =
                price * qty;

              const image =
                item.thumbnail ??
                  item.image ??
                  product.thumbnail ??
                  product.image ??
                  product.images?.[0] ??
                  "";

              const name =
                item.title ??
                  item.name ??
                  product.title ??
                  product.name ??
                  "Product";

              return (
                <div
                  key={
                    item._id ??
                    product._id ??
                    item.id ??
                    index
                  }
                  className="flex items-center gap-3"
                >

                  {/* IMAGE */}

                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-100">

                    {image ? (

                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full w-full items-center justify-center">

                        <ShoppingBag
                          size={18}
                          className="text-stone-400"
                        />

                      </div>

                    )}

                  </div>

                  {/* PRODUCT INFO */}

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-medium text-stone-900">
                      {name}
                    </p>

                    {item.variant && (
                      <p className="text-xs text-stone-500">
                        {item.variant}
                      </p>
                    )}

                    <p className="text-xs text-stone-500">
                      Qty: {qty}
                    </p>

                  </div>

                  {/* ITEM PRICE */}

                  <span className="whitespace-nowrap text-sm font-semibold text-stone-900">
                    {formatPrice(itemTotal)}
                  </span>

                </div>
              );
            })}

          </div>

          {/* ==================================
              PRICE DETAILS
          ================================== */}

          <div className="space-y-2.5 border-t border-stone-100 pt-4">

            {/* SUBTOTAL */}

            <div className="flex items-center justify-between text-sm">

              <span className="text-stone-600">
                Subtotal
              </span>

              <span className="text-stone-900">
                {formatPrice(originalTotal)}
              </span>

            </div>

            {/* SHIPPING */}

            <div className="flex items-center justify-between text-sm">

              <span className="text-stone-600">
                Shipping
              </span>

              <span className="font-medium text-emerald-600">
                {shipping === 0
                  ? "Free"
                  : formatPrice(shipping)}
              </span>

            </div>

            {/* DISCOUNT */}

            {discount > 0 && (

              <div className="flex items-center justify-between text-sm">

                <span className="text-stone-600">
                  Discount
                </span>

                <span className="font-medium text-emerald-600">
                  {formatPrice(discount)}
                </span>

              </div>

            )}

          </div>

          {/* ==================================
              TOTAL
          ================================== */}

          <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">

            <span className="font-semibold text-stone-900">
              Total Amount
            </span>

            <span className="text-lg font-bold text-stone-900">
              {formatPrice(total)}
            </span>

          </div>

          {/* ==================================
              SAVING
          ================================== */}

          {discount > 0 && (

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

              <CheckCircle2
                size={16}
                strokeWidth={1.75}
                className="shrink-0"
              />

              You are saving{" "}
              {formatPrice(discount)}{" "}
              on this order!

            </div>

          )}

        </>

      )}

    </section>
  );
}