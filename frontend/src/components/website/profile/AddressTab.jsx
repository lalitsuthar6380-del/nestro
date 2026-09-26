"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Home,
  Briefcase,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

import { client } from "@/utils/helper";
import { toast } from "sonner";

import AddressForm from "./AddressForm";

export default function AddressTab() {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // =========================
  // GET ADDRESSES
  // =========================
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await client.get("user/get-me");

      if (response.data?.success) {
        setAddresses(
          response.data.user?.addresses || []
        );
      }
    } catch (error) {
      console.error("Get Addresses Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // =========================
  // ADD / UPDATE SUCCESS
  // =========================
  const handleAddressAdded = (updatedAddresses) => {
    setAddresses(updatedAddresses || []);

    setShowForm(false);
    setEditingAddress(null);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  // =========================
  // CANCEL FORM
  // =========================
  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (addressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    try {
      setActionLoading(true);

      const response = await client.delete(
        `user/delete-address/${addressId}`
      );

      if (response.data?.success) {
        setAddresses(
          response.data.addresses || []
        );

        toast.success(
          response.data.message ||
            "Address deleted successfully"
        );
      }
    } catch (error) {
      console.error("Delete Address Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete address"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // MAKE DEFAULT
  // =========================
  const handleDefault = async (addressId) => {
    try {
      setActionLoading(true);

      const response = await client.patch(
        `user/set-default-address/${addressId}`
      );

      if (response.data?.success) {
        setAddresses(
          response.data.addresses || []
        );

        toast.success(
          response.data.message ||
            "Default address updated"
        );
      }
    } catch (error) {
      console.error(
        "Default Address Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to update default address"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-[280px] items-center justify-center">
        <Loader2
          size={24}
          className="animate-spin text-[#5C4A3A]"
        />
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h3 className="text-base font-semibold text-stone-900">
            Saved Addresses
          </h3>

          <p className="mt-1 text-xs text-stone-500">
            Add and manage your delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setEditingAddress(null);
              setShowForm(true);
            }
          }}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-[#5C4A3A] px-4 text-xs font-semibold text-white transition hover:bg-[#493a2e] active:scale-[0.98]"
        >
          {showForm ? "Close Form" : "+ Add Address"}
        </button>

      </div>

      {/* =========================
          ADDRESS FORM
      ========================= */}
      {showForm && (
        <div className="mb-5">
          <AddressForm
            editingAddress={editingAddress}
            onAddressAdded={handleAddressAdded}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* =========================
          EMPTY STATE
      ========================= */}
      {addresses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-5 py-10 text-center">

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm">
            <MapPin size={21} />
          </div>

          <h3 className="text-sm font-semibold text-stone-800">
            No saved addresses
          </h3>

          <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-stone-500">
            Add your first delivery address to make
            your checkout faster and easier.
          </p>

          {!showForm && (
            <button
              type="button"
              onClick={() => {
                setEditingAddress(null);
                setShowForm(true);
              }}
              className="mt-4 rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 transition hover:border-[#5C4A3A]"
            >
              Add Your First Address
            </button>
          )}

        </div>
      ) : (

        /* =========================
           ADDRESS CARDS
        ========================= */
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">

          {addresses.map((item, index) => {
            const Icon =
              index === 0 ? Home : Briefcase;

            return (
              <div
                key={item._id}
                className="rounded-xl border border-stone-200 bg-white p-4 transition hover:border-stone-300 hover:shadow-sm"
              >

                {/* =========================
                    CARD HEADER
                ========================= */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-2.5">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                      <Icon
                        size={16}
                        strokeWidth={1.75}
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-stone-900">
                        {item.fullName}
                      </h3>

                      <p className="mt-0.5 text-xs text-stone-500">
                        {item.mobile}
                      </p>
                    </div>

                  </div>

                  {item.isDefault && (
                    <span className="shrink-0 rounded-full bg-[#5C4A3A] px-2.5 py-1 text-[10px] font-semibold text-white">
                      Default
                    </span>
                  )}

                </div>

                {/* =========================
                    ADDRESS
                ========================= */}
                <div className="mt-3 rounded-lg bg-stone-50 p-3">

                  <p className="text-xs leading-5 text-stone-700">
                    {item.addressLine}
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-stone-700">
                    {item.city}, {item.state} -{" "}
                    {item.pincode}
                  </p>

                  <p className="mt-0.5 text-[11px] text-stone-500">
                    {item.country}
                  </p>

                </div>

                {/* ACTIONS */}
                <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-stone-100 pt-3">

                  {/* EDIT */}
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(item)
                    }
                    disabled={actionLoading}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 transition hover:text-stone-900 disabled:opacity-50"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    disabled={actionLoading}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 transition hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>

                  {/* DEFAULT */}
                  {!item.isDefault && (
                    <button
                      type="button"
                      onClick={() =>
                        handleDefault(item._id)
                      }
                      disabled={actionLoading}
                      className="text-xs font-semibold text-[#5C4A3A] transition hover:text-[#493a2e] disabled:opacity-50"
                    >
                      Make Default
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}