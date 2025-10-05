// src/components/PillCarousel.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";

/**
 * Props:
 * - items: string[]
 * - speed: number (pixels per second, defaults 60)
 * - pauseOnHover: boolean (default true)
 */

const colors = [
  "bg-violet-600",
  "bg-blue-600",
  "bg-emerald-600",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-red-500",
];
const PillCarousel = ({ items = [], speed = 60, pauseOnHover = true }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(20); // seconds

  // Duplicate items so the loop is seamless
  const loopItems = useMemo(() => [...items, ...items], [items]);

  // Compute animation duration from content width and speed
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // total distance to travel = half of the track (because we duplicated once)
    // width might change on resize, so recalc
    const calc = () => {
      const half = track.scrollWidth / 2;
      const seconds = half / Math.max(speed, 1);
      setDuration(Math.max(seconds, 8)); // clamp a sensible minimum
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(track);
    ro.observe(container);
    return () => ro.disconnect();
  }, [speed, items.length]);

  return (
    <div
      ref={containerRef}
      className={`group relative w-full overflow-hidden  border-[--border] bg-[--card] px-2 py-3 mt-2 mb-2`}
    >
      {/* 2 side-by-side tracks moving left; the 2nd starts where the 1st ends */}
      <div
        ref={trackRef}
        className={`marquee ${
          pauseOnHover ? "group-hover:marquee-paused" : ""
        } flex w-max whitespace-nowrap`}
        style={{ ["--marquee-duration"]: `${duration}s` }}
      >
        {loopItems.map((item, i) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <span
              key={i}
              className={`mx-2 inline-flex select-none items-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition ${randomColor}`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PillCarousel;
