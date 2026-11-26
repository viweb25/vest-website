'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center bg-white font-sans text-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-red-600 mb-4">
          Global System Notice
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2B4C] mb-3">
          Something went wrong
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          {error?.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-[#FF6A00] text-white text-sm font-semibold shadow-md hover:bg-[#FF7A1A] transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
