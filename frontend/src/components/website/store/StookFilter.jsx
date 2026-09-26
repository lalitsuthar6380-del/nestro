"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function StookFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValues = searchParams.get("stock");

  function changeHandler() {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedValues === "true") {
      params.delete("stock");
    } else {
      params.set("stock", "true");
    }

    router.push(`/store?${params.toString()}`);
  }

  return (
    <section>
      <h3 className="mb-5 text-base font-semibold text-stone-900">
        Availability
      </h3>

      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-stone-50">
        <input
          type="checkbox"
          checked={selectedValues === "true"}
          onChange={changeHandler}
          className="h-4 w-4 rounded border-stone-300 accent-amber-700"
        />

        <div>
          <p className="text-sm font-medium text-stone-800">
            In Stock
          </p>

          <p className="text-xs text-stone-500">
            Show only available products
          </p>
        </div>
      </label>
    </section>
  );
}