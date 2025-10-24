// src/components/stack/StackBottomNav.jsx
import React from "react";
import { HiArrowPath } from "react-icons/hi2";
import { MdModeOfTravel } from "react-icons/md";
import { SiQuicklook } from "react-icons/si";
import { CgPushChevronDown, CgPushChevronUp } from "react-icons/cg";

function NavButton({ title, onClick, icon: Icon, rounded }) {
  // rounded: 'l' | 'r' | undefined for rounded corners on ends
  const roundedCls =
    rounded === "l"
      ? "rounded-l-2xl"
      : rounded === "r"
      ? "rounded-r-2xl"
      : "rounded-xl";

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={[
        "relative group overflow-hidden",
        "flex flex-col items-center justify-center gap-1",
        "px-5 h-full",
        roundedCls,
        // high-contrast base w/ smooth transitions
        "transition-all duration-200 ease-out",
        "hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
      ].join(" ")}
    >
      {/* click pulse */}
      <span
        className={[
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-indigo-500/10",
          "opacity-0 scale-75",
          "transition-all duration-200",
          "group-active:opacity-100 group-active:scale-100",
        ].join(" ")}
      />
      {/* hover glow ring (subtle) */}
      <span
        className={[
          "pointer-events-none absolute inset-0 rounded-2xl",
          "ring-0 group-hover:ring-1 ring-blue-400/30 dark:ring-sky-400/30",
          "transition-all duration-200",
        ].join(" ")}
      />

      <Icon
        className={[
          "z-10",
          "w-6 h-6", // bigger icon
          "text-gray-700 dark:text-gray-300",
          "transition-colors duration-200",
          "group-hover:text-blue-600 dark:group-hover:text-sky-400",
          "group-active:text-blue-700 dark:group-active:text-sky-300",
        ].join(" ")}
      />
      <span
        className={[
          "z-10 text-[11px] font-medium",
          "text-gray-600 dark:text-gray-400",
          "group-hover:text-gray-800 dark:group-hover:text-gray-200",
        ].join(" ")}
      >
        {title}
      </span>
    </button>
  );
}

/**
 * Inline bottom nav for Stack page (NOT floating)
 */
export default function StackBottomNav({
  onPush,
  onPop,
  onPeek,
  onTraverse,
  onReset,
  className = "",
}) {
  return (
    <div
      className={[
        "w-full h-18 max-w-3xl mx-auto",
        "bg-white/90 dark:bg-gray-800/90",
        "border border-gray-200 dark:border-gray-700",
        "rounded-2xl shadow-md backdrop-blur",
        "flex items-center justify-center",
        className,
      ].join(" ")}
    >
      <div className="grid h-full w-full grid-cols-5">
        <NavButton
          title="Traverse"
          onClick={onTraverse}
          icon={MdModeOfTravel}
          rounded="l"
        />
        <NavButton title="Pop" onClick={onPop} icon={CgPushChevronUp} />
        {/* center “Push” is more prominent */}
        <button
          type="button"
          onClick={onPush}
          title="Push"
          aria-label="Push"
          className={[
            "relative group",
            "flex items-center justify-center",
            "mx-auto my-2 w-12 h-12 rounded-full",
            "bg-blue-600 text-white shadow-md",
            "transition-all duration-200 ease-out",
            "hover:bg-blue-700 hover:shadow-lg hover:-translate-y-[1px]",
            "active:translate-y-0 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70",
          ].join(" ")}
        >
          {/* click pulse */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 scale-50 transition group-active:opacity-100 group-active:scale-100" />
          <CgPushChevronDown className="w-5 h-5" />
        </button>
        <NavButton title="Peek" onClick={onPeek} icon={SiQuicklook} />
        <NavButton
          title="Reset"
          onClick={onReset}
          icon={HiArrowPath}
          rounded="r"
        />
      </div>
    </div>
  );
}
