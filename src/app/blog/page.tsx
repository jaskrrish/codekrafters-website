"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
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

      {/* Background Grid */}
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

      {/* Center Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-xl p-10">
          <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl p-10 text-center">

            <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
              <span className="text-[#0b1220]">CodeKrafters </span>
              <span className="text-[#F2B200]">Blog</span>
            </h1>

            <p className="text-lg text-[#0b1220] opacity-80 max-w-md mx-auto mb-8">
              Our writers are sharpening their quills,  
              brewing fresh ideas, and crafting stories worth reading.
            </p>

            <div className="inline-block bg-[#0b1220] text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg">
              Articles Coming Soon
            </div>

            <p className="mt-6 text-[#0b1220] text-sm opacity-70">
              Stay tuned for insights, guides, and tech deep-dives.
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
