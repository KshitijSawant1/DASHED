"use client";

import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="relative min-h-dvh bg-white overflow-hidden text-black">
      {/* Pulsing dashed concentric circles */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={i}
            cx="300"
            cy="300"
            r={60 + i * 22}
            stroke="black"
            strokeWidth="2"
            strokeDasharray="8 10"
            fill="none"
            opacity={0.12 + i * 0.03}
            style={{
              animation: `pulseRing 7s ease-in-out infinite`,
              animationDelay: `${i * 160}ms`,
            }}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-dvh">
        <div
          className="backdrop-blur-xl bg-white/60 border border-black/20
               rounded-2xl px-14 py-12 max-w-xl w-full
               shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-center"
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            Page Not Found
          </h1>

          <p className="text-lg mb-8 text-black/80">
            The page you are looking for does not exist, has been removed, or is
            temporarily unavailable.
          </p>

          <div className="flex justify-center items-center gap-4">
            <Link
              href="/"
              className="inline-block px-6 py-3 border-2 border-black
                   font-semibold transition
                   hover:bg-black hover:text-white"
            >
              Go back home
            </Link>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulseRing {
          0% {
            transform: scale(0.99);
            opacity: 0.18;
          }
          50% {
            transform: scale(1.015);
            opacity: 0.35;
          }
          100% {
            transform: scale(0.99);
            opacity: 0.18;
          }
        }
      `}</style>
    </div>
  );
}
