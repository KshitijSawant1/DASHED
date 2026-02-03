import FeatureCarousel from "@/components/Features/FeatureCarousel";
import BentoGrid from "@/components/Hero/BentoGrid";
import CTA from "@/components/Hero/CTA";
import Footer from "@/components/Hero/Footer";

import LogoSTL from "@/components/Hero/LogoSTL";
import Testimonial from "@/components/Hero/Testimonial";
import Textpage from "@/components/Hero/Textpage";

export default function HomePage() {
  return (
    <section className="relative w-full min-h-screen bg-white">
      {/* CONTENT WRAPPER */}
      <div className=" max-w-[1400px] mx-auto  px-10 py-15 space-y-5 ">
        {/* HERO CONTENT */}
        <div className="flex-1 grid grid-cols-2 items-center gap-10">
          {/* LEFT TEXT */}
          <div>
            <h1 className="text-8xl font-serif font-bold tracking-tight">
              DASHED
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
              Version No. 02
            </p>

            <h2 className="text-[56px] font-serif leading-[1.05] tracking-tight">
              Learn
              <br />
              Visually.
              <br />
              Think
              <br />
              Logically.
            </h2>

            <p className="mt-8 text-sm text-gray-600 max-w-md leading-relaxed">
              DASHED is an interactive platform designed to explain Data
              Structures and Algorithms using strong visual intuition and
              carefully crafted real-world metaphors.
            </p>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex justify-center items-center">
            <div className="w-[600px] h-[600px]">
              <LogoSTL />
            </div>
          </div>
        </div>
      </div>
      <Textpage />
      {/* BENTO GRID (NOW VISIBLE) */}
      <FeatureCarousel />
      <CTA />
      <BentoGrid />
      <Testimonial />
      <Footer/>
    </section>
  );
}
