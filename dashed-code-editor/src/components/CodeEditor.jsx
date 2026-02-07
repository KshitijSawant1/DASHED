"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400">
      Loading editor...
    </div>
  ),
});

export default function CodeEditor({ onRun, onStop, onHint }) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(`# Write your implementation here
print("Hello World")`);

  return (
    <div className="col-span-3 row-span-3 border-2 border-dashed border-blue-500 bg-white rounded-lg p-4 flex flex-col">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-2">
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-2 py-1 text-sm text-slate-700 bg-white"
          >
            <option value="python">Python</option>
            <option disabled>C (future)</option>
            <option disabled>Java (future)</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onRun}
            className="px-3 py-1 border rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Run
          </button>
          <button
            onClick={onStop}
            className="px-3 py-1 border rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Stop
          </button>
          <button
            onClick={onHint}
            className="px-3 py-1 border rounded bg-yellow-200 text-slate-700 hover:bg-yellow-300 transition-colors font-medium"
          >
            Hint
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-grow border rounded overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "var(--font-geist-mono), monospace",
            padding: { top: 12 },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
