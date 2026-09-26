"use client";

import { useEffect, useState } from "react";

import {
  MapPin,
  Home,
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Check,
} from "lucide-react";

import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function SavedAddresses({
  onSelectAddress,
}) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    country: "India",
    isDefault: false,
  });

  // =========================
  // FETCH ADDRESSES
  // =========================

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await client.get("user/get-me");

      const savedAddresses =
        response.data.user?.addresses || [];

      setAddresses(savedAddresses);

      // Automatically select default address
      const defaultAddress =
        savedAddresses.find(
          (address) => address.isDefault
        );

      if (defaultAddress && onSelectAddress) {
        onSelectAddress(defaultAddress);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchAddresses, 0);

    return () => clearTimeout(timer);
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================
  // ADD ADDRESS
  // =========================

  const handleAdd = () => {
    setEditingAddress(null);

    setForm({
      fullName: "",
      mobile: "",
      pincode: "",
      addressLine: "",
      city: "",
      state: "",
      country: "India",
      isDefault: false,
    });

    setShowForm(true);
  };

  // =========================
  // EDIT ADDRESS
  // =========================

  const handleEdit = (address) => {
    setEditingAddress(address);

    setForm({
      fullName: address.fullName || "",
      mobile: address.mobile || "",
      pincode: address.pincode || "",
      addressLine: address.addressLine || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "India",
      isDefault: address.isDefault || false,
    });

    setShowForm(true);
  };

  // =========================
  // ADD / UPDATE ADDRESS
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setActionLoading(true);

      let response;

      if (editingAddress) {
        response = await client.put(
          `user/update-address/${editingAddress._id}`,
          form
        );
      } else {
        response = await client.post(
          "user/add-address",
          form
        );
      }

      const updatedAddresses =
        response.data.addresses || [];

      setAddresses(updatedAddresses);

      // If new/updated address is default,
      // select it automatically
      const defaultAddress =
        updatedAddresses.find(
          (address) => address.isDefault
        );

      if (
        defaultAddress &&
        onSelectAddress
      ) {
        onSelectAddress(defaultAddress);
      }

      toast.success(
        editingAddress
          ? "Address updated successfully"
          : "Address added successfully"
      );

      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to save address"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // DELETE ADDRESS
  // =========================

  const handleDelete = async (addressId) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this address?"
      );

    if (!confirmDelete) return;

    try {
      setActionLoading(true);

      const response =
        await client.delete(
          `user/delete-address/${addressId}`
        );

      const updatedAddresses =
        response.data.addresses || [];

      setAddresses(updatedAddresses);

      // Select default address after delete
      const defaultAddress =
        updatedAddresses.find(
          (address) => address.isDefault
        );

      if (
        defaultAddress &&
        onSelectAddress
      ) {
        onSelectAddress(defaultAddress);
      } else if (
        updatedAddresses.length === 0 &&
        onSelectAddress
      ) {
        onSelectAddress(null);
      }

      toast.success(
        "Address deleted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete address"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // SELECT / MAKE DEFAULT
  // =========================

  const handleDefault = async (addressId) => {
    try {
      setActionLoading(true);

      const response =
        await client.patch(
          `user/set-default-address/${addressId}`
        );

      const updatedAddresses =
        response.data.addresses || [];

      setAddresses(updatedAddresses);

      const selectedAddress =
        updatedAddresses.find(
          (address) =>
            address._id === addressId
        );

      if (
        selectedAddress &&
        onSelectAddress
      ) {
        onSelectAddress(
          selectedAddress
        );
      }

      toast.success(
        "Address selected"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to select address"
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm">

      {/* HEADER */}

      <div className="mb-4 flex items-center justify-between gap-3">

        <div className="flex items-center gap-2.5">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5C4A3A] text-white">
            <MapPin
              size={16}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-stone-900">
              Saved Addresses
            </h2>

            <p className="mt-0.5 text-[10px] text-stone-500">
              Manage your saved addresses
              for faster checkout.
            </p>
          </div>

        </div>

        {/* ADD ADDRESS */}

        <button
          type="button"
          onClick={handleAdd}
          className="hidden h-9 items-center gap-1.5 rounded-lg border border-stone-300 px-3 text-[10px] font-semibold text-stone-700 transition hover:bg-stone-50 sm:inline-flex"
        >
          <Plus size={14} />
          Add Address
        </button>

      </div>

      {/* MOBILE ADD */}

      <button
        type="button"
        onClick={handleAdd}
        className="mb-4 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-stone-300 text-[10px] font-semibold text-stone-700 transition hover:bg-stone-50 sm:hidden"
      >
        <Plus size={14} />
        Add New Address
      </button>

      {/* LOADING */}

      {loading && (
        <div className="flex items-center justify-center py-8 text-xs text-stone-500">
          <Loader2
            size={16}
            className="mr-2 animate-spin"
          />
          Loading addresses...
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        addresses.length === 0 && (
          <div className="rounded-xl border border-dashed border-stone-200 py-8 text-center">

            <MapPin
              size={26}
              className="mx-auto mb-2 text-stone-400"
            />

            <h3 className="text-xs font-semibold text-stone-800">
              No saved addresses
            </h3>

            <p className="mt-1 text-[10px] text-stone-500">
              Add an address for faster
              checkout.
            </p>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#5C4A3A] px-3 text-[10px] font-semibold text-white transition hover:bg-[#49392d]"
            >
              <Plus size={13} />
              Add Address
            </button>

          </div>
        )}

      {/* ADDRESS CARDS */}

      {!loading &&
        addresses.length > 0 && (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

            {addresses.map(
              (address, index) => {
                const Icon =
                  index === 0
                    ? Home
                    : Briefcase;

                return (
                  <div
                    key={address._id}
                    className={`flex flex-col gap-3 rounded-xl border p-3 transition ${
                      address.isDefault
                        ? "border-[#5C4A3A] bg-stone-50"
                        : "border-stone-200 bg-white"
                    }`}
                  >

                    {/* CARD HEADER */}

                    <div className="flex items-center justify-between">

                      <div className="flex min-w-0 items-center gap-2">

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            address.isDefault
                              ? "bg-[#5C4A3A] text-white"
                              : "bg-stone-100 text-stone-700"
                          }`}
                        >
                          <Icon
                            size={14}
                            strokeWidth={1.75}
                          />
                        </div>

                        <span className="text-xs font-semibold text-stone-900">
                          {index === 0
                            ? "Home"
                            : "Address"}
                        </span>

                        {address.isDefault && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[8px] font-semibold text-amber-800">
                            Default
                          </span>
                        )}

                      </div>

                      {/* SELECT */}

                      <button
                        type="button"
                        onClick={() =>
                          !address.isDefault &&
                          handleDefault(
                            address._id
                          )
                        }
                        disabled={
                          actionLoading ||
                          address.isDefault
                        }
                        aria-label={
                          address.isDefault
                            ? "Selected address"
                            : "Select address"
                        }
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          address.isDefault
                            ? "border-[#5C4A3A] bg-[#5C4A3A] text-white"
                            : "border-stone-300 bg-white text-transparent hover:border-[#5C4A3A] hover:bg-stone-50"
                        }`}
                      >
                        <Check
                          size={13}
                          strokeWidth={3}
                        />
                      </button>

                    </div>

                    {/* ADDRESS DETAILS */}

                    <div className="text-[10px] leading-4 text-stone-600">

                      <p className="font-semibold text-stone-800">
                        {address.fullName}
                      </p>

                      <p>
                        {address.mobile}
                      </p>

                      <p className="mt-1">
                        {address.addressLine}
                      </p>

                      <p>
                        {address.city},{" "}
                        {address.state} -{" "}
                        {address.pincode}
                      </p>

                      <p>
                        {address.country}
                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-4 border-t border-stone-100 pt-2">

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(address)
                        }
                        disabled={
                          actionLoading
                        }
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-700 hover:text-black disabled:opacity-50"
                      >
                        <Pencil size={12} />
                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            address._id
                          )
                        }
                        disabled={
                          actionLoading
                        }
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      {/* ADD / EDIT FORM */}

      {showForm && (
        <div className="mt-5 border-t border-stone-200 pt-5">

          <div className="mb-4">

            <h3 className="text-sm font-semibold text-stone-900">
              {editingAddress
                ? "Edit Address"
                : "Add New Address"}
            </h3>

            <p className="mt-0.5 text-[10px] text-stone-500">
              Enter your delivery address
              details.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
          >

            {/* FULL NAME */}

            <div>
              <label className="mb-1 block text-[10px] font-semibold text-stone-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="h-9 w-full rounded-lg border border-stone-200 px-3 text-[10px] outline-none focus:border-[#5C4A3A]"
              />
            </div>

            {/* MOBILE */}

            <div>
              <label className="mb-1 block text-[10px] font-semibold text-stone-700">
                Mobile
              </label>

              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
                placeholder="Enter mobile number"
                className="h-9 w-full rounded-lg border border-stone-200 px-3 text-[10px] outline-none focus:border-[#5C4A3A]"
              />
            </div>

            {/* PINCODE */}

            <div>
              <label className="mb-1 block text-[10px] font-semibold text-stone-700">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                placeholder="Enter pincode"
                className="h-9 w-full rounded-lg border border-stone-200 px-3 text-[10px] outline-none focus:border-[#5C4A3A]"
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label className="mb-1 block text-[10px] font-semibold text-stone-700">
                Address
              </label>

              <input
                type="text"
                name="addressLine"
                value={form.addressLine}
                onChange={handleChange}
                required
                placeholder="House no, street, area"
                className="h-9 w-full rounded-lg border border-stone-200 px-3 text-[10px] outline-none focus:border-[#5C4A3A]"
              />
            </div>

            {/* CITY */}

            <div>
              <label className="mb-1 block text-[10px] font-semibold text-stone-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
                className="h-9 w-full rounded-lg border border-stone-200 px-3 text-[10px] outline-none focus:border-[#5C4A3A]"
              />
            </div>

            {/* STATE */}

            <div>
              <label className="mb-1 block text-[10px] font-semibold text-stone-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                placeholder="Enter state"
                className="h-9 w-full rounded-lg border border-stone-200 px-3 text-[10px] outline-none focus:border-[#5C4A3A]"
              />
            </div>

            {/* COUNTRY */}

            <div>
              <label className="mb-1 block text-[10px] font-semibold text-stone-700">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="h-9 w-full rounded-lg border border-stone-200 px-3 text-[10px] outline-none focus:border-[#5C4A3A]"
              />
            </div>

            {/* DEFAULT */}

            <div className="flex items-center gap-2 md:pt-5">

              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
                className="h-3.5 w-3.5 accent-[#5C4A3A]"
              />

              <label className="text-[10px] text-stone-700">
                Make this my default address
              </label>

            </div>

            {/* BUTTONS */}

            <div className="flex items-center gap-2 pt-2 md:col-span-2">

              <button
                type="submit"
                disabled={actionLoading}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#5C4A3A] px-4 text-[10px] font-semibold text-white transition hover:bg-[#49392d] disabled:opacity-60"
              >

                {actionLoading && (
                  <Loader2
                    size={13}
                    className="animate-spin"
                  />
                )}

                {editingAddress
                  ? "Update Address"
                  : "Save Address"}

              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAddress(null);
                }}
                className="h-9 rounded-lg border border-stone-200 px-4 text-[10px] font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

    </section>
  );
}