// src/pages/Signup.jsx
import React, { useState } from "react";
import logo from "../../assets/logos/L1.png";
import bgPattern from "../../assets/bgpatterns/TBG1.svg";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signUpNewUser } = useUserAuth(); // ✅ from your AuthContext

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { firstname, lastname, dob, phone, email, password } = form;

    const { success, error } = await signUpNewUser(
      firstname,
      lastname,
      dob,
      phone,
      email,
      password
    );

    setLoading(false);

    if (!success) {
      setErrorMsg(error?.message || "Signup failed. Try again.");
    } else {
      navigate("/profile"); // redirect after signup
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[--surface] px-3 py-6 sm:px-4 sm:py-8 text-[--text]">
      {/* Background pattern */}
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

      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[#eff6ff] dark:bg-[#0b1220] rounded-2xl sm:rounded-3xl ring-1 ring-gray-200 dark:ring-white/10 shadow-lg sm:shadow-xl">
        {/* LEFT: Gradient / Brand */}
        <div className="order-1 md:order-2 relative p-4 sm:p-6 text-white flex flex-col justify-between bg-[radial-gradient(700px_400px_at_-20%_-20%,rgba(139,92,246,.45),transparent_60%),radial-gradient(800px_500px_at_120%_120%,rgba(14,165,233,.42),transparent_55%),linear-gradient(120deg,#6d28d9_0%,#2563eb_55%,#0ea5e9_100%)]">
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
            {/* First Name */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                value={form.firstname}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] ring-1 ring-[--border] focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastname"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                value={form.lastname}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] ring-1 ring-[--border] focus:ring-2 focus:ring-sky-500"
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
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] ring-1 ring-[--border] focus:ring-2 focus:ring-sky-500"
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
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] ring-1 ring-[--border] focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* DOB & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="dob"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] ring-1 ring-[--border] focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs sm:text-sm font-medium mb-1"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                  className="w-full px-3 sm:px-4 py-2 rounded-lg text-sm bg-[--surface] ring-1 ring-[--border] focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2 font-semibold text-white bg-gradient-to-r from-violet-600 to-sky-500 hover:brightness-105 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Sign up"}
            </button>

            {/* Google login (optional future) */}
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg py-2 font-semibold text-sm bg-white text-[--text] ring-1 ring-gray-300 hover:bg-white/70 transition"
              onClick={() => alert("Google OAuth coming soon")}
            >
              <FcGoogle className="text-base sm:text-lg" /> Login with Google
            </button>

            {/* Error message */}
            {errorMsg && (
              <p className="text-center text-sm font-medium text-red-600 bg-red-100/80 rounded-md px-3 py-2">
                {errorMsg}
              </p>
            )}
          </form>

          <p className="text-xs sm:text-sm text-[--muted] mt-4 text-center">
            Have an account?{" "}
            <Link
              to="/signin"
              className="text-sky-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
