"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Laptop,
  PenTool,
  Shield,
  Code,
  Globe,
  Palette,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { TEAM_MEMBERS } from "@/data/team-data";

const DOMAINS = [
  { id: "content", name: "Content", icon: PenTool, desc: "Crafting engaging stories and visuals that define CodeKrafters' voice." },
  { id: "development", name: "Development", icon: Code, desc: "Building robust products, websites, and tools that power our ecosystem." },
  { id: "cyber", name: "Cyber Security", icon: Shield, desc: "Defending systems, spreading awareness, and teaching ethical hacking." },
  { id: "cp", name: "Competitive Programming", icon: Laptop, desc: "Sharpening logic and algorithms for hackathons and coding contests." },
  { id: "web3", name: "Web3", icon: Globe, desc: "Exploring decentralized apps, blockchain tech, and on-chain innovation." },
  { id: "creatives", name: "Creatives", icon: Palette, desc: "Designing visuals, posters, and brand experiences that pop." },
  { id: "publicrelations", name: "Public Relations and Management", icon: Users, desc: "Connecting CodeKrafters with communities and managing collaborations." },

  { id: "operations", name: "Operations", icon: Wrench, desc: "Handling logistics, event flow, and everything behind the scenes." },
];

export default function DomainsSection() {
  const [selectedDomain, setSelectedDomain] = useState<any | null>(null);

  const getCoreMembers = (domainId: string) =>
    TEAM_MEMBERS.filter((m) => m.domain === domainId);

  return (
    <section
      id="domains"
      className="relative min-h-screen bg-[#FFEFB4] flex flex-col items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-[#0D0D0D] mb-10 text-center px-4"
      >
        Our{" "}
        <span className="text-[#F2A516] underline decoration-[#0D0D0D] decoration-3 underline-offset-4">
          Domains
        </span>
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl px-4 sm:px-6 md:px-8">
        {DOMAINS.map((domain, index) => (
          <motion.button
            key={domain.id}
            onClick={() => setSelectedDomain(domain)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-[#FFF7D6] border-[2px] sm:border-[3px] rounded-xl sm:rounded-2xl
                       shadow-[3px_3px_0_#0D0D0D] sm:shadow-[6px_6px_0_#0D0D0D]
                       hover:-translate-y-1 transition-all duration-300
                       p-4 sm:p-6 flex flex-col items-center text-center"
          >
            <div className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 flex items-center justify-center rounded-full border-[2px] sm:border-[3px] border-[#0D0D0D] bg-[#FFF0BB] mb-3 shadow-[2px_2px_0_#0D0D0D]">
              <domain.icon className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-[#F2A516]" />
            </div>

            <h3 className="text-sm sm:text-lg md:text-xl font-extrabold text-[#0D0D0D] uppercase">
              {domain.name}
            </h3>

            <p className="hidden sm:block mt-2 text-sm text-[#333333] font-medium leading-snug">
              {domain.desc}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedDomain && (
          <motion.div
            className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-[#FFF7D6] border-[3px] rounded-3xl
                         shadow-[10px_10px_0_#0D0D0D]
                         w-full max-w-4xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-4 right-4 p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full border-[3px] border-[#0D0D0D] bg-[#FFF0BB] shadow-[3px_3px_0_#0D0D0D]">
                  <selectedDomain.icon className="w-7 h-7 text-[#F2A516]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#0D0D0D]">
                  {selectedDomain.name}
                </h3>
              </div>

              <div className="sm:hidden text-sm text-[#333333] font-medium leading-relaxed">
                {selectedDomain.desc}
              </div>

              <div className="hidden sm:block">
                <div className="border-t-2 border-dashed border-[#0D0D0D]/50 my-6" />

                <h4 className="text-2xl text-black font-extrabold text-center mb-6">
                  Core Team
                </h4>

                <div className="flex flex-wrap justify-center gap-6">
                  {getCoreMembers(selectedDomain.id).length > 0 ? (
                    getCoreMembers(selectedDomain.id).map((member) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#FFEFB4] border-[2px] rounded-xl p-4 w-[160px]
                                   text-center shadow-[3px_3px_0_#0D0D0D]"
                      >
                        <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-2 border-[#0D0D0D]">
                          <Image
                            src={member.imagePath || "/placeholder.svg"}
                            alt={member.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full object-top"
                          />
                        </div>
                        <p className="text-sm font-bold text-[#0D0D0D]">
                          {member.name}
                        </p>
                        <p className="text-xs text-[#F2A516] uppercase font-semibold">
                          {member.role}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-[#333333] italic">
                      Core team details coming soon...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
          opacity: 0.15;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
