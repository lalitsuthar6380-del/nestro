
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>

        {/* Text */}
        <p className="mt-4 text-sm font-medium text-gray-600">
          Loading Admin...
        </p>
      </div>
    </div>
  );
}