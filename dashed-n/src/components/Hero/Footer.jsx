"use client";

import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* ───────── LINK GRID ───────── */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          {/* Learn */}
          <div>
            <p className="font-medium">Learn</p>
            <ul className="space-y-1 opacity-80">
              <li>Modules</li>
              <li>Visual Playground</li>
              <li>Practice Problems</li>
              <li>Roadmaps</li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <p className="font-medium">Platform</p>
            <ul className="space-y-1 opacity-80">
              <li>How it Works</li>
              <li>Features</li>
              <li>Statistics</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <p className="font-medium">Company</p>
            <ul className="space-y-1 opacity-80">
              <li>About DASHED</li>
              <li>Careers</li>
              <li>Community</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <p className="font-medium">Legal</p>
            <ul className="space-y-1 opacity-80">
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>

        {/* ───────── BOTTOM META ───────── */}
        <div className="mt-5 flex flex-col md:flex-row justify-between text-xs opacity-70 font-bold">
          <p>© {new Date().getFullYear()} DASHED. All rights reserved.</p>
          <p>Visual learning. Logical thinking.</p>
        </div>
        {/* Divider */}
        <div className="my-5 border-t border-black/20" />

        {/* ───────── BIG STATEMENT ───────── */}
        <h2
          className="text-[12vw] md:text-[8vw] leading-none font-extrabold tracking-tight text-black select-none"
        >
          LET’S LEARN
          <br />
          ALGORITHMS
        </h2>
      </div>

      {/* Background Circle Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-[-350px] top-1/2-translate-y-1/2 w-[600px] h-[600px] rounded-full bg-black/5"
        />
      </div>
    </footer>
  );
}
