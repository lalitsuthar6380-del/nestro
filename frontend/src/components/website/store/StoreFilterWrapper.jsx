"use client";

import { useState } from "react";
import StoreToolbar from "./Storetoolbar";

export default function StoreFilterWrapper({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= TOOLBAR (Mobile Filter button + Sort) ================= */}
      <StoreToolbar onFilterClick={() => setOpen(true)} />

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {open && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40"
          />

          {/* Drawer */}
          <div className="fixed left-0 top-0 z-50 h-screen w-80 max-w-[85%] overflow-y-auto bg-white shadow-2xl">

            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b bg-white px-5 py-4">
              <h2 className="text-lg font-semibold text-stone-900">
                Filters
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-stone-600 transition hover:text-black"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            {/* Filters */}
            <div className="p-5">
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
}

