"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-lg text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-200">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-8 text-4xl font-bold text-gray-900">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-7">
          An unexpected error occurred while processing your request.
          Please try again. If the problem persists, return to the
          homepage and try later.
        </p>

        {/* Error Message (Development Only) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-left">
            <p className="text-sm font-medium text-red-700">
              {error.message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-400">
          Error Code: 500 • Please contact support if this issue continues.
        </p>
      </div>
    </main>
  );
}