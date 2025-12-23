"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

export default function KraftersLinkPage() {
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
              <span className="text-[#0b1220]">Krafters</span>
              <span className="text-[#F2B200]">Link</span>
            </h1>

            <p className="text-base sm:text-lg text-[#0b1220] opacity-80 max-w-md mx-auto mb-6 sm:mb-8">
              The directory of our brilliant minds is still loading.  
              Fresh profiles are being polished behind the scenes.
            </p>

            <div className="inline-block bg-[#0b1220] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold shadow-lg">
              Profiles Coming Soon
            </div>

            <p className="mt-4 sm:mt-6 text-[#0b1220] text-xs sm:text-sm opacity-70">
              Soon you'll be able to explore every Krafter's journey.
            </p>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}