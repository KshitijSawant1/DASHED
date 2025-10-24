import React from "react";
import { Link } from "react-router-dom";
import bgPattern from "../../assets/bgpatterns/TBG1.svg";

/**
 * CoreCard — Adaptive layout
 * 📱 Mobile: square pattern div + title + icon button
 * 💻 Desktop: banner + title + description + CTA
 */
export default function CoreCard({
  to = "/",
  title,
  description,
  headerColor = "#2563eb",
  cta = "Open",
}) {
  const bannerStyle = {
    backgroundColor: `${headerColor}25`,
    backgroundImage: `url(${bgPattern}), linear-gradient(135deg, ${headerColor}30, ${headerColor}10)`,
    backgroundBlendMode: "overlay, normal",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="
        group
        bg-[var(--card)] text-[var(--text)]
        ring-1 ring-[var(--border)] shadow-sm
        rounded-xl overflow-hidden transition
        hover:shadow-lg hover:-translate-y-0.5
      "
    >
      {/* --- 📱 MOBILE: List row layout --- */}
      <div
        className="
          flex items-center justify-between
     sm:hidden
          border-b border-[var(--border)] last:border-none
        "
      >
        {/* Left: Square + title */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-md flex-shrink-0"
            style={{ backgroundColor: headerColor }}
          ></div>
          <Link
            to={to}
            className="font-medium text-[var(--text)] hover:underline"
          >
            {title}
          </Link>
        </div>

        {/* Right: circular icon button */}
        <Link
          to={to}
          className="
            w-8 h-8 flex items-center justify-center
            rounded-full text-white
            transition hover:scale-105 mr-2
            shadow-sm
          "
          style={{
            background: headerColor,
          }}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M1 5h12m0 0L9 1m4 4L9 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* --- 💻 DESKTOP: Full card layout --- */}
      <div className="hidden sm:flex flex-col">
        <Link to={to}>
          <div
            className="aspect-square sm:h-40 w-full flex items-center justify-center"
            style={bannerStyle}
          />
        </Link>

        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-[var(--muted)]">{description}</p>
          </div>

          <div className="pt-3">
            <Link
              to={to}
              className="
                inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold
                text-white transition
              "
              style={{
                background:
                  "linear-gradient(135deg, #6d28d9 0%, #2563eb 60%, #0ea5e9 100%)",
              }}
            >
              {cta}
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
