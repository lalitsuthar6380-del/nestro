"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function AddressForm({ onAddressAdded }) {
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT ADDRESS
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await client.post(
        "/user/add-address",
        {
          ...address,
          isDefault: false,
        }
      );

      if (response.data?.success) {
        toast.success(
          response.data.message || "Address added successfully"
        );

        // Send newly added addresses to parent
        if (onAddressAdded) {
          onAddressAdded(response.data.addresses);
        }

        // Reset form
        setAddress({
          fullName: "",
          mobile: "",
          pincode: "",
          addressLine: "",
          city: "",
          state: "",
          country: "India",
        });
      }
    } catch (error) {
      console.error("Add Address Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to add address"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">

      {/* ================= HEADER ================= */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5C4A3A] text-white">
          <MapPin
            size={17}
            strokeWidth={1.75}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-stone-900">
            Add New Address
          </h3>

          <p className="mt-0.5 text-[11px] text-stone-500">
            Add an address for faster checkout.
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

          {/* FULL NAME */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* MOBILE */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Mobile
            </label>

            <input
              type="tel"
              name="mobile"
              value={address.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* PINCODE */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              required
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* CITY */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* STATE */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              State
            </label>

            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Address
            </label>

            <textarea
              name="addressLine"
              value={address.addressLine}
              onChange={handleChange}
              placeholder="House no, street, area..."
              required
              rows={3}
              className="w-full resize-none rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

        </div>

        {/* ================= BUTTON ================= */}
        <div className="mt-4 flex justify-end">

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#5C4A3A] px-5 text-sm font-medium text-white transition hover:bg-[#4b3c30] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              "Save Address"
            )}
          </button>

        </div>

      </form>
    </div>
  );
}