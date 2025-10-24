import React from "react";
import { useNavigate } from "react-router-dom";
import logoLight from "../../assets/logos/L1.png";
import logoDark from "../../assets/logos/L2.png";

export default function PagesHub() {
  const navigate = useNavigate();

  const pages = [
    { name: "Hero", path: "/" },
    { name: "Signin", path: "/signin" },
    { name: "Signup", path: "/signup" },
    { name: "Profile", path: "/profile" },
    { name: "Stack Visualizer", path: "/stack" },
    { name: "Page Not Found", path: "/404" },
  ];

  return (
    <main
      className="
        min-h-screen flex flex-col items-center justify-center
        px-6 bg-[var(--surface)] text-[var(--text)]
        transition-colors duration-300
        mt-[10px] md:mt-10
      "
    >
      {/* Header */}
      <div className="text-center mb-10">
        {/* Light logo */}
        <img
          src={logoLight}
          alt="DASHED Logo"
          className="w-14 h-14 mx-auto mb-3 rounded transition-transform hover:scale-105 dark:hidden"
        />
        {/* Dark logo */}
        <img
          src={logoDark}
          alt="DASHED Logo"
          className="w-14 h-14 mx-auto mb-3 rounded transition-transform hover:scale-105 hidden dark:block"
        />

        <h1
          className="text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Audiowide', sans-serif" }}
        >
          DASHED Pages Hub
        </h1>
        <p className="text-sm mt-1 text-[var(--muted)]">
          Quick navigation for development &amp; testing
        </p>
      </div>

      {/* Card + Buttons */}
      <section
        className="
          w-full max-w-5xl rounded-2xl shadow-xl p-6 sm:p-8 ring-1
          backdrop-blur transition-all
        "
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {pages.map((page) => (
            <button
              key={page.path}
              onClick={() => navigate(page.path)}
              className={`
                group px-4 py-3 rounded-xl text-sm sm:text-base font-semibold
                transition-all duration-200
                hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                border
                border-[color:var(--border)]
                bg-[var(--card)] text-[var(--text)]
                shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                dark:border-white/50
                dark:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_8px_rgba(255,255,255,0.06)]
                dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_0_12px_rgba(255,255,255,0.18)]
                focus-visible:ring-[color:var(--text)]
              `}
            >
              {page.name}
            </button>
          ))}
        </div>


      </section>

      {/* Footer */}
      <footer className="mt-8 text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} DASHED Project — Navigation Hub
      </footer>
    </main>
  );
}
