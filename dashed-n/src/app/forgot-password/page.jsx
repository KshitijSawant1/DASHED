"use client";

import { useState } from "react";
import Image from "next/image";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6">
      {/* Card */}
      <div
        className="
          w-full max-w-md
          rounded-2xl
          bg-white
          border border-black/10
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          p-8 md:p-10
        "
      >
        {/* Logo + Heading */}
        <div className="mb-8 space-y-3 text-center">
          <Image
            src="/Logos/L1.png"
            alt="DASHED Logo"
            width={44}
            height={44}
            className="mx-auto"
            priority
          />

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Forgot your password?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email and we’ll send you a reset link
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setSent(true);
              setLoading(false);
            }, 1200);
          }}
        >
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Email address"
              className="input pl-10"
            />
          </div>

          {/* Feedback */}
          {sent && (
            <p className="text-sm text-green-600 text-center">
              Reset link sent. Please check your inbox.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg
              bg-black text-white py-2.5 text-sm font-medium
              hover:bg-black/90 transition
              disabled:opacity-60
            "
          >
            {loading ? "Sending link..." : "Send reset link"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 pt-2">
            Remembered your password?{" "}
            <span className="text-black font-medium hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </form>
      </div>

      {/* Input styles */}
      <style jsx global>{`
        .input {
          width: 100%;
          padding: 0.65rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          background: white;
          outline: none;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .input:focus {
          border-color: #000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </section>
  );
}
