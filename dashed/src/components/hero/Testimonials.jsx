// src/pages/Testimonials.jsx
import React, { useMemo, useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar, FaRegStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_TESTIMONIALS = [
  // --- FOUNDATIONS (4) ---
  {
    id: 1,
    name: "Aarav Mehta",
    role: "CS Undergrad",
    company: "IIT Bombay",
    rating: 5,
    quote:
      "Before DASHED, recursion and pointers made no sense to me. Now I can trace every step visually and truly understand the flow.",
    tag: "Foundations",
  },
  {
    id: 2,
    name: "Riya Kapoor",
    role: "Student",
    company: "VIT Chennai",
    rating: 5,
    quote:
      "The foundations track built my confidence. I finally know how arrays, stacks, and queues behave internally.",
    tag: "Foundations",
  },
  {
    id: 3,
    name: "Krish Patel",
    role: "Software Intern",
    company: "CodeSprint",
    rating: 4,
    quote:
      "DASHED gave me the clarity I needed in basic data structures. Visual learning made the toughest concepts easy.",
    tag: "Foundations",
  },
  {
    id: 4,
    name: "Simran Kaur",
    role: "Junior Developer",
    company: "NovaSoft",
    rating: 3,
    quote:
      "From time complexity to trees, everything clicked because of the visuals. Foundations are now my strongest area.",
    tag: "Foundations",
  },

  // --- ALGORITHMS (4) ---
  {
    id: 5,
    name: "Rohan Gupta",
    role: "Competitive Programmer",
    company: "CodeChef",
    rating: 5,
    quote:
      "The algorithm visualizer is incredible! Watching sorting, DP, and graph traversal in motion helped me master logic faster.",
    tag: "Algorithms",
  },
  {
    id: 6,
    name: "Neha Sharma",
    role: "SDE Intern",
    company: "Zoho",
    rating: 3,
    quote:
      "Dynamic Programming used to scare me — but the step-by-step breakdown in DASHED changed that forever.",
    tag: "Algorithms",
  },
  {
    id: 7,
    name: "Aditya Verma",
    role: "Software Engineer",
    company: "HackerRank",
    rating: 4,
    quote:
      "The recursion tree visualization alone is worth it. My problem-solving speed has doubled.",
    tag: "Algorithms",
  },
  {
    id: 8,
    name: "Mira Joshi",
    role: "CS Student",
    company: "MIT Pune",
    rating: 4,
    quote:
      "Understanding graph algorithms visually made everything crystal clear. DASHED makes learning intuitive and fun.",
    tag: "Algorithms",
  },

  // --- BACKEND (4) ---
  {
    id: 9,
    name: "Dev Sharma",
    role: "Backend Engineer",
    company: "Synapse",
    rating: 5,
    quote:
      "From API design to database optimization, DASHED helped me apply data structure concepts directly to backend systems.",
    tag: "Backend",
  },
  {
    id: 10,
    name: "Nisha Agarwal",
    role: "SDE-1",
    company: "Trellis",
    rating: 4,
    quote:
      "The backend module made me rethink how to store and fetch data efficiently. I use these lessons daily.",
    tag: "Backend",
  },
  {
    id: 11,
    name: "Arjun Nair",
    role: "Server Developer",
    company: "Nimbus",
    rating: 5,
    quote:
      "Systematic explanations and visuals made concurrency and caching concepts easy to grasp.",
    tag: "Backend",
  },
  {
    id: 12,
    name: "Tanvi Iyer",
    role: "Software Developer",
    company: "Verve",
    rating: 4,
    quote:
      "Connecting data structures to backend logic helped me build scalable APIs confidently.",
    tag: "Backend",
  },

  // --- FULL-STACK (4) ---
  {
    id: 13,
    name: "Ishaan Dutta",
    role: "Full-Stack Intern",
    company: "Orbit Labs",
    rating: 3,
    quote:
      "The integration of frontend logic with backend optimization lessons gave me complete project-level confidence.",
    tag: "Full-stack",
  },
  {
    id: 14,
    name: "Aanya Menon",
    role: "Software Intern",
    company: "TechNova",
    rating: 4,
    quote:
      "I finally understood how client-server interactions truly work. DASHED made full-stack development logical and visual.",
    tag: "Full-stack",
  },
  {
    id: 15,
    name: "Karan Malhotra",
    role: "Full-Stack Engineer",
    company: "FlowEdge",
    rating: 4,
    quote:
      "Loved how every concept connects from data layer to UI — makes debugging and scaling feel effortless.",
    tag: "Full-stack",
  },
  {
    id: 16,
    name: "Megha Das",
    role: "Web Developer",
    company: "NeoBits",
    rating: 5,
    quote:
      "DASHED bridges the gap between logic and design. My full-stack projects now feel structured and optimized.",
    tag: "Full-stack",
  },

  // --- SYSTEM DESIGN (4) ---
  {
    id: 17,
    name: "Ankit Raj",
    role: "Senior Engineer",
    company: "MicroMesh",
    rating: 3,
    quote:
      "The system design visual maps helped me break down complex architectures like load balancers and queues.",
    tag: "System Design",
  },
  {
    id: 18,
    name: "Leah Fernandes",
    role: "Software Architect",
    company: "CoreTech",
    rating: 5,
    quote:
      "DASHED made distributed systems concepts crystal clear. It’s my go-to tool before every design review.",
    tag: "System Design",
  },
  {
    id: 19,
    name: "Pratik More",
    role: "Backend Lead",
    company: "GridForge",
    rating: 4,
    quote:
      "I’ve used dozens of resources, but DASHED’s design diagrams and flow explanations stand above all.",
    tag: "System Design",
  },
  {
    id: 20,
    name: "Sana Bhattacharya",
    role: "Tech Lead",
    company: "InnoStack",
    rating: 5,
    quote:
      "The system design section simplified scaling concepts with perfect visuals. It's like a mentor in your browser.",
    tag: "System Design",
  },

  // --- ACADEMIA (4) ---
  {
    id: 21,
    name: "Harini Rao",
    role: "CS Professor",
    company: "Anna University",
    rating: 5,
    quote:
      "I recommend DASHED to my students. It converts theoretical knowledge into clear mental models.",
    tag: "Academia",
  },
  {
    id: 22,
    name: "Rohit Sinha",
    role: "Teaching Assistant",
    company: "IIT Delhi",
    rating: 4,
    quote:
      "I use DASHED’s visual explanations to demonstrate sorting algorithms during labs — students love it.",
    tag: "Academia",
  },
  {
    id: 23,
    name: "Priya Shah",
    role: "Student Researcher",
    company: "BITS Pilani",
    rating: 4,
    quote:
      "The visual roadmap in DASHED helped me explain algorithm efficiency in my thesis presentation.",
    tag: "Academia",
  },
  {
    id: 24,
    name: "Arjun Deshpande",
    role: "Assistant Professor",
    company: "SPIT Mumbai",
    rating: 5,
    quote:
      "We’ve started using DASHED in our DSA lab sessions — engagement and understanding have skyrocketed.",
    tag: "Academia",
  },
];

const TAGS = [
  "All",
  "Foundations",
  "Algorithms",
  "Backend",
  "Full-stack",
  "System Design",
  "Academia",
];

const TestimonialCard = ({ t }) => {
  const gradId = `starGradient-${t.id}`;
  return (
    <article
      className="group relative h-full rounded-3xl bg-[--card]
  ring-1 ring-[--border] dark:ring-white/10 p-4 sm:p-6
  shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-violet-500/20 via-sky-500/20 to-violet-500/20 blur-[6px]" />
      </div>
      <div className="flex items-start gap-3 sm:gap-4">
        {/* left column: avatar + stars */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg
        bg-gradient-to-br from-violet-600 to-sky-500 text-white
        font-semibold text-xs sm:text-sm flex items-center justify-center
        ring-1 ring-[--border] dark:ring-white/10 shadow-sm select-none"
          >
            {t.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="flex flex-col items-center space-y-1.5 sm:space-y-2 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < t.rating ? (
                  <FaStar
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    style={{ fill: "url(#starGradient)" }}
                  />
                ) : (
                  <FaRegStar className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 dark:text-yellow-400" />
                )}
              </span>
            ))}
            <span className="mt-1 sm:mt-2 text-[11px] sm:text-sm italic font-bold text-[--muted]">
              {t.rating} / 5
            </span>
          </div>
        </div>

        {/* right column: text */}
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-[--text] text-base sm:text-lg">
            {t.name}
          </h3>
          <p className="truncate text-xs sm:text-sm text-[--muted] pb-1 sm:pb-2">
            {t.role} • {t.company}
          </p>

          <p className="mt-1 sm:mt-2 text-[--text] leading-relaxed text-sm sm:text-base">
            <FaQuoteLeft className="mb-1 inline-block" />
            <span className="line-clamp-4 sm:line-clamp-5">{t.quote}</span>
            <FaQuoteRight className="mt-1 inline-block" />
          </p>

          <div className="mt-3 sm:mt-5">
            <span
              className="rounded-full bg-violet-600/10 px-2.5 py-1 text-[10px] sm:text-xs
          font-semibold text-violet-600 dark:text-violet-300 ring-1 ring-violet-500/20 border border-violet-800 dark:border-violet-400"
            >
              {t.tag}
            </span>
          </div>
        </div>
      </div>
      {/* gradient for stars (once per page is fine) */}
      <svg width="0" height="0" aria-hidden>
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#facc15" offset="0%" />
            <stop stopColor="#f97316" offset="100%" />
          </linearGradient>
        </defs>
      </svg>
    </article>
  );
};

