// src/pages/Timeline.jsx
import React from "react";
import Plot from "react-plotly.js";

/* -------------------- DASHED Project Phases -------------------- */
const phases = [
  {
    phase: "Phase 1: Research & Problem Definition",
    start: "2024-10-01",
    end: "2024-11-10",
    color: "#10b981",
    goal: "Identify key learning challenges and define the problem scope",
    tasks: [
      "Conduct primary and secondary research on DSA learning challenges",
      "Perform empathy mapping and user interviews",
      "Analyze existing tools like LeetCode, GeeksforGeeks, and ChatGPT",
      "Define project problem statement and objectives",
    ],
  },
  {
    phase: "Phase 2: Design & Planning",
    start: "2024-11-11",
    end: "2024-12-20",
    color: "#14b8a6",
    goal: "Plan architecture, create prototypes, and finalize system design",
    tasks: [
      "Create UI wireframes and user flow diagrams",
      "Design system architecture and data flow model",
      "Select frontend (React, Tailwind, Flowbite) and backend (Supabase) stack",
      "Finalize color palette, typography, and UX components",
    ],
  },
  {
    phase: "Phase 3: Core Development (Frontend)",
    start: "2025-01-01",
    end: "2025-03-15",
    color: "#0ea5e9",
    goal: "Develop main React components and coding interface",
    tasks: [
      "Implement Monaco Editor for Python coding environment",
      "Design and integrate editor toolbar (Run, Stop, Hint)",
      "Build modular UI for Input, Output, and Hints sections",
      "Ensure responsive layout and theme adaptability (dark/light)",
    ],
  },
  {
    phase: "Phase 4: Backend Integration + AI Hint Engine",
    start: "2025-03-16",
    end: "2025-05-15",
    color: "#6366f1",
    goal: "Integrate Supabase backend and AI-powered hint system",
    tasks: [
      "Setup Supabase authentication and data models",
      "Implement Pyodide runtime for in-browser Python execution",
      "Develop auto-fix and syntax hint logic",
      "Test contextual AI suggestions for common coding errors",
    ],
  },
  {
    phase: "Phase 5: Visualization & Gamification",
    start: "2025-05-16",
    end: "2025-07-15",
    color: "#f59e0b",
    goal: "Add visual learning and engagement features",
    tasks: [
      "Develop real-time stack and recursion visualizer",
      "Design gamified XP and streak tracking dashboard",
      "Add animations for learning flow and user feedback",
      "Refine UI transitions and interactivity elements",
    ],
  },
  {
    phase: "Phase 6: Testing, Deployment & Documentation",
    start: "2025-07-16",
    end: "2025-09-15",
    color: "#ef4444",
    goal: "Test platform performance, host deployment, and finalize documentation",
    tasks: [
      "Perform unit, integration, and user acceptance testing",
      "Fix UI bugs and optimize rendering performance",
      "Deploy project using Vercel",
      "Write final documentation, project report, and presentation slides",
    ],
  },
  {
    phase: "Phase 7: Review & Final Presentation",
    start: "2025-09-16",
    end: "2025-10-20",
    color: "#a855f7",
    goal: "Conduct evaluations and showcase the final working prototype",
    tasks: [
      "Prepare final report and evaluation forms",
      "Conduct demonstration to faculty and reviewers",
      "Gather final feedback and reflections",
      "Submit codebase, documentation, and future work proposal",
    ],
  },
];

/* -------------------- Helper -------------------- */
const makeTraces = () => {
  return phases.map((p, i) => ({
    x: [p.start, p.end],
    y: [p.phase, p.phase],
    mode: "lines+markers",
    line: { width: 14, color: p.color, shape: "hv" },
    marker: { size: 14, color: p.color },
    hovertemplate:
      `<b>${p.phase}</b><br>` +
      `${p.goal}<br>` +
      `<i>${p.start}</i> → <i>${p.end}</i><br>` +
      `${p.tasks.map((t) => "• " + t).join("<br>")}<extra></extra>`,
  }));
};

/* -------------------- Component -------------------- */
const Timeline = () => {
  const traces = makeTraces();

  // Detect user theme (dark or light)
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const layout = {
    title: "",
    xaxis: {
      title: "Project Duration (Oct 2024 – Oct 2025)",
      type: "date",
      showgrid: true,
      gridcolor: "rgba(128,128,128,0.2)",
      tickfont: { color: "#374151" }, // medium-dark gray, readable in both
      titlefont: { color: "#111827" }, // dark gray title
    },
    yaxis: {
      title: "",
      automargin: true,
      tickfont: { color: "#374151" },
    },
    margin: { l: 180, r: 40, t: 10, b: 50 },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#111827", size: 13 },
    hoverlabel: {
      bgcolor: "#f3f4f6",
      bordercolor: "#2563eb",
      font: { color: "#111827" },
    },
    showlegend: false,
  };

  const config = { responsive: true, displayModeBar: true };

  return (
    <main className="w-full bg-[--surface] text-[--text] transition-colors duration-300">
      <section className="relative z-10 px-4 py-16 max-w-6xl mx-auto">
        {/* Title */}
        <h1
          className="
            text-4xl sm:text-5xl font-extrabold text-center
            bg-gradient-to-r from-violet-600 via-sky-500 to-teal-400
            bg-clip-text text-transparent
          "
          style={{ fontFamily: "'Audiowide', sans-serif" }}
        >
          DASHED – PROJECT TIMELINE
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-[--muted] text-lg text-center max-w-3xl mx-auto leading-relaxed">
          A phase-wise roadmap of <b className="text-[--text]">DASHED</b>,
          highlighting each development milestone from research and design to
          deployment and presentation over a one-year cycle.
        </p>

        {/* Chart */}
        <div className="mt-10 rounded-2xl border border-[--border]/60 dark:border-white/10 bg-[--card] p-3 shadow-lg">
          <Plot
            data={traces}
            layout={layout}
            config={config}
            style={{ width: "100%", height: "600px" }}
            useResizeHandler
          />
        </div>

        {/* Footer Note */}
        <p className="mt-3 text-xs text-[--muted] text-center">
          Hover on each phase to view specific goals, duration, and core tasks.
          Each color represents a milestone in the DASHED development lifecycle.
        </p>
      </section>
    </main>
  );
};

export default Timeline;
