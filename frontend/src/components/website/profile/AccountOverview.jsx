"use client";

import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Package,
  Heart,
  MapPin,
  Crown,
  Loader2,
} from "lucide-react";

import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function AccountOverview() {
  const [stats, setStats] = useState([
    {
      label: "Total Orders",
      value: "—",
      icon: Package,
    },
    {
      label: "Wishlist Items",
      value: "—",
      icon: Heart,
    },
    {
      label: "Saved Addresses",
      value: "—",
      icon: MapPin,
    },
    {
      label: "Member Since",
      value: "—",
      icon: Crown,
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);

        const [profileResponse, ordersResponse] =
          await Promise.all([
            client.get("user/get-me"),
            client.get("order/my-orders?limit=1"),
          ]);

        const user = profileResponse.data.user;

        const totalOrders =
          ordersResponse.data.total || 0;

        const savedAddresses =
          user?.addresses?.length || 0;

        const memberSince = user?.createdAt
          ? new Date(user.createdAt).toLocaleDateString(
              "en-IN",
              {
                month: "short",
                year: "numeric",
              }
            )
          : "—";

        setStats([
          {
            label: "Total Orders",
            value: totalOrders,
            icon: Package,
          },
          {
            label: "Wishlist Items",
            value: "—",
            icon: Heart,
          },
          {
            label: "Saved Addresses",
            value: savedAddresses,
            icon: MapPin,
          },
          {
            label: "Member Since",
            value: memberSince,
            icon: Crown,
          },
        ]);
      } catch (error) {
        console.error("Account Overview Error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to load account overview"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm">
      
      {/* ================= HEADER ================= */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5C4A3A] text-white">
          <LayoutGrid
            size={17}
            strokeWidth={1.75}
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold leading-tight text-stone-900">
            Account Overview
          </h2>

          <p className="mt-0.5 text-[11px] leading-tight text-stone-500">
            Your activity at a glance.
          </p>
        </div>
      </div>

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="flex items-center justify-center py-6 text-stone-500">
          <Loader2
            size={18}
            className="mr-2 animate-spin"
          />

          <span className="text-xs">
            Loading...
          </span>
        </div>
      ) : (
        /* ================= STATS ================= */
        <div className="grid grid-cols-2 gap-2.5">
          {stats.map(
            ({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="min-h-[92px] rounded-xl bg-stone-50 p-3"
              >
                {/* ICON */}
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#EADFCB] text-[#5C4A3A]">
                  <Icon
                    size={15}
                    strokeWidth={1.75}
                  />
                </div>

                {/* VALUE */}
                <p className="text-base font-semibold leading-none text-stone-900">
                  {value}
                </p>

                {/* LABEL */}
                <p className="mt-1 text-[10px] leading-tight text-stone-500">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}