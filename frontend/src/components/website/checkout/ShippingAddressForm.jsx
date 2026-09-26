"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";

export default function ShippingAddressForm() {
  const [form, setForm] = useState({
    fullName: "Lalit Suthar",
    phone: "+91 9876543210",
    pincode: "302015",
    address: "123, Mahesh Nagar",
    locality: "Mahesh Nagar",
    city: "Jaipur",
    state: "Rajasthan",
    addressType: "Home",
    saveAddress: true,
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section className="bg-white rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#3C2E22] text-white flex items-center justify-center">
            <MapPin size={18} strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-stone-900">
              Shipping Address
            </h2>
            <p className="text-sm text-stone-500">Enter your delivery details</p>
          </div>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-amber-700 hover:text-amber-800 underline decoration-1 underline-offset-2 whitespace-nowrap"
        >
          Saved Addresses
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="Full Name">
            <input
              type="text"
              value={form.fullName}
              onChange={handleChange("fullName")}
              className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </Field>
          <Field label="Phone Number">
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </Field>
          <Field label="Pincode">
            <div className="flex items-center gap-2">
              <div className="flex items-center flex-1 border border-stone-300 rounded-lg px-4 py-2.5 gap-2 focus-within:ring-2 focus-within:ring-stone-400">
                <input
                  type="text"
                  value={form.pincode}
                  onChange={handleChange("pincode")}
                  className="w-full outline-none text-stone-900"
                />
                <Search size={16} strokeWidth={1.75} className="text-stone-400 shrink-0" />
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-medium text-stone-600 hover:text-stone-800 mt-1.5"
            >
              Detect Location
            </button>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Address (House No, Building, Street)">
            <input
              type="text"
              value={form.address}
              onChange={handleChange("address")}
              className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </Field>
          <Field label="Locality / Area">
            <input
              type="text"
              value={form.locality}
              onChange={handleChange("locality")}
              className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="City">
            <select
              value={form.city}
              onChange={handleChange("city")}
              className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option>Jaipur</option>
              <option>Delhi</option>
              <option>Mumbai</option>
            </select>
          </Field>
          <Field label="State">
            <select
              value={form.state}
              onChange={handleChange("state")}
              className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option>Rajasthan</option>
              <option>Delhi</option>
              <option>Maharashtra</option>
            </select>
          </Field>
          <Field label="Address Type">
            <div className="flex items-center gap-4 h-[42px]">
              {["Home", "Office", "Other"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 text-sm cursor-pointer ${
                    form.addressType === type
                      ? "font-semibold text-stone-900"
                      : "text-stone-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="addressType"
                    checked={form.addressType === type}
                    onChange={() => setForm((p) => ({ ...p, addressType: type }))}
                    className="h-4 w-4 accent-[#3C2E22]"
                  />
                  {type}
                </label>
              ))}
            </div>
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.saveAddress}
            onChange={() => setForm((p) => ({ ...p, saveAddress: !p.saveAddress }))}
            className="h-4 w-4 rounded border-stone-300 accent-[#3C2E22]"
          />
          Save this address for future orders
        </label>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <span className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
      </span>
      {children}
    </div>
  );
}