"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextType from "./TextType";

gsap.registerPlugin(ScrollTrigger);

export default function Textpage() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const fonts = [
      "var(--font-1)",
      "var(--font-2)",
      "var(--font-3)",
      "var(--font-4)",
    ];

    let currentFontIndex = -1;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: true,

      onUpdate: (self) => {
        const progress = self.progress; // 0 → 1
        const index = Math.floor(progress * fonts.length);

        if (index !== currentFontIndex && fonts[index]) {
          currentFontIndex = index;
          textRef.current.style.fontFamily = fonts[index];
        }
      },
    });

    // Parallax motion
    gsap.to(textRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-8 py-20 space-y-6">
        <h1
          ref={textRef}
          className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.15] text-gray-900 min-h-[6.5em]"
        >
          <TextType
            text={[
              "Find the best solution for your education and career growth",
              "Learn with immersive, interactive visualizations that simplify complexity",
              "Boost your coding confidence with guided practice and real-world examples",
              "Master coding concepts step by step with structured learning paths",
              "Visualize algorithms like never before through dynamic animations",
              "Turn theoretical knowledge into practical skills you can apply instantly",
              "Code smarter, not harder - accelerate your journey with smart tools",
              "Transform complex topics into clarity with modern teaching methods",
              "Build strong fundamentals with ease and move toward advanced mastery",
            ]}
            typingSpeed={50}
            pauseDuration={500}
            showCursor
            cursorCharacter=" | "
            textColors={["#111"]}
            cursorClassName="text-gray-900"
          />
        </h1>
      </div>
    </section>
  );
}
