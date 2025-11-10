"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main
      className={`w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{
        cursor:
          'url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><style>.hex{fill:none;stroke:%23FCD34D;stroke-width:3}.hex-inner{fill:%23000}.text{fill:%23fff;font-size:40;font-weight:bold;text-anchor:middle;dominant-baseline:middle}</style></defs><polygon class=\"hex\" points=\"50,10 90,30 90,70 50,90 10,70 10,30\"/><polygon class=\"hex-inner\" points=\"50,15 85,32 85,68 50,85 15,68 15,32\"/><text class=\"text\" x=\"50\" y=\"50\">EX</text></svg>") 50 50, auto',
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* Team photo background */}
        <img
          src="/ck_group.png"
          alt="CodeKrafters Team"
          className="w-full h-full object-cover object-center md:object-cover"
        />
        
        {/* Overlay gradient for text readability - stronger on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:from-black md:via-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="text-center z-10 animate-fade-in-up max-w-4xl">
            {/* Add your content here if needed */}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.3s both;
        }
        
        @media (max-width: 768px) {
          img {
            object-position: center;
          }
        }
      `}</style>
    </main>
  );
}