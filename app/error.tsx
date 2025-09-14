'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="glass-effect rounded-lg p-8 text-center max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-white/80 text-sm mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
