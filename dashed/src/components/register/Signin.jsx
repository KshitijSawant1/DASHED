// src/pages/Signin.jsx
import React, { useState } from "react";
import logo from "../../assets/logos/L1.png";
import bgPattern from "../../assets/bgpatterns/TBG1.svg";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setErrorMsg("This is a demo UI — hook up your auth to proceed.");
    }, 800);
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[--surface] px-3 py-6 sm:px-4 sm:py-8 text-[--text]">
      {/* Background pattern (scoped to Signin page only) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "#DFDBE5",
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />

      <section
        className="
          w-full z-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden
          bg-[#eff6ff] dark:bg-[#0b1220]
          rounded-2xl sm:rounded-3xl ring-1 ring-gray-200 dark:ring-white/10 shadow-lg sm:shadow-xl
        "
      >
        {/* LEFT: Gradient / Brand */}
        <div
          className="
            order-1 md:order-2 relative p-4 sm:p-8 text-white flex flex-col justify-between
            bg-[radial-gradient(700px_400px_at_-20%_-20%,rgba(139,92,246,.45),transparent_60%),radial-gradient(800px_500px_at_120%_120%,rgba(14,165,233,.42),transparent_55%),linear-gradient(120deg,#6d28d9_0%,#2563eb_55%,#0ea5e9_100%)]
          "
        >
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={logo}
              alt="Dashed Logo"
              className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg"
            />
            <span
              className="text-lg sm:text-2xl font-extrabold tracking-wide"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              DASHED
            </span>
          </div>

          {/* Hidden on mobile */}
          <div className="hidden md:block">
            <div className="mt-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                Learn visually.
                <br /> Master confidently.
              </h1>
              <p className="text-white/85 mt-2 max-w-sm text-sm">
                Sign in to continue your personalized learning journey with
                immersive visualizations and guided practice.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              SSO & password logins supported
            </div>
          </div>
        </div>

        {/* RIGHT: Signin Form */}
        <div className="order-2 md:order-1 p-5 sm:p-8">
          <div className="mb-5 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">Welcome back</h2>
            <p className="text-xs sm:text-sm text-[--muted] mt-1">
              Sign in to your Dashed account
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3 sm:space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium mb-1 text-[--text]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@domain.com"
                required
                className="
                  w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base
                  bg-[--surface] text-[--text]
                  ring-1 ring-[--border] dark:ring-white/10
                  focus:outline-none focus:ring-2 focus:ring-sky-500
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[10px] sm:text-xs text-sky-600 dark:text-sky-400 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="
                  w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base
                  bg-[--surface] text-[--text]
                  ring-1 ring-[--border] dark:ring-white/10
                  focus:outline-none focus:ring-2 focus:ring-sky-500
                "
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-[--border] text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs sm:text-sm text-[--muted]">
                  Remember me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full rounded-lg py-2 font-semibold text-sm sm:text-base text-white
                bg-gradient-to-r from-violet-600 to-sky-500
                hover:brightness-105 transition
                disabled:opacity-60
              "
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>

            {/* Error */}
            {errorMsg && (
              <p className="text-center text-xs sm:text-sm font-medium text-red-600 bg-red-100/80 dark:bg-red-900/20 ring-1 ring-red-200 dark:ring-red-900/40 rounded-md px-3 py-2">
                {errorMsg}
              </p>
            )}
          </form>

          {/* Footer */}
          <p className="text-xs sm:text-sm text-[--muted] mt-4 text-center">
            New to Dashed?{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sky-600 dark:text-sky-400 font-medium hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signin;
