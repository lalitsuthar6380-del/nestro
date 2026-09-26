"use client";

import { Headset, ShieldCheck, Truck } from "lucide-react";

const badges = [
  {
    icon: Headset,
    title: "24/7 Support",
    subtitle: "We're here for you",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    subtitle: "Your data is protected",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "On orders above ₹999",
  },
];

export default function TrustBadges() {
  return (
    <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-3 sm:gap-5">
      {badges.map(({ icon: Icon, title, subtitle }) => (
        <div
          key={title}
          className="flex flex-col items-center text-center"
        >
          {/* Icon */}
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#EADFCB] text-[#5C4A3A] sm:h-11 sm:w-11">
            <Icon
              size={18}
              strokeWidth={1.75}
            />
          </div>

          {/* Title */}
          <p className="text-xs font-medium leading-4 text-stone-900 sm:text-sm">
            {title}
          </p>

          {/* Subtitle */}
          <p className="mt-1 text-[10px] leading-4 text-stone-500 sm:text-xs">
            {subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}