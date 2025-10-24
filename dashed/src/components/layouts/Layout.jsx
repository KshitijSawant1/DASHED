import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar"; // adjust alias if needed

export default function Layout() {
  const { pathname } = useLocation();
 

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-[--text] transition-colors duration-300">
      <Navbar />
      <div className= "">
        <Outlet />
      </div>
    </main>
  );
}
