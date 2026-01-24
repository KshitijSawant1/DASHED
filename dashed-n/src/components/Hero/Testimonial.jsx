"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Neha D.",
    role: "Software Engineering Student",
    quote:
      "DASHED didn’t just teach me algorithms - it helped me see them. Watching data structures evolve visually made concepts click in a way textbooks never could.",
    color: "bg-yellow-100",
    rotate: "-rotate-6",
    avatar: "/avatars/2.png",
  },
  {
    name: "Jay K.",
    role: "Backend Developer",
    quote:
      "I used to memorize algorithm steps. With DASHED, I finally understand the logic behind them. The visual flow makes problem-solving feel natural.",
    color: "bg-blue-100",
    rotate: "rotate-6",
    avatar: "/avatars/1.png",
  },
  {
    name: "Fatima S.",
    role: "Computer Science Learner",
    quote:
      "Algorithms felt overwhelming at first. DASHED broke them down visually and patiently - turning confusion into clarity, one step at a time.",
    color: "bg-red-100",
    rotate: "rotate-0",
    avatar: "/avatars/4.png",
  },
  {
    name: "Rohit P.",
    role: "DSA & Interview Preparation",
    quote:
      "Instead of memorizing patterns, I now reason through problems. DASHED helped me build intuition, which made coding interviews far less stressful.",
    color: "bg-green-100",
    rotate: "-rotate-4",
    avatar: "/avatars/3.png",
  },
];

export default function Testimonial() {
  return (
    <section className="w-full py-28">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
          What They Say?
        </h2>

        {/* Cards */}
        <div className="mt-20 relative flex flex-col md:flex-row justify-center items-center gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`relative w-[280px] rounded-3xl p-6 text-left shadow-xl ${t.color} ${t.rotate}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-gray-900">{t.quote}</p>

              {/* Divider */}
              <div className="w-10 h-px  my-4" />

              {/* User */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-600">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
