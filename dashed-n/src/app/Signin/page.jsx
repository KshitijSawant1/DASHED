"use client";

import { useState } from "react";
import Image from "next/image";

export default function Signin() {
  const [loading, setLoading] = useState(false);

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* ───────────────── LEFT : VISUAL PANEL ───────────────── */}
      <div
        className="relative hidden md:flex items-center justify-center overflow-hidden border-r-2 border-black"
        style={{
          backgroundColor: "#ffff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%239C92AC' fill-opacity='0.5'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Soft gradient overlay (keeps pattern subtle) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-white/40" />

        {/* Glass card */}
        <div className="relative z-10 max-w-xl xl:max-w-2xl rounded-3xl bg-white/60 backdrop-blur-md p-14 xl:p-16 shadow-2xl">
          <p className="text-base uppercase tracking-wide text-gray-600 mb-6">
            Learn visually
          </p>

          <h2 className="text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-[1.05] text-gray-900">
            Digital platform
            <br />
            for distance
            <br />
            <span className="text-black">learning.</span>
          </h2>

          <p className="mt-6 text-base xl:text-lg text-gray-600 leading-relaxed">
            You will never know everything.
            <br />
            But you will know more.
          </p>
        </div>
      </div>

      {/* ───────────────── RIGHT : SIGNIN FORM ───────────────── */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo + Heading */}
          <div className="mb-10 space-y-4">
            <div className="space-y-1">
              <h2 className="text-4xl font-bold text-gray-900">
                Hey, Welcome back
              </h2>
              <p className="text-sm text-gray-500">
                Sign in to continue your visual problem-solving journey.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <input
                type="email"
                placeholder="Email address"
                className="input"
              />
              <p className="text-[11px] text-gray-400">
                Use the email you registered with
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <input type="password" placeholder="Password" className="input" />
              <p className="text-[11px] text-gray-400">
                Must be at least 8 characters
              </p>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label>

              <span className="text-gray-500 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium
        hover:bg-black/90 transition shadow-md"
            >
              Sign In
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              New to DASHED?{" "}
              <span className="text-black font-medium hover:underline cursor-pointer">
                Create an account
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* ───────────────── INPUT STYLES ───────────────── */}
      <style jsx global>{`
        .input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          border-radius: 0.6rem;
          border: 1px solid #e5e7eb;
          background: white;
          outline: none;
          transition:
            border-color 0.15s,
            box-shadow 0.15s;
        }

        .input:focus {
          border-color: #000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </section>
  );
}
