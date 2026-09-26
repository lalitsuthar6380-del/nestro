import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const DEFAULT_FAQS = [
  { q: "How can I track my order?", a: "" },
  { q: "What is your return policy?", a: "" },
  { q: "Do you offer installation service?", a: "" },
  { q: "How long does delivery take?", a: "" },
  { q: "Can I change or cancel my order?", a: "" },
];

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-stone-800 sm:text-[15px]">{q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-stone-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && a ? (
        <div className="px-4 pb-4 text-sm text-stone-500 sm:px-5">{a}</div>
      ) : null}
    </div>
  );
}

export default function FaqSection({ faqs = DEFAULT_FAQS, onViewAll }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#8a5a34]">Have a Question?</p>
          <h2 className="mt-1 text-lg font-semibold text-stone-900 sm:text-xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-xs text-stone-500 sm:text-sm">
            Find quick answers to common queries.
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="hidden flex-shrink-0 items-center gap-1 text-sm font-medium text-stone-800 hover:text-stone-950 sm:flex"
        >
          View All FAQ
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((item, i) => (
          <FaqItem
            key={item.q}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className="mt-4 flex w-full items-center justify-center gap-1 text-sm font-medium text-stone-800 hover:text-stone-950 sm:hidden"
      >
        View All FAQ
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}