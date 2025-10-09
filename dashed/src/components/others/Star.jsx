// src/components/Star.jsx
import React from "react";

const Star = ({ size = 40, color = "#FFD700", duration = "2.5s" }) => {
  return (
    <div
      className="relative twinkle"
      style={{
        width: size,
        height: size,
        color,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute inset-0 w-full h-full"
      >
        <path d="M12 2l2.9 6.9L22 9.3l-5 4.9L18 21l-6-3.3L6 21l1-6.8-5-4.9 7.1-0.4L12 2z" />
      </svg>

      {/* Optional glow */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-50"
        style={{ background: color }}
      />
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.9; transform: scale(1); filter: drop-shadow(0 0 6px currentColor); }
          50% { opacity: 0.4; transform: scale(0.85); filter: drop-shadow(0 0 10px currentColor); }
        }
        .twinkle {
          animation: twinkle ${duration} ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Star;
