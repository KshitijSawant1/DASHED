"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
export default function FeatureCard({
  title = "Daily memo",
  subtitle = "insights & Journaling",
  image = "/feature/demo.jpg",
  sr = "05",
  insights = "1270",
  icon: Icon = Sparkles,
}) {
  return (
    <div className="w-[320px] h-[380px] rounded-[32px] bg-black shadow-xl overflow-hidden flex flex-col ">
      {/* Top image area */}
      <div className="relative h-[40%] w-full overflow-hidden z-0">
        <Image src={image} alt={title} fill className="object-cover z-0" />

        <div className="absolute top-5 right-5 z-20">
          <div className="w-[40px] h-[40px] rounded-full bg-black/60 backdrop-blur flex items-center justify-center">
            <Icon className="w-[25px] h-[25px] text-white" />
          </div>
        </div>
      </div>

      {/* Content area (ON TOP of image) */}
      <div className="relative z-30 flex-1 bg-[#1c1c1c] px-6 py-5 flex flex-col justify-between rounded-t-[28px] -mt-8 border-t-2 border-l-2 border-r-2 border-white">
        {/* Title */}
        <div>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>

        {/* Footer stats */}
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 text-sm">Topic :</span>
            <span className="text-white text-4xl font-bold leading-none">
              {sr}
            </span>
          </div>

          <p className="text-white text-sm font-semibold">
            <span className="text-gray-400 font-normal">insights : </span>
            {insights}
          </p>
        </div>
      </div>
    </div>
  );
}
