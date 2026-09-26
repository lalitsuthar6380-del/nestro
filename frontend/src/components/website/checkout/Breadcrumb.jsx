import { ChevronRight } from "lucide-react";

const crumbs = ["Home", "Cart", "Checkout"];

export default function Breadcrumb() {
  return (
    <nav className="max-w-[1440px] mx-auto px-6 md:px-10 pt-5">
      <ol className="flex items-center gap-2 text-sm">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb} className="flex items-center gap-2">
              <span className={isLast ? "font-semibold text-stone-900" : "text-stone-500"}>
                {crumb}
              </span>
              {!isLast && (
                <ChevronRight size={14} strokeWidth={2} className="text-stone-400" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}