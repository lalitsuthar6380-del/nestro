'use client'

import { Bell, ChevronDown, Search } from 'lucide-react'

export default function Header() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

            {/* Left */}
            <div className="min-w-max">
                <h1 className="text-lg font-semibold text-gray-900">
                    Dashboard
                </h1>
                <p className="text-xs text-gray-500">
                    Welcome back <span>👋</span>
                </p>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
                <div className="flex items-center gap-2 h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">

                {/* Notification */}
                <button className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
                </button>

                <div className="w-px h-6 bg-gray-200"></div>

                {/* Profile */}
                <button className="flex items-center gap-3 px-2 py-1 rounded-xl hover:bg-gray-100 transition">

                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                        A
                    </div>

                    <div className="hidden sm:block text-left">
                        <h3 className="text-sm font-semibold text-gray-900 leading-none">
                            Admin
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Super Admin
                        </p>
                    </div>

                    <ChevronDown size={16} className="text-gray-500" />

                </button>

            </div>

        </header>
    )
}