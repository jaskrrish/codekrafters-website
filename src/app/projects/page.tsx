"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        backgroundColor: "#F2F0D8",
        backgroundImage: `
          linear-gradient(to right, rgba(11, 18, 32, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(11, 18, 32, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      <Navbar />

      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "#F2F0D8",
          backgroundImage: `
            linear-gradient(to right, rgba(11,18,32,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(11,18,32,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Center content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-full max-w-xl p-6 sm:p-10">

          <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 text-center">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 tracking-tight">
              <span className="text-[#0b1220]">CodeKrafters </span>
              <span className="text-[#F2B200]">Projects</span>
            </h1>

            <p className="text-base sm:text-lg text-[#0b1220] opacity-80 max-w-md mx-auto mb-6 sm:mb-8">
              Our labs are heating up.  
              New builds, ideas, prototypes, and experiments  
              are being prepared right now.
            </p>

            <div className="inline-block bg-[#0b1220] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold shadow-lg">
              Projects Launching Soon
            </div>

            <p className="mt-4 sm:mt-6 text-[#0b1220] text-xs sm:text-sm opacity-70">
              From dev tools to community apps — the best is on its way.
            </p>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}