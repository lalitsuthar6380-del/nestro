"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { client } from "@/utils/helper";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!form.password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const response = await client.post("user/login", {
        email: form.email.trim(),
        password: form.password,
        rememberMe,
      });

      if (response.data?.success) {
        toast.success(
          response.data?.message || "Login successful"
        );

        router.push("/");
        router.refresh();
      } else {
        toast.error(
          response.data?.message || "Unable to login"
        );
      }
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] max-h-[570px] rounded-2xl bg-white px-7 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:px-8 sm:py-7">

      {/* Heading */}
      <div className="mb-5 text-center">
        <h2 className="font-serif text-[28px] leading-tight text-stone-900">
          Welcome Back
        </h2>

        <p className="mt-1 text-sm leading-5 text-stone-500">
          Login to your Nestro account
          <br />
          and continue your journey.
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Email */}
        <div className="flex h-[50px] items-center gap-3 rounded-xl border border-stone-300 px-4 transition focus-within:border-stone-500 focus-within:ring-2 focus-within:ring-stone-200">

          <Mail
            size={18}
            strokeWidth={1.7}
            className="shrink-0 text-stone-400"
          />

          <input
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

        {/* Password */}
        <div className="flex h-[50px] items-center gap-3 rounded-xl border border-stone-300 px-4 transition focus-within:border-stone-500 focus-within:ring-2 focus-within:ring-stone-200">

          <Lock
            size={18}
            strokeWidth={1.7}
            className="shrink-0 text-stone-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange("password")}
            autoComplete="current-password"
            disabled={loading}
            required
            className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((value) => !value)
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

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between pt-1">

          <label className="flex cursor-pointer items-center gap-2 text-xs text-stone-600 sm:text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
              disabled={loading}
              className="h-4 w-4 accent-[#5C4A3A]"
            />

            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-medium text-stone-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#5C4A3A] text-sm font-medium text-white transition hover:bg-[#4A3B2E] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />
              Logging in...
            </>
          ) : (
            <>
              Login
              <span>→</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center gap-3">
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
        className="flex h-[46px] w-full items-center justify-center gap-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Apple */}
      <button
        type="button"
        disabled={loading}
        className="mt-2.5 flex h-[46px] w-full items-center justify-center gap-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
      >
        <AppleIcon />
        Continue with Apple
      </button>

      {/* Signup */}
      <p className="mt-4 text-center text-xs text-stone-500 sm:text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign_up"
          className="font-semibold text-stone-900 hover:underline"
        >
          Sign Up
        </Link>
      </p>
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