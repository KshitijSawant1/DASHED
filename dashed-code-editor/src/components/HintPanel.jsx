"use client";

export default function HintPanel({ hint = "" }) {
  return (
    <div
      className="col-span-3 row-span-1 bg-yellow-50 border-2 border-yellow-400 
                 rounded-lg p-3"
    >
      <h3 className="font-semibold mb-1 text-slate-800">Hint</h3>

      <p className="text-sm text-slate-700">
        {hint || (
          <>
            Backend-detected issue converted into human-readable guidance.
            One hint at a time. Progressive levels supported.
          </>
        )}
      </p>

      <p className="text-xs text-slate-500 mt-1">
        Generated via Static Analysis + RAG + Local LLM
      </p>
    </div>
  );
}
