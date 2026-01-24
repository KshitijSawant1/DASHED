"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";
import {
  FiGrid,
  FiLink,
  FiRepeat,
  FiLayers,
  FiList,
  FiShuffle,
  FiHash,
  FiGitBranch,
} from "react-icons/fi";

import {
  HiOutlineQueueList,
  HiOutlineArrowPathRoundedSquare,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const features = [
    {
      title: "Array",
      subtitle:
        "A fundamental linear data structure that stores elements in contiguous memory blocks, allowing constant-time indexed access and efficient traversal.",
      image: "/Features/bg 1.jpg",
      sr: "01",
      insights: "4821",
      icon: FiGrid,
    },
    {
      title: "Linked List",
      subtitle:
        "A dynamic structure made of interconnected nodes, where each node holds data and a pointer to the next, enabling flexible insertion and deletion.",
      image: "/Features/bg 2.jpg",
      sr: "02",
      insights: "7394",
      icon: FiLink,
    },
    {
      title: "Doubly Linked List",
      subtitle:
        "An extended linked list where each node contains references to both the next and previous nodes, supporting traversal and operations in both directions.",
      image: "/Features/bg 3.jpg",
      sr: "03",
      insights: "6157",
      icon: FiRepeat,
    },
    {
      title: "Stack",
      subtitle:
        "A linear structure that follows the Last In First Out (LIFO) rule, widely used in recursion, function calls, expression evaluation, and undo mechanisms.",
      image: "/Features/bg 4.jpg",
      sr: "04",
      insights: "2746",
      icon: FiLayers,
    },
    {
      title: "Queue",
      subtitle:
        "A linear data structure based on the First In First Out (FIFO) principle, commonly applied in scheduling systems, buffering, and breadth-first search.",
      image: "/Features/bg 5.jpg",
      sr: "05",
      insights: "8910",
      icon: HiOutlineQueueList,
    },
    {
      title: "Circular Queue",
      subtitle:
        "An efficient queue variation where the last position connects back to the first, maximizing memory utilization and preventing wasted storage space.",
      image: "/Features/bg 6.jpg",
      sr: "06",
      insights: "5463",
      icon: HiOutlineArrowPathRoundedSquare,
    },
    {
      title: "Priority Queue",
      subtitle:
        "A specialized queue where each element is assigned a priority, and elements with higher priority are removed before lower priority ones in processing.",
      image: "/Features/bg 7.jpg",
      sr: "07",
      insights: "6349",
      icon: HiOutlineArrowTrendingUp,
    },
    {
      title: "Hash Table",
      subtitle:
        "A key-value based structure that uses hashing to provide extremely fast lookup, insertion, and deletion operations in average constant time.",
      image: "/Features/bg 8.jpg",
      sr: "08",
      insights: "1295",
      icon: FiHash,
    },
    {
      title: "Binary Tree",
      subtitle:
        "A hierarchical structure where each node has up to two children, forming the basis for many advanced trees used in searching and computation.",
      image: "/Features/bg 9.jpg",
      sr: "09",
      insights: "4578",
      icon: FiGitBranch,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const cards = trackRef.current.children;
    const totalWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    const scrollLength = totalWidth - viewportWidth;

    /* ─────────────────────────────
       HORIZONTAL SCROLL CONTROLLED BY VERTICAL SCROLL
    ────────────────────────────── */
    gsap.to(trackRef.current, {
      x: -scrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength * 1.8}`,

        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-10">
      {/* Title */}
      <div className="mb-20 mt-10 text-center">
        <h1 className="text-6xl font-serif font-bold tracking-tight">
          DASHED FEATURES
        </h1>
        <p className="text-sm">Scroll to explore learning modules</p>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="relative w-full min-h-[60vh]">
        <div
          ref={trackRef}
          className="flex gap-10 px-[10vw] will-change-transform"
        >
          {features.map((item, index) => (
            <div key={index} className="shrink-0">
              <FeatureCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
