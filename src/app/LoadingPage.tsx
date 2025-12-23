"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D0D0D]">
      <div className="flex flex-col items-center gap-6">
        {/* Club Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#F9B000] text-3xl md:text-5xl font-extrabold tracking-widest"
        >
          CODEKRAFTERS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6 }}
          className="text-[#FFEFB4] text-sm tracking-wide"
        >
          IT'S MORE THAN A CLUB
        </motion.p>

        {/* Loading Bar */}
        <div className="w-40 h-[2px] bg-[#2a2a2a] overflow-hidden rounded">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="h-full w-1/2 bg-[#F2B200]"
          />
        </div>
      </div>
    </div>
  );
}
