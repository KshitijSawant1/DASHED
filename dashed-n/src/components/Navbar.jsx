import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full">
      <div className="max-w-[1400px] mx-auto px-20 py-4 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/Logos/L1.png"
            alt="DASHED Logo"
            width={40}
            height={40}
            priority
          />
        </div>

        {/* RIGHT: Nav items */}
        <div className="flex items-center gap-8 text-sm text-gray-600">
          <a href="#" className="hover:text-black transition">
            Issues
          </a>
          <a href="#" className="hover:text-black transition">
            Visualizer
          </a>
          <a href="#" className="hover:text-black transition">
            About
          </a>
        </div>

      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200" />
    </nav>
  );
}
