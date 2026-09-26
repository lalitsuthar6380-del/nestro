"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const min_price =
    Number(searchParams.get("min_price")) || minPrice;

  const max_price =
    Number(searchParams.get("max_price")) || maxPrice;

  function PriceHandler(slug, queryKey) {
    if (Number(minPrice) > Number(maxPrice)) {
      setError("Min Price, Max Price se zyada nahi ho sakta.");
      return;
    }

    setError("");

    const params = new URLSearchParams(searchParams.toString());

    params.set("min_price", minPrice);
    params.set("max_price", maxPrice);

    router.push(`/store?${params.toString()}`, {
      scroll: false,
    });
  }

  function clearFilter() {
    setError("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("min_price");
    params.delete("max_price");

    router.push(`/store?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <aside className="w-full shrink-0 lg:w-64">
      {/* ================= PRICE RANGE ================= */}
      <div className="mt-5 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-medium text-stone-900">
          Price Range
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* MIN PRICE */}
          <div>
            <label className="mb-1 block text-xs text-stone-500">
              Min Price
            </label>

            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setError("");
              }}
              placeholder="₹0"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-700"
            />
          </div>

          {/* MAX PRICE */}
          <div>
            <label className="mb-1 block text-xs text-stone-500">
              Max Price
            </label>

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setError("");
              }}
              placeholder="₹150000"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-700"
            />
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* APPLY BUTTON */}
        <button
          type="button"
          onClick={PriceHandler}
          className="mt-4 w-full rounded-lg bg-amber-700 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Apply
        </button>

        {/* CLEAR FILTER */}
        <button
          type="button"
          onClick={clearFilter}
          className="mt-2 w-full rounded-lg border border-stone-300 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          Clear Filter
        </button>
      </div>
    </aside>
  );
}