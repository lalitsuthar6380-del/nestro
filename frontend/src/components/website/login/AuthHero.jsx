"use client";

import { useState } from "react";
import {
  Armchair,
  Truck,
  ShieldCheck,
  Leaf,
} from "lucide-react";

const features = [
  { label: "Premium Quality", icon: Armchair },
  { label: "Free Delivery", icon: Truck },
  { label: "Secure Payments", icon: ShieldCheck },
  { label: "A Greener Tomorrow", icon: Leaf },
];

export default function AuthHero() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <div className="relative h-full min-h-0 overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop"
        alt="Nestro furniture"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full min-h-0 flex flex-col justify-between p-8 md:p-10 lg:p-12">

        {/* Top */}
        <div className="max-w-md">

          {/* Brand */}
          <p className="font-serif text-lg text-stone-800 mb-2">
            Nestro
          </p>

          <div className="h-px w-8 bg-stone-600 mb-4" />

          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-stone-900 mb-4">
            Good
            <br />
            Spaces
            <br />
            Brighter
            <br />
            Days
          </h2>

          {/* Description */}
          <p className="text-stone-700 text-base lg:text-lg mb-6">
            Premium furniture for a better tomorrow.
          </p>

          {/* Features */}
          <ul className="space-y-3">
            {features.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-stone-800"
              >
                <Icon
                  size={19}
                  strokeWidth={1.5}
                />

                <span className="text-sm">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div>

          {/* Quote */}
          <p className="font-serif text-xl lg:text-2xl text-white leading-snug mb-3 max-w-xs">
            &ldquo;More Than Furniture
            <br />
            A Better Way of Living&rdquo;
          </p>

          <div className="h-px w-8 bg-white/70 mb-3" />

          {/* Slider Dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActiveDot(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeDot === i
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}