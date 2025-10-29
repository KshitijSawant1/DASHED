// src/components/Hero.jsx
import React from "react";
import TextType from "./TextType";
import "../../input.css";

import {
  FaCode,
  FaLaptopCode,
  FaBook,
  FaChalkboardTeacher,
  FaUsers,
  FaRobot,
  FaDatabase,
  FaPuzzlePiece,
  FaBolt,
  FaPaintBrush,
  FaServer,
  FaGlobe,
  FaRocket,
  FaMusic,
  FaMobileAlt,
  FaVideo,
} from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import { MdOutlineDesignServices } from "react-icons/md";
//import Title from "./Title";
import PillCarousel from "./PillCarousel";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import DashedOverview from "./DashedOverview";
import { LuZap } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";
import Creator from "./Creator";
import Timeline from "./Timeline";

const topics = [
  "Data Structures",
  "Algorithms",
  "Object-Oriented Programming",
  "Database Management",
  "Operating Systems",
  "Computer Networks",
  "System Design",
  "Software Engineering",
  "Web Development",
  "Mobile App Development",
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Natural Language Processing",
  "Data Science",
  "Big Data & Analytics",
  "Cloud Computing",
  "DevOps & CI/CD",
  "Cybersecurity",
  "Blockchain Technology",
  "Internet of Things (IoT)",
  "Embedded Systems",
  "Competitive Programming",
  "Coding Interview Prep",
  "Problem-Solving Strategies",
];

