"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import { client } from "@/utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { lsToCart } from "@/redux/features/cartSlice";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/store" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Checkout", href: "/checkout" },
];

export default function Header({ profile = null }) {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(profile);
  const [loading, setLoading] = useState(true);


  // {GET LOGGED-IN USER}
  
  const getUser = async () => {
    try {
      const response = await client.get("/user/get-me");

      console.log("PROFILE DATA:", response.data);

      if (response.data?.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Profile error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    dispatch(lsToCart());
  }, [dispatch]);


  // {LISTEN FOR LOGOUT}

  useEffect(() => {
    const handleAuthChange = () => {
      getUser();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);


  // {CLOSE MOBILE MENU}

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const cartCount = cart?.items?.length || 0;

  return (
    <>
      {/*HEADER*/}
      <header className="sticky top-0 z-50 bg-[#FAFAF8]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link
            href="/"
            className="text-3xl font-bold tracking-widest"
          >
            Nestro<span className="text-amber-700">.</span>
          </Link>

          {/*  DESKTOP NAV  */}
          <nav className="hidden items-center gap-2 md:flex">

            {navLinks.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-amber-100 text-amber-700"
                      : "hover:text-amber-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* SIGN IN ONLY WHEN LOGGED OUT */}
            {!loading && !user && (
              <Link
                href="/sign_in"
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  pathname === "/sign_in"
                    ? "bg-amber-100 text-amber-700"
                    : "hover:text-amber-700"
                }`}
              >
                Sign In
              </Link>
            )}

          </nav>

          {/* DESKTOP ICONS */}
          <div className="hidden items-center gap-5 md:flex">

            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search"
            >
              <Search
                size={20}
                className="cursor-pointer"
              />
            </button>

            {/* CART */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative"
            >
              <ShoppingBag size={20} />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[10px] text-white">
                {cartCount}
              </span>
            </Link>

            {/* PROFILE ONLY WHEN LOGGED IN */}
            {!loading && user && (
              <Link
                href="/profile"
                aria-label="Profile"
                className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2"
              >
                <User size={18} />

                <span className="text-sm font-medium text-gray-700">
                  {user?.name || "Profile"}
                </span>
              </Link>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="md:hidden"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>

        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >

        {/* MOBILE DRAWER */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-screen w-72 bg-white shadow-xl transition-transform duration-300 ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* DRAWER HEADER */}
          <div className="relative flex items-center border-b p-5">

            <h2 className="text-2xl font-bold">
              Nestro<span className="text-amber-700">.</span>
            </h2>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 rounded-full p-2 hover:bg-gray-100"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

          </div>

          {/* MOBILE NAV */}
          <nav className="flex flex-col p-5">

            {navLinks.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`mb-2 rounded-lg px-4 py-3 transition ${
                    active
                      ? "bg-amber-100 text-amber-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* MOBILE SIGN IN */}
            {!loading && !user && (
              <Link
                href="/sign_in"
                onClick={() => setIsOpen(false)}
                className="mb-2 rounded-lg px-4 py-3 transition hover:bg-gray-100"
              >
                Sign In
              </Link>
            )}

            {/* MOBILE PROFILE */}
            {!loading && user && (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-100"
              >
                <User size={20} />

                <span>
                  {user?.name || "Profile"}
                </span>
              </Link>
            )}

            {/* MOBILE ICONS */}
            <div className="mt-6 flex items-center gap-6 border-t pt-6">

              <button
                type="button"
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              <Link
                href="/cart"
                aria-label="Cart"
                onClick={() => setIsOpen(false)}
                className="relative"
              >
                <ShoppingBag size={22} />

                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 text-[10px] text-white">
                  {cartCount}
                </span>
              </Link>

              {user && (
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  aria-label="Profile"
                >
                  <User size={22} />
                </Link>
              )}

            </div>

            {/* USER NAME */}
            {!loading && user?.name && (
              <div className="mt-5 border-t pt-5 text-sm font-semibold text-gray-600">
                {user.name}
              </div>
            )}

          </nav>
        </div>
      </div>
    </>
  );
}