const Testimonials = ({ testimonials = DEFAULT_TESTIMONIALS }) => {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") return testimonials;
    return testimonials.filter((t) => t.tag === activeTag);
  }, [activeTag, testimonials]);

  // rotation state moved here
  const [visible, setVisible] = useState([]);
  const [fade, setFade] = useState(false);

  const pickRandom9 = (list) =>
    [...list].sort(() => Math.random() - 0.5).slice(0, 8);

  useEffect(() => {
    // initialize
    setVisible(pickRandom9(filtered));

    // rotate every 30s
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setVisible(pickRandom9(filtered));
        setFade(false);
      }, 800); // match transition duration
    }, 30000);

    return () => clearInterval(interval);
  }, [filtered]);

  // Parent controls stagger + initial offset
  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        // delay children for a cascading effect
        staggerChildren: 0.12,
        // slight delay before children start
        delayChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: 16, transition: { duration: 0.25 } },
  };

  // Each card uses a spring
  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260, // higher = snappier
        damping: 22, // higher = less bounce
        mass: 0.9, // tweak feel
      },
    },
    exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full bg-[--surface] text-[--text] transition-colors duration-300">
      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            What learners say
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[--muted]">
            Real stories from developers and students who leveled up with
            DASHED.
          </p>

          {/* Filter pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`
                  rounded-full px-4 py-2 text-sm font-semibold transition-all
                  ring-1 ring-[--border] dark:ring-white/10
                  ${
                    active
                      ? "bg-gradient-to-r from-violet-600/15 to-sky-500/15 text-[--text] border border-indigo-800 dark:border-indigo-400"
                      : "bg-[--card] text-[--text] hover:bg-white/70 dark:hover:bg-white/10 border border-gray-800 dark:border-gray-400"
                  }
                `}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </header>

        {/* Grid logic */}
        {activeTag === "All" ? (
          // 👉 Animated rotating version (All)
          <AnimatePresence mode="wait">
            <motion.div
              key={visible.map((t) => t.id).join("-")}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
              grid grid-cols-1
              min-[380px]:grid-cols-2
              md:grid-cols-3 lg:grid-cols-4
              gap-4 sm:gap-6
            "
            >
              {visible.map((t, idx) => (
                <motion.div
                  key={t.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  /* On mobile: only show the first card */
                  className={idx > 0 ? "hidden sm:block" : undefined}
                >
                  <TestimonialCard t={t} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          // 👉 Static version for filtered tags
          <div
            className="
            grid grid-cols-1
            min-[380px]:grid-cols-2
            md:grid-cols-3 lg:grid-cols-4
            gap-4 sm:gap-6
          "
          >
            {filtered.map((t, idx) => (
              <div
                key={t.id}
                /* On mobile: show only the first two cards */
                className={idx > 1 ? "hidden sm:block" : undefined}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Testimonials;
