import React from "react";
import TextType from "../hero/TextType";
import ghostLight from "../../assets/pnf/pnfl.png";
import ghostDark from "../../assets/pnf/pnfd.png";

const PageNotFound = () => {
  return (
    <main
      className="
        h-screen w-full flex items-center justify-center
        bg-[--surface] text-[--text] px-6 sm:px-12 pt-10 overflow-hidden
      "
    >
      {/* Responsive grid container */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-2 gap-10 items-center
          max-w-6xl w-full
        "
      >
        {/* 👻 Ghost image section */}
        <div className="flex justify-center lg:justify-center order-1 lg:order-1">
          <img
            src={ghostDark}
            alt="Lost ghost"
            className="
              hidden dark:block w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px]
              animate-float select-none
            "
          />
          <img
            src={ghostLight}
            alt="Lost ghost"
            className="
              block dark:hidden w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px]
              animate-float select-none
            "
          />
        </div>

        {/* 🧭 Text section */}
        <div className="text-left order-2 lg:order-2">
          <h1
            className="text-[clamp(2rem,7vw,4rem)] font-extrabold tracking-tight leading-tight"
            style={{ fontFamily: "'Audiowide', sans-serif" }}
          >
            404
          </h1>

          <h1
            className="text-[clamp(1.2rem,5vw,2.5rem)] font-extrabold tracking-tight mt-1"
            style={{ fontFamily: "'Audiowide', sans-serif" }}
          >
            <TextType
              text={[
                "Oops! Page Took A Vacation.",
                "This Page Went Ghost Mode.",
                "Lost In Digital Space.",
                "404: The Plot Thickens.",
                "We Misplaced That Pixel.",
                "Lost In Digital Space.",
                "This Page Went Ghost Mode.",
                "Error 404: Sense Of Direction.",
                "You Broke The Internet... Almost.",
                "Looks Empty In Here.",
                "We Misplaced That Pixel.",
                "The Page Ran Away 😢",
                "404: The Plot Thickens.",
                "This Isn’t The Url You Seek.",
                "Our Hamster Unplugged The Server.",
                "Whoopsie... Wrong Dimension!",
                "Aliens Abducted This Page.",
                "Not All Who Wander 404.",
              ]}
              typingSpeed={120}
              erasingSpeed={120}
              pauseDuration={1800}
              showCursor
              cursorCharacter="|"
              textColors={["var(--text)"]}
              cursorClassName="text-[--text]"
            />
          </h1>

          <p className="mt-5 text-[--muted] text-[clamp(0.9rem,2.5vw,1.1rem)] leading-relaxed max-w-md">
            Oops! The page you’re looking for doesn’t exist or may have been
            moved. Try heading back home and continuing your journey.
          </p>

          {/* 🌈 Go Home Button */}
          <a
            href="/"
            className="
              mt-7 inline-flex items-center justify-center rounded-full
              px-8 py-3 font-semibold text-white
              bg-gradient-to-r from-violet-600 to-sky-500
              shadow-md hover:brightness-110 transition-all
            "
          >
            Go to Home
          </a>
        </div>
      </div>

      {/* ✨ Floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default PageNotFound;
