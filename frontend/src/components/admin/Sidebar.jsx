
"use client";

import React, { useState } from "react";
import {
    LayoutDashboard,
    Tag,
    BedDouble,
    ShoppingBag,
    ShoppingCart,
    Gauge,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            label: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            label: "Category",
            href: "/admin/category",
            icon: Tag,
        },
        {
            label: "Room-type",
            href: "/admin/room-type",
            icon: BedDouble,
        },
        {
            label: "Products",
            href: "/admin/product",
            icon: ShoppingBag,
        },
        {
            label: "Orders",
            href: "/admin/order",
            icon: ShoppingCart,
        },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 z-50 flex h-screen flex-col overflow-y-auto bg-[#0d1b2a] text-white transition-all duration-300 border-r border-white/5 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Header */}
            <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/5 bg-[#0d1b2a] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-900/50">
                        <Gauge className="h-5 w-5" />
                    </div>

                    {!collapsed && (
                        <div>
                            <p className="text-sm font-bold leading-tight text-white">
                                AdminPanel
                            </p>

                            <p className="text-[10px] font-medium text-teal-400">
                                Pro Dashboard
                            </p>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={
                        collapsed
                            ? "Expand sidebar"
                            : "Collapse sidebar"
                    }
                    className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/10"
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                    ) : (
                        <ChevronLeft className="h-4 w-4 text-slate-400" />
                    )}
                </button>
            </div>

            {/* Main Menu */}
            {!collapsed && (
                <p className="px-4 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Main Menu
                </p>
            )}

            <nav className="space-y-0.5 px-2 pb-4 pt-2">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const active =
                        pathname === href ||
                        (href !== "/admin" &&
                            pathname.startsWith(`${href}/`));

                    return (
                        <Link
                            key={href}
                            href={href}
                            title={collapsed ? label : undefined}
                            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${active
                                    ? "border border-teal-500/20 bg-gradient-to-r from-teal-500/20 to-teal-600/10 text-teal-400"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                } ${collapsed
                                    ? "justify-center"
                                    : ""
                                }`}
                        >
                            {active && (
                                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-teal-400" />
                            )}

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/20 transition-all">
                                <Icon className="h-5 w-5" />
                            </div>

                            {!collapsed && (
                                <p className="truncate text-sm font-medium">
                                    {label}
                                </p>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Admin Section */}
            <div className="mt-auto flex items-center justify-between border-t border-white/5 p-3">
                {!collapsed && (
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                            Admin
                        </p>

                        <p className="truncate text-[10px] text-slate-500">
                            Super Admin
                        </p>
                    </div>
                )}

                <button
                    type="button"
                    title="Logout"
                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-red-400"
                >
                    <LogOut className="h-3.5 w-3.5" />
                </button>
            </div>
        </aside>
    );
}