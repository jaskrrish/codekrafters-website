"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Github, Globe } from "lucide-react";

export default function PresidentIntroRetro() {
  return (
    <section
      id="president"
      className="w-full min-h-screen flex items-center justify-center bg-[#FFEFB4] py-24 px-6"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="rounded-2xl overflow-hidden border-[3px] border-[#0D0D0D] bg-[#FFF6D0] shadow-[8px_8px_0_#0D0D0D] transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[12px_12px_0_#0D0D0D]">
            <Image
              src="/images/president.png" 
              alt="Club President"
              width={400}
              height={480}
              className="object-cover rounded-2xl saturate-90 contrast-110 brightness-95"
            />
          </div>

          <div className="absolute -top-6 -right-6 bg-[#0D0D0D] text-[#FFEFB4] text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold rotate-6">
            Est. 2025
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl text-[#0D0D0D] space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight uppercase">
            Meet Our{" "}
            <span className="text-[#F2A516] underline decoration-[#0D0D0D] decoration-4 underline-offset-4">
              President
            </span>
          </h2>

          <div className="bg-[#0D0D0D] text-[#FFEFB4] inline-block px-4 py-2 rounded-md shadow-[4px_4px_0_#F2A516]">
            <h3 className="text-xl font-semibold tracking-wider">
              Jas Krish Singh — Club President
            </h3>
          </div>

          <p className="text-lg leading-relaxed font-medium max-w-lg">
            Guiding CodeKrafters with clarity, creativity, and conviction —{" "}
            <span className="text-[#F2A516] font-semibold">Jas</span> has shaped
            our community into one of SRM’s most dynamic tech forces. From
            hackathons to innovation tracks, his retro-meets-modern leadership
            style defines our club’s culture.
          </p>


          <motion.div
            className="flex items-center gap-5 pt-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="https://instagram.com/jass"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[3px_3px_0_#F2A516] hover:shadow-[5px_5px_0_#F2A516] transition-all duration-300 hover:translate-y-[-2px]"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://github.com/jass"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[3px_3px_0_#F2A516] hover:shadow-[5px_5px_0_#F2A516] transition-all duration-300 hover:translate-y-[-2px]"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://jass-portfolio.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[3px_3px_0_#F2A516] hover:shadow-[5px_5px_0_#F2A516] transition-all duration-300 hover:translate-y-[-2px]"
            >
              <Globe className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.a
            href="https://linkedin.com/in/jass"
            target="_blank"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-4 px-6 py-3 rounded-lg bg-[#0D0D0D] text-[#FFEFB4] font-bold tracking-wide shadow-[4px_4px_0_#F2A516] hover:shadow-[6px_6px_0_#F2A516] transition-all duration-300"
          >
            Connect on LinkedIn
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        section {
          background: radial-gradient(
            circle at bottom right,
            #ffeeb0 0%,
            #ffe9a0 30%,
            #ffeeb4 100%
          );
          position: relative;
        }

        section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
          opacity: 0.25;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
