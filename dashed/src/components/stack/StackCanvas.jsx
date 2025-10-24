// StackCanvas.jsx
import React, { useMemo } from "react";

const WARM = ["bg-yellow-500", "bg-orange-500", "bg-pink-500", "bg-red-500"];
const COOL = ["bg-blue-500", "bg-indigo-500", "bg-teal-500", "bg-purple-500","bg-green-500"];

function hashNum(n) {
  const s = String(n);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function stableOrder(list, seed) {
  return [...list]
    .map((c, i) => ({ c, k: (seed * 1315423911 + i * 2654435761) >>> 0 }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.c);
}

export default function StackCanvas({
  stack = [],
  peekItem = null,
  travIndex = -1,
  isTraversing = false,
}) {
  const topIndex = stack.length - 1;

  const colorSeq = useMemo(() => {
    const warmBase = stableOrder(
      WARM,
      stack.reduce((a, v) => a ^ hashNum(v), 0) || 1
    );
    const coolBase = stableOrder(
      COOL,
      stack.reduce((a, v) => (a + hashNum(v)) >>> 0, 0) || 2
    );
    let warm = [...warmBase],
      cool = [...coolBase],
      used = new Set(),
      seq = [];
    const take = (pool, base) => {
      let i = pool.findIndex((c) => !used.has(c));
      if (i === -1) {
        used.clear();
        warm = [...warmBase];
        cool = [...coolBase];
        i = 0;
      }
      const c = pool[i];
      pool.splice(i, 1);
      used.add(c);
      return c;
    };
    let prevCool = false;
    for (let i = 0; i < stack.length; i++) {
      let pickWarm = prevCool || cool.length === 0 || warm.length > cool.length;
      const c = pickWarm ? take(warm, warmBase) : take(cool, coolBase);
      prevCool = COOL.includes(c);
      seq.push(c);
    }
    return seq;
  }, [stack]);

  return (
    <section
      className="rounded-2xl backdrop-blur h-full min-h-0 grid grid-rows-[auto,1fr] gap-2 overflow-hidden"
      style={{
        background: "var(--card)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
      aria-label="Stack canvas"
    >
      {/* Title row (tight) */}
      <h1
        className="text-sm font-medium self-start pl-2 text-xl"
        style={{ fontFamily: "'Audiowide', sans-serif", color: "var(--muted)" }}
      >
        Canvas
      </h1>

      {/* Frame row fills available height; small top padding for TOP marker */}
      <div
        className="relative h-full min-h-0 pt-5 w-full grid place-items-center"
        style={{ background: "var(--card)" }}
        role="list"
      >
        {/* dashed frame */}
        <div
          className="absolute inset-y-0 m-auto h-[92%] w-[220px] rounded-xl border-2 border-dashed pointer-events-none"
          style={{ borderColor: "var(--border)" }}
        />

        {/* Top marker (sits just above frame due to pt-5) */}
        {stack.length > 0 && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-semibold">
              TOP
            </span>
          </div>
        )}

        {/* Stack blocks (bottom aligned inside frame area) */}
        <div className="relative w-[220px] h-[92%] flex flex-col-reverse items-center justify-start">
          {stack.length === 0 ? (
            <div className="text-xs text-[var(--muted)] mt-auto mb-2">
              Empty stack
            </div>
          ) : (
            stack.map((item, idx) => {
              const isTop = idx === topIndex;
              const isPeek = item === peekItem;
              const isActive = isTraversing && idx === travIndex;
              const colorClass = colorSeq[idx] ?? "bg-gray-500";
              return (
                <div
                  key={`${item}-${idx}`}
                  className="relative w-full flex justify-center"
                >
                  <div
                    className={[
                      "w-[200px] h-10 mb-2 rounded-md border shadow-sm",
                      "flex items-center justify-center text-sm font-semibold text-white",
                      isPeek
                        ? "ring-2 ring-green-300"
                        : isActive
                        ? "ring-2 ring-violet-400 dark:ring-sky-400"
                        : isTop
                        ? "shadow-md"
                        : "",
                      colorClass,
                    ].join(" ")}
                    style={{ borderColor: "var(--border)" }}
                    role="listitem"
                  >
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                      {item}
                    </span>
                  </div>
                </div>
              );
            })
          )}

          {/* Base rail */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-500/30 rounded-b-md" />
        </div>
      </div>
    </section>
  );
}
