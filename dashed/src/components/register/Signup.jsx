// src/pages/Signup.jsx
import React, { useState } from "react";
import logo from "../../assets/logos/L1.png";
import bgPattern from "../../assets/bgpatterns/TBG1.svg";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
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
      {/* Background pattern layer */}
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
          w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden
          bg-[#eff6ff] dark:bg-[#0b1220]
          rounded-2xl sm:rounded-3xl ring-1 ring-gray-200 dark:ring-white/10 shadow-lg sm:shadow-xl
        "
      >
        {/* LEFT: Gradient / Brand */}
        <div
          className="
            order-1 md:order-2 relative p-4 sm:p-6 text-white flex flex-col justify-between
            bg-[radial-gradient(700px_400px_at_-20%_-20%,rgba(139,92,246,.45),transparent_60%),radial-gradient(800px_500px_at_120%_120%,rgba(14,165,233,.42),transparent_55%),linear-gradient(120deg,#6d28d9_0%,#2563eb_55%,#0ea5e9_100%)]
          "
        >
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

          {/* Hidden on mobile, visible from md up */}
          <div className="hidden md:block">
            <div className="mt-6">
              <h1 className="text-2xl font-extrabold leading-snug">
                Start your journey.
                <br /> Grow with clarity.
              </h1>
              <p className="text-white/85 mt-2 max-w-sm text-sm">
                Sign up to explore immersive learning paths, real-time
                visualizations, and hands-on coding experiences — designed to
                make every concept click.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Guided learning • Smart visuals • Seamless progress tracking
            </div>
          </div>
        </div>

        {/* RIGHT: Signup Form */}
        <div className="order-2 md:order-1 p-5 sm:p-8">
          <div className="mb-5 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">
              Create your account
            </h2>
            <p className="text-xs sm:text-sm text-[--muted] mt-1">
              Join Dashed and start learning visually
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3 sm:space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                className="
                  w-full px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base
                  bg-[--surface] text-[--text]
                  ring-1 ring-[--border] dark:ring-white/10
                  focus:outline-none focus:ring-2 focus:ring-sky-500
                "
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
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
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                Password
              </label>
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

            {/* Age & Focus */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="age"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  placeholder="18"
                  className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] text-[--text] ring-1 ring-[--border] dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label
                  htmlFor="goal"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Focus
                </label>
                <select
                  id="goal"
                  className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] text-[--text] ring-1 ring-[--border] dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  defaultValue="DSA"
                >
                  {["DSA", "WebDev", "ML", "CP", "Interview Prep"].map(
                    (goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2 font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-violet-600 to-sky-500 hover:brightness-105 transition disabled:opacity-60"
            >
              {loading ? "Creating…" : "Sign up"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="h-px flex-1 bg-gray-300 dark:bg-white/10" />
              <span className="text-[10px] sm:text-xs text-[--muted]">OR</span>
              <span className="h-px flex-1 bg-gray-300 dark:bg-white/10" />
            </div>

            {/* Google login */}
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg py-2 font-semibold text-sm bg-white text-[--text] dark:bg-[#0f172a] ring-1 ring-gray-300 dark:ring-white/10 hover:bg-white/70 dark:hover:bg-white/10 transition"
            >
              <FcGoogle className="text-base sm:text-lg" /> Login with Google
            </button>

            {/* Error */}
            {errorMsg && (
              <p className="text-center text-xs sm:text-sm font-medium text-red-600 bg-red-100/80 dark:bg-red-900/20 ring-1 ring-red-200 dark:ring-red-900/40 rounded-md px-3 py-2">
                {errorMsg}
              </p>
            )}
          </form>

          <p className="text-xs sm:text-sm text-[--muted] mt-4 text-center">
            Have an account?{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sky-600 dark:text-sky-400 font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
