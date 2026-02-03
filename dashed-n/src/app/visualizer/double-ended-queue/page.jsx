"use client";

import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa6";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";

const MAX_DEQUE = 9;

/* ───────── LOG STYLE ───────── */
const logStyle = {
  enqueue: "bg-green-100 text-green-700",
  dequeue: "bg-red-100 text-red-700",
  peek: "bg-blue-100 text-blue-700",
  clear: "bg-violet-100 text-violet-700",
  overflow: "bg-orange-100 text-orange-700",
  underflow: "bg-pink-100 text-pink-700",
  traverse: "bg-sky-100 text-sky-700",
};

export default function DequePage() {
  const [deque, setDeque] = useState([10, 20, 30]);
  const [log, setLog] = useState([]);

  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);

  /* PEEK VISUAL STATE */
  const [peekFrontIndex, setPeekFrontIndex] = useState(null);
  const [peekRearIndex, setPeekRearIndex] = useState(null);

  /* CARD INPUT */
  const [inputValue, setInputValue] = useState("");

  /* ───────── DEFAULT OPERATIONS (FOOTER) ───────── */

  const enqueueRear = () => {
    if (deque.length >= MAX_DEQUE) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — Deque is full" },
        ...p,
      ]);
      return;
    }

    const value = Math.floor(Math.random() * 90 + 10);
    setDeque((p) => [...p, value]);
    setLog((p) => [{ type: "enqueue", text: `ENQUEUE REAR ${value}` }, ...p]);
  };

  const dequeueFront = () => {
    if (deque.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — Deque is empty" },
        ...p,
      ]);
      return;
    }

    const value = deque[0];
    setDeque((p) => p.slice(1));
    setLog((p) => [{ type: "dequeue", text: `DEQUEUE FRONT ${value}` }, ...p]);
  };

  /* ───────── CARD OPERATIONS ───────── */

  const enqueueFront = () => {
    if (deque.length >= MAX_DEQUE || inputValue === "") return;

    setDeque((p) => [Number(inputValue), ...p]);
    setLog((p) => [
      { type: "enqueue", text: `ENQUEUE FRONT ${inputValue}` },
      ...p,
    ]);
    setInputValue("");
  };

  const enqueueRearInput = () => {
    if (deque.length >= MAX_DEQUE || inputValue === "") return;

    setDeque((p) => [...p, Number(inputValue)]);
    setLog((p) => [
      { type: "enqueue", text: `ENQUEUE REAR ${inputValue}` },
      ...p,
    ]);
    setInputValue("");
  };

  const dequeueRear = () => {
    if (deque.length === 0) return;

    const value = deque[deque.length - 1];
    setDeque((p) => p.slice(0, -1));
    setLog((p) => [{ type: "dequeue", text: `DEQUEUE REAR ${value}` }, ...p]);
  };

  /* ───────── PEEK ───────── */

  const handlePeek = () => {
    if (deque.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "PEEK — Deque is empty" },
        ...p,
      ]);
      return;
    }

    setPeekFrontIndex(0);
    setPeekRearIndex(deque.length - 1);

    setTimeout(() => {
      setPeekFrontIndex(null);
      setPeekRearIndex(null);
    }, 1200);

    setLog((p) => [
      { type: "peek", text: `PEEK FRONT ${deque[0]}` },
      { type: "peek", text: `PEEK REAR ${deque[deque.length - 1]}` },
      ...p,
    ]);
  };

  /* ───────── TRAVERSE ───────── */

  const handleTraverse = async () => {
    if (deque.length === 0 || isTraversing) return;

    setIsTraversing(true);

    for (let i = 0; i < deque.length; i++) {
      setTraverseIndex(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    setTraverseIndex(null);
    setIsTraversing(false);

    setLog((p) => [
      { type: "traverse", text: `TRAVERSE ${deque.join(" → ")}` },
      ...p,
    ]);
  };

  const handleClear = () => {
    setDeque([]);
    setLog((p) => [{ type: "clear", text: "CLEAR DEQUE" }, ...p]);
  };

  return (
    <div className="h-screen w-full grid grid-rows-[10vh_1fr] bg-white overflow-hidden">
      {/* HEADER */}
      <header className="bg-black border-b border-white/10">
        <div className="mx-auto max-w-screen-xl px-6 h-full flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-black/10 flex items-center justify-center">
            <FaLayerGroup className="text-2xl text-white" />
          </div>
          <div>
            <div className="text-base font-semibold text-white">
              Double Ended Queue Visualizer
            </div>
            <div className="text-xs text-white/50">
              Insert & Delete at Both Ends · DASHED
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="grid grid-cols-1 lg:grid-cols-[260px_1fr] pb-16 h-full overflow-hidden">
        {/* SIDEBAR */}
        <aside className="border-r grid grid-rows-[auto_auto_1fr]">
          <div className="p-4 border-b space-y-3">
            <h2 className="text-sm font-semibold">Concept</h2>
            <Info label="Front Index" value={deque.length ? 0 : "—"} />
            <Info
              label="Rear Index"
              value={deque.length ? deque.length - 1 : "—"}
            />
            <Info label="Elements" value={deque.length} />
            <Info label="Remaining" value={MAX_DEQUE - deque.length} />
            <Info label="Max Size" value={MAX_DEQUE} />
            <p className="text-[11px] text-black/50">
              Deque allows insertion & deletion at <b>both ends</b>.
            </p>
          </div>

          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold mb-2">Operation Log</h2>
            <div className="h-40 overflow-y-auto space-y-2">
              {log.length === 0 && (
                <p className="text-xs text-black/40 italic">
                  No operations yet.
                </p>
              )}
              {log.map((e, i) => (
                <div
                  key={i}
                  className={`px-3 py-1 text-xs rounded-full w-fit font-mono ${logStyle[e.type]}`}
                >
                  {e.text}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-3">
            <h2 className="text-sm font-semibold">Traverse</h2>
            <p className="text-xs text-black/70">
              Traversal accesses elements from <b>Front → Rear</b>.
            </p>
            <p className="text-[11px] italic text-black/50">
              Used for inspection and visualization.
            </p>
          </div>
        </aside>

        {/* VISUALIZER */}
        <section className="bg-neutral-50 flex items-center justify-center">
          <div className="relative">
            {/* ───────── FRONT ARROWS ───────── */}
            {deque.length > 0 && (
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-center">
                <div className="text-[10px] mt-1 font-bold">Insert</div>
                <svg width="60" height="60">
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="6"
                      markerHeight="6"
                      refX="5"
                      refY="3"
                      orient="auto"
                    >
                      <path d="M0,0 L6,3 L0,6" fill="black" />
                    </marker>
                  </defs>

                  {/* INSERT FRONT */}
                  <path
                    d="M55 10 Q20 30 55 50"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.2"
                    markerEnd="url(#arrow)"
                  />
                </svg>

                <div className="text-[10px] font-bold">Delete</div>
              </div>
            )}

            {/* ───────── DEQUE BLOCKS ───────── */}
            <div className="flex gap-2 relative">
              {deque.length === 0 && (
                <div className="text-xs text-black/40">Deque is empty</div>
              )}

              {deque.map((item, i) => {
                const isFront = i === 0;
                const isRear = i === deque.length - 1;
                const isActive = traverseIndex === i;
                const isPeekFront = peekFrontIndex === i;
                const isPeekRear = peekRearIndex === i;

                return (
                  <div key={i} className="relative">
                    {isFront && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium">
                        FRONT
                      </span>
                    )}
                    {isRear && deque.length > 1 && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium">
                        REAR
                      </span>
                    )}

                    <div
                      className={`
                w-14 h-14 flex items-center justify-center rounded-md font-semibold
                transition-all duration-300
                ${
                  isActive
                    ? "bg-black text-white scale-105 shadow-lg"
                    : isPeekFront
                      ? "bg-white border-2 border-black ring-2 ring-black scale-105 shadow"
                      : isPeekRear
                        ? "bg-white border-2 border-dashed border-black ring-2 ring-black/40 scale-105 shadow"
                        : isFront || isRear
                          ? "bg-white border-2 border-black shadow hover:scale-105"
                          : "bg-black/10 hover:bg-black/20 hover:scale-105"
                }
              `}
                    >
                      {item}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ───────── REAR ARROWS ───────── */}
            {deque.length > 0 && (
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-center">
                <div className="text-[10px] mt-1 font-bold">Insert</div>
                <svg width="60" height="60">
                  <path
                    d="M5 10 Q40 30 5 50"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.2"
                    markerEnd="url(#arrow)"
                  />
                </svg>

                <div className="text-[10px] font-bold">Delete</div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FLOATING CONTROL CARD */}
      <div className="fixed bottom-20 right-6 z-40 w-72 bg-white border rounded-xl shadow-lg p-4 space-y-4">
        <h3 className="text-sm font-semibold">Deque Controls</h3>

        <input
          type="number"
          placeholder="Value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-md"
        />
        <div className="flex w-full rounded-full border overflow-hidden">
          <button
            onClick={enqueueFront}
            className="
      flex-1 py-2 text-xs font-medium
      text-black bg-white
      hover:bg-black hover:text-white
      transition-all duration-200
    "
          >
            Enqueue Front
          </button>

          <button
            onClick={enqueueRearInput}
            className="
      flex-1 py-2 text-xs font-medium
      text-black bg-white
      hover:bg-black hover:text-white
      transition-all duration-200
      border-l
    "
          >
            Enqueue Rear
          </button>
        </div>

        <div className="flex w-full rounded-full border overflow-hidden">
          <button
            onClick={dequeueFront}
            className="
      flex-1 py-2 text-xs font-medium
      text-black bg-white
      hover:bg-black hover:text-white
      transition-all duration-200
    "
          >
            Dequeue Front
          </button>

          <button
            onClick={dequeueRear}
            className="
      flex-1 py-2 text-xs font-medium
      text-black bg-white
      hover:bg-black hover:text-white
      transition-all duration-200
      border-l
    "
          >
            Dequeue Rear
          </button>
        </div>

        <p className="text-[11px] text-black/50 italic">
          Choose the end explicitly for deque operations.
        </p>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full h-16 bg-white border-t">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <FooterBtn icon={FiPlus} label="Enqueue" onClick={enqueueRear} />
          <FooterBtn icon={FiMinus} label="Dequeue" onClick={dequeueFront} />
          <FooterBtn icon={FiEye} label="Peek" onClick={handlePeek} />
          <FooterBtn
            icon={FiShuffle}
            label="Traverse"
            onClick={handleTraverse}
          />
          <FooterBtn icon={FiX} label="Clear" onClick={handleClear} />
        </div>
      </footer>
    </div>
  );
}

/* ───────── SMALL COMPONENTS ───────── */

const Info = ({ label, value }) => (
  <div className="flex justify-between text-xs">
    <span className="text-black/60">{label}</span>
    <span className="px-2 py-0.5 border rounded-full font-mono">{value}</span>
  </div>
);

const FooterBtn = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex flex-col items-center justify-center hover:bg-neutral-100"
  >
    <Icon className="text-lg text-black" />
    <span className="text-xs">{label}</span>
  </button>
);
