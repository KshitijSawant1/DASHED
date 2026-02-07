"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import CodeEditor from "@/components/CodeEditor";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";
import HintPanel from "@/components/HintPanel";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRun = () => {
    setOutput("Running code...");
    setVerdict("");
  };

  const handleStop = () => {
    setOutput("Execution stopped.");
  };

  const handleHint = () => {
    setHint("Analyzing your code... Hint will appear here.");
  };

  // Show loading state during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-4 h-screen flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border rounded bg-white shadow"></div>
          <h1 className="font-semibold text-lg text-slate-800">DASHED</h1>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-4 flex-grow min-h-0">
          <div className="col-span-3 row-span-3 border-2 border-dashed border-blue-500 bg-white rounded-lg p-4 flex items-center justify-center">
            <span className="text-slate-400">Loading editor...</span>
          </div>
          <div className="col-span-1 row-span-1 bg-white border rounded-lg p-3">
            <h3 className="font-semibold text-slate-800">Input (stdin)</h3>
          </div>
          <div className="col-span-1 row-span-3 bg-white border rounded-lg p-3">
            <h3 className="font-semibold text-slate-800">Output</h3>
          </div>
          <div className="col-span-3 row-span-1 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3">
            <h3 className="font-semibold text-slate-800">Hint</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-screen flex flex-col gap-4">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="grid grid-cols-4 grid-rows-4 gap-4 flex-grow min-h-0">
        <CodeEditor onRun={handleRun} onStop={handleStop} onHint={handleHint} />
        <InputPanel />
        <OutputPanel output={output} verdict={verdict} />
        <HintPanel hint={hint} />
      </div>
    </div>
  );
}
