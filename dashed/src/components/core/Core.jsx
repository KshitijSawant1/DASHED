import React from "react";
import CoreCard from "./CoreCard";

// Adjust paths to match your router
const cards = [
  {
    to: "/profile",
    title: "Profile",
    description: "Manage your DASHED profile, theme, and status.",
    headerLabel: "Account",
    headerColor: "#7c3aed",
  },
  {
    to: "/stack",
    title: "Stack",
    description:
      "Visualize and interact with data structures in real time through DASHED’s Stack Visualizer.",
    headerLabel: "Visualizer",
    headerColor: "#2563eb", // a cool blue to represent logic/structure
  },
];

const Core = () => {
  return (
    <div>
      <main className="min-h-screen bg-[var(--surface)] text-[var(--text)]">
        {/* Soft background accent */}
        <div
          aria-hidden
          className="fixed inset-0 -z-10 opacity-20"
          style={{
            background:
              "radial-gradient(700px 300px at -10% -10%, rgba(124,58,237,.25), transparent 60%), radial-gradient(800px 400px at 120% 120%, rgba(14,165,233,.25), transparent 55%)",
          }}
        />

        <section className="max-w-6xl mx-auto px-4 pt-24 pb-12">
          {/* Header */}
          <header className="mb-6 sm:mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight">Core</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              Your quick menu to all major pages and modules.
            </p>
          </header>

          {/* Grid */}
          <div className="grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <CoreCard key={c.to} {...c} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Core;
