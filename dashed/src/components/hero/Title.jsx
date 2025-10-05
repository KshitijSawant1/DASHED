import React from "react";
import bgPattern from "../../assets/bgpatterns/TBG1.svg";
import logoLight from "../../assets/logos/L1.png";
import logoDark from "../../assets/logos/L2.png";
import { motion } from "framer-motion";
import { LuZap } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Title = () => {
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-[--text] transition-colors duration-300">
      {/* Background pattern layer */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "#DFDBE5",
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.2, // only the SVG layer fades
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center bg-gray-100">
        {/* Logo (auto-switches with theme) */}
        <div className="relative inline-block">
          <img
            src={logoLight}
            alt="DASHED logo"
            className="mb-6 h-[clamp(80px,18vw,180px)] w-auto select-none drop-shadow-md animate-float dark:hidden"
            draggable="false"
          />
          <img
            src={logoDark}
            alt="DASHED logo (dark)"
            className="mb-6 h-[clamp(80px,18vw,180px)] w-auto select-none drop-shadow-md animate-float hidden dark:block"
            draggable="false"
          />
        </div>

        {/* Title */}

        <motion.h1
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="
    text-center font-extrabold leading-tight
    text-[clamp(4rem,12vw,12rem)]
    bg-gradient-to-r from-violet-500 via-sky-400 to-sky-500
    bg-[length:200%_200%] bg-clip-text text-transparent
    animate-gradientMove
  "
          style={{ fontFamily: "'Audiowide', sans-serif" }}
        >
          DASHED
        </motion.h1>

        <div className="mt-10 w-full">
          <div
            className="
      mx-auto w-full
      max-w-[90vw]          /* mobile: tighter width */
      sm:max-w-[400px]      /* small tablets */
      md:max-w-[min(560px,92vw)] /* laptops/desktops */
    "
          >
            <div className="relative rounded-full">
              {/* Animated border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full
                   border-2 border-transparent
                   bg-gradient-to-r from-violet-500 via-sky-500 to-violet-500
                   bg-[length:200%_200%] animate-borderMove"
              />
              {/* Inner surface */}
              <div className="relative z-10 grid grid-cols-2 gap-1 rounded-full bg-[--card] p-2 shadow-lg">
                {/* Continue */}
                <button
                  className="rounded-full px-3 sm:px-5 py-2 sm:py-3 
                     text-sm sm:text-base md:text-lg font-semibold
                     text-[--text] transition-all duration-300
                     hover:-translate-y-0.5 active:translate-y-0
                     hover:bg-black/5 dark:hover:bg-white/10
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Continue"
                >
                  <span className="inline-flex w-full items-center justify-center gap-2">
                    <span className="hidden md:inline">Continue</span>
                    <FaArrowUpRightFromSquare className="text-lg sm:text-xl md:text-2xl" />
                  </span>
                </button>

                {/* Features */}
                <button
                  onClick={handleScroll}
                  className="rounded-full px-3 sm:px-5 py-2 sm:py-3 
                     text-sm sm:text-base md:text-lg font-semibold
                     text-[--text] transition-all duration-300
                     hover:-translate-y-0.5 active:translate-y-0
                     hover:bg-black/5 dark:hover:bg-white/10
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
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

      {/* Tiny helper styles (pure Tailwind-friendly) */}
      <style>{`
        .animate-float {
          animation: floatY 4s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-ping-once {
          animation: pingOnce 0.4s ease-out 1;
        }
        @keyframes pingOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
        @@keyframes borderMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
          }
        .animate-borderMove {
          animation: borderMove 6s linear infinite;
        }
 @keyframes gradientMove {
  0% {
    background-position: 0% 50%;
    filter: brightness(1);
  }
  25% {
    background-position: 50% 0%;
    filter: brightness(1);
  }
  50% {
    background-position: 100% 50%;
    filter: brightness(1);
  }
  75% {
    background-position: 50% 100%;
    filter: brightness(1);
  }
  100% {
    background-position: 0% 50%;
    filter: brightness(1);
  }
}

.animate-gradientMove {
  animation: gradientMove 4s ease-in-out infinite;
  background-size: 300% 300%; /* 🌀 more range for visible motion */
}

      `}</style>
    </section>
  );
};

export default Title;
