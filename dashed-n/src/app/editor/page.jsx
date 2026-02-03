"use client";

// app/editor/page.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { HiPlay, HiStop, HiOutlineTerminal, HiLightBulb } from "react-icons/hi";

import TASKS from "./tasks.json";

// Monaco must be dynamically imported (no SSR)
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const STORAGE_KEY = "py_editor_v2";
const MAX_BUF = 1_000_000;

/* ─────────────────────────────
   Helper: starter code
───────────────────────────── */
const buildStarter = (task) =>
  `# Task: ${task.title}\n` +
  `# Write only the class with the required method(s)\n\n` +
  task.reference.split("\n").slice(0, 1).join("\n") +
  `\n    def __init__(self):\n        pass\n`;

export default function EditorPage() {
  /* ─────────────────────────────
     Task selection
  ───────────────────────────── */
  const taskKeys = useMemo(() => Object.keys(TASKS), []);
  const [selectedTaskKey, setSelectedTaskKey] = useState("push");
  const task = TASKS[selectedTaskKey];

  /* ─────────────────────────────
     Code per task (persisted)
  ───────────────────────────── */
  const [codeMap, setCodeMap] = useState({});
  const code = codeMap[selectedTaskKey] ?? buildStarter(task);

  const setCode = (next) =>
    setCodeMap((m) => ({ ...m, [selectedTaskKey]: next }));

  /* ─────────────────────────────
     Runtime state
  ───────────────────────────── */
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [running, setRunning] = useState(false);
  const [pyStatus, setPyStatus] = useState("loading");

  const [hintMsg, setHintMsg] = useState("");
  const [headlight, setHeadlight] = useState([]);

  const pyodideRef = useRef(null);
  const abortRef = useRef({ aborted: false });

  /* ─────────────────────────────
     Load saved session (client)
  ───────────────────────────── */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.selectedTaskKey) setSelectedTaskKey(saved.selectedTaskKey);
      if (saved.codeMap) setCodeMap(saved.codeMap);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selectedTaskKey, codeMap }),
    );
  }, [selectedTaskKey, codeMap]);

  /* ─────────────────────────────
     Load Pyodide (client only)
  ───────────────────────────── */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
        document.body.appendChild(script);

        await new Promise((res, rej) => {
          script.onload = res;
          script.onerror = rej;
        });

        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        });

        if (!mounted) return;

        const pushSafe = (setter) => (chunk) => {
          if (!abortRef.current.aborted) {
            setter((prev) => (prev + chunk).slice(-MAX_BUF));
          }
        };

        pyodide.setStdout({ batched: pushSafe(setStdout) });
        pyodide.setStderr({ batched: pushSafe(setStderr) });

        pyodideRef.current = pyodide;
        setPyStatus("ready");
      } catch {
        setPyStatus("error");
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  /* ─────────────────────────────
     Run / Stop
  ───────────────────────────── */
  const handleRun = async () => {
    if (!pyodideRef.current || running) return;

    setRunning(true);
    setStdout("");
    setStderr("");
    setHintMsg("");
    setHeadlight([]);
    abortRef.current = { aborted: false };

    try {
      await pyodideRef.current.runPythonAsync(code);
    } catch (e) {
      setStderr(String(e));
    } finally {
      setRunning(false);
    }
  };

  const handleStop = () => {
    abortRef.current.aborted = true;
    setRunning(false);
  };

  /* ─────────────────────────────
     Keyboard shortcut
  ───────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, code]);

  /* ─────────────────────────────
     UI
  ───────────────────────────── */
  return (
    <div className="h-dvh w-full bg-[var(--surface)] p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4 p-3 rounded-xl border bg-[var(--card)]">
        <div className="flex items-center gap-3">
          <label className="text-sm">Task</label>
          <select
            value={selectedTaskKey}
            onChange={(e) => setSelectedTaskKey(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            {taskKeys.map((k) => (
              <option key={k} value={k}>
                {TASKS[k].title}
              </option>
            ))}
          </select>
          <span className="text-xs opacity-70">
            {pyStatus === "loading" && "Loading Python…"}
            {pyStatus === "ready" && "Python Ready"}
            {pyStatus === "error" && "Python Failed"}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={running || pyStatus !== "ready"}
            className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm"
          >
            <HiPlay className="inline mr-1" /> Run
          </button>
          <button
            onClick={handleStop}
            disabled={!running}
            className="px-3 py-1.5 rounded bg-red-500 text-white text-sm"
          >
            <HiStop className="inline mr-1" /> Stop
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-80px)]">
        {/* Editor */}
        <div className="lg:col-span-2 border rounded-xl overflow-hidden">
          <Editor
            height="100%"
            language="python"
            theme="vs-light"
            value={code}
            onChange={(v) => setCode(v ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">
          {/* Input */}
          <div className="flex-1 border rounded-xl bg-blue-100 p-2">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <HiOutlineTerminal /> Input
            </h3>
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              className="w-full h-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* Output */}
          <div
            className={`flex-1 border rounded-xl p-2 ${
              stderr ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <h3 className="text-sm font-medium flex items-center gap-1">
              <HiOutlineTerminal /> Output
            </h3>
            <textarea
              readOnly
              value={stderr || stdout}
              className="w-full h-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