const Hero = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(user ? "/core" : "/signin", { replace: true });
  };
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[--surface] transition-colors duration-300">
      {/*<Title />*/}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 lg:gap-10 lg:py-24">
        {/* LEFT: Copy (sticky on large screens) */}
        <div className="lg:sticky lg:top-24 self-start relative z-10 pb-8 sm:pb-10">
          {/* Logo/Title (optional) */}
          <section className="text-left" />

          <div className="relative mt-6 max-w-[52ch]">
            {/* 1) Height reserver: takes space, stays invisible */}
            <p
              aria-hidden
              className="invisible text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.05] mb-4"
            >
              Turn theoretical knowledge into practical skills you can apply
              instantly
            </p>

            {/* 2) Absolutely-positioned typewriter */}
            <h1 className="absolute inset-0 text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.05] text-[--text]">
              <TextType
                text={[
                  "Find the best solution for your education and career growth",
                  "Learn with immersive, interactive visualizations that simplify complexity",
                  "Boost your coding confidence with guided practice and real-world examples",
                  "Master coding concepts step by step with structured learning paths",
                  "Visualize algorithms like never before through dynamic animations",
                  "Turn theoretical knowledge into practical skills you can apply instantly",
                  "Code smarter, not harder — accelerate your journey with smart tools",
                  "Transform complex topics into clarity with modern teaching methods",
                  "Build strong fundamentals with ease and move toward advanced mastery",
                  "Empower your learning journey with personalized recommendations",
                  "Practice, learn, and grow continuously with adaptive learning modules",
                  "Ace your interviews with confidence through targeted preparation tools",
                  "Interactive lessons designed for modern learners and fast-paced careers",
                  "Your personalized coding companion, available anytime, anywhere",
                  "Explore, experiment, and excel with hands-on coding challenges",
                  "Bridge the gap between classroom learning and industry expectations",
                  "Stay ahead with regularly updated content aligned to latest trends",
                  "Engage with a community of peers and mentors who share your goals",
                  "Transform curiosity into expertise with project-driven learning",
                  "Achieve mastery not just in code, but in problem-solving itself",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
                textColors={["var(--text)"]}
                cursorClassName="text-[--text]"
              />
            </h1>
          </div>

          {/* Decorative rule UNDER the heading */}
          <span className="block h-px w-full my-4 bg-[--border] dark:bg-white/10" />

          {/* ===== Two-button pill BELOW the typewriter ===== */}
          <div className="mt-15 mb-15 sm:mb-10 w-full">
            <div className="mx-auto w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[min(560px,92vw)]">
              <div className="relative rounded-full">
                <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-violet-500 via-sky-500 to-violet-500 bg-[length:200%_200%] animate-borderMove" />
                <div className="relative z-10 grid grid-cols-2 gap-1 rounded-full bg-[--card] p-2 shadow-lg">
                  <button
                    onClick={handleContinue}
                    className="rounded-full px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-[--text] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label="Continue"
                  >
                    <span className="inline-flex w-full items-center justify-center gap-2">
                      <span className="hidden md:inline">Continue</span>
                      <FaArrowUpRightFromSquare className="text-lg sm:text-xl md:text-2xl" />
                    </span>
                  </button>

                  <button
                    onClick={handleScroll}
                    className="rounded-full px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-[--text] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label="Features"
                  >
                    <span className="inline-flex w-full items-center justify-center gap-2">
                      <span className="hidden md:inline">Features</span>
                      <LuZap className="text-lg sm:text-xl md:text-2xl" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Mosaic */}
        <div className="relative mx-auto w-full max-w-[520px] hidden md:block">
          {/* dark-only soft glow so accents pop on midnight surface */}
          <div
            className="pointer-events-none absolute -inset-10 -z-10 hidden rounded-[48px] blur-3xl dark:block"
            style={{
              background:
                "radial-gradient(120px 120px at 20% 20%, rgba(168,85,247,.18), transparent 60%), radial-gradient(140px 140px at 80% 70%, rgba(56,189,248,.18), transparent 60%), radial-gradient(100px 100px at 50% 40%, rgba(16,185,129,.18), transparent 60%)",
            }}
          />

          <div className="grid grid-cols-4 grid-rows-6 gap-3">
            {/* Row 1 */}
            <div
              className="h-20 rounded-full bg-violet-600 flex items-center justify-center text-white
                  text-[clamp(18px,2.4vw,24px)]"
            >
              <FaCode aria-label="Code" />
            </div>

            <div
              className="col-span-2 row-span-2 rounded-[36px] bg-gradient-to-r from-fuchsia-500 to-sky-400
                  flex items-center justify-center text-white
                  text-[clamp(36px,5.5vw,56px)]"
            >
              <FaLaptopCode aria-label="Laptop Code" />
            </div>

            <div
              className="h-20 rounded-tr-[48px] rounded-bl-[48px] bg-emerald-700 flex items-center justify-center text-white
                  text-[clamp(18px,2.4vw,24px)]"
            >
              <FaBook aria-label="Study Material" />
            </div>

            {/* Row 2 */}
            <div
              className="row-span-2 overflow-hidden rounded-full bg-[--card] ring-1 ring-[--border] dark:ring-white/10
                  flex items-center justify-center text-[--text]
                  text-[clamp(18px,2.2vw,22px)]"
            ></div>

            <div
              className="rounded-tr-[48px] rounded-bl-[48px] bg-amber-300 flex items-center justify-center
                  text-black text-[clamp(18px,2.4vw,24px)]"
            >
              <FaChalkboardTeacher aria-label="Instructor Led" />
            </div>

            <div
              className="rounded-tl-[48px] rounded-br-[48px] bg-rose-300 flex items-center justify-center
                  text-black text-[clamp(18px,2.4vw,24px)]"
            >
              <FaUsers aria-label="Community" />
            </div>

            <div
              className="flex items-center justify-center rounded-[36px] bg-emerald-400 p-4 text-white
                  text-[clamp(18px,2.4vw,24px)]"
            >
              <FaRobot aria-label="AI Assistance" />
            </div>

            {/* Row 3 */}
            <div
              className="h-24 rounded-[36px] bg-sky-500 flex items-center justify-center text-white
                  text-[clamp(20px,2.8vw,28px)]"
            >
              <FaDatabase aria-label="Data Structures" />
            </div>

            <div
              className="h-24 rounded-full bg-rose-400 flex items-center justify-center text-white
                  text-[clamp(20px,2.8vw,28px)]"
            >
              <FaPuzzlePiece aria-label="Algorithms" />
            </div>

            <div
              className="col-span-2 h-24 overflow-hidden rounded-[36px] bg-indigo-600 flex items-center justify-center
                  text-white text-[clamp(22px,3.2vw,32px)]"
            >
              <FaGlobe aria-label="Explore Topics" />
            </div>

            {/* Row 4 */}
            <div
              className="flex items-center justify-center rounded-[36px] bg-sky-500 p-4 text-white
                  text-[clamp(18px,2.4vw,24px)]"
            >
              <FaBolt aria-label="Practice & Speed" />
            </div>

            <div
              className="rounded-full bg-black/80 dark:bg-white/80 flex items-center justify-center
                  text-white dark:text-black text-[clamp(18px,2.2vw,22px)]"
            >
              <FaCode aria-label="Code" />
            </div>
            <div className="rounded-br-[48px] rounded-tl-[48px] bg-cyan-200 flex items-center justify-center text-black text-3xl">
              <FiCpu aria-label="CPU / Systems" />
            </div>

            <div className="overflow-hidden rounded-[36px] bg-[--card] ring-1 ring-[--border] dark:ring-white/10" />

            {/* Row 5 */}
            <div className="h-20 rounded-tl-[48px] rounded-br-[48px] bg-rose-200 flex items-center justify-center text-black text-2xl">
              <FaPaintBrush aria-label="Design" />
            </div>

            <div className="h-20 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl">
              <FaServer aria-label="Backend / Server" />
            </div>

            <div className="h-20 rounded-tl-[48px] rounded-br-[48px] bg-sky-300 flex items-center justify-center text-black text-2xl">
              <FaGlobe aria-label="Web / Global" />
            </div>

            <div className="h-20 rounded-bl-[48px] rounded-tr-[48px] bg-yellow-300 flex items-center justify-center text-black text-2xl">
              <FaRocket aria-label="Innovation / Startup" />
            </div>

            {/* Row 6 */}

            <div className="flex items-center justify-center rounded-[36px] bg-violet-500 p-4 text-white text-[clamp(18px,2.4vw,24px)]">
              <MdOutlineDesignServices aria-label="Design Services" />
            </div>
            <div className="h-16 rounded-br-[48px] rounded-tl-[48px] bg-amber-300 flex items-center justify-center text-black text-xl">
              <FaMusic aria-label="Music" />
            </div>

            <div className="h-16 rounded-full bg-violet-700 flex items-center justify-center text-white text-xl">
              <FaMobileAlt aria-label="Mobile App" />
            </div>

            <div className="h-16 rounded-tl-[48px] rounded-br-[48px] bg-cyan-300 flex items-center justify-center text-black text-xl">
              <FaVideo aria-label="Video / Media" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 md:-mt-20 relative z-0">
        <PillCarousel items={topics} />
      </div>

      <hr className="mt-6 border-t border-[--border] dark:border-white" />
      <FAQ />

      <hr className="mt-6 border-t border-[--border] dark:border-white" />
      <Testimonials />

      <hr className="mt-6 border-t border-[--border] dark:border-white" />
      <DashedOverview />

      {/* Meet the Creator Section */}
      <hr className="mt-6 border-t border-[--border] dark:border-white" />
      <Timeline />

      <hr className="mt-6 border-t border-[--border] dark:border-white" />
      {/*<Creator />*/}
    </section>
  );
};

export default Hero;
