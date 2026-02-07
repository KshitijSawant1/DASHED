"use client";

export default function OutputPanel({ output = "", verdict = "" }) {
  return (
    <div className="col-span-1 row-span-3 bg-white border rounded-lg p-3 flex flex-col">
      <h3 className="font-semibold mb-1 text-slate-800">Output</h3>

      {/* Output Display */}
      <div className="flex-grow border rounded p-2 font-mono text-sm bg-slate-50 
                      text-slate-700 overflow-auto whitespace-pre-wrap mb-2">
        {output || (
          <span className="text-slate-400">
            Program output, verdict, and execution feedback
          </span>
        )}
      </div>

      {/* Verdict Badge */}
      {verdict && (
        <div className={`text-sm font-medium px-2 py-1 rounded text-center
          ${verdict === "Correct" ? "bg-green-100 text-green-700" : ""}
          ${verdict === "Incorrect" ? "bg-red-100 text-red-700" : ""}
          ${verdict === "Partially Correct" ? "bg-yellow-100 text-yellow-700" : ""}
        `}>
          {verdict}
        </div>
      )}
    </div>
  );
}
