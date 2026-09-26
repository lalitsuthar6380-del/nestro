export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        {/* Spinner */}
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          Loading Dashboard
        </h2>

        {/* Description */}
        <p className="mt-2 text-gray-600">
          Please wait while we prepare your dashboard...
        </p>

        {/* Loading Bar */}
        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/3 animate-pulse bg-black"></div>
        </div>
      </div>
    </main>
  );
}