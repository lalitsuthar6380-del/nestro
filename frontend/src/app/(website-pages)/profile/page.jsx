"use client";

import { useState } from "react";

import AccountSidebar from "@/components/website/profile/AccountSidebar";
import WelcomeBanner from "@/components/website/profile/WelcomeBanner";
import ProfileInformation from "@/components/website/profile/ProfileInformation";
import SavedAddresses from "@/components/website/profile/SaveAddresses";
import RecentOrders from "@/components/website/profile/RecentOrders";
import AccountOverview from "@/components/website/profile/AccountOverview";
import QuickActions from "@/components/website/profile/QuickActions";
import PromoCard from "@/components/website/profile/PromoCard";
import ChangePasswordTab from "@/components/website/profile/ChangePasswordTab";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      <div className="mx-auto max-w-[1440px] px-4 py-5 md:px-7 lg:px-8 lg:py-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] text-stone-500">
          <span>Home</span>
          <span className="text-stone-300">›</span>
          <span>My Account</span>
          <span className="text-stone-300">›</span>
          <span className="font-semibold text-stone-900">Profile</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[176px_minmax(0,1fr)] xl:gap-5">
          <AccountSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <main className="min-w-0">
            <div className="mb-3">
              <WelcomeBanner />
            </div>

            {activeTab === "profile" && (
              <div className="grid grid-cols-1 gap-3.5 xl:grid-cols-[minmax(0,1fr)_264px]">

                {/* Left */}
                <div className="space-y-3.5">
                  <ProfileInformation />
                  {/* <SavedAddresses /> */}
                  <RecentOrders />
                </div>

                {/* Right */}
                <div className="space-y-3.5">
                  <AccountOverview />

                  <QuickActions
                    onTabChange={setActiveTab}
                  />

                  {/* <PromoCard /> */}
                </div>

              </div>
            )}

            {activeTab === "addresses" && (
              <SavedAddresses />
            )}

            {activeTab === "password" && (
              <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm md:p-8">
                <div className="mb-7 border-b border-stone-100 pb-6">
                  <h2 className="text-2xl font-semibold text-stone-900">
                    Change Password
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    Update your password to keep your account secure
                  </p>
                </div>

                <ChangePasswordTab />
              </div>
            )}

            {activeTab === "orders" && (
              <RecentOrders />
            )}

            {activeTab === "wishlist" && (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-stone-900">
                  My Wishlist
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  Wishlist will appear here.
                </p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-stone-900">
                  Notifications
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  Notifications will appear here.
                </p>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}