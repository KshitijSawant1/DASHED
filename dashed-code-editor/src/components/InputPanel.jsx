"use client";

import { useState } from "react";

export default function InputPanel() {
  const [input, setInput] = useState("");

  return (
    <div className="col-span-1 row-span-1 bg-white border rounded-lg p-3 flex flex-col">
      <h3 className="font-semibold mb-1 text-slate-800">Input (stdin)</h3>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="User-provided input data"
        className="flex-grow w-full border rounded p-2 text-sm resize-none 
                   font-mono text-slate-700 placeholder:text-slate-400"
      />
    </div>
  );
}
