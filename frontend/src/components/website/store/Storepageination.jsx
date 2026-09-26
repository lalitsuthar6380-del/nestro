"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function StorePagination({ pages = 5 }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, pages);

  const currentPage =
    Number(searchParams.get("page")) || 1;

  const handlePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", page);

    router.push(`/store?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-6">

      {/* Pagination */}
      <div className="flex items-center gap-2">

        {/* Previous */}
        <button
          onClick={() => handlePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-full border border-stone-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePage(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => handlePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-full border border-stone-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

      </div>

      {/* Load More */}
      <button
        type="button"
        className="rounded-full border border-stone-300 px-7 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white"
      >
        Load More Products
      </button>

    </div>
  );
}
