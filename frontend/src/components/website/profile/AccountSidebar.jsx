"use client";

import {
  User,
  MapPin,
  Package,
  Heart,
  Lock,
  Bell,
  LogOut,
  ArrowRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/utils/helper";

const navItems = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: MapPin,
  },
  {
    id: "orders",
    label: "Orders",
    icon: Package,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    id: "password",
    label: "Change Password",
    icon: Lock,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
];

export default function AccountSidebar({
  activeTab = "profile",
  onTabChange,
}) {
  const router = useRouter();

  const [user, setUser] = useState(null);

  // =========================
  // GET USER FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await client.get("/user/profile");

        if (response.data?.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log("Get Profile Error:", error);
      }
    };

    fetchUser();
  }, []);

  // =========================
  // TAB CHANGE
  // =========================
  const handleTabChange = (id) => {
    if (onTabChange) {
      onTabChange(id);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    try {
      await client.post("/user/logout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.dispatchEvent(new Event("auth-change"));

      router.replace("/");
      router.refresh();
    }
  };

  return (
    <aside className="w-full shrink-0 space-y-3 lg:w-[176px]">

      {/* =====================================
          ACCOUNT CARD
      ====================================== */}
      <div className="overflow-hidden rounded-xl border border-stone-100 bg-white shadow-sm">

        {/* =====================================
            USER INFORMATION
        ====================================== */}
        <div className="px-3 py-3">
          <div className="flex items-center gap-3">

            {/* AVATAR */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#80633f] text-base font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* USER INFO */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold leading-tight text-stone-900">
                {user?.name || "Loading..."}
              </p>

              <p className="mt-1 truncate text-[10px] text-stone-500">
                {user?.email || "Loading..."}
              </p>
            </div>

          </div>
        </div>

        {/* =====================================
            DIVIDER
        ====================================== */}
        <div className="mx-3 border-t border-stone-100" />

        {/* =====================================
            NAVIGATION
        ====================================== */}
        <nav className="p-1.5">

          <ul className="space-y-0.5">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;

              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleTabChange(id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] transition-all duration-200 ${
                      active
                        ? "bg-[#5C4A3A] font-medium text-white shadow-sm"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      className="shrink-0"
                    />

                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* =====================================
              LOGOUT
          ====================================== */}
          <div className="mt-1 border-t border-stone-100 pt-1">

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
            >
              <LogOut
                size={18}
                strokeWidth={1.7}
                className="shrink-0"
              />

              <span>Logout</span>
            </button>

          </div>

        </nav>
      </div>

      {/* =====================================
          PROMO CARD
      ====================================== */}
      <div className="relative h-[272px] overflow-hidden rounded-xl bg-stone-200">

        <img
          src="https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=600&auto=format&fit=crop"
          alt="Cozy living room chair"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* CONTENT */}
        <div className="relative flex h-full flex-col justify-between p-3.5">

          {/* TOP */}
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
              Nestro Collection
            </p>

            <h3 className="font-serif text-[20px] leading-[1.05] text-white">
              Better Spaces
              <br />
              Happier You
            </h3>
          </div>

          {/* BOTTOM */}
          <div>
            <p className="mb-3 max-w-[155px] text-[10px] leading-4 text-white/90">
              Explore our new collection and create a home you love.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-1.5 rounded-md bg-stone-900 px-2.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-stone-800"
            >
              Shop Now

              <ArrowRight
                size={14}
                strokeWidth={1.75}
              />
            </button>
          </div>

        </div>
      </div>

    </aside>
  );
}