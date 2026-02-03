"use client";

import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa6";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";

const MAX_QUEUE = 9;

/* ───────── LOG STYLE (MONOCHROME) ───────── */
const logStyle = {
  enqueue: "bg-black/5 text-black",
  dequeue: "bg-black/10 text-black",
  front: "bg-black/5 text-black",
  clear: "bg-black/10 text-black",
  overflow: "bg-black/20 text-black",
  underflow: "bg-black/20 text-black",
  traverse: "bg-black/5 text-black",
};

export default function QueuePage() {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [log, setLog] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);
  const [peekFrontIndex, setPeekFrontIndex] = useState(null);
  const [peekRearIndex, setPeekRearIndex] = useState(null);

  /* ───────── QUEUE OPERATIONS ───────── */

  const handleEnqueue = () => {
    if (queue.length >= MAX_QUEUE) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — Queue is full" },
        ...p,
      ]);
      return;
    }

    const value = Math.floor(Math.random() * 90 + 10);
    setQueue((p) => [...p, value]);
    setLog((p) => [{ type: "enqueue", text: `ENQUEUE ${value}` }, ...p]);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — Queue is empty" },
        ...p,
      ]);
      return;
    }

    const value = queue[0];
    setQueue((p) => p.slice(1));
    setLog((p) => [{ type: "dequeue", text: `DEQUEUE ${value}` }, ...p]);
  };
  const handlePeek = () => {
    if (queue.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "PEEK — Queue is empty" },
        ...p,
      ]);
      return;
    }

    const frontIndex = 0;
    const rearIndex = queue.length - 1;

    // Visual highlight
    setPeekFrontIndex(frontIndex);
    setPeekRearIndex(rearIndex);

    // Auto clear highlight
    setTimeout(() => {
      setPeekFrontIndex(null);
      setPeekRearIndex(null);
    }, 1200);

    // Log (Queue values are numbers)
    setLog((p) => [
      { type: "front", text: `PEEK FRONT ${queue[frontIndex]}` },
      { type: "front", text: `PEEK REAR ${queue[rearIndex]}` },
      ...p,
    ]);
  };

  const handleClear = () => {
    setQueue([]);
    setLog((p) => [{ type: "clear", text: "CLEAR QUEUE" }, ...p]);
  };

  /* ───────── TRAVERSE ───────── */
  const handleTraverse = async () => {
    if (queue.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "TRAVERSE — Queue is empty" },
        ...p,
      ]);
      return;
    }

    if (isTraversing) return;

    setIsTraversing(true);

    for (let i = 0; i < queue.length; i++) {
      setTraverseIndex(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    setTraverseIndex(null);
    setIsTraversing(false);

    setLog((p) => [
      { type: "traverse", text: `TRAVERSE ${queue.join(" → ")}` },
      ...p,
    ]);
  };

  return (
    <div className="h-screen w-full grid grid-rows-[10vh_1fr] bg-white">
      {/* ───────── HEADER ───────── */}
      <header className="bg-black border-b border-black/10">
        <div className="mx-auto max-w-screen-xl px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
              <FaLayerGroup className="text-2xl text-white" />
            </div>
            <div>
              <div className="text-base font-semibold text-white">
                Queue Visualizer
              </div>
              <div className="text-xs text-white/60">
                FIFO Data Structure · DASHED
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-6 text-xs text-white/60">
            <span>
              Size: <b className="text-white">{queue.length}</b>
            </span>
            <span>
              Front:{" "}
              <b className="text-white">{queue.length ? queue[0] : "—"}</b>
            </span>
            <span>
              Rear:{" "}
              <b className="text-white">
                {queue.length ? queue[queue.length - 1] : "—"}
              </b>
            </span>
            <span>
              Capacity: <b className="text-white">{MAX_QUEUE}</b>
            </span>
          </div>
        </div>
      </header>

      {/* ───────── MAIN ───────── */}
      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr] pb-16">
        {/* SIDEBAR */}
        <aside className="border-r grid grid-rows-3">
          {/* CONCEPT */}
          <div className="p-4 border-b space-y-3">
            <h2 className="text-sm font-semibold">Concept</h2>

            <Info label="Front Pointer" value={queue.length ? 0 : "—"} />
            <Info
              label="Rear Pointer"
              value={queue.length ? queue.length - 1 : "—"}
            />
            <Info label="Filled" value={queue.length} />
            <Info label="Remaining" value={MAX_QUEUE - queue.length} />
            <Info label="Max Size" value={MAX_QUEUE} />

            <p className="text-[11px] text-black/50">
              Queue follows <b>FIFO</b> (First In, First Out)
            </p>
          </div>

          {/* LOG */}
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

          {/* TRAVERSE THEORY */}
          <div className="p-4 space-y-3 max-h-56 overflow-y-auto">
            <h2 className="text-sm font-semibold">Traverse</h2>
            <p className="text-xs text-black/70">
              Traversal accesses each element from <b>Front → Rear</b> without
              modifying the queue.
            </p>
            <p className="text-[11px] italic text-black/50">
              Used for display and debugging.
            </p>
          </div>
        </aside>

        {/* VISUALIZER */}
        <section className="bg-neutral-50 flex items-center justify-center">
          <div className="flex gap-2 relative">
            {queue.length === 0 && (
              <div className="text-xs text-black/40">Queue is empty</div>
            )}

            {queue.map((item, i) => {
              const isFront = i === 0;
              const isRear = i === queue.length - 1;
              const isTraversing = traverseIndex === i;
              const isPeekFront = peekFrontIndex === i;
              const isPeekRear = peekRearIndex === i;

              return (
                <div key={i} className="relative">
                  {/* FRONT LABEL */}
                  {isFront && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-black">
                      FRONT
                    </span>
                  )}

                  {/* REAR LABEL */}
                  {isRear && queue.length > 1 && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-black">
                      REAR
                    </span>
                  )}

                  {/* QUEUE NODE */}
                  <div
                    className={`
              w-14 h-14 flex items-center justify-center rounded-md font-semibold
              transition-all duration-300
              ${
                /* TRAVERSE animation */
                isTraversing
                  ? "bg-black text-white scale-105 shadow-lg"
                  : /* PEEK FRONT */
                    isPeekFront
                    ? "bg-white border-2 border-black ring-2 ring-black scale-105 shadow"
                    : /* PEEK REAR */
                      isPeekRear
                      ? "bg-white border-2 border-dashed border-black ring-2 ring-black/40 scale-105 shadow"
                      : /* NORMAL FRONT / REAR */
                        isFront || isRear
                        ? "bg-white border-2 border-black shadow hover:scale-105"
                        : /* NORMAL NODE */
                          "bg-black/10 hover:bg-black/20 hover:scale-105"
              }
            `}
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <FooterBtn icon={FiPlus} label="Enqueue" onClick={handleEnqueue} />
          <FooterBtn icon={FiMinus} label="Dequeue" onClick={handleDequeue} />
          <FooterBtn icon={FiEye} label="Peek" onClick={handlePeek} />
          <FooterBtn
            icon={FiShuffle}
            label="Traverse"
            onClick={handleTraverse}
            disabled={isTraversing}
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
    <span className="px-2 py-0.5 rounded-full bg-black/10 text-black font-mono">
      {value}
    </span>
  </div>
);

const FooterBtn = ({ icon: Icon, label, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="inline-flex flex-col items-center justify-center hover:bg-black/5 disabled:opacity-40"
  >
    <Icon className="text-lg text-black" />
    <span className="text-xs text-black">{label}</span>
  </button>
);
