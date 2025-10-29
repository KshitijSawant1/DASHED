// src/pages/CodeEditor.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { HiPlay, HiStop, HiOutlineTerminal, HiLightBulb } from "react-icons/hi";
import TASKS from "./tasks.json";

const STORAGE_KEY = "py_editor_v2";
const MAX_BUF = 1_000_000;

// small helper to build starter code for a task
const buildStarter = (task) =>
  `# Task: ${task.title}\n` +
  `# Write only the class with the required method(s)\n\n` +
  task.reference.split("\n").slice(0, 1).join("\n") +
  `\n    def __init__(self):\n        pass\n`;

export default function CodeEditor() {
  // === Task selection (dropdown in top bar) ===
  const taskKeys = useMemo(() => Object.keys(TASKS), []);
  const [selectedTaskKey, setSelectedTaskKey] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return saved.selectedTaskKey || "push";
    } catch {
      return "push";
    }
  });
  const task = TASKS[selectedTaskKey];

  // Store per-task code so switching tasks doesn't wipe user work
  const [codeMap, setCodeMap] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return saved.codeMap || { [selectedTaskKey]: buildStarter(task) };
    } catch {
      return { [selectedTaskKey]: buildStarter(task) };
    }
  });

  const code = codeMap[selectedTaskKey] ?? buildStarter(task);
  const setCode = (next) =>
    setCodeMap((m) => ({ ...m, [selectedTaskKey]: next }));

  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [running, setRunning] = useState(false);
  const [pyStatus, setPyStatus] = useState("loading"); // loading | ready | error

  // Hint states
  const [hintMsg, setHintMsg] = useState("");
  const [headlight, setHeadlight] = useState([]);

  const pyodideRef = useRef(null);
  const abortRef = useRef({ aborted: false });

  // --- Load / persist session ---
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selectedTaskKey, codeMap })
    );
  }, [selectedTaskKey, codeMap]);

  // --- Load Pyodide once ---
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
        document.body.appendChild(s);
        await new Promise((res, rej) => {
          s.onload = res;
          s.onerror = () => rej(new Error("Failed to load pyodide.js"));
        });
        // @ts-ignore
        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        });
        if (!mounted) return;

        const pushSafe = (setter) => (chunk) => {
          if (abortRef.current.aborted) return;
          setter((prev) => (prev + chunk).slice(-MAX_BUF));
        };
        pyodide.setStdout({ batched: pushSafe(setStdout) });
        pyodide.setStderr({ batched: pushSafe(setStderr) });

        pyodideRef.current = pyodide;
        setPyStatus("ready");
      } catch (e) {
        console.error(e);
        setPyStatus("error");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // --- Helpers for Hint ---
  // Known method names for this task set
  const KNOWN_METHODS = ["push", "pop", "peek", "display", "__init__"];

  // Levenshtein distance (very small, fast)
  function levenshtein(a, b) {
    const m = a.length,
      n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
      Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + cost // substitution
        );
      }
    }
    return dp[m][n];
  }

  // Find calls like ".puh(...)" and fix to nearest known method if distance == 1
  function findAndFixMethodTypos(src) {
    const callRe = /\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
    let m,
      fixes = 0;
    let notes = [];
    let out = src;
    const MAX_FIXES = 2;

    // Collect unique method tokens with positions
    const occurrences = [];
    while ((m = callRe.exec(src)) !== null) {
      occurrences.push({ name: m[1], index: m.index + 1 }); // start after '.'
    }

    for (const occ of occurrences) {
      if (fixes >= MAX_FIXES) break;
      // Skip if already a known method
      if (KNOWN_METHODS.includes(occ.name)) continue;

      // Find closest method by edit distance
      let best = { name: null, d: Infinity };
      for (const km of KNOWN_METHODS) {
        const d = levenshtein(occ.name, km);
        if (d < best.d) best = { name: km, d };
      }

      // Only auto-fix if unambiguous and very likely (distance == 1)
      if (best.name && best.d === 1) {
        const dotName = `.${occ.name}(`;
        const dotBest = `.${best.name}(`;
        // Replace all exact call tokens of this misspelling
        const re = new RegExp(`\\.${occ.name}\\s*\\(`, "g");
        const newOut = out.replace(re, dotBest);
        if (newOut !== out) {
          out = newOut;
          fixes++;
          notes.push(`fixed “.${occ.name}(…)” → “.${best.name}(…)”`);
        }
      } else if (best.name && best.d <= 2) {
        // If not confident enough to fix, still surface as a hint
        notes.push(
          `possible typo: “.${occ.name}(…)” — did you mean “.${best.name}(…)”?`
        );
      }
    }

    return { fixed: out, notes, fixedCount: fixes };
  }

  const normalize = (s) =>
    s
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((l) => l.replace(/\s+$/g, ""));

  const autoFixCommon = (src) => {
    let fixes = 0;
    let lines = src.split("\n");

    lines = lines.map((ln) => {
      if (
        fixes < 2 &&
        /^\s*(def|if|elif|else|for|while|try|except|finally)\b[^:]*$/.test(ln)
      ) {
        fixes++;
        return ln + ":";
      }
      return ln;
    });

    lines = lines.map((ln) => {
      if (fixes < 2 && /^\s*print\s+["'`].*["'`]$/.test(ln)) {
        const m = ln.match(/^\s*print\s+(.*)$/);
        if (m) {
          fixes++;
          return ln.replace(/^\s*print\s+(.*)$/, "print($1)");
        }
      }
      return ln;
    });

    return { fixed: lines.join("\n"), fixedCount: fixes };
  };

  const computeHeadlight = () => {
    const user = normalize(code);
    const ref = normalize(task.steps.join("\n"));
    let i = 0;
    for (let r = 0; r < ref.length; r++) {
      const target = ref[r];
      let found = false;
      for (; i < user.length; i++) {
        if (user[i].trim() === target.trim()) {
          found = true;
          i++;
          break;
        }
      }
      if (!found) {
        const next = ref.slice(r, r + 3).filter((l) => l.trim() !== "");
        return next;
      }
    }
    return [];
  };

  // --- Run / Stop ---
  const handleRun = async () => {
    if (!pyodideRef.current || running) return;
    setRunning(true);
    setStdout("");
    setStderr("");
    setHintMsg("");
    setHeadlight([]);
    abortRef.current = { aborted: false };

    try {
      const py = pyodideRef.current;
      await py.runPythonAsync(code);
    } catch (e) {
      setStderr((prev) => (prev ? prev + "\n" : "") + String(e));
    } finally {
      setRunning(false);
    }
  };

  const handleStop = () => {
    abortRef.current.aborted = true;
    setRunning(false);
  };

  const handleHint = async () => {
    setHintMsg("");
    setHeadlight([]);

    try {
      if (!pyodideRef.current) throw new Error("Python runtime not ready");
      const py = pyodideRef.current;

      const { fixed, fixedCount } = autoFixCommon(code);

      const checker = `
import sys
ok = True
msg = ""
try:
    compile(${JSON.stringify(fixed)}, "<hint>", "exec")
except SyntaxError as e:
    ok = False
    msg = f"SyntaxError: {e.msg} at line {e.lineno}, col {e.offset}"
(ok, msg)
`;
      const [ok, msg] = await py.runPythonAsync(checker);

      if (!ok && fixedCount > 0) {
        setCode(fixed);
        setHintMsg(`I fixed ${fixedCount} common issue(s). ${msg || ""}`);
      } else if (!ok) {
        setHintMsg(
          msg || "Syntax error detected. Check punctuation/indentation."
        );
      } else if (fixedCount > 0) {
        setCode(fixed);
        setHintMsg(`I fixed ${fixedCount} common issue(s). Code compiles now.`);
      } else {
        setHintMsg("No obvious syntax errors found.");
      }
    } catch (e) {
      setHintMsg(String(e.message || e));
    }
    // 2) method-typo linter (detects .puh(...) etc.)
    {
      const { fixed, notes, fixedCount } = findAndFixMethodTypos(code);
      if (fixedCount > 0) {
        setCode(fixed);
        setHintMsg(
          (prev) =>
            (prev ? prev + "\n" : "") +
            `I corrected ${fixedCount} method call typo(s): ${notes.join("; ")}`
        );
      } else if (notes.length > 0) {
        setHintMsg((prev) => (prev ? prev + "\n" : "") + notes.join("; "));
      }
    }

    const next = computeHeadlight();
    setHeadlight(next);
  };

  // Ctrl/Cmd+Enter to run
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, code]);

  // When task changes, if we don't have any code saved for it, seed starter
  useEffect(() => {
    setCodeMap((m) => {
      if (m[selectedTaskKey]) return m;
      return { ...m, [selectedTaskKey]: buildStarter(task) };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTaskKey]);

  return (
    <div className="h-svh md:h-dvh w-full bg-[var(--surface)] text-[var(--text)] overflow-hidden">
      <div className="mx-auto max-w-[1600px] h-full grid grid-rows-[auto,1fr] gap-3 p-3 sm:p-4">
        {/* Top bar */}
        <div
          className="mt-15 rounded-2xl border shadow-sm backdrop-blur px-3 py-2 flex items-center justify-between gap-2 sm:gap-3"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2">
            {/* Task selector */}
            <label className="text-sm opacity-80">Task:</label>
            <select
              className="rounded-md border px-2 py-1 text-sm"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
              value={selectedTaskKey}
              onChange={(e) => setSelectedTaskKey(e.target.value)}
              title="Choose Stack feature"
            >
              {taskKeys.map((k) => (
                <option key={k} value={k}>
                  {TASKS[k].title}
                </option>
              ))}
            </select>

            <span className="text-xs text-[var(--muted)]">
              {pyStatus === "loading" && "Pyodide loading…"}
              {pyStatus === "ready" && "Pyodide ready"}
              {pyStatus === "error" && "Pyodide failed to load"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleHint}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition"
              title="Hint"
            >
              <HiLightBulb className="w-4 h-4" />
              Hint
            </button>
            <button
              onClick={handleRun}
              disabled={running || pyStatus !== "ready"}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                running || pyStatus !== "ready"
                  ? "bg-gray-300/70 dark:bg-gray-700/70 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
              title="Run (Ctrl/⌘+Enter)"
            >
              <HiPlay className="w-4 h-4" />
              {running ? "Running…" : "Run"}
            </button>
            <button
              onClick={handleStop}
              disabled={!running}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                running
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
              }`}
              title="Stop"
            >
              <HiStop className="w-4 h-4" />
              Stop
            </button>
          </div>
        </div>

        {/* Main area */}
        <div className="min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-full">
          {/* Left: Editor */}
          <div
            className="rounded-2xl border shadow-sm overflow-hidden lg:col-span-2"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <Editor
              height="100%"
              language="python"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v ?? "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between h-full gap-4 lg:gap-6">
            {/* Input (Blue) */}
            <div className="flex-1 rounded-2xl border-2 border-dashed shadow-sm overflow-hidden flex flex-col bg-blue-200/50 border-blue-800">
              <div className="px-3 py-2 text-sm flex items-center gap-2 border-b border-blue-800/60">
                <HiOutlineTerminal className="w-4 h-4 text-blue-700" />
                <span className="font-medium text-blue-900">Input</span>
              </div>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                className="flex-1 w-full p-3 text-sm outline-none resize-none text-blue-900"
                style={{ background: "transparent" }}
                placeholder="stdin… (not required for micro-tasks)"
              />
            </div>

            {/* Hints (Yellow) */}
            <div className="flex-1 rounded-2xl border-2 border-dashed shadow-sm overflow-hidden flex flex-col bg-yellow-200/50 border-yellow-800">
              <div className="px-3 py-2 text-sm flex items-center gap-2 border-b border-yellow-800/60">
                <HiLightBulb className="w-4 h-4 text-yellow-700" />
                <span className="font-medium text-yellow-900">Hints</span>
              </div>
              <div className="p-3 text-sm space-y-2 flex-1 overflow-auto text-yellow-900">
                {hintMsg ? (
                  <p>{hintMsg}</p>
                ) : (
                  <p className="opacity-60">
                    No hints yet. Click <strong>Hint</strong> to analyze your
                    code.
                  </p>
                )}
                {headlight && headlight.length > 0 && (
                  <pre className="text-xs rounded-md p-2 overflow-auto border border-yellow-700/50 bg-yellow-100/60">
                    {headlight.join("\n")}
                  </pre>
                )}
              </div>
            </div>

            {/* Output (Green / Red for errors) */}
            <div
              className={`flex-1 rounded-2xl border-2 border-dashed shadow-sm overflow-hidden flex flex-col ${
                stderr
                  ? "bg-red-200/50 border-red-800"
                  : "bg-green-200/50 border-green-800"
              }`}
            >
              <div
                className={`px-3 py-2 text-sm flex items-center gap-2 border-b ${
                  stderr ? "border-red-800/60" : "border-green-800/60"
                }`}
              >
                <HiOutlineTerminal
                  className={`w-4 h-4 ${
                    stderr ? "text-red-700" : "text-green-700"
                  }`}
                />
                <span
                  className={`font-medium ${
                    stderr ? "text-red-900" : "text-green-900"
                  }`}
                >
                  Output
                </span>
              </div>
              <textarea
                readOnly
                value={stderr ? `Error:\n${stderr}` : stdout}
                className={`flex-1 w-full p-3 text-sm outline-none resize-none ${
                  stderr ? "text-red-900" : "text-green-900"
                }`}
                style={{ background: "transparent" }}
                placeholder="program output…"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
