"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage({ onEnter }: { onEnter?: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleEnter() {
    setIsExiting(true);
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 900); // match animation duration
  }

  return (
    <main
      className={`w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-4`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence>
          {!isExiting && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center focus:outline-none px-6"
              style={{ background: "none", border: "none", cursor: "pointer", perspective: 1000 }}
              onClick={handleEnter}
              disabled={isExiting}
            >
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 180 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
              >
                <Image 
                  src="/logo.png" 
                  alt="CodeKrafters" 
                  width={120} 
                  height={120}
                  className="w-25 h-20 sm:w-32 sm:h-30 md:w-40 md:h-40"
                />
              </motion.div>
              <span className="text-lg sm:text-xl md:text-2xl text-yellow-400 font-bold animate-heartbeat text-center">
                Press to enter
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { opacity: 1; transform: scale(1); }
          10% { opacity: 0.7; transform: scale(0.95); }
          20% { opacity: 1; transform: scale(1.05); }
          30% { opacity: 0.7; transform: scale(0.95); }
          40% { opacity: 1; transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.2s infinite;
        }
      `}</style>
    </main>
  );
}