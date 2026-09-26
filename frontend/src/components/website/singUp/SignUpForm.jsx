"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function Signup() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!form.password) {
      toast.error("Please enter your password");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // SAME BACKEND LOGIC AS YOUR ORIGINAL PAGE
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      const response = await client.post(
        "user/register",
        payload
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Account created successfully"
        );

        router.push(
          `/verify_otp?email=${response.data.email}`
        );

        return;
      }

      toast.error(
        response.data.message ||
          "Unable to create your account."
      );
    } catch (error) {
      console.error("Signup Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px]">
      <div className="w-full rounded-2xl bg-white px-6 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:px-8 sm:py-7">

            {/* Heading */}
            <div className="mb-4 text-center">
              <h1 className="font-serif text-[26px] leading-tight text-stone-900 sm:text-[28px]">
                Create Account
              </h1>

              <p className="mt-1 text-sm text-stone-500">
                Create your account and get started
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-2.5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-medium text-stone-700"
                >
                  Full Name
                </label>

                <div className="flex h-[48px] items-center gap-3 rounded-xl border border-stone-300 px-4 transition focus-within:border-stone-500 focus-within:ring-2 focus-within:ring-stone-200">

                  <User
                    size={18}
                    strokeWidth={1.7}
                    className="shrink-0 text-stone-400"
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange("name")}
                    autoComplete="name"
                    disabled={loading}
                    required
                    className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium text-stone-700"
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
                    value={form.email}
                    onChange={handleChange("email")}
                    autoComplete="email"
                    disabled={loading}
                    required
                    className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-xs font-medium text-stone-700"
                >
                  Password
                </label>

                <div className="flex h-[48px] items-center gap-3 rounded-xl border border-stone-300 px-4 transition focus-within:border-stone-500 focus-within:ring-2 focus-within:ring-stone-200">

                  <Lock
                    size={18}
                    strokeWidth={1.7}
                    className="shrink-0 text-stone-400"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange("password")}
                    autoComplete="new-password"
                    minLength={6}
                    disabled={loading}
                    required
                    className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    disabled={loading}
                    className="shrink-0 text-stone-400 transition hover:text-stone-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  disabled={loading}
                  className="mt-0.5 h-4 w-4 accent-[#5C4A3A]"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-stone-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-stone-800 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-stone-800 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-0.5 flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#5C4A3A] text-sm font-medium text-white transition hover:bg-[#4A3B2E] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-stone-200" />

              <span className="text-[11px] text-stone-400">
                OR
              </span>

              <span className="h-px flex-1 bg-stone-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              disabled={loading}
              className="flex h-[44px] w-full items-center justify-center gap-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Apple */}
            <button
              type="button"
              disabled={loading}
              className="mt-2 flex h-[44px] w-full items-center justify-center gap-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
            >
              <AppleIcon />
              Continue with Apple
            </button>

            {/* Login */}
            <p className="mt-3 text-center text-xs text-stone-500 sm:text-sm">
              Already have an account?{" "}

              <Link
                href="/sign_in"
                className="font-semibold text-stone-900 hover:underline"
              >
                Login
              </Link>
            </p>
      </div>
      </div>
  );
}

/* Google Icon */
function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}

/* Apple Icon */
function AppleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 384 512"
      aria-hidden="true"
      fill="#000"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 37 59 127.6 107.2 126.1 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-83.1 102.6-120.2-65.2-30.7-57.7-90-57.7-91.9zM256.4 88.9c26.9-32 24.5-61.1 23.7-71.6-23.8 1.4-51.3 16.4-67 34.9-17.3 19.6-27.5 43.9-25.4 71 25.9 2 49.5-11.4 68.7-34.3z" />
    </svg>
  );
}
