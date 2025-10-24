import React, { useEffect, useRef, useState } from "react";
import { FaLayerGroup } from "react-icons/fa6"; // Stack-like icon
import StackCanvas from "./StackCanvas";
import StackBottomNav from "./StackBottomNav";

/* ========== Constants ========== */
const MAX_STACK_SIZE = 6;
const STEP_MS = 700;
const CHIP_NUM_STYLE = { fontVariantNumeric: "tabular-nums" };

/* ========== Traverse Recorder (Fixed Width) ========== */
function TraverseBar({ index, total, value, onStop }) {
  const pct = total > 0 ? Math.round(((index + 1) / total) * 100) : 0;

  return (
    <div
      className="
    w-full min-w-0 rounded-xl border p-3 shadow-sm backdrop-blur
    flex flex-col gap-2 overflow-hidden
  "
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex-1 min-w-0 text-[13px] leading-tight truncate"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          Traversing{" "}
          <span className="font-medium">
            {index + 1} / {total}
          </span>
          {" — "}current: <span className="font-semibold">{value ?? "—"}</span>
        </div>

        <button
          onClick={onStop}
          className="shrink-0 text-[11px] px-2 py-0.5 rounded-md bg-red-500 text-white hover:bg-red-600"
          aria-label="Stop traversal"
        >
          Stop
        </button>
      </div>

      <div
        className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className="h-full bg-blue-600 transition-[width] duration-500 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
/* ========== Log Color Map (bg-200, border-600) ========== */
const LOG_COLOR_MAP = {
  pushed: { bg: "bg-green-200", border: "border-green-600" },
  popped: { bg: "bg-red-200", border: "border-red-600" },
  peeked: { bg: "bg-yellow-200", border: "border-yellow-600" },
  traverse: { bg: "bg-blue-200", border: "border-blue-600" },
  visited: { bg: "bg-blue-200", border: "border-blue-600" },
  reset: { bg: "bg-orange-200", border: "border-orange-600" },
  overflow: { bg: "bg-pink-200", border: "border-pink-600" },
  underflow: { bg: "bg-purple-200", border: "border-purple-600" },
  default: { bg: "bg-gray-200", border: "border-gray-600" },
};

/* classify a log line -> a key from LOG_COLOR_MAP */
function classifyLog(entry = "") {
  const e = entry.toLowerCase();
  if (e.includes("pushed")) return "pushed";
  if (e.includes("popped")) return "popped";
  if (e.includes("peeked")) return "peeked";
  if (e.includes("visited")) return "visited";
  if (e.includes("traverse")) return "traverse";
  if (e.includes("reset")) return "reset";
  if (e.includes("overflow")) return "overflow";
  if (e.includes("underflow")) return "underflow";
  return "default";
}

/* ========== Main Stack Visualizer ========== */
export default function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [peekItem, setPeekItem] = useState(null);
  const [message, setMessage] = useState("Idle");
  const [logs, setLogs] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [travIndex, setTravIndex] = useState(-1);
  const [travHistory, setTravHistory] = useState([]);
  const travTimerRef = useRef(null);

  const log = (line) => setLogs((prev) => [line, ...prev].slice(0, 80));

  const stopTraverse = () => {
    if (travTimerRef.current) clearInterval(travTimerRef.current);
    travTimerRef.current = null;
    setIsTraversing(false);
    setTravIndex(-1);
    setPeekItem(null);
    setTravHistory([]);
  };

  useEffect(() => {
    return () => {
      if (travTimerRef.current) clearInterval(travTimerRef.current);
    };
  }, []);

  /* -------- Stack Operations -------- */
  const handlePush = () => {
    if (stack.length >= MAX_STACK_SIZE) {
      setMessage(`Stack Overflow (Max size: ${MAX_STACK_SIZE})`);
      log("Stack Overflow");
      return;
    }
    const val = Math.floor(Math.random() * 90) + 10;
    setStack((p) => [...p, val]);
    setPeekItem(null);
    setMessage(`Pushed ${val}`);
    log(`Pushed ${val}`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Stack Underflow");
      log("Stack Underflow");
      return;
    }
    const popped = stack[stack.length - 1];
    setStack((p) => p.slice(0, -1));
    setPeekItem(null);
    setMessage(`Popped ${popped}`);
    log(`Popped ${popped}`);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty");
      log("Peeked: empty stack");
      return;
    }
    const top = stack[stack.length - 1];
    setPeekItem(top);
    setMessage(`Peeked: ${top}`);
    log(`Peeked ${top}`);
  };

  const handleTraverse = () => {
    if (stack.length === 0) {
      setMessage("Traverse: []");
      log("Traverse attempted on empty stack");
      return;
    }

    stopTraverse();
    setIsTraversing(true);
    setTravIndex(0);
    setPeekItem(stack[0]);
    setTravHistory([stack[0]]);
    setMessage(`Traverse start → ${stack[0]}`);
    log("Traverse started");

    travTimerRef.current = setInterval(() => {
      setTravIndex((prev) => {
        const next = prev + 1;
        if (next >= stack.length) {
          stopTraverse();
          setMessage("Traverse complete");
          log("Traverse complete");
          return prev;
        }
        const v = stack[next];
        setPeekItem(v);
        setTravHistory((h) => [...h, v]);
        setMessage(`Traverse → ${v}`);
        log(`Visited ${v}`);
        return next;
      });
    }, STEP_MS);
  };

  const handleReset = () => {
    stopTraverse();
    setStack([]);
    setPeekItem(null);
    setMessage("Stack Reset");
    log("Reset");
  };

  const handleInfo = () =>
    alert(
      "Stack: LIFO\nPush adds, Pop removes top, Peek shows top.\nTraverse walks through all elements sequentially."
    );

  /* -------- UI -------- */
  return (
    <div className="h-svh md:h-dvh w-full bg-[var(--surface)] text-[var(--text)] transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-full grid grid-rows-[auto,1fr]">
        {/* Fade-in animation for log entries */}
        <style>{`
      @keyframes logIn {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .animate-log-in { animation: logIn 220ms ease-out forwards; }
    `}</style>

        {/* Header row */}
        <div className="pt-6 lg:pt-10 mt-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[140px_1fr] lg:gap-8">
            {/* Stack Icon */}
            <div
              className="
    hidden lg:flex group rounded-2xl border p-6 shadow-sm backdrop-blur
    items-center justify-center relative
    transition-all duration-300 ease-out hover:scale-[1.05]
    hover:shadow-lg hover:border-violet-400/60 dark:hover:border-sky-400/60
  "
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              {/* Glow layer */}
              <div
                className="
      absolute inset-0 m-auto h-24 w-24 rounded-full blur-2xl
      bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-400
      opacity-30 transition-all duration-500 group-hover:opacity-60
      dark:from-sky-500 dark:via-blue-500 dark:to-cyan-400
    "
              />

              {/* Stack Icon */}
              <FaLayerGroup
                className="
      relative z-10 text-6xl text-violet-600 dark:text-sky-400
      drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]
      dark:drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]
      transition-transform duration-300 group-hover:rotate-3 group-hover:scale-[1.08]
    "
              />
            </div>

            {/* Stack Title */}
            <div
              className="rounded-2xl border p-5 shadow-sm backdrop-blur flex flex-col justify-center"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <h1 className="text-2xl font-semibold tracking-tight">
                Stack Visualizer
              </h1>
              <p className="text-sm text-[var(--muted)]">
                Interactive visualization of{" "}
                <span className="font-medium text-violet-600 dark:text-sky-400">
                  push / pop / peek / traverse
                </span>
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
                DASHED • Stack
              </div>
            </div>
          </div>
        </div>
        {/* ======= MOBILE LAYOUT (<= sm) ======= */}
        <div className="sm:hidden space-y-4">
          {/* 1) Canvas */}
          <div
            className="rounded-2xl border p-4 shadow-sm backdrop-blur"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <StackCanvas
              stack={stack}
              peekItem={peekItem}
              travIndex={travIndex}
              isTraversing={isTraversing}
            />
          </div>

          {/* 2) Traverse Block OR Recorder (swaps while traversing) */}
          <div
            className="rounded-2xl border p-4 shadow-sm backdrop-blur"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium">
                {isTraversing ? "Traverse Recorder" : "Traverse Block View"}
              </h2>
              {!isTraversing ? (
                /* small legend when idle */
                <div className="flex items-center gap-3 text-[11px] text-[var(--muted)]">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />{" "}
                    Active
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-400/60" />{" "}
                    Visited
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: "var(--border)" }}
                    />{" "}
                    Pending
                  </span>
                </div>
              ) : (
                <span className="text-[11px] text-[var(--muted)]">active</span>
              )}
            </div>

            {isTraversing ? (
              <TraverseBar
                index={travIndex}
                total={stack.length}
                value={stack[travIndex]}
                onStop={stopTraverse}
              />
            ) : stack.length ? (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {stack.map((v, i) => {
                  const isActive = false; // not traversing; no active index on mobile idle
                  const base =
                    "inline-flex items-center justify-center rounded-md border text-sm font-semibold transition";
                  const size = "w-12 h-12";
                  return (
                    <span
                      key={`${v}-${i}`}
                      className={[
                        base,
                        size,
                        "bg-transparent border-[var(--border)] text-[var(--text)]/80",
                      ].join(" ")}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {v}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-[var(--muted)]">
                Stack is empty — push elements to begin traversal.
              </p>
            )}
          </div>

          {/* 3) Controls */}
          <div
            className="rounded-2xl border p-4 shadow-sm backdrop-blur"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-medium">Controls</h2>
              <span className="text-xs text-[var(--muted)]">live state</span>
            </div>
            <ul className="list-none text-sm space-y-[2px]">
              <li>
                Size: <strong>{stack.length}</strong>
              </li>
              <li>
                Top: <strong>{stack[stack.length - 1] ?? "—"}</strong>
              </li>
              <li>
                Peek: <strong>{peekItem ?? "—"}</strong>
              </li>
              <li>
                Status: <strong>{message}</strong>
              </li>
            </ul>
          </div>

          {/* 4) Action Log (scrolls after 3 items) */}
          <div
            className="rounded-2xl border p-4 shadow-sm backdrop-blur"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Action Log</h3>
              <span className="text-xs text-[var(--muted)]">
                {logs.length} item{logs.length === 1 ? "" : "s"}
              </span>
            </div>
            {logs.length ? (
              <div
                className={`space-y-1 ${
                  logs.length > 3 ? "overflow-y-auto max-h-40" : ""
                }`}
                style={{ scrollbarGutter: "stable both-edges" }}
              >
                {logs.map((entry, idx) => {
                  const key = classifyLog(entry);
                  const { bg, border } =
                    LOG_COLOR_MAP[key] ?? LOG_COLOR_MAP.default;
                  return (
                    <div
                      key={idx}
                      className={`text-xs text-gray-900 rounded-md px-2 py-1 border font-medium ${bg} ${border} animate-log-in`}
                      style={{
                        willChange: "opacity, transform",
                        animationDelay: `${Math.min(idx * 20, 120)}ms`,
                      }}
                    >
                      {entry}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs italic text-[var(--muted)]">No logs yet…</p>
            )}
          </div>

          {/* Spacer so the fixed nav doesn't cover content */}
          <div className="h-20" />
        </div>

        {/* ======= DESKTOP LAYOUT (>= sm) — your existing layout ======= */}
        <div className="hidden sm:block">
          {/* Content row — fills remaining viewport height */}
          <div className="min-h-0 relative">
            {/* Controls + Canvas (two columns) */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch min-h-0">
              {/* Left Column */}
              <div
                className="h-full min-h-0 flex flex-col rounded-2xl border p-5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:border-violet-400/40 dark:hover:border-sky-400/40"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                {/* Controls + Log — fill parent, no overflow outside */}
                <div className="grid grid-rows-[auto,1fr] gap-4 flex-1 min-h-0">
                  {/* Controls (compact) */}
                  <div
                    className="rounded-xl border px-4 pt-4 pb-3 flex flex-col gap-1.5 transition-all duration-300"
                    style={{
                      background: "var(--card)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      lineHeight: 1.25, // tighter text rhythm
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-sm font-medium">Controls</h2>
                      <span className="text-xs text-[var(--muted)]">
                        live state
                      </span>
                    </div>

                    <ul className="list-none text-sm space-y-[2px]">
                      <li className="last:mb-0">
                        Size: <strong>{stack.length}</strong>
                      </li>
                      <li className="last:mb-0">
                        Top: <strong>{stack[stack.length - 1] ?? "—"}</strong>
                      </li>
                      <li className="last:mb-0">
                        Peek: <strong>{peekItem ?? "—"}</strong>
                      </li>
                      <li className="last:mb-0">
                        Status: <strong>{message}</strong>
                      </li>
                    </ul>
                  </div>

                  {/* Action Log (scrolls after 3 items, else grows naturally) */}
                  <div
                    className="rounded-xl border p-5 flex flex-col min-h-0 transition-all duration-300"
                    style={{
                      background: "var(--card)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Action Log</h3>
                      <span className="text-xs text-[var(--muted)]">
                        {logs.length} item{logs.length === 1 ? "" : "s"}
                      </span>
                    </div>

                    {logs.length ? (
                      <div
                        className={`pr-1 space-y-1 ${
                          logs.length > 3 ? "overflow-y-auto flex-1" : ""
                        }`}
                        style={{
                          maxHeight: logs.length > 3 ? "9rem" : "auto",
                          scrollbarGutter: "stable both-edges",
                          scrollBehavior: "smooth",
                        }}
                      >
                        {logs.map((entry, idx) => {
                          const key = classifyLog(entry);
                          const { bg, border } =
                            LOG_COLOR_MAP[key] ?? LOG_COLOR_MAP.default;
                          return (
                            <div
                              key={idx}
                              className={`text-xs text-gray-900 rounded-md px-2 py-1 border font-medium ${bg} ${border} animate-log-in`}
                              style={{
                                willChange: "opacity, transform",
                                animationDelay: `${Math.min(idx * 20, 120)}ms`,
                              }}
                            >
                              {entry}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs italic text-[var(--muted)]">
                        No logs yet…
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column — Canvas */}
              <div
                className="h-full min-h-0 rounded-2xl border p-5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:border-violet-400/40 dark:hover:border-sky-400/40"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <StackCanvas
                  stack={stack}
                  peekItem={peekItem}
                  travIndex={travIndex}
                  isTraversing={isTraversing}
                />
              </div>
            </div>
          </div>

          {/* Traverse + Recorder (aligned below Content row) */}
          <div className="mt-8 relative z-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
              {/* Traverse Block View (compact + linked) */}
              <div
                className="rounded-2xl border p-4 shadow-sm backdrop-blur flex flex-col justify-center transition-all duration-300 hover:shadow-md hover:border-violet-400/40 dark:hover:border-sky-400/40"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between mb-3">
                  <h2 className="text-base font-medium">Traverse Block View</h2>

                  {/* Legend (inline beside title) */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--muted)]">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-violet-500" />{" "}
                      Active
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-blue-400/60" />{" "}
                      Visited
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "var(--border)" }}
                      />{" "}
                      Pending
                    </span>
                  </div>
                </div>

                {stack.length ? (
                  <>
                    <div className="flex flex-wrap items-center justify-center gap-2 relative">
                      {stack.map((v, i) => {
                        const isActive = isTraversing && i === travIndex;
                        const isVisited = isTraversing && i < travIndex;

                        const base =
                          "relative inline-flex items-center justify-center box-border rounded-md text-sm font-semibold border transition-all duration-300";
                        const size = "w-12 h-12"; // smaller, square elements

                        const stateCls = isActive
                          ? "bg-violet-500 text-white border-violet-600 shadow-md scale-105"
                          : isVisited
                          ? "bg-blue-100 dark:bg-sky-900/40 border-blue-300 dark:border-sky-700 text-blue-700 dark:text-sky-200"
                          : "bg-transparent border-[var(--border)] text-[var(--text)]/80";

                        return (
                          <React.Fragment key={`${v}-${i}`}>
                            {/* Connector line (for all except first) */}
                            {i > 0 && (
                              <span
                                className="w-6 h-[2px] bg-[var(--border)] rounded-full"
                                aria-hidden
                              />
                            )}

                            {/* Block */}
                            <span
                              className={[base, size, stateCls].join(" ")}
                              style={{ fontVariantNumeric: "tabular-nums" }}
                              title={
                                isActive
                                  ? "Active"
                                  : isVisited
                                  ? "Visited"
                                  : "Pending"
                              }
                            >
                              {v}
                            </span>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-[var(--muted)] text-center">
                    Stack is empty — push elements to begin traversal.
                  </p>
                )}
              </div>

              {/* Traverse Recorder (compact) */}
              <div
                className="rounded-2xl border p-4 shadow-sm backdrop-blur flex flex-col justify-center transition-all duration-300 hover:shadow-md hover:border-violet-400/40 dark:hover:border-sky-400/40"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium">Traverse Recorder</h2>
                  <span className="text-[11px] text-[var(--muted)]">
                    {isTraversing ? "active" : "idle"}
                  </span>
                </div>

                {isTraversing ? (
                  <TraverseBar
                    index={travIndex}
                    total={stack.length}
                    value={stack[travIndex]}
                    onStop={stopTraverse}
                  />
                ) : (
                  <div
                    className="rounded-xl border px-3 py-2 flex flex-col justify-between text-[12px] leading-tight"
                    style={{
                      background: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <p className="text-[var(--muted)] mb-1">
                      Press{" "}
                      <span className="font-medium text-[var(--text)]">
                        Traverse
                      </span>{" "}
                      to step through each element.
                    </p>
                    <p className="text-[var(--muted)]">
                      Progress will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Navigation (inline, responsive) */}
          <section className="mt-8 mb-6 flex justify-center">
            <StackBottomNav
              onPush={handlePush}
              onPop={handlePop}
              onPeek={handlePeek}
              onTraverse={handleTraverse}
              onReset={handleReset}
              className="max-w-3xl w-full"
            />
          </section>
        </div>

        {/* ======= BOTTOM NAV ======= */}
        {/* Mobile: fixed; Desktop: inline (hidden here, keep your desktop inline version above if desired) */}
        <div className="sm:hidden">
          <div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg"
            style={{ pointerEvents: "auto" }}
          >
            <StackBottomNav
              onPush={handlePush}
              onPop={handlePop}
              onPeek={handlePeek}
              onTraverse={handleTraverse}
              onReset={handleReset}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
