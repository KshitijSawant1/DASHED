"use client";

const tasks = {
  Stacks: ["Implement Stack", "Valid Parentheses", "Next Greater Element"],
  Queues: ["Implement Queue", "Circular Queue"],
  Arrays: ["Two Sum", "Maximum Subarray"],
  Trees: ["Inorder Traversal", "Height of Tree"],
};

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r shadow-lg
                    transform transition-transform duration-300 z-50
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg text-slate-800">Tasks</h2>
          <button
            onClick={onClose}
            className="text-slate-500 text-2xl hover:text-slate-700 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Task Categories */}
        <div className="p-4 space-y-6 text-sm overflow-y-auto h-[calc(100%-60px)]">
          {Object.entries(tasks).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-2 text-slate-800">{category}</h3>
              <div className="flex flex-col gap-2">
                {items.map((task) => (
                  <button
                    key={task}
                    className="text-left px-3 py-2 rounded border bg-slate-50 
                               hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    {task}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
