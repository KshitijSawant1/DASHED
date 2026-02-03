"use client";

import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa6";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";

const MAX_QUEUE = 5;

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

export default function QueueAsStackPage() {
  const [stackIn, setStackIn] = useState([]);
  const [stackOut, setStackOut] = useState([]);
  const [log, setLog] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);
  const [transferValue, setTransferValue] = useState(null);
  const [isTransferring, setIsTransferring] = useState(false);

  /* ───────── DERIVED QUEUE ───────── */
  const queue = [...stackOut].reverse().concat(stackIn);

  /* ───────── ENQUEUE ───────── */
  const handleEnqueue = () => {
    if (queue.length >= MAX_QUEUE) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — Queue is full" },
        ...p,
      ]);
      return;
    }

    const value = Math.floor(Math.random() * 90 + 10);
    setStackIn((p) => [...p, value]);
    setLog((p) => [
      { type: "enqueue", text: `ENQUEUE ${value} → Stack IN` },
      ...p,
    ]);
  };

  /* ───────── DEQUEUE ───────── */
  const handleDequeue = () => {
    if (queue.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — Queue is empty" },
        ...p,
      ]);
      return;
    }
    if (stackOut.length === 0) {
      const moved = [...stackIn].reverse();
      const removed = moved[0];

      // 🔹 start animation
      setTransferValue(removed);
      setIsTransferring(true);

      // wait for animation
      setTimeout(() => {
        setStackOut(moved.slice(1));
        setStackIn([]);
        setTransferValue(null);
        setIsTransferring(false);

        setLog((p) => [
          { type: "dequeue", text: `MOVE IN → OUT, DEQUEUE ${removed}` },
          ...p,
        ]);
      }, 800);

      return;
    }
  };

  /* ───────── CLEAR ───────── */
  const handleClear = () => {
    setStackIn([]);
    setStackOut([]);
    setLog((p) => [{ type: "clear", text: "CLEAR QUEUE" }, ...p]);
  };

  /* ───────── TRAVERSE ───────── */
  const handleTraverse = async () => {
    if (queue.length === 0 || isTraversing) return;

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
      {/* HEADER */}
      <header className="bg-black border-b border-black/10">
        <div className="mx-auto max-w-screen-xl px-6 h-full flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
            <FaLayerGroup className="text-2xl text-white" />
          </div>
          <div>
            <div className="text-base font-semibold text-white">
              Queue as Stack Visualizer
            </div>
            <div className="text-xs text-white/60">
              FIFO using two LIFO stacks · DASHED
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr] pb-16">
        {/* SIDEBAR (UNCHANGED STRUCTURE) */}
        <aside className="border-r grid grid-rows-3">
          <div className="p-4 border-b space-y-3">
            <h2 className="text-sm font-semibold">Concept</h2>
            <Info label="Queue Size" value={queue.length} />
            <Info label="Stack IN" value={stackIn.length} />
            <Info label="Stack OUT" value={stackOut.length} />
            <Info label="Max Size" value={MAX_QUEUE} />
            <p className="text-[11px] text-black/50">
              Queue implemented using <b>two stacks</b>.
            </p>
          </div>

          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold mb-2">Operation Log</h2>
            <div className="h-40 overflow-y-auto space-y-2">
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
              Traverses derived queue order.
            </p>
          </div>
        </aside>

        {/* VISUALIZER */}
        <section className="bg-neutral-50 flex flex-col items-center justify-center gap-10">
          {/* QUEUE */}
          <div className="flex gap-2">
            {queue.map((v, i) => (
              <div
                key={i}
                className={`w-14 h-14 flex items-center justify-center rounded-md font-semibold transition-all
                  ${
                    traverseIndex === i
                      ? "bg-black text-white scale-105 shadow-lg"
                      : "bg-white border-2 border-black"
                  }`}
              >
                {v}
              </div>
            ))}
            {/* TRANSFER ANIMATION */}
            {isTransferring && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                  className="w-12 h-12 bg-black text-white rounded-md flex items-center justify-center font-semibold
      transition-all duration-700 transform
      -translate-x-32 translate-y-16 animate-transfer"
                >
                  {transferValue}
                </div>
              </div>
            )}
          </div>

          {/* STACKS */}
          <div className="flex gap-24">
            <Stack title="Stack IN" stack={stackIn} />
            <Stack title="Stack OUT" stack={stackOut} />
          </div>
        </section>
      </main>

      {/* FOOTER (UNCHANGED) */}
      <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <FooterBtn icon={FiPlus} label="Enqueue" onClick={handleEnqueue} />
          <FooterBtn icon={FiMinus} label="Dequeue" onClick={handleDequeue} />
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

const Stack = ({ title, stack }) => (
  <div className="flex flex-col items-center">
    <div className="text-sm font-semibold mb-2">{title}</div>
    <div className="flex flex-col-reverse gap-2 border-2 border-black/30 p-3 rounded-md min-h-[120px] w-20">
      {stack.map((v, i) => (
        <div
          key={i}
          className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-md font-semibold"
        >
          {v}
        </div>
      ))}
    </div>
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex justify-between text-xs">
    <span className="text-black/60">{label}</span>
    <span className="px-2 py-0.5 rounded-full bg-black/10 font-mono">
      {value}
    </span>
  </div>
);

const FooterBtn = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex flex-col items-center justify-center hover:bg-black/5"
  >
    <Icon className="text-lg" />
    <span className="text-xs">{label}</span>
  </button>
);
