// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiUser } from "react-icons/fi";
import { FaUserAstronaut } from "react-icons/fa";
import logoLight from "../assets/logos/L1.png";
import logoDark from "../assets/logos/L2.png";
import { useUserAuth } from "./context/AuthContext"; // adjust if your path differs

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth(); // <-- auth state

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // follow system only if user never toggled
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) =>
      document.documentElement.classList.toggle("dark", e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Reusable router link
  const NavBtn = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium
        transition-colors
        text-[--muted] hover:text-[--text]
        hover:bg-black/5 dark:hover:bg-white/10
        ${isActive ? "text-[--text] bg-black/5 dark:bg-white/10" : ""}
      `
      }
    >
      {children}
    </NavLink>
  );

  const ThemeButton = ({ className = "" }) => (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex h-9 w-9 items-center justify-center rounded-full
        bg-[--card] ring-1 ring-[--border] dark:ring-white/10
        text-[--text] hover:brightness-95 transition
        ${className}
      `}
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );

  // Link sets
  const authedLinks = [
    { to: "/core", label: "Core" },
    { to: "/stack", label: "Stack" },
    { to: "/editor", label: "Editor" },
  ];
  const publicLinks = [
    { to: "/signin", label: "Signin" },
    { to: "/signup", label: "Signup" },
  ];
  const links = user ? authedLinks : publicLinks;

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50"
      style={{ background: "transparent" }} // outer shell fully transparent
    >
      {/* Glass pill */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
        <div
          className="
            flex items-center justify-between
            rounded-2xl
            px-4 sm:px-6 py-2
            bg-[--card]/80
            ring-1
            shadow-[0_6px_20px_-12px_rgba(0,0,0,0.35)]
            backdrop-blur
          "
          style={{ border: "1px solid var(--border)" }}
        >
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logoLight}
              alt="Dashed"
              className="h-7 w-auto select-none dark:hidden"
              draggable="false"
            />
            <img
              src={logoDark}
              alt="Dashed"
              className="hidden h-7 w-auto select-none dark:block"
              draggable="false"
            />
            <span
              className="
                hidden sm:inline-block text-base font-extrabold tracking-tight
                bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent
              "
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              DASHED
            </span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavBtn key={l.to} to={l.to}>
                {l.label}
              </NavBtn>
            ))}

            {/* When signed in, show a compact icon link to Profile as well (optional) */}
            {user && (
              <button
                onClick={() => navigate("/profile")}
                className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full
                           text-[--text] hover:bg-black/5 dark:hover:bg-white/10 transition"
                title="Profile"
                aria-label="Profile"
              >
                <FaUserAstronaut size={18} />
              </button>
            )}

            <ThemeButton className="ml-2" />
          </div>

          {/* Mobile toggles (show Profile icon when signed in) */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <button
                onClick={() => navigate("/profile")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full
                           text-[--text] hover:bg-black/5 dark:hover:bg-white/10 transition"
                title="Profile"
                aria-label="Profile"
              >
                <FiUser size={18} />
              </button>
            )}
            <ThemeButton />
            <button
              onClick={() => setIsOpen((s) => !s)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full
                         text-[--text] hover:bg-black/5 dark:hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`
          md:hidden overflow-hidden transition-[max-height,opacity]
          ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
        style={{ background: "transparent" }}
      >
        <div className="mx-auto max-w-7xl px-6 pb-4">
          <div className="mt-2 grid gap-1 rounded-2xl bg-[--card]/80 ring-1 ring-[--border] p-2 backdrop-blur">
            {links.map((l) => (
              <NavBtn key={l.to} to={l.to}>
                {l.label}
              </NavBtn>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
