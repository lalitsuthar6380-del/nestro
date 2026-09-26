
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  ArrowLeft,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function ForgetPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await client.post(
        "user/forgot-password",
        {
          email: email.trim(),
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Password reset OTP sent successfully"
        );

        router.push(
          `/reset-password?email=${encodeURIComponent(
            response.data.email || email.trim()
          )}`
        );

        return;
      }

      toast.error(
        response.data.message ||
          "Unable to send password reset request"
      );
    } catch (error) {
      console.error("Forgot Password Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px]">
      <div className="w-full rounded-2xl bg-white px-6 py-7 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:px-8 sm:py-8">

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
            <LockKeyhole
              size={25}
              strokeWidth={1.6}
              className="text-[#5C4A3A]"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="font-serif text-[26px] leading-tight text-stone-900 sm:text-[28px]">
            Forgot Password?
          </h1>

          <p className="mx-auto mt-2 max-w-[300px] text-sm leading-6 text-stone-500">
            Enter your email address and we'll help you reset your password.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium text-stone-700"
            >
              Email Address
            </label>

            <div className="flex h-[48px] items-center gap-3 rounded-xl border border-stone-300 px-4 transition focus-within:border-stone-500 focus-within:ring-2 focus-within:ring-stone-200">
              <Mail
                size={18}
                strokeWidth={1.7}
                className="shrink-0 text-stone-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
                required
                className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#5C4A3A] text-sm font-medium text-white transition hover:bg-[#4A3B2E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Sending Request...
              </>
            ) : (
              <>
                Continue
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/sign_in"
            className="flex items-center gap-2 text-xs font-medium text-stone-700 transition hover:text-stone-950 sm:text-sm"
          >
            <ArrowLeft size={15} />
            Back to Login
          </Link>
        </div>

        {/* Signup */}
        <p className="mt-5 text-center text-xs text-stone-500 sm:text-sm">
          Don't have an account?{" "}

          <Link
            href="/sign_up"
            className="font-semibold text-stone-900 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}