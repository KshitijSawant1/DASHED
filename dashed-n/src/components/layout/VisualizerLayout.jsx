import React from "react";

export default function VisualizerLayout({ top, left, main, bottom }) {
  return (
    <div className="h-screen w-full grid grid-rows-[10vh_1fr_10vh] bg-white">
      {/* ───────── TOP BAR (10%) ───────── */}
      <header className="border-b border-black/10 px-3 py-3">
        <div className="mx-auto w-full max-w-screen-xl overflow-hidden">
          <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-2">
            {/* LEFT */}
            <div className="flex h-10 items-center">{top}</div>

            {/* RIGHT */}
            <div className="flex h-10 items-center justify-between min-w-0"></div>
          </div>
        </div>
      </header>

      {/* ───────── MAIN AREA (80%) ───────── */}
      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Left sidebar */}
        <aside className="border-r border-black/10 h-full grid grid-rows-3">
          {/* ───── TOP (33%) ───── */}
          <div className="p-4 border-b border-black/10 overflow-y-auto">
            {left?.top}
          </div>

          {/* ───── MIDDLE (33%) ───── */}
          <div className="p-4 border-b border-black/10 overflow-y-auto">
            {left?.middle}
          </div>

          {/* ───── BOTTOM (33%) ───── */}
          <div className="p-4 overflow-y-auto">{left?.bottom}</div>
        </aside>

        {/* Visualizer canvas */}
        <section className="relative overflow-hidden">{main}</section>
      </main>

      {/* ───────── CONTROL PANEL (10%) ───────── */}
      <footer className="border-t border-black/10 px-6 flex items-center justify-between">
        {bottom}
      </footer>
    </div>
  );
}
