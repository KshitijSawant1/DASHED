"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative w-full py-28 overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="w-[520px] h-[520px] rounded-full bg-white/5 blur-[120px]" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Learn Algorithms the <span className="italic">Visual Way</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Build strong fundamentals, understand intuition, and master problem
          solving with interactive visual learning — designed for exams and
          real-world coding.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center justify-center gap-3 rounded-full px-14 py-4 text-base font-semibold bg-white text-black border-2 border-black overflow-hidden shadow-xl shadow-white/10"
          >
            {/* Hover shimmer overlay */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="mt-8 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          No memorization. No shortcuts. Just clarity.
        </motion.p>
      </div>
    </section>
  );
}
