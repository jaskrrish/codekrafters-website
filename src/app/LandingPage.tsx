"use client";

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
      onEnter?.();
    }, 900);
  }

  return (
    <main className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!isExiting && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            onClick={handleEnter}
            className="flex flex-col items-center justify-center focus:outline-none"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            disabled={isExiting}
          >
            {/* LOGO */}
            <motion.div
              className="mb-8"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 4.5,
                opacity: 0,
                filter: "blur(6px)",
              }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <Image
                src="/logo.png"
                alt="CodeKrafters"
                width={160}
                height={160}
                priority
              />
            </motion.div>
            <span className="text-2xl text-yellow-400 font-bold animate-heartbeat">
              Press to Enter
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          10% {
            opacity: 0.7;
            transform: scale(0.95);
          }
          20% {
            opacity: 1;
            transform: scale(1.05);
          }
          30% {
            opacity: 0.7;
            transform: scale(0.95);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 1s infinite;
        }
      `}</style>
    </main>
  );
}
