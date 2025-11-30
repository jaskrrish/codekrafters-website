"use client"

import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6">
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .border-theme-yellow {
          border-color: #F2A516 !important;
        }
      `}</style>
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
        {/* <CHANGE> Made animated ring responsive - scales from w-20 h-20 on mobile to w-32 h-32 on desktop */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-theme-yellow border-r-theme-yellow animate-spin-slow" />
          {/* <CHANGE> Made logo container responsive - scales proportionally with parent */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-pulse-glow animate-spin-slow">
              <Image src="/logo.png" alt="CodeKrafters" fill className="object-contain" priority />
            </div>
          </div>
        </div>
        {/* <CHANGE> Made loading text responsive - scales from text-lg on mobile to text-2xl on desktop */}
        <div className="text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">Loading</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">Krafting excellence...</p>
        </div>
        {/* <CHANGE> Made animated dots responsive - scales from w-1.5 h-1.5 on mobile to w-2 h-2 on desktop */}
        <div className="flex gap-1.5 sm:gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}