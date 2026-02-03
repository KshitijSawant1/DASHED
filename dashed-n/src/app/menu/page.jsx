"use client";

import { useRouter } from "next/navigation";
import {
  Layers,
  ListOrdered,
  Repeat,
  Shuffle,
  Network,
  GitMerge,
  Link2,
  Code2,
} from "lucide-react";

const MENU_ITEMS = [
  {
    title: "Stack",
    description: "Visualize push, pop, and LIFO behavior step by step.",
    icon: Layers,
    route: "/visualizer/stack",
  },
  {
    title: "Queue",
    description: "Understand enqueue and dequeue with smooth flow.",
    icon: ListOrdered,
    route: "/visualizer/queue",
  },
  {
    title: "Queue as Stack",
    description: "Learn how a queue works using two stacks.",
    icon: Repeat,
    route: "/visualizer/queue-as-stack",
  },
  {
    title: "Circular Queue",
    description: "Visualize circular memory and wrap-around logic.",
    icon: Shuffle,
    route: "/visualizer/circular-queue",
  },
  {
    title: "Priority Queue",
    description: "See elements ordered by priority using heap logic.",
    icon: Network,
    route: "/visualizer/priority-queue",
  },
  {
    title: "Double-Ended Queue",
    description: "Insert and delete from both front and rear.",
    icon: GitMerge,
    route: "/visualizer/double-ended-queue",
  },
  {
    title: "Linked List",
    description: "Watch nodes connect, traverse, and update dynamically.",
    icon: Link2,
    route: "/visualizer/linked-list",
  },
  {
    title: "Code Editor",
    description: "Experiment with code and logic side by side.",
    icon: Code2,
    route: "/editor",
  },
];

export default function MenuPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-semibold text-gray-900">
          Choose a Playground
        </h1>
        <p className="mt-2 text-gray-500 max-w-xl">
          Learn data structures visually and build algorithmic intuition.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => router.push(item.route)}
              className="group relative text-left rounded-2xl bg-neutral-100 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg focus:outline-none"
            >
              {/* Accent bar */}
              <span className="absolute left-0 top-6 h-10 w-1 rounded-full bg-black/70 opacity-30 group-hover:opacity-100 transition" />

              {/* Icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                <Icon className="h-5 w-5 text-black" />
              </div>

              {/* Title */}
              <h2 className="text-base font-semibold text-gray-900">
                {item.title}
              </h2>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
