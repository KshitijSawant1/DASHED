"use client";

import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa6";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";

const MAX_STACK = 9;

/* ───────── LOG COLOR MAP ───────── */
const logStyle = {
  push: "bg-green-100 text-green-700",
  pop: "bg-red-100 text-red-700",
  peek: "bg-blue-100 text-blue-700",
  clear: "bg-violet-100 text-violet-700",
  overflow: "bg-orange-100 text-orange-700",
  underflow: "bg-pink-100 text-pink-700",
  traverse: "bg-sky-100 text-sky-700",
};

export default function StackPage() {
  const [stack, setStack] = useState([10, 20, 30]);
  const [log, setLog] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);

  /* ───────── STACK OPERATIONS ───────── */

  const handlePush = () => {
    if (stack.length >= MAX_STACK) {
      setLog((prev) => [
        { type: "overflow", text: "OVERFLOW — Stack is full" },
        ...prev,
      ]);
      return;
    }

    const value = Math.floor(Math.random() * 90 + 10);
    setStack((prev) => [...prev, value]);
    setLog((prev) => [{ type: "push", text: `PUSH ${value}` }, ...prev]);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setLog((prev) => [
        { type: "underflow", text: "UNDERFLOW — Stack is empty" },
        ...prev,
      ]);
      return;
    }

    const value = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setLog((prev) => [{ type: "pop", text: `POP ${value}` }, ...prev]);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setLog((prev) => [
        { type: "underflow", text: "UNDERFLOW — Stack is empty" },
        ...prev,
      ]);
      return;
    }

    const value = stack[stack.length - 1];
    setLog((prev) => [{ type: "peek", text: `PEEK ${value}` }, ...prev]);
  };

  const handleClear = () => {
    setStack([]);
    setLog((prev) => [{ type: "clear", text: "CLEAR STACK" }, ...prev]);
  };

  /* ───────── TRAVERSE ANIMATION ───────── */
  const handleTraverse = async () => {
    if (stack.length === 0) {
      setLog((prev) => [
        { type: "underflow", text: "TRAVERSE — Stack is empty" },
        ...prev,
      ]);
      return;
    }

    if (isTraversing) return;

    setIsTraversing(true);

    for (let i = stack.length - 1; i >= 0; i--) {
      setTraverseIndex(i);
      await new Promise((res) => setTimeout(res, 600));
    }

    setTraverseIndex(null);
    setIsTraversing(false);

    const order = [...stack].reverse().join(" → ");
    setLog((prev) => [
      { type: "traverse", text: `TRAVERSE ${order}` },
      ...prev,
    ]);
  };

  return (
    <div className="h-screen w-full grid grid-rows-[10vh_1fr] bg-white">
      {/* ───────── TOP BAR ───────── */}
      <header className="bg-black border-b border-white/10">
        <div className="mx-auto max-w-screen-xl px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15">
              <FaLayerGroup className="text-2xl text-violet-400" />
            </div>
            <div>
              <div className="text-base font-semibold text-white">
                Stack Visualizer
              </div>
              <div className="text-xs text-white/50">
                LIFO Data Structure · DASHED
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-6 text-xs text-white/60">
            <span>
              Size: <b className="text-white">{stack.length}</b>
            </span>
            <span>
              Top:{" "}
              <b className="text-white">
                {stack.length ? stack[stack.length - 1] : "—"}
              </b>
            </span>
            <span>
              Capacity: <b className="text-white">{MAX_STACK}</b>
            </span>
          </div>
        </div>
      </header>

      {/* ───────── MAIN ───────── */}
      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr] pb-16">
        {/* SIDEBAR */}
        <aside className="border-r border-black/10 grid grid-rows-3">
          <div className="p-4 border-b space-y-3">
            <h2 className="text-sm font-semibold">Concept</h2>

            {/* TOP POINTER */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-black/60">Top Pointer</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-mono">
                {stack.length ? stack.length - 1 : "—"}
              </span>
            </div>

            {/* TOP VALUE */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-black/60">Top Value</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-mono">
                {stack.length ? stack[stack.length - 1] : "—"}
              </span>
            </div>

            {/* SPOTS FILLED */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-black/60">Spots Filled</span>
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-mono">
                {stack.length}
              </span>
            </div>

            {/* SPOTS REMAINING */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-black/60">Spots Remaining</span>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-mono">
                {MAX_STACK - stack.length}
              </span>
            </div>

            {/* MAX SIZE */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-black/60">Max Size</span>
              <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-mono">
                {MAX_STACK}
              </span>
            </div>

            {/* LIFO NOTE */}
            <p className="text-[11px] text-black/50 pt-1">
              Stack follows <b>LIFO</b> (Last In, First Out)
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

          <div className="p-4 space-y-3 max-h-55 overflow-y-auto">
            <h2 className="text-sm font-semibold">Traverse</h2>

            <p className="text-xs text-black/70 leading-relaxed">
              <b>Traverse</b> is the operation of accessing each element of the
              stack sequentially without changing its structure.
            </p>

            <p className="text-xs text-black/70 leading-relaxed">
              In a stack, traversal is performed from the <b>Top</b> element
              down to the <b>Bottom</b>, following the LIFO order.
            </p>

            <p className="text-xs text-black/70 leading-relaxed">
              Unlike <b>Pop</b>, traversal does <b>not remove</b> elements and
              does not affect the stack size or top pointer.
            </p>

            <p className="text-[11px] text-black/50 italic">
              Used for display, debugging, and understanding stack contents.
            </p>
          </div>
        </aside>

        {/* VISUALIZER */}
        <section className="bg-neutral-50 flex items-end justify-center pb-10">
          <div className="relative">
            {/* ───── TOP POINTER ───── */}
            {stack.length > 0 && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="px-3 py-1 rounded-full bg-black text-white text-xs font-mono shadow">
                  TOP
                </div>
                <div className="w-px h-6 bg-black/60" />
              </div>
            )}

            {/* ───── STACK CONTAINER ───── */}
            <div className="w-40 border-2 border-dashed border-black/20 rounded-lg p-2 flex flex-col-reverse gap-2">
              {stack.length === 0 && (
                <div className="text-xs text-black/40 text-center py-4">
                  Stack is empty
                </div>
              )}
              {stack.map((item, index) => {
                const isTop = index === stack.length - 1;
                const isActive = index === traverseIndex;

                return (
                  <div
                    key={index}
                    className={`
        h-10 flex items-center justify-center rounded-md text-sm font-semibold
        transition-all duration-300 ease-out
        cursor-pointer

        ${
          isActive
            ? "bg-sky-600 text-white scale-105 shadow-lg"
            : isTop
              ? `
                bg-violet-600 text-white
                hover:scale-105
                hover:shadow-xl
                hover:ring-2 hover:ring-violet-300
              `
              : `
                bg-violet-200 text-black
                hover:scale-105
                hover:bg-violet-300
                hover:shadow-md
              `
        }
      `}
                    title={isTop ? "Top element" : "Stack element"}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-black/10">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
          {/* PUSH */}
          <button
            onClick={handlePush}
            className="inline-flex flex-col items-center justify-center hover:bg-neutral-100 transition"
          >
            <FiPlus className="text-lg text-violet-600 mb-0.5" />
            <span className="text-xs text-violet-600">Push</span>
          </button>

          {/* POP */}
          <button
            onClick={handlePop}
            className="inline-flex flex-col items-center justify-center hover:bg-neutral-100 transition"
          >
            <FiMinus className="text-lg text-red-600 mb-0.5" />
            <span className="text-xs text-red-600">Pop</span>
          </button>

          {/* PEEK */}
          <button
            onClick={handlePeek}
            className="inline-flex flex-col items-center justify-center hover:bg-neutral-100 transition"
          >
            <FiEye className="text-lg text-blue-600 mb-0.5" />
            <span className="text-xs text-blue-600">Peek</span>
          </button>

          {/* TRAVERSE */}
          <button
            onClick={handleTraverse}
            disabled={isTraversing}
            className="inline-flex flex-col items-center justify-center hover:bg-neutral-100 transition
                 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiShuffle className="text-lg text-sky-600 mb-0.5" />
            <span className="text-xs text-sky-600">Traverse</span>
          </button>

          {/* CLEAR */}
          <button
            onClick={handleClear}
            className="inline-flex flex-col items-center justify-center hover:bg-red-50 transition"
          >
            <FiX className="text-lg text-red-600 mb-0.5" />
            <span className="text-xs text-red-600">Clear</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
