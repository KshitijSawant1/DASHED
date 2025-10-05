import React, { useEffect, useRef, useState } from "react";
import {
  FiHelpCircle,
  FiCpu,
  FiUsers,
  FiBookOpen,
  FiCode,
  FiZap,
  FiLayers,
  FiTarget,
  FiShield,
} from "react-icons/fi";

const FAQ = () => {
  const [hoverId, setHoverId] = useState(null);
  const [stickyId, setStickyId] = useState(null);
  const hideTimer = useRef(null);

  const faqs = [
    {
      id: "q1",
      icon: FiBookOpen,
      question: "Do you provide interview prep questions?",
      answer:
        "Yes. You get curated DSA, system design, and behavioral banks with difficulty tags and up-to-date solutions.",
    },
    {
      id: "q2",
      icon: FiCpu,
      question: "Is there AI assistance while practicing?",
      answer:
        "Our Copilot explains concepts, reviews your code, and generates hints without revealing full solutions unless requested.",
    },
    {
      id: "q3",
      icon: FiUsers,
      question: "Can I learn with peers or mentors?",
      answer:
        "Join study rooms, get mentor feedback, and take part in weekly group challenges to stay consistent.",
    },
    {
      id: "q4",
      icon: FiCode,
      question: "Which languages and stacks are supported?",
      answer:
        "We support JS/TS, Python, Java, C++, Go, and more. Full-stack tracks include React, Node, and databases.",
    },
    {
      id: "q5",
      icon: FiZap,
      question: "Will I get timed mock interviews?",
      answer:
        "Absolutely. Timed rounds simulate real interviews with scorecards, rubrics, and post-round insights.",
    },
    {
      id: "q6",
      icon: FiLayers,
      question: "Do you have visualizations for algorithms?",
      answer:
        "Yes — step-by-step visualizers for graphs, DP, recursion trees, and sorting show how solutions evolve.",
    },
    {
      id: "q7",
      icon: FiTarget,
      question: "Is there a personalized roadmap?",
      answer:
        "You’ll get a dynamic roadmap based on your goals and weak areas — it adapts as you complete modules.",
    },
    {
      id: "q8",
      icon: FiShield,
      question: "How is my progress saved?",
      answer:
        "All sessions auto-save to the cloud. Resume on any device and export notes or code anytime.",
    },

    // 🔥 Additional 8
    {
      id: "q9",
      icon: FiHelpCircle,
      question: "Can I track my learning analytics?",
      answer:
        "Yes, dashboards display accuracy, speed, and progress charts so you can measure growth over time.",
    },
    {
      id: "q10",
      icon: FiBookOpen,
      question: "Are there theory notes with the problems?",
      answer:
        "Each module comes with concise concept notes, references, and real-world examples to reinforce learning.",
    },
    {
      id: "q11",
      icon: FiCpu,
      question: "Do you provide coding contests?",
      answer:
        "We host weekly and monthly challenges that simulate real competitive programming rounds.",
    },
    {
      id: "q12",
      icon: FiUsers,
      question: "Can I collaborate on projects?",
      answer:
        "Yes, team projects let you build real-world applications with peers, guided by mentors.",
    },
    {
      id: "q13",
      icon: FiZap,
      question: "Do you support offline practice?",
      answer:
        "You can download problem sets and notes to practice offline, with auto-sync when you reconnect.",
    },
    {
      id: "q14",
      icon: FiTarget,
      question: "Is there resume and career support?",
      answer:
        "We provide resume templates, portfolio guidance, and job preparation resources.",
    },
    {
      id: "q15",
      icon: FiLayers,
      question: "Do you integrate with GitHub?",
      answer:
        "Yes, you can push your solved problems and projects directly to GitHub to build your portfolio.",
    },
    {
      id: "q16",
      icon: FiShield,
      question: "Is my data secure?",
      answer:
        "We follow industry-grade encryption and GDPR compliance to keep your code and personal data safe.",
    },
  ];

  useEffect(
    () => () => hideTimer.current && clearTimeout(hideTimer.current),
    []
  );

  const handleEnter = (id) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHoverId(id);
  };
  const handleLeave = (id) => {
    if (stickyId === id) return;
    hideTimer.current = setTimeout(() => setHoverId(null), 120);
  };
  const toggleSticky = (id) => setStickyId((v) => (v === id ? null : id));

  const shown = (id) => hoverId === id || stickyId === id;

  // dynamic styles for question pill
  const pillClasses = (id) => {
    const active = shown(id);
    return `
      border-anim w-full rounded-full px-5 py-4 text-left shadow-sm transition
      ring-1 ring-[--border] dark:ring-white/10
      ${
        active
          ? "bg-gradient-to-r from-violet-600/15 to-sky-500/15"
          : "bg-[--card]"
      }
      hover:bg-white/70 hover:dark:bg-white/10
      hover:ring-primary-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
    `;
  };

  // dynamic styles for answer card
  const cardWrap = (id) =>
    `overflow-hidden transition-all duration-700 ease-in-out ${
      shown(id) ? "mt-2 max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
    }`;

  const cardClasses =
    "card-anim rounded-2xl bg-[--card] ring-1 ring-[--border] dark:ring-white/10 shadow-md p-5";

  return (
    <main className="min-h-screen bg-[--surface] text-[--text] transition-colors duration-300">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">FAQs</h1>
          <p className="mt-2 max-w-2xl text-[--muted]">
            Hover to preview an answer. Click a pill to pin it open; click again
            to collapse.
          </p>
        </header>
        {/* Simple responsive grid (no masonry) */}
        <div
          className="
    grid grid-cols-1 gap-5
    sm:grid-cols-2
    lg:grid-cols-3
  "
        >
          {faqs.map(({ id, icon: Icon, question, answer }, idx) => (
            <div
              key={id}
              className={`${idx > 2 ? "hidden sm:block" : ""}`} // show only first 3 on mobile
            >
              {/* Question pill */}
              <button
                type="button"
                onMouseEnter={() => handleEnter(id)}
                onMouseLeave={() => handleLeave(id)}
                onClick={() => toggleSticky(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSticky(id);
                  }
                }}
                className={pillClasses(id)}
                aria-expanded={shown(id)}
                aria-controls={`${id}-panel`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`
              inline-flex h-8 w-8 flex-none items-center justify-center rounded-full
              ring-1 ring-[--border] text-[--text]/80 transition-colors duration-500 ease-in-out
              ${
                shown(id)
                  ? "bg-violet-500/20 ring-violet-400/50"
                  : "bg-[--surface]"
              }
            `}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-semibold">{question}</span>
                </span>
              </button>

              {/* Answer card (expands below, pushes content—no overlap) */}
              <div
                id={`${id}-panel`}
                onMouseEnter={() => handleEnter(id)}
                onMouseLeave={() => handleLeave(id)}
                className={cardWrap(id)}
              >
                <div className={cardClasses}>
                  <p className="text-sm leading-relaxed text-[--muted]">
                    {answer}
                  </p>
                  <div className="mt-3 text-xs text-[--muted]">
                    {stickyId === id
                      ? "Pinned — click the pill to collapse."
                      : "Preview — move cursor away to hide."}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FAQ;
