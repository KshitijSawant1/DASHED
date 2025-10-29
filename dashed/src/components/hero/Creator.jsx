import React from "react";
import logoLight from "../../assets/logos/L1.png";
import logoDark from "../../assets/logos/L2.png";
import { FiCheckCircle } from "react-icons/fi";
import TiltedCard from "./TiltedCard";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Creator = () => {
  return (
    <div>
      <section className="w-full px-6 pt-5 pb-12">
        {/* Title */}
        <h2
          className="text-center text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent"
          style={{ fontFamily: "'Audiowide', sans-serif" }}
        >
          MEET THE CREATOR
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-center max-w-2xl mx-auto text-[--muted] text-sm sm:text-base leading-relaxed">
          The vision, logic, and design of{" "}
          <span className="font-semibold text-[--text]">DASHED</span> — built by
          a single mind focused on clarity, precision, and innovation.
        </p>

        {/* Content: side-by-side on lg, stacked on mobile */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* LEFT */}
          <div className="flex justify-center">
            <div className="w-full max-w-[360px] h-[520px]">
              <TiltedCard
                imageSrc="https://ik.imagekit.io/rhzh8en76/Helixure%20v2.0%20Assests/Kshitij%20K%20Sawant%20Cryptocurrency%20Photo.jpg?updatedAt=1751044291591"
                altText="Kshitij K Sawant"
                captionText="Kshitij K Sawant"
                textBlock="Project Developer"
                containerHeight="100%" // ⬅️ fill wrapper height
                containerWidth="100%" // ⬅️ fill wrapper width
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {/* keep socials ONLY here */}
                    <a
                      href="https://github.com/KshitijSawant1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-[#24292F] hover:bg-[#1f2327] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-3 sm:px-4 py-2 inline-flex items-center justify-center transition"
                    >
                      <FaGithub className="text-lg sm:text-xl" />
                      <span className="hidden sm:inline ml-2">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kshitijksawant/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-[#0A66C2] hover:bg-[#084c98] focus:ring-4 focus:outline-none focus:ring-[#0A66C2]/50 font-medium rounded-lg text-sm px-3 sm:px-4 py-2 inline-flex items-center justify-center transition"
                    >
                      <FaLinkedin className="text-lg sm:text-xl" />
                      <span className="hidden sm:inline ml-2">LinkedIn</span>
                    </a>
                  </div>
                }
              />
            </div>
          </div>

          {/* RIGHT — Detail card, no duplicate buttons, same size */}
          <div className="w-full max-w-[660px] h-[520px] mx-auto lg:mx-0 rounded-2xl border border-[--border] bg-[--card] shadow-sm overflow-hidden flex flex-col">
            {/* Header with DASHED logo */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[--border]">
              <img
                src={logoLight}
                alt="DASHED"
                className="h-7 w-auto select-none dark:hidden"
                draggable="false"
              />
              <img
                src={logoDark}
                alt="DASHED"
                className="hidden h-7 w-auto select-none dark:block"
                draggable="false"
              />

              <div className="leading-tight">
                <h3 className="text-xl font-bold text-[--text]">
                  Kshitij K. Sawant
                </h3>
                <p className="text-[--muted] text-sm">
                  Developer • Designer • Visionary
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-5 py-4 text-sm text-[--text] leading-relaxed space-y-4 flex-1 overflow-auto">
              {/* Intro */}
              <p>
                I am the creator of <strong>DASHED</strong> — a project crafted
                to merge conceptual clarity with interactive learning. Every
                line of code is designed to inspire exploration, creativity, and
                precision.
              </p>

              {/* Quote */}
              <blockquote className="border-l-4 border-sky-400 pl-4 italic text-[--muted]">
                “Build systems that teach people how to think, not just what to
                click.”
              </blockquote>

              {/* Two-col facts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[--muted] text-xs uppercase tracking-wide">
                    Location
                  </div>
                  <div>Mumbai, India</div>
                </div>
                <div>
                  <div className="text-[--muted] text-xs uppercase tracking-wide">
                    Focus
                  </div>
                  <div>Interactive DSA, EdTech UX</div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div className="text-[--muted] text-xs uppercase tracking-wide mb-2">
                  Highlights
                </div>
                <ul className="space-y-2">
                  {[
                    "Designed an in-browser Python runner with Pyodide & Monaco.",
                    "Built micro-task “Headlight” hints + auto-fixes for common errors.",
                    "Crafted a clean two-pane editor + Input/Hint/Output workflow.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <FiCheckCircle className="mt-[2px] shrink-0 text-emerald-400" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack chips */}
              <div>
                <div className="text-[--muted] text-xs uppercase tracking-wide mb-2">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Vite",
                    "Tailwind",
                    "Monaco",
                    "Pyodide",
                    "Supabase",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md border border-[--border] text-xs bg-[--surface]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Now Building */}
              <div>
                <div className="text-[--muted] text-xs uppercase tracking-wide mb-2">
                  Now Building
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "DASHED Editor", status: "Live" },
                    { name: "Stack Micro-tasks", status: "Beta" },
                    { name: "Hint Linter", status: "New" },
                  ].map(({ name, status }) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[--border] bg-[--surface]"
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          status === "Live"
                            ? "bg-emerald-400"
                            : status === "Beta"
                            ? "bg-amber-400"
                            : "bg-sky-400"
                        }`}
                      />
                      <span className="text-xs">{name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — NO duplicate social buttons */}
            <div className="px-5 py-3 border-t border-[--border] text-[--muted] text-xs">
              © {new Date().getFullYear()} DASHED
              {/* Availability */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open to collaborations
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Creator;
