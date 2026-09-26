"use client";

import React from "react";
import { MapPin, Maximize2, Plus, Minus } from "lucide-react";

export default function MapPlaceholder({
  address = "Nestro, Rajasthan, India",
}) {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-stone-200 bg-[#eef1ea] sm:h-80 lg:h-full lg:min-h-[20rem]">
      
      {/* Map Background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[10%] top-0 h-full w-1 rotate-6 bg-white" />
        <div className="absolute left-[45%] top-0 h-full w-2 -rotate-3 bg-white" />
        <div className="absolute left-[75%] top-0 h-full w-1 rotate-12 bg-white" />

        <div className="absolute left-0 top-[30%] h-1 w-full -rotate-2 bg-white" />
        <div className="absolute left-0 top-[65%] h-1.5 w-full rotate-3 bg-white" />
      </div>

      {/* Location */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%]">
        <div className="whitespace-nowrap rounded-lg bg-white px-3 py-2 text-left shadow-md">
          <p className="text-xs font-semibold text-stone-900">
            Nestro
          </p>

          <p className="text-[11px] text-stone-500">
            {address}
          </p>
        </div>

        <MapPin className="mx-auto -mt-1 h-7 w-7 fill-red-500 text-red-500" />
      </div>

      {/* Expand */}
      <button
        type="button"
        aria-label="Expand map"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-white shadow hover:bg-stone-50"
      >
        <Maximize2 className="h-4 w-4 text-stone-600" />
      </button>

      {/* Zoom */}
      <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-md bg-white shadow">
        <button
          type="button"
          aria-label="Zoom in"
          className="flex h-8 w-8 items-center justify-center border-b border-stone-100 hover:bg-stone-50"
        >
          <Plus className="h-4 w-4 text-stone-600" />
        </button>

        <button
          type="button"
          aria-label="Zoom out"
          className="flex h-8 w-8 items-center justify-center hover:bg-stone-50"
        >
          <Minus className="h-4 w-4 text-stone-600" />
        </button>
      </div>
    </div>
  );
}