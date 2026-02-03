"use client";

import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa6";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";

const MAX_QUEUE = 9;
const logicalQueue = [10, 20, 30];

/* ───────── LOG STYLE ───────── */
const logStyle = {
  enqueue: "bg-black/5 text-black",
  dequeue: "bg-black/10 text-black",
  peek: "bg-black/5 text-black",
  clear: "bg-black/10 text-black",
  overflow: "bg-black/20 text-black",
  underflow: "bg-black/20 text-black",
  traverse: "bg-black/5 text-black",
};

export default function CircularQueuePage() {
  /* ───────── STATE ───────── */
  const initialQueue = (() => {
    const arr = Array(MAX_QUEUE).fill(null);
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    return arr;
  })();

  const [queue, setQueue] = useState(initialQueue);
  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(2);

  const [log, setLog] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);
  const [peekFrontIndex, setPeekFrontIndex] = useState(null);
  const [peekRearIndex, setPeekRearIndex] = useState(null);
  const [showWrapDot, setShowWrapDot] = useState(false);

  /* ───────── DERIVED LOGICAL QUEUE (KEY FIX) ───────── */
  const logicalQueue = [];
  if (front !== -1) {
    let i = front;
    while (true) {
      logicalQueue.push(queue[i]);
      if (i === rear) break;
      i = (i + 1) % MAX_QUEUE;
    }
  }

  const size = logicalQueue.length;

  const isEmpty = () => front === -1;
  const isFull = () => (rear + 1) % MAX_QUEUE === front;

  /* ───────── ENQUEUE ───────── */
  const handleEnqueue = () => {
    if (isFull()) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — Circular Queue is full" },
        ...p,
      ]);
      return;
    }

    const value = Math.floor(Math.random() * 90 + 10);
    let newFront = front;
    let newRear = rear;

    if (isEmpty()) {
      newFront = 0;
      newRear = 0;
    } else {
      newRear = (rear + 1) % MAX_QUEUE;
    }

    const updated = [...queue];
    updated[newRear] = value;

    setQueue(updated);
    setFront(newFront);
    setRear(newRear);

    setLog((p) => [{ type: "enqueue", text: `ENQUEUE ${value}` }, ...p]);
  };

  /* ───────── DEQUEUE ───────── */
  const handleDequeue = () => {
    if (isEmpty()) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — Circular Queue is empty" },
        ...p,
      ]);
      return;
    }

    const removed = queue[front];
    const updated = [...queue];
    updated[front] = null;

    if (front === rear) {
      setFront(-1);
      setRear(-1);
    } else {
      setFront((front + 1) % MAX_QUEUE);
    }

    setQueue(updated);
    setLog((p) => [{ type: "dequeue", text: `DEQUEUE ${removed}` }, ...p]);
  };

  /* ───────── PEEK ───────── */
  const handlePeek = () => {
    if (isEmpty()) {
      setLog((p) => [
        { type: "underflow", text: "PEEK — Circular Queue is empty" },
        ...p,
      ]);
      return;
    }

    setPeekFrontIndex(0);
    setPeekRearIndex(logicalQueue.length - 1);

    setTimeout(() => {
      setPeekFrontIndex(null);
      setPeekRearIndex(null);
    }, 1200);

    setLog((p) => [
      { type: "peek", text: `PEEK FRONT ${logicalQueue[0]}` },
      {
        type: "peek",
        text: `PEEK REAR ${logicalQueue[logicalQueue.length - 1]}`,
      },
      ...p,
    ]);
  };

  /* ───────── TRAVERSE ───────── */
  const handleTraverse = async () => {
    if (logicalQueue.length === 0 || isTraversing) return;

    setIsTraversing(true);

    // 1️⃣ Traverse FRONT → REAR
    for (let i = 0; i < logicalQueue.length; i++) {
      setTraverseIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    // 2️⃣ Clear highlight briefly
    setTraverseIndex(null);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 3️⃣ Highlight FRONT again (wrap-around indication)
    setTraverseIndex(0);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 4️⃣ Final clear
    setTraverseIndex(null);
    setIsTraversing(false);

    // 5️⃣ Log traversal
    setLog((prev) => [
      {
        type: "traverse",
        text: `TRAVERSE ${logicalQueue.join(" → ")} → (wraps to FRONT)`,
      },
      ...prev,
    ]);
  };

  const handleClear = () => {
    setQueue(Array(MAX_QUEUE).fill(null));
    setFront(-1);
    setRear(-1);
    setLog((p) => [{ type: "clear", text: "CLEAR CIRCULAR QUEUE" }, ...p]);
  };

  /* ───────── UI ───────── */
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
              Circular Queue Visualizer
            </div>
            <div className="text-xs text-white/60">
              FIFO with Wrap-Around · DASHED
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr] pb-16">
        {/* SIDEBAR */}
        <aside className="border-r grid grid-rows-3">
          <div className="p-4 border-b space-y-3">
            <h2 className="text-sm font-semibold">Concept</h2>
            <Info label="Front Index" value={front === -1 ? "—" : front} />
            <Info label="Rear Index" value={rear === -1 ? "—" : rear} />
            <Info label="Elements" value={size} />
            <Info label="Remaining" value={MAX_QUEUE - size} />
            <Info label="Max Size" value={MAX_QUEUE} />
            <p className="text-[11px] text-black/50">
              Circular Queue uses <b>modulo arithmetic</b>.
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
              Traversal follows logical order <b>Front → Rear</b>.
            </p>
          </div>
        </aside>

        {/* VISUAL COMPARISON */}
        <section className="bg-neutral-50 flex items-center justify-end py-12 pl-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-16 items-center max-w-6xl w-full">
            {/* ───────── LINEAR QUEUE ───────── */}
            <div className="flex gap-2 relative max-w-[520px]">
              {logicalQueue.length === 0 && (
                <div className="text-xs text-black/40">Queue is empty</div>
              )}

              {logicalQueue.map((item, i) => {
                const isFront = i === 0;
                const isRear = i === logicalQueue.length - 1;
                const isTraversing = traverseIndex === i;
                const isPeekFront = peekFrontIndex === i;
                const isPeekRear = peekRearIndex === i;

                return (
                  <div key={i} className="relative">
                    {isFront && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium">
                        FRONT
                      </span>
                    )}
                    {isRear && logicalQueue.length > 1 && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium">
                        REAR
                      </span>
                    )}

                    <div
                      className={`
                w-14 h-14 flex items-center justify-center rounded-md font-semibold
                transition-all duration-300
                ${
                  isTraversing
                    ? "bg-black text-white scale-105 shadow-lg"
                    : isPeekFront
                      ? "bg-white border-2 border-black ring-2 ring-black scale-105"
                      : isPeekRear
                        ? "bg-white border-2 border-dashed border-black scale-105"
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

            {/* ───────── CIRCULAR QUEUE ───────── */}
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full border-2 border-black/10" />

              {Array.from({ length: MAX_QUEUE }).map((_, i) => {
                const value = queue[i];
                const angle = (2 * Math.PI * i) / MAX_QUEUE - Math.PI / 2;
                const radius = 135;

                const x = 136 + radius * Math.cos(angle);
                const y = 136 + radius * Math.sin(angle);

                const isFront = i === front && front !== -1;
                const isRear = i === rear && rear !== -1;

                // ✅ TRAVERSE HIGHLIGHT (LOGICAL → PHYSICAL)
                const isTraversingNode =
                  traverseIndex !== null &&
                  i === (front + traverseIndex) % MAX_QUEUE;

                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: x - 18, top: y - 23 }}
                  >
                    {isFront && (
                      <div className="absolute -top-4 text-xs font-bold">
                        Front
                      </div>
                    )}
                    {isRear && (
                      <div className="absolute -top-4 text-xs font-bold">
                        Rear
                      </div>
                    )}
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-md font-semibold
  transition-all duration-300 cursor-pointer
  ${
    isTraversingNode
      ? "bg-black text-white scale-105 shadow-lg"
      : value !== null
        ? "bg-white border-2 border-black hover:scale-105 hover:shadow-md hover:bg-neutral-100"
        : "bg-black/10 hover:bg-black/20 hover:scale-105"
  }`}
                    >
                      {value ?? ""}
                    </div>
                  </div>
                );
              })}

              <div className="absolute inset-0 flex items-center justify-center text-xs text-black/60">
                Circular Queue
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full h-16 bg-white border-t">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <FooterBtn icon={FiPlus} label="Enqueue" onClick={handleEnqueue} />
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

/* ───────── SMALL COMPONENTS ───────── */

const Info = ({ label, value }) => (
  <div className="flex justify-between text-xs">
    <span className="text-black/60">{label}</span>
    <span className="px-2 py-0.5 bg-black/10 rounded-full font-mono">
      {value}
    </span>
  </div>
);

const FooterBtn = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex flex-col items-center justify-center hover:bg-black/5"
  >
    <Icon className="text-lg text-black" />
    <span className="text-xs">{label}</span>
  </button>
);
