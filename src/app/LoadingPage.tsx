"use client"

import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
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
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {/* Animated outer ring */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-theme-yellow border-r-theme-yellow animate-spin-slow" />
          {/* Logo container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-pulse-glow animate-spin-slow">
              <Image src="/logo.png" alt="CodeKrafters" fill className="object-contain" priority />
            </div>
          </div>
        </div>
        {/* Loading text */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Loading</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">Krafting excellence...</p>
        </div>
        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
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