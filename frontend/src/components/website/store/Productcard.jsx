"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ImageOff } from "lucide-react";
import CartBtn from "../ui/CartBtn";

function getBadgeStyle(badge) {
  if (!badge) return "";

  if (badge.startsWith("−") || badge.startsWith("-")) {
    return "bg-amber-700 text-white";
  }

  if (badge === "NEW") {
    return "bg-emerald-700 text-white";
  }

  if (badge === "BESTSELLER") {
    return "bg-stone-900 text-white";
  }

  if (badge === "SALE") {
    return "bg-amber-700 text-white";
  }

  if (badge === "HOT") {
    return "bg-rose-600 text-white";
  }

  return "bg-stone-900 text-white";
}

export default function ProductCard({
  href = "/product",
  thumbnail,
  category,
  name,
  rating = 5,
  reviewCount,
  price,
  originalPrice,
  badge,
  product, // 👈 product object bhi receive karo
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:border-amber-300 hover:shadow-md">

      {/* Product Image + Link */}
      <Link href={product?.slug ? `/product/${product.slug}` : href}>
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          {!imgError && thumbnail ? (
            <img
              src={thumbnail}
              alt={name || "Product"}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-stone-100 text-stone-400">
              <ImageOff
                className="h-8 w-8"
                strokeWidth={1.5}
              />

              <span className="px-4 text-center text-xs">
                {name || "Image not available"}
              </span>
            </div>
          )}

          {badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getBadgeStyle(
                badge
              )}`}
            >
              {badge}
            </span>
          )}

          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="block rounded-full bg-white/95 py-2 text-center text-xs font-medium text-stone-900 shadow-sm">
              View Product
            </span>
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="border-t border-stone-100 p-3.5">

        <p className="text-xs uppercase tracking-wide text-stone-500">
          {category}
        </p>

        <h3 className="mt-1 text-sm font-medium text-stone-900">
          {name}
        </h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < rating
                  ? "fill-amber-500 text-amber-500"
                  : "fill-stone-200 text-stone-200"
                }`}
            />
          ))}

          {reviewCount !== undefined && reviewCount !== null && (
            <span className="ml-1 text-xs text-stone-400">
              ({reviewCount})
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-between">
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-sm font-semibold text-stone-900">
              {price}
            </span>

            {originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {originalPrice}
              </span>
            )}
          </div>

          {/* Add To Cart */}
          <div className="mt-3">
            <CartBtn product={product} />
          </div>

        </div>


      </div>
    </div>
  );
}