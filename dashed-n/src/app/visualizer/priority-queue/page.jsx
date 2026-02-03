"use client";

import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa6";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";

const MAX_PQ = 9;
const NODE_RADIUS = 28;

/* ───────── LOG COLOR MAP ───────── */
const logStyle = {
  enqueue: "bg-green-100 text-green-700",
  dequeue: "bg-red-100 text-red-700",
  front: "bg-blue-100 text-blue-700",
  clear: "bg-violet-100 text-violet-700",
  overflow: "bg-orange-100 text-orange-700",
  underflow: "bg-pink-100 text-pink-700",
  traverse: "bg-sky-100 text-sky-700",
};

export default function PriorityQueuePage() {
  const [pq, setPQ] = useState([
    { value: 10, priority: 1 },
    { value: 20, priority: 3 },
    { value: 30, priority: 2 },
  ]);
  const [log, setLog] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);

  /* PEEK VISUAL STATE */
  const [peekFrontIndex, setPeekFrontIndex] = useState(null);
  const [peekRearIndex, setPeekRearIndex] = useState(null);

  /* USER INPUT */
  const [inputValue, setInputValue] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  

  /* ───────── HELPERS ───────── */
  const sortPQ = (arr) => [...arr].sort((a, b) => a.priority - b.priority);

  /* ───────── ENQUEUE (RANDOM → BOTTOM BAR) ───────── */
  const handleEnqueueRandom = () => {
    if (pq.length >= MAX_PQ) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — Priority Queue is full" },
        ...p,
      ]);
      return;
    }

    const value = Math.floor(Math.random() * 90 + 10);
    const priority = Math.floor(Math.random() * 5) + 1;

    const updated = sortPQ([...pq, { value, priority }]);
    setPQ(updated);

    setLog((p) => [
      { type: "enqueue", text: `ENQUEUE ${value} (P${priority}) [AUTO]` },
      ...p,
    ]);
  };

  /* ───────── ENQUEUE (USER INPUT → CARD) ───────── */
  const handleEnqueueInput = () => {
    if (pq.length >= MAX_PQ) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — Priority Queue is full" },
        ...p,
      ]);
      return;
    }

    if (inputValue === "" || inputPriority === "") return;

    const value = Number(inputValue);
    const priority = Number(inputPriority);

    const updated = sortPQ([...pq, { value, priority }]);
    setPQ(updated);

    setLog((p) => [
      { type: "enqueue", text: `ENQUEUE ${value} (P${priority}) [USER]` },
      ...p,
    ]);

    setInputValue("");
    setInputPriority("");
  };

  /* ───────── OTHER OPERATIONS ───────── */

  const handleDequeue = () => {
    if (pq.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — Queue is empty" },
        ...p,
      ]);
      return;
    }

    const removed = pq[0];
    setPQ((p) => p.slice(1));
    setLog((p) => [
      {
        type: "dequeue",
        text: `DEQUEUE ${removed.value} (P${removed.priority})`,
      },
      ...p,
    ]);
  };

  const handlePeek = () => {
    if (pq.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "PEEK — Priority Queue is empty" },
        ...p,
      ]);
      return;
    }

    const frontIndex = 0;
    const rearIndex = pq.length - 1;

    setPeekFrontIndex(frontIndex);
    setPeekRearIndex(rearIndex);

    setTimeout(() => {
      setPeekFrontIndex(null);
      setPeekRearIndex(null);
    }, 1200);

    setLog((p) => [
      {
        type: "front",
        text: `PEEK FRONT ${pq[frontIndex].value} (P${pq[frontIndex].priority})`,
      },
      {
        type: "front",
        text: `PEEK REAR ${pq[rearIndex].value} (P${pq[rearIndex].priority})`,
      },
      ...p,
    ]);
  };

  const handleClear = () => {
    setPQ([]);
    setLog((p) => [{ type: "clear", text: "CLEAR PRIORITY QUEUE" }, ...p]);
  };

  /* ───────── TRAVERSE ───────── */
  const handleTraverse = async () => {
    if (pq.length === 0 || isTraversing) return;

    setIsTraversing(true);

    for (let i = 0; i < pq.length; i++) {
      setTraverseIndex(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    setTraverseIndex(null);
    setIsTraversing(false);

    setLog((p) => [
      {
        type: "traverse",
        text: `TRAVERSE ${pq
          .map((e) => `${e.value}(P${e.priority})`)
          .join(" → ")}`,
      },
      ...p,
    ]);
  };

  const positions = pq.map((_, i) => {
    const level = Math.floor(Math.log2(i + 1));
    const nodesInLevel = 2 ** level;
    const indexInLevel = i - (nodesInLevel - 1);

    const xGap = 520 / nodesInLevel;
    const x = 40 + indexInLevel * xGap + xGap / 2;
    const y = 40 + level * 90;

    return { x, y };
  });

  return (
    <div className="h-screen w-full grid grid-rows-[10vh_1fr] bg-white overflow-hidden">
      {/* HEADER */}
      <header className="bg-black border-b border-white/10">
        <div className="mx-auto max-w-screen-xl px-6 h-full flex items-center">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-black/10 flex items-center justify-center">
              <FaLayerGroup className="text-2xl text-white" />
            </div>
            <div>
              <div className="text-base font-semibold text-white">
                Priority Queue Visualizer
              </div>
              <div className="text-xs text-white/50">
                Priority-based FIFO · DASHED
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* ───────── MAIN ───────── */}
      <main className="grid grid-cols-1 lg:grid-cols-[260px_1fr] pb-16 h-full overflow-hidden">
        {/* SIDEBAR */}
        <aside className="border-r grid grid-rows-[auto_auto_1fr] h-full overflow-hidden">
          {/* CONCEPT */}
          <div className="p-4 border-b space-y-3">
            <h2 className="text-sm font-semibold">Concept</h2>

            <Info label="Front Index" value={pq.length ? 0 : "—"} />
            <Info
              label="Lowest Priority Index"
              value={pq.length ? pq.length - 1 : "—"}
            />
            <Info label="Elements" value={pq.length} />
            <Info label="Remaining" value={MAX_PQ - pq.length} />
            <Info label="Max Size" value={MAX_PQ} />

            <p className="text-[11px] text-black/50">
              Lower priority number means <b>higher service priority</b>.
            </p>
          </div>

          {/* LOG */}
          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold mb-2">Operation Log</h2>

            <div className="h-50 overflow-y-auto space-y-2">
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
          <div className="p-4 space-y-3 max-h-46 overflow-y-auto">
            <h2 className="text-sm font-semibold">Traverse</h2>

            <p className="text-xs text-black/70">
              Traversal accesses elements from <b>highest priority</b> to{" "}
              <b>lowest priority</b> without modifying the queue.
            </p>

            <p className="text-[11px] italic text-black/50">
              Useful for inspection and visualization.
            </p>
          </div>
        </aside>

        {/* VISUALIZER */}
        <section className="bg-neutral-50 flex flex-col items-center justify-center py-6 gap-24">
          {/* ───────── HEAP TREE ───────── */}
          <div className="relative w-full flex justify-center -mt-30">
            <div className="relative w-[600px] h-[320px]">
              {/* ───────── EDGES ───────── */}
              <svg
                className="absolute inset-0 pointer-events-none"
                width="600"
                height="320"
              >
                {pq.map((_, i) => {
                  if (i === 0) return null;
                  const parent = Math.floor((i - 1) / 2);

                  return (
                    <line
                      key={`edge-${i}`}
                      x1={positions[parent].x}
                      y1={positions[parent].y + NODE_RADIUS}
                      x2={positions[i].x}
                      y2={positions[i].y}
                      stroke="#999"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>

              {/* ───────── NODES ───────── */}
              {pq.map((item, i) => {
                const isTraversingNode = traverseIndex === i;

                return (
                  <div
                    key={`node-${i}`}
                    className={`
        absolute w-14 h-14 rounded-full
        flex items-center justify-center font-semibold shadow
        transition-all duration-300
        ${
          isTraversingNode
            ? "bg-black text-white scale-110 shadow-lg"
            : "bg-white border-2 border-black"
        }
      `}
                    style={{
                      left: positions[i].x - NODE_RADIUS,
                      top: positions[i].y - NODE_RADIUS / 2,
                    }}
                  >
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ───────── ARRAY / PRIORITY QUEUE ───────── */}
          <div className="flex gap-3 relative">
            {pq.length === 0 && (
              <div className="text-xs text-black/40">Queue is empty</div>
            )}

            {pq.map((item, i) => {
              const isFront = i === 0;
              const isLowest = i === pq.length - 1;
              const isTraversing = traverseIndex === i;
              const isPeekFront = peekFrontIndex === i;
              const isPeekRear = peekRearIndex === i;

              return (
                <div key={i} className="relative">
                  {/* FRONT */}
                  {isFront && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium">
                      FRONT
                    </span>
                  )}

                  {/* REAR */}
                  {isLowest && pq.length > 1 && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium">
                      REAR
                    </span>
                  )}

                  <div
                    className={`
              w-16 h-16 flex flex-col items-center justify-center rounded-md font-semibold
              transition-all duration-300
              ${
                isTraversing
                  ? "bg-black text-white scale-105 shadow-lg"
                  : isPeekFront
                    ? "bg-white border-2 border-black ring-2 ring-black scale-105 shadow"
                    : isPeekRear
                      ? "bg-white border-2 border-dashed border-black ring-2 ring-black/40 scale-105 shadow"
                      : isFront
                        ? "bg-white border-2 border-black shadow hover:scale-105"
                        : "bg-black/10 hover:bg-black/20 hover:scale-105"
              }
            `}
                  >
                    <div>{item.value}</div>
                    <div className="text-[10px]">P{item.priority}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FLOATING INPUT PANEL (USER ENQUEUE) */}
      <div className="fixed bottom-20 right-6 z-40 w-64 bg-white border rounded-xl shadow-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold">Enqueue (User Input)</h3>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-1/2 px-3 py-2 text-sm border rounded-md"
          />

          <input
            type="number"
            placeholder="Priority"
            value={inputPriority}
            onChange={(e) => setInputPriority(e.target.value)}
            className="w-1/2 px-3 py-2 text-sm border rounded-md"
          />
        </div>

        <button
          onClick={handleEnqueueInput}
          className="w-full py-2 text-sm border rounded-md hover:bg-neutral-100"
        >
          Enqueue
        </button>

        <p className="text-[11px] text-black/50 italic">
          Priority (lower = higher)
        </p>
      </div>

      {/* FOOTER (RANDOM ENQUEUE) */}
      <footer className="fixed bottom-0 left-0 w-full h-16 bg-white border-t">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <FooterBtn
            icon={FiPlus}
            label="Enqueue"
            onClick={handleEnqueueRandom}
          />
          <FooterBtn icon={FiMinus} label="Dequeue" onClick={handleDequeue} />
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

/* SMALL COMPONENTS */

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
