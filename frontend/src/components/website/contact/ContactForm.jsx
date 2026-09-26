
"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { client } from "@/utils/helper";

const DEFAULT_SUBJECTS = [
  "Select a subject",
  "Order Support",
  "Product Question",
  "Returns & Refunds",
  "Partnership",
  "Other",
];

function TextField({ label, ...props }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-stone-700">
        {label}
      </span>

      <input
        {...props}
        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#5c3a24] focus:outline-none focus:ring-1 focus:ring-[#5c3a24]"
      />
    </label>
  );
}

export default function ContactForm({
  subjects = DEFAULT_SUBJECTS,
  onSubmit,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (field) => (e) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: e.target.value,
    }));
  };

  // =========================
  // HANDLE FORM SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!form.subject || form.subject === "Select a subject") {
      toast.error("Please select a subject");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // BACKEND API REQUEST
      // =========================

      const response = await client.post(
        "user/contact",
        {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          subject: form.subject,
          message: form.message.trim(),
        }
      );

      // Success response
      if (response.data?.success) {
        toast.success(
          response.data.message ||
            "Your message has been sent successfully!"
        );

        // Reset form
        setForm({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Optional parent callback
        onSubmit?.(response.data);
      } else {
        toast.error(
          response.data?.message ||
            "Failed to send your message"
        );
      }
    } catch (error) {
      console.error(
        "Contact form error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5c3a24]">
          <Mail className="h-5 w-5 text-white" />
        </span>

        <div>
          <h2 className="text-base font-semibold text-stone-900 sm:text-lg">
            Send Us a Message
          </h2>

          <p className="text-xs text-stone-500 sm:text-sm">
            Fill out the form below and we&apos;ll get back to you soon.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange("fullName")}
            required
            disabled={loading}
          />

          <TextField
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange("email")}
            required
            disabled={loading}
          />
        </div>

        {/* Phone & Subject */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label="Phone Number (Optional)"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={handleChange("phone")}
            disabled={loading}
          />

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-stone-700">
              Subject
            </span>

            <select
              value={form.subject}
              onChange={handleChange("subject")}
              required
              disabled={loading}
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 focus:border-[#5c3a24] focus:outline-none focus:ring-1 focus:ring-[#5c3a24] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {subjects.map((subject) => (
                <option
                  key={subject}
                  value={
                    subject === "Select a subject"
                      ? ""
                      : subject
                  }
                >
                  {subject}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Message */}
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-stone-700">
            Your Message
          </span>

          <textarea
            rows={5}
            placeholder="Type your message here..."
            value={form.message}
            onChange={handleChange("message")}
            required
            disabled={loading}
            className="w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#5c3a24] focus:outline-none focus:ring-1 focus:ring-[#5c3a24] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5c3a24] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#4a2f1d] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}