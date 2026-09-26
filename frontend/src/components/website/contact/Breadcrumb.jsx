
"use client";

import React from "react";
import {
  ChevronRight,
  Home as HomeIcon,
} from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-stone-500"
    >
      {items.map((item, i) => (
        <React.Fragment
          key={`${item.label}-${i}`}
        >
          {/* Home Icon */}
          {i === 0 && (
            <HomeIcon className="h-3.5 w-3.5 flex-shrink-0" />
          )}

          {/* Breadcrumb Label */}
          <span
            className={
              i === items.length - 1
                ? "font-medium text-stone-800"
                : "text-stone-500"
            }
          >
            {item.label}
          </span>

          {/* Separator */}
          {i < items.length - 1 && (
            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-stone-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}