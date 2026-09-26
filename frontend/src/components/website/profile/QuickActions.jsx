"use client";

import {
  Zap,
  ClipboardList,
  MapPin,
  Heart,
  Lock,
  Bell,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    label: "View Orders",
    icon: ClipboardList,
    tab: "orders",
  },
  {
    label: "Manage Addresses",
    icon: MapPin,
    tab: "addresses",
  },
  {
    label: "My Wishlist",
    icon: Heart,
    tab: "wishlist",
  },
  {
    label: "Change Password",
    icon: Lock,
    tab: "password",
  },
  {
    label: "Notifications",
    icon: Bell,
    tab: "notifications",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    tab: "help",
  },
];

export default function QuickActions({ onTabChange }) {
  const handleAction = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm">

      {/* Header */}
      <div className="mb-2.5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5C4A3A] text-white">
          <Zap size={16} strokeWidth={1.8} />
        </div>

        <h2 className="text-sm font-semibold text-stone-900">
          Quick Actions
        </h2>
      </div>

      {/* Actions */}
      <ul>
        {actions.map(({ label, icon: Icon, tab }) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => handleAction(tab)}
              className="flex w-full items-center justify-between border-b border-stone-100 py-2.5 text-xs text-stone-700 transition-colors last:border-b-0 hover:text-stone-900"
            >
              <span className="flex items-center gap-2.5">
                <Icon
                  size={15}
                  strokeWidth={1.75}
                  className="text-stone-500"
                />

                <span>{label}</span>
              </span>

              <ChevronRight
                size={14}
                strokeWidth={1.75}
                className="text-stone-400"
              />
            </button>
          </li>
        ))}
      </ul>

    </section>
  );
}