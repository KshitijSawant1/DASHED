// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import logoLight from "../assets/logos/L1.png"; // <- adjust paths if needed
import logoDark from "../assets/logos/L2.png";

const Navbar = () => {
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

  const Link = ({ href, children, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="
        inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium
        text-[--muted] hover:text-[--text]
        hover:bg-black/5 dark:hover:bg-white/10
        transition-colors
      "
    >
      {children}
    </a>
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

  return (
    <nav
      className="
        fixed inset-x-0 top-0 z-50
        backdrop-blur supports-[backdrop-filter]:bg-transparent
      "
      // subtle glass with theme vars
      style={{
        background: "color-mix(in srgb, var(--surface) 70%, transparent)",
      }}
    >
      {/* Pill container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
        <div
          className="
            flex items-center justify-between
            rounded-2xl bg-[--card]/80 ring-1 ring-[--border] dark:ring-white/10
            px-4 sm:px-6 py-2 shadow-sm ring-gray-300
          "
        >
          {/* Brand */}
          <a href="#" className="flex items-center gap-3">
            {/* switch logos with theme */}
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
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="#about">About</Link>
            <Link href="#features">Features</Link>
            <Link href="#contact">Contact</Link>
            <ThemeButton className="ml-2" />
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden flex items-center gap-2">
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
        style={{
          background: "color-mix(in srgb, var(--surface) 85%, transparent)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 pb-4">
          <div className="mt-2 grid gap-1 rounded-2xl bg-[--card]/80 ring-1 ring-[--border] dark:ring-white/10 p-2">
            <Link href="#about" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="#features" onClick={() => setIsOpen(false)}>
              Features
            </Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
