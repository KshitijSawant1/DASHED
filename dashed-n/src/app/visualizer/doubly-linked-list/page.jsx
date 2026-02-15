"use client";

import { useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FiPlus, FiMinus, FiEye, FiShuffle, FiX } from "react-icons/fi";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
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

export default function DoublyLinkedListPage() {
  const [list, setList] = useState([10, 20, 30]);
  const [log, setLog] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [traverseIndex, setTraverseIndex] = useState(null);
  const [llValue, setLlValue] = useState("");
  const [llIndex, setLlIndex] = useState("");
  const [indexWarning, setIndexWarning] = useState(false);

  const addresses = list.map(
    (_, i) => `0x${(0x200000 + i * 0x2b3).toString(16).toUpperCase()}`,
  );

  const logMsg = (type, text) => setLog((p) => [{ type, text }, ...p]);

  /* ───────── INSERT OPS ───────── */
  const insertAtStart = () => {
    if (list.length >= MAX_NODES)
      return logMsg("overflow", "OVERFLOW — List is full");

    const v = Number(llValue);
    if (Number.isNaN(v)) return;

    setList((p) => [v, ...p]);
    logMsg("insert", `INSERT ${v} at START`);
  };

  const insertAtEnd = () => {
    if (list.length >= MAX_NODES)
      return logMsg("overflow", "OVERFLOW — List is full");

    const v = Number(llValue);
    if (Number.isNaN(v)) return;

    setList((p) => [...p, v]);
    logMsg("insert", `INSERT ${v} at END`);
  };

  const insertAtIndex = () => {
    const v = Number(llValue);
    const i = Number(llIndex);

    if (list.length >= MAX_NODES)
      return logMsg("overflow", "OVERFLOW — List is full");

    if (Number.isNaN(v) || Number.isNaN(i) || i < 0 || i > list.length)
      return logMsg("underflow", "INVALID INDEX — Insert failed");

    const updated = [...list];
    updated.splice(i, 0, v);
    setList(updated);
    logMsg("insert", `INSERT ${v} at INDEX ${i}`);
  };

  /* ───────── DELETE OPS ───────── */
  const deleteAtStart = () => {
    if (!list.length) return logMsg("underflow", "UNDERFLOW — List is empty");

    const v = list[0];
    setList((p) => p.slice(1));
    logMsg("delete", `DELETE ${v} from START`);
  };

  const deleteAtEnd = () => {
    if (!list.length) return logMsg("underflow", "UNDERFLOW — List is empty");

    const v = list[list.length - 1];
    setList((p) => p.slice(0, -1));
    logMsg("delete", `DELETE ${v} from END`);
  };

  const deleteAtIndex = () => {
    const i = Number(llIndex);
    if (Number.isNaN(i) || i < 0 || i >= list.length)
      return logMsg("underflow", "INVALID INDEX — Delete failed");

    const v = list[i];
    const updated = [...list];
    updated.splice(i, 1);
    setList(updated);
    logMsg("delete", `DELETE ${v} at INDEX ${i}`);
  };

  /* ───────── PEEK ───────── */
  const handlePeek = () => {
    if (!list.length) return logMsg("underflow", "PEEK — List is empty");

    logMsg("peek", `HEAD ${list[0]}`);
    logMsg("peek", `TAIL ${list[list.length - 1]}`);
  };

  /* ───────── TRAVERSE ───────── */
  const traverseForward = async () => {
    if (!list.length || isTraversing) return;
    setIsTraversing(true);

    for (let i = 0; i < list.length; i++) {
      setTraverseIndex(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    setTraverseIndex(null);
    setIsTraversing(false);
    logMsg("traverse", `FORWARD ${list.join(" ⇄ ")} → NULL`);
  };

  const traverseBackward = async () => {
    if (!list.length || isTraversing) return;
    setIsTraversing(true);

    for (let i = list.length - 1; i >= 0; i--) {
      setTraverseIndex(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    setTraverseIndex(null);
    setIsTraversing(false);
    logMsg("traverse", `BACKWARD NULL ← ${list.join(" ⇄ ")}`);
  };

  const handleClear = () => {
    setList([]);
    logMsg("clear", "CLEAR LINKED LIST");
  };

  /* ───────── UI ───────── */
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
              Doubly Linked List Visualizer
            </div>
            <div className="text-xs text-white/60">
              Prev ⇄ Data ⇄ Next · DASHED
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
            <Info label="Head" value={list[0] ?? "NULL"} />
            <Info label="Tail" value={list[list.length - 1] ?? "NULL"} />
            <Info label="Nodes" value={list.length} />
            <Info label="Remaining" value={MAX_NODES - list.length} />
            <p className="text-[11px] text-black/50">
              Each node stores <b>prev</b>, <b>data</b>, and <b>next</b>.
            </p>
          </div>

          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold mb-2">Operation Log</h2>
            <div className="h-40 overflow-y-auto space-y-2">
              {log.map((e, i) => (
                <div
                  key={i}
                  className={`px-3 py-1 text-xs rounded-full font-mono ${logStyle[e.type]}`}
                >
                  {e.text}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h2 className="text-sm font-semibold">Traverse</h2>
            <button
              onClick={traverseForward}
              className="w-full border rounded py-1 text-xs hover:bg-black/5"
            >
              Forward
            </button>
            <button
              onClick={traverseBackward}
              className="w-full border rounded py-1 text-xs hover:bg-black/5"
            >
              Backward
            </button>
          </div>
        </aside>

        {/* VISUALIZER */}
        <section className="bg-neutral-50 flex items-center justify-center py-10">
          <div className="flex items-center gap-2">
            {list.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {i !== 0 && <FaArrowLeft className="text-black/40" />}

                <div
                  className={`w-36 border rounded-lg transition-all ${
                    traverseIndex === i
                      ? "border-black scale-105 shadow-lg"
                      : "border-black/30"
                  }`}
                >
                  <div className="bg-white text-[10px] text-center font-mono">
                    INDEX {i}
                  </div>
                  <div className="bg-neutral-200 text-center py-1 font-bold">
                    {item}
                  </div>
                  <div className="bg-white text-[10px] text-center">
                    prev ~ {i === 0 ? "NULL" : addresses[i - 1]}
                  </div>
                  <div className="bg-white text-[10px] text-center border-t">
                    next ~ {i === list.length - 1 ? "NULL" : addresses[i + 1]}
                  </div>
                </div>

                {i !== list.length - 1 && (
                  <FaArrowRight className="text-black/40" />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full h-16 bg-white border-t">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <FooterBtn icon={FiPlus} label="Insert" onClick={insertAtEnd} />
          <FooterBtn icon={FiMinus} label="Delete" onClick={deleteAtStart} />
          <FooterBtn icon={FiEye} label="Peek" onClick={handlePeek} />
          <FooterBtn
            icon={FiShuffle}
            label="Traverse"
            onClick={traverseForward}
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

const FooterBtn = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex flex-col items-center justify-center hover:bg-black/5"
  >
    <Icon className="text-lg text-black" />
    <span className="text-xs">{label}</span>
  </button>
);
