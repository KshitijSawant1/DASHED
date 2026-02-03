"use client";

import { useState } from "react";

export default function ProfilePage() {
  const firstName = "Alex";
  const lastName = "Craft";

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <section className="min-h-screen bg-neutral-50 px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        {/* Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 rounded-3xl bg-white p-8 shadow-xl">
          {/* ───────── LEFT : IDENTITY ───────── */}
          <aside className="flex flex-col items-center justify-center text-center border-r border-black/10 pr-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-black/10 bg-black text-white text-3xl font-semibold select-none">
              {initials}
            </div>

            <div className="mt-6">
              <p className="text-base font-semibold text-gray-900">
                {firstName} {lastName}
              </p>

              <p className="mt-0.5 text-sm text-gray-500">user@dashed.dev</p>

              <div className="mt-3 text-xs text-gray-500">
                Joined
                <span className="ml-1 font-medium text-gray-700">
                  12 Jan 2025
                </span>
              </div>
            </div>
          </aside>

          {/* ───────── RIGHT : DETAILS ───────── */}
          <div className="space-y-10">
            {/* Academic Info */}
            <section>
              <h3 className="section-title">Academic Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="label">College</label>
                  <input className="input" placeholder="Your college name" />
                </div>

                <div>
                  <label className="label">Field of Study</label>
                  <input
                    className="input"
                    placeholder="Computer Science, AI, etc."
                  />
                </div>
              </div>
            </section>

            {/* Personal Info */}
            <section>
              <h3 className="section-title">Personal Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="label">First Name</label>
                  <input className="input" placeholder="First name" />
                </div>

                <div>
                  <label className="label">Last Name</label>
                  <input className="input" placeholder="Last name" />
                </div>

                <div>
                  <label className="label">Date of Birth</label>
                  <input type="date" className="input" />
                </div>
              </div>
            </section>

            {/* Bio */}
            <section>
              <h3 className="section-title">About You</h3>

              <textarea
                rows={4}
                className="input resize-none mt-4"
                placeholder="Tell us a bit about yourself..."
              />
            </section>

            {/* Action */}
            <div className="flex justify-end pt-4">
              <button className="rounded-xl bg-black px-8 py-3 text-sm font-medium text-white hover:bg-black/90 transition shadow-lg">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── GLOBAL STYLES ───────── */}
      <style jsx global>{`
        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .input {
          width: 100%;
          height: 44px;
          border-radius: 0.6rem;
          border: 1px solid #e5e7eb;
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          background: white;
        }

        .input:focus {
          border-color: #000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08);
        }

        .section-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
        }
      `}</style>
    </section>
  );
}
