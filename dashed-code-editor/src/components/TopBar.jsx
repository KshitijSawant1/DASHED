"use client";

export default function TopBar({ onMenuClick }) {
  return (
    <div className="flex items-center gap-3">
      {/* Hamburger Icon */}
      <button
        onClick={onMenuClick}
        className="w-10 h-10 flex flex-col justify-center items-center gap-1
                   border rounded bg-white shadow hover:bg-slate-50 transition-colors"
      >
        <span className="w-5 h-0.5 bg-slate-700"></span>
        <span className="w-5 h-0.5 bg-slate-700"></span>
        <span className="w-5 h-0.5 bg-slate-700"></span>
      </button>

      {/* Branding */}
      <h1 className="font-semibold text-lg text-slate-800">DASHED</h1>
    </div>
  );
}
