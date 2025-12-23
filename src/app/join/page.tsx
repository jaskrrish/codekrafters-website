"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

export default function JoinPage() {
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

      {/* Grid Background */}
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
      ></div>

      {/* Center Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-full max-w-xl p-6 sm:p-10">
          {/* Frosted Glass Container */}
          <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 text-center">

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 tracking-tight">
              <span className="text-[#0b1220]">Join </span>
              <span className="text-[#0b1220]">Code</span>
              <span className="text-[#F2B200]">Krafters</span>
            </h1>

            <p className="text-base sm:text-lg text-[#0b1220] opacity-80 max-w-md mx-auto mb-6 sm:mb-8">
              Our recruitment portal is currently closed.  
              Stay tuned — the gates will open soon.
            </p>

            {/* Badge */}
            <div className="inline-block bg-[#0b1220] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold shadow-lg">
              Recruitments are Closed
            </div>

            <p className="mt-4 sm:mt-6 text-[#0b1220] text-xs sm:text-sm opacity-70">
              Follow our socials for upcoming announcements.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}