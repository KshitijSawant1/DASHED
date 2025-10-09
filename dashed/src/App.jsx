// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import Signin from "./components/register/Signin";
import Signup from "./components/register/Signup";
import PageNotFound from "./components/others/PageNotFound";
const App = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[--surface] text-[--text] transition-colors duration-300">
      <div className="relative z-20">
        <Navbar />

        {/* push content below fixed navbar height */}
        <div className="pt-[10px] md:pt-10">
          <Hero />
          <Signin />
          <Signup />
          <PageNotFound />
        </div>
      </div>
    </main>
  );
};

export default App;
