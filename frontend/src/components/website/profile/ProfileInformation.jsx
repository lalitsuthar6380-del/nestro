"use client";

import { useEffect, useState } from "react";
import { User, Loader2 } from "lucide-react";

import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function ProfileInformation() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // GET LOGGED-IN USER
  // =========================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await client.get("user/get-me");

      if (response.data?.success) {
        const user = response.data.user;

        setForm({
          fullName: user?.name || "",
          email: user?.email || "",
          phone: user?.mobile || "",
        });
      }
    } catch (error) {
      console.error("Get Profile Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await client.put(
        "user/update-profile",
        {
          name: form.fullName,
          email: form.email,
          mobile: form.phone,
        }
      );

      if (response.data?.success) {
        const user = response.data.user;

        setForm({
          fullName: user?.name || "",
          email: user?.email || "",
          phone: user?.mobile || "",
        });

        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update Profile Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <section className="flex min-h-[300px] items-center justify-center rounded-2xl bg-white shadow-sm">
        <Loader2
          size={24}
          className="animate-spin text-[#5C4A3A]"
        />
      </section>
    );
  }

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm md:p-5">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-5 flex items-center gap-2.5">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5C4A3A] text-white">
          <User
            size={17}
            strokeWidth={1.75}
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold leading-tight text-stone-900">
            Profile Information
          </h2>

          <p className="mt-0.5 text-[11px] leading-tight text-stone-500">
            Keep your personal information up to date.
          </p>
        </div>

      </div>

      {/* =========================
          FORM
      ========================= */}
      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* FULL NAME */}
          <Field label="Full Name">
            <input
              type="text"
              value={form.fullName}
              onChange={handleChange("fullName")}
              placeholder="Enter your full name"
              required
              className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-xs text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </Field>

          {/* EMAIL */}
          <Field label="Email Address">
            <input
              type="email"
              value={form.email}
              disabled
              className="h-10 w-full cursor-not-allowed rounded-lg border border-stone-200 bg-stone-100 px-3 text-xs text-stone-500"
            />
          </Field>

          {/* PHONE */}
          <Field label="Phone Number">
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="Enter phone number"
              className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-xs text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </Field>

          {/* SAVE BUTTON */}
          <div className="flex items-end md:justify-end">
            <button
              type="submit"
              disabled={saving}
              className="h-10 w-full rounded-lg bg-stone-900 px-4 text-xs font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>

      </form>
    </section>
  );
}

// =========================
// FIELD COMPONENT
// =========================
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-stone-600">
        {label}
      </span>

      {children}
    </label>
  );
}
