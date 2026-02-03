"use client";

import { useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineDangerous } from "react-icons/md";
const MAX_NODES = 6;

/* ───────── LOG STYLE ───────── */
const logStyle = {
  insert: "bg-black/5 text-black",
  delete: "bg-black/10 text-black",
  peek: "bg-black/5 text-black",
  clear: "bg-black/10 text-black",
  overflow: "bg-black/20 text-black",
  underflow: "bg-black/20 text-black",
  traverse: "bg-black/5 text-black",
};

export default function LinkedListPage() {
  const [list, setList] = useState([10, 20, 30]);
  const [log, setLog] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);
  const [llValue, setLlValue] = useState("");
  const [llIndex, setLlIndex] = useState("");
  const [indexWarning, setIndexWarning] = useState(false);

  /* ───────── OPERATIONS ───────── */

  const handleInsert = () => {
    if (list.length >= MAX_NODES) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — List is full" },
        ...p,
      ]);
      return;
    }

    const value = Math.floor(Math.random() * 90 + 10);
    setList((p) => [...p, value]);
    setLog((p) => [{ type: "insert", text: `INSERT ${value}` }, ...p]);
  };

  const handleDelete = () => {
    if (list.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — List is empty" },
        ...p,
      ]);
      return;
    }

    const value = list[0];
    setList((p) => p.slice(1));
    setLog((p) => [{ type: "delete", text: `DELETE ${value}` }, ...p]);
  };

  const handlePeek = () => {
    if (list.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "PEEK — List is empty" },
        ...p,
      ]);
      return;
    }

    setLog((p) => [
      { type: "peek", text: `HEAD ${list[0]}` },
      { type: "peek", text: `TAIL ${list[list.length - 1]}` },
      ...p,
    ]);
  };

  const handleClear = () => {
    setList([]);
    setLog((p) => [{ type: "clear", text: "CLEAR LINKED LIST" }, ...p]);
  };

  /* ───────── TRAVERSE ───────── */
  const handleTraverse = async () => {
    if (list.length === 0 || isTraversing) return;

    setIsTraversing(true);

    for (let i = 0; i < list.length; i++) {
      setTraverseIndex(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    setTraverseIndex(null);
    setIsTraversing(false);

    setLog((p) => [
      { type: "traverse", text: `TRAVERSE ${list.join(" → ")} → NULL` },
      ...p,
    ]);
  };

  const getValue = () => {
    const v = Number(llValue);
    return Number.isNaN(v) ? null : v;
  };

  const getIndex = () => {
    const i = Number(llIndex);
    return Number.isNaN(i) ? null : i;
  };

  const insertAtStart = () => {
    if (list.length >= MAX_NODES) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — List is full" },
        ...p,
      ]);
      return;
    }

    const value = getValue();
    if (value === null) return;

    setList((p) => [value, ...p]);
    setLog((p) => [{ type: "insert", text: `INSERT ${value} at START` }, ...p]);
  };

  const insertAtEnd = () => {
    if (list.length >= MAX_NODES) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — List is full" },
        ...p,
      ]);
      return;
    }

    const value = getValue();
    if (value === null) return;

    setList((p) => [...p, value]);
    setLog((p) => [{ type: "insert", text: `INSERT ${value} at END` }, ...p]);
  };

  const insertAtIndex = () => {
    if (list.length >= MAX_NODES) {
      setLog((p) => [
        { type: "overflow", text: "OVERFLOW — List is full" },
        ...p,
      ]);
      return;
    }

    const value = getValue();
    const index = getIndex();

    if (value === null || index === null || index < 0 || index > list.length) {
      setLog((p) => [
        { type: "underflow", text: "INVALID INDEX — Insert failed" },
        ...p,
      ]);
      return;
    }

    const updated = [...list];
    updated.splice(index, 0, value);
    setList(updated);

    setLog((p) => [
      { type: "insert", text: `INSERT ${value} at INDEX ${index}` },
      ...p,
    ]);
  };

  const handleInsertAtIndexSafe = () => {
    if (llIndex === "" || isNaN(llIndex)) {
      setIndexWarning(true);
      setTimeout(() => setIndexWarning(false), 2000);
      return;
    }
    insertAtIndex();
  };

  const deleteAtStart = () => {
    if (list.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — List is empty" },
        ...p,
      ]);
      return;
    }

    const removed = list[0];
    setList((p) => p.slice(1));

    setLog((p) => [
      { type: "delete", text: `DELETE ${removed} from START` },
      ...p,
    ]);
  };

  const deleteAtEnd = () => {
    if (list.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — List is empty" },
        ...p,
      ]);
      return;
    }

    const removed = list[list.length - 1];
    setList((p) => p.slice(0, -1));

    setLog((p) => [
      { type: "delete", text: `DELETE ${removed} from END` },
      ...p,
    ]);
  };

  const deleteAtIndex = () => {
    if (list.length === 0) {
      setLog((p) => [
        { type: "underflow", text: "UNDERFLOW — List is empty" },
        ...p,
      ]);
      return;
    }

    const index = getIndex();
    if (index === null || index < 0 || index >= list.length) {
      setLog((p) => [
        { type: "underflow", text: "INVALID INDEX — Delete failed" },
        ...p,
      ]);
      return;
    }

    const removed = list[index];
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);

    setLog((p) => [
      { type: "delete", text: `DELETE ${removed} at INDEX ${index}` },
      ...p,
    ]);
  };

  const handleDeleteAtIndexSafe = () => {
    if (llIndex === "" || isNaN(llIndex)) {
      setIndexWarning(true);
      setTimeout(() => setIndexWarning(false), 2000);
      return;
    }
    deleteAtIndex();
  };

  const addresses = list.map(
    (_, i) => `0x${(0x100000 + i * 0x1f3).toString(16).toUpperCase()}`,
  );

  return (
    <div className="h-screen w-full grid grid-rows-[10vh_1fr] bg-white">
      {/* HEADER */}
      <header className="bg-black border-b">
        <div className="mx-auto max-w-screen-xl px-6 h-full flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
            <FaProjectDiagram className="text-xl text-white" />
          </div>
          <div>
            <div className="text-base font-semibold text-white">
              Linked List Visualizer
            </div>
            <div className="text-xs text-white/60">
              Singly Linked List · DASHED
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
            <Info label="Head" value={list.length ? list[0] : "NULL"} />
            <Info
              label="Tail"
              value={list.length ? list[list.length - 1] : "NULL"}
            />
            <Info label="Nodes" value={list.length} />
            <Info label="Remaining" value={MAX_NODES - list.length} />
            <p className="text-[11px] text-black/50">
              Each node stores <b>data</b> and a <b>next</b> pointer.
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
              Traversal visits nodes from <b>HEAD → NULL</b>.
            </p>
          </div>
        </aside>

        {/* VISUALIZER */}
        <section className="bg-neutral-50 flex items-center justify-center py-10">
          <div className="flex items-center gap-1">
            {/* HEAD */}
            {list.length > 0 && (
              <div className="flex items-center gap-1 ml-2 text-sm font-bold text-black">
                <span>HEAD</span>
                <FaArrowRight className="text-lg ml-2" />
              </div>
            )}

            {/* NODES */}
            {list.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`
        w-32 rounded-lg border overflow-hidden transition-all
        ${
          traverseIndex === i
            ? "border-black scale-105 shadow-lg"
            : "border-black/30 hover:shadow-md"
        }
      `}
                >
                  {/* INDEX */}
                  <div className="bg-white text-center p-1 text-[10px] font-mono text-black">
                    INDEX {i}
                  </div>

                  {/* VALUE */}
                  <div className="bg-neutral-200 text-center py-1 font-bold border-t border-b text-sm">
                    {item}
                  </div>

                  {/* ADDRESS */}
                  <div className="bg-white text-center py-[2px] text-[10px] font-mono text-black/60">
                    {addresses[i]}
                  </div>

                  {/* NEXT POINTER */}
                  <div className="bg-white text-center py-1 text-[11px] border-t text-black/70">
                    next ~ {i === list.length - 1 ? "NULL" : addresses[i + 1]}
                  </div>
                </div>

                {/* ARROW */}
                {i !== list.length - 1 && (
                  <span className="text-xl text-black/50">
                    <FaArrowRight />
                  </span>
                )}
              </div>
            ))}

            {/* NULL */}
            {list.length > 0 && (
              <div className="flex items-center gap-1 ml-2 text-sm font-bold text-black">
                <FaArrowRight className="text-lg mr-2" />
                <span>NULL</span>
              </div>
            )}

            {list.length === 0 && (
              <div className="text-xs text-black/40">List is empty</div>
            )}
          </div>
        </section>
      </main>

      {/* FLOATING INFO CARD – Bottom Left */}
      <div
        className="fixed bottom-20 left-76 z-40 px-4 py-2 bg-white border rounded-full shadow-md
                text-xs text-black/70 flex items-center gap-4"
      >
        <span className="flex items-center gap-1">
          Insert
          <span className="font-mono flex items-center gap-1">
            <FaArrowRight className="text-[10px]" />
            End
          </span>
        </span>

        <span className="text-black/30">|</span>

        <span className="flex items-center gap-1">
          Delete
          <span className="font-mono flex items-center gap-1">
            <FaArrowRight className="text-[10px]" />
            Start
          </span>
        </span>
      </div>

      {/* Floating Card - Center warning pill*/}
      {indexWarning && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-300 rounded-full shadow-lg text-xs font-medium text-red-700">
            <MdOutlineDangerous className="text-sm" />
            Please provide a valid index
          </div>
        </div>
      )}

      {/* Floating Card -Right User Control Panel */}
      <div className="fixed bottom-20 right-6 z-40 w-64 bg-white border rounded-xl shadow-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold">Linked List Operations</h3>

        {/* INPUTS */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Value"
            value={llValue}
            onChange={(e) => setLlValue(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md"
          />

          <input
            type="number"
            placeholder="Index"
            value={llIndex}
            onChange={(e) => setLlIndex(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md"
          />
        </div>
        <div className="border-t" />
        <p className="text-[11px] text-black font-bold">Insert Ops</p>

        {/* INSERT BUTTONS */}
        <div className="flex border rounded-full overflow-hidden">
          <button
            onClick={insertAtStart}
            className="flex-1 py-2 text-sm border-r hover:bg-neutral-100 transition"
          >
            Start
          </button>

          <button
            onClick={insertAtEnd}
            className="flex-1 py-2 text-sm border-r hover:bg-neutral-100 transition"
          >
            End
          </button>

          <button
            onClick={handleInsertAtIndexSafe}
            className="flex-1 py-2 text-sm hover:bg-neutral-100 transition"
          >
            Index
          </button>
        </div>

        {/* DIVIDER */}
        <div className="border-t" />
        <p className="text-[11px] text-black font-bold">Delete Ops</p>
        {/* DELETE BUTTONS */}
        <div className="flex border rounded-full overflow-hidden">
          <button
            onClick={deleteAtStart}
            className="flex-1 py-2 text-sm border-r hover:bg-neutral-100 transition"
          >
            Start
          </button>

          <button
            onClick={deleteAtEnd}
            className="flex-1 py-2 text-sm border-r hover:bg-neutral-100 transition"
          >
            End
          </button>

          <button
            onClick={handleDeleteAtIndexSafe}
            className="flex-1 py-2 text-sm hover:bg-neutral-100 transition"
          >
            Index
          </button>
        </div>
        {/* FOOTNOTE */}
        <p className="text-[11px] text-black/50 italic">
          Index is zero-based (0 → head)
        </p>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full h-16 bg-white border-t">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <FooterBtn icon={FiPlus} label="Insert" onClick={handleInsert} />
          <FooterBtn icon={FiMinus} label="Delete" onClick={handleDelete} />
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
    <span className="px-2 py-0.5 rounded-full bg-black/10 font-mono">
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
    <span className="text-xs">{label}</span>
  </button>
);
