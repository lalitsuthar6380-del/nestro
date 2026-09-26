"use client";

export default function StoreToolbar({ onFilterClick }) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-4">

      {/* Mobile Filter Button */}
      <button
        type="button"
        onClick={onFilterClick}
        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 lg:hidden"
      >
        <span aria-hidden="true">☰</span>
        <span>Filter</span>
      </button>

      {/* Desktop Empty */}
      <div className="hidden lg:block"></div>

      {/* Sort */}
      <select
        defaultValue="featured"
        className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm outline-none"
      >
        <option value="featured">Sort: Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>

    </div>
  );
}

