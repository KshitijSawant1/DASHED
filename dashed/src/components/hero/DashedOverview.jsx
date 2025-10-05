// src/pages/DashedOverview.jsx
import React from "react";

/* -------------------- Content Data -------------------- */
const problems = [
  {
    title: "Scattered Learning & Low Retention",
    description:
      "Learners juggle videos, notes, and practice across platforms—leading to fragmented understanding and poor long-term retention.",
  },
  {
    title: "Limited Feedback & Personalization",
    description:
      "Generic roadmaps and static quizzes fail to adapt to an individual learner’s strengths, gaps, and pace.",
  },
  {
    title: "Theory–Practice Gap",
    description:
      "Concepts are learned passively; few tools enable hands-on, visual, and iterative practice that builds durable intuition.",
  },
];

const solutions = [
  {
    title: "Interactive Visual Explanations",
    description:
      "Step-by-step, animated visualizers for DSA, systems, and core CS make complex ideas intuitive and memorable.",
  },
  {
    title: "Adaptive Roadmaps",
    description:
      "Dynamic paths that reshape based on your performance—strengthening weak areas and accelerating your wins.",
  },
  {
    title: "Practice With Instant Insights",
    description:
      "Hands-on labs, timed challenges, and smart hints (not spoilers) help you learn by doing and improve quickly.",
  },
  {
    title: "Community & Mentorship",
    description:
      "Study rooms, peer reviews, and mentor feedback keep you accountable and supported throughout your journey.",
  },
  {
    title: "Real-World Readiness",
    description:
      "Mock interviews, project templates, and review rubrics bridge the gap from learning to shipping.",
  },
  {
    title: "Delightful, Accessible UI",
    description:
      "A clean, theme-aware interface that’s fast, accessible, and feels great across devices.",
  },
];

const missionPoints = [
  {
    label: "Clarity First",
    text: "Turn complex concepts into simple, visual, and interactive learning moments.",
  },
  {
    label: "Personalized Growth",
    text: "Guide learners with adaptive paths that reflect real progress and goals.",
  },
  {
    label: "Practice > Theory",
    text: "Prioritize doing—projects, challenges, and feedback over passive watching.",
  },
  {
    label: "Community Matters",
    text: "Enable collaboration, mentorship, and accountability to sustain momentum.",
  },
  {
    label: "Outcome Focused",
    text: "Prepare for real interviews, real projects, and real-world problem solving.",
  },
];

/* -------------------- Components -------------------- */

// Themed section wrapper card with all-side borders
const SectionCard = ({ children, className = "" }) => (
  <div
    className={[
      "relative rounded-2xl bg-[--card] ring-1 ring-[--border] dark:ring-white/10",
      "shadow-md border border-[--border]/60 dark:border-white/10",
      "p-6 md:p-10 transition-colors duration-300",
      className,
    ].join(" ")}
  >
    {children}
  </div>
);

// Gradient heading mark
const H2Mark = ({ id, children }) => (
  <h2
    id={id}
    className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
  >
    <mark className="rounded-md bg-gradient-to-r from-violet-600 via-sky-500 to-sky-400 px-4 py-0.5 text-white dark:from-violet-500 dark:to-sky-400">
      {children}
    </mark>
  </h2>
);

// Grid-based row listing
const RowList = ({ items }) => (
  <dl className="-my-3 divide-y divide-[--border]/70 text-base sm:text-lg">
    {items.map((item, i) => (
      <div
        key={i}
        className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-3 sm:gap-4"
      >
        <dt className="text-justify font-semibold text-[--text]">
          {item.title}
        </dt>
        <dd className="text-justify leading-relaxed text-[--muted] sm:col-span-2">
          {item.description}
        </dd>
      </div>
    ))}
  </dl>
);

/* -------------------- Main Page -------------------- */
const DashedOverview = () => {
  return (
    <main className="w-full bg-[--surface] text-[--text] transition-colors duration-300">
  
<section className="relative z-10 text-center px-4 py-12">
  {/* Animated Gradient Title */}
  <h1
    className="
      text-4xl sm:text-5xl lg:text-6xl font-extrabold 
      bg-gradient-to-r from-violet-500 via-sky-400 to-sky-500 
      bg-clip-text text-transparent 
    "
    style={{ fontFamily: "'Audiowide', sans-serif" }}
  >
    DASHED OVERVIEW
  </h1>

  {/* Subtitle */}
  <p className="mt-3 text-[--muted] text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
    Where concepts meet clarity. <b className="text-[--text]">DASHED</b> combines
    visualization, adaptive learning, and real-time insights to help learners
    truly understand — not just memorize.
  </p>

  {/* Section Content */}
  <div className="mx-auto max-w-screen-xl px-4 pt-10 lg:pt-16 text-left">
    {/* Problem Statement */}
    <SectionCard>
      <H2Mark id="problem-statement">Problem Statement</H2Mark>
      <p className="mb-6 text-justify text-[--muted] leading-relaxed">
        Despite abundant courses, most learners don’t gain deep, usable
        understanding. Content is scattered, feedback is shallow, and practice
        is passive—making it hard to retain concepts or apply them in interviews
        and projects.
      </p>
      <RowList items={problems} />
    </SectionCard>

    {/* Proposed Solution */}
    <SectionCard className="mt-8">
      <H2Mark id="proposed-solution">Proposed Solution</H2Mark>
      <p className="mb-6 text-justify text-[--muted] leading-relaxed">
        <b className="text-[--text]">DASHED</b> is an interactive learning
        platform that blends visual explanations, adaptive practice, and
        community accountability to build durable understanding and
        interview-ready skills.
      </p>
      <RowList items={solutions} />
    </SectionCard>

    {/* Vision & Mission */}
    <div className="mt-8 grid gap-8 md:grid-cols-2">
      <SectionCard>
        <H2Mark>Vision</H2Mark>
        <p className="text-justify text-[--muted]">
          To be the most effective way to learn computer science—where every
          learner can see, practice, and master concepts with clarity, and
          confidently apply them in interviews and real projects.
        </p>
      </SectionCard>

      <SectionCard>
        <H2Mark>Mission</H2Mark>
        <ul className="max-w-prose space-y-3 text-[--muted]">
          {missionPoints.map((m, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-3.5 w-3.5 flex-none rounded-full bg-gradient-to-r from-violet-500 to-sky-500 ring-1 ring-[--border] dark:ring-white/10" />
              <p className="text-justify">
                <b className="text-[--text]">{m.label}:</b> {m.text}
              </p>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  </div>

  {/* Gradient Animation */}
  <style>{`
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 150% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradientMove {
      background-size: 200% 200%;
      animation: gradientMove 5s ease-in-out infinite;
    }
  `}</style>
</section>

    </main>
  );
};

export default DashedOverview;
