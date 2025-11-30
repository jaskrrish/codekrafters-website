"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Laptop, PenTool, Shield, Code, Globe, Palette, Users, Wrench } from 'lucide-react';
import Image from "next/image";
import { TEAM_MEMBERS } from "@/data/team-data";

const DOMAINS = [
  { id: "content", name: "Content", icon: PenTool, desc: "Crafting engaging stories and visuals that define CodeKrafters' voice." },
  { id: "development", name: "Development", icon: Code, desc: "Building robust products, websites, and tools that power our ecosystem." },
  { id: "cyber", name: "Cyber Security", icon: Shield, desc: "Defending systems, spreading awareness, and teaching ethical hacking." },
  { id: "cp", name: "Competitive Programming", icon: Laptop, desc: "Sharpening logic and algorithms for hackathons and coding contests." },
  { id: "web3", name: "Web3", icon: Globe, desc: "Exploring decentralized apps, blockchain tech, and on-chain innovation." },
  { id: "creatives", name: "Creatives", icon: Palette, desc: "Designing visuals, posters, and brand experiences that pop." },
  { id: "pr", name: "Public Relations", icon: Users, desc: "Connecting CodeKrafters with communities and managing collaborations." },
  { id: "operations", name: "Operations", icon: Wrench, desc: "Handling logistics, event flow, and everything behind the scenes." },
];

export default function DomainsSection() {
  const [selectedDomain, setSelectedDomain] = useState<any | null>(null);

  const handleOpen = (domain: any) => {
    setSelectedDomain(domain);
  };

  const handleClose = () => {
    setSelectedDomain(null);
  };

  const getCoreMembers = (domainId: string) => {
    return TEAM_MEMBERS.filter((m) => m.domain === domainId);
  };

  return (
    <section
      id="domains"
      className="relative min-h-screen bg-[#FFEFB4] flex flex-col items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* <CHANGE> Updated heading with responsive text sizes */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-[#0D0D0D] tracking-tight mb-8 sm:mb-10 md:mb-12 text-center px-4"
      >
        Our{" "}
        <span className="text-[#F2A516] underline decoration-[#0D0D0D] decoration-2 sm:decoration-3 md:decoration-4 underline-offset-2 sm:underline-offset-3 md:underline-offset-4">
          Domains
        </span>
      </motion.h2>

      {/* <CHANGE> Updated grid with responsive columns, padding, and gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl px-4 sm:px-6 md:px-8">
        {DOMAINS.map((domain, index) => (
          <motion.button
            key={domain.id}
            onClick={() => handleOpen(domain)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            className="relative bg-[#FFF7D6] border-[2px] sm:border-[3px] rounded-xl sm:rounded-2xl 
                       shadow-[3px_3px_0_#0D0D0D] sm:shadow-[6px_6px_0_#0D0D0D] hover:shadow-[6px_6px_0_#0D0D0D] sm:hover:shadow-[10px_10px_0_#0D0D0D] 
                       hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center 
                       before:content-[''] before:absolute before:inset-x-3 sm:before:inset-x-6 before:-bottom-3 sm:before:-bottom-4 
                       before:h-3 sm:before:h-5 before:rounded-[50%] before:bg-[#0D0D0D]/20 before:blur-md before:opacity-70 group"
          >
            <div className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 flex items-center justify-center rounded-full border-[2px] sm:border-[3px] border-[#0D0D0D] bg-[#FFF0BB] mb-3 sm:mb-4 md:mb-5 shadow-[2px_2px_0_#0D0D0D] sm:shadow-[4px_4px_0_#0D0D0D]">
              <domain.icon className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-[#F2A516]" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0D0D0D] uppercase mb-2">{domain.name}</h3>
            <p className="text-xs sm:text-sm text-[#333333] leading-snug font-medium">{domain.desc}</p>
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
            {/* <CHANGE> Updated modal with responsive width, padding, and text sizes */}
            <motion.div
              key={selectedDomain.id}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-[#FFF7D6] border-[2px] sm:border-[3px] rounded-2xl sm:rounded-3xl 
                         shadow-[6px_6px_0_#0D0D0D] sm:shadow-[10px_10px_0_#0D0D0D] w-[95%] sm:w-[90%] max-w-4xl p-6 sm:p-8 md:p-10 max-h-[80vh] sm:max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 sm:top-5 right-3 sm:right-5 p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[2px_2px_0_#F2A516] sm:shadow-[3px_3px_0_#F2A516] hover:shadow-[3px_3px_0_#F2A516] sm:hover:shadow-[5px_5px_0_#F2A516] transition-all"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 flex items-center justify-center rounded-full border-[2px] sm:border-[3px] border-[#0D0D0D] bg-[#FFF0BB] shadow-[2px_2px_0_#0D0D0D] sm:shadow-[4px_4px_0_#0D0D0D] flex-shrink-0">
                  <selectedDomain.icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-[#F2A516]" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] uppercase">
                    {selectedDomain.name}
                  </h3>
                  <p className="text-[#333333] font-medium text-xs sm:text-sm mt-1">{selectedDomain.desc}</p>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-[#0D0D0D]/50 my-4 sm:my-6"></div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-[#0D0D0D] mb-4 text-center">
                Core Team
              </h4>
              {/* <CHANGE> Updated team grid with responsive layout */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                {getCoreMembers(selectedDomain.id).length > 0 ? (
                  getCoreMembers(selectedDomain.id).map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#FFEFB4] border-[2px] sm:border-[3px] rounded-xl sm:rounded-2xl p-3 sm:p-4 w-[140px] sm:w-[160px] md:w-[180px] text-center shadow-[3px_3px_0_#0D0D0D] sm:shadow-[4px_4px_0_#0D0D0D]"
                    >
                      <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto mb-2 sm:mb-3 overflow-hidden rounded-full border-2 border-[#0D0D0D]">
                        <Image
                          src={member.imagePath || "/placeholder.svg"}
                          alt={member.name}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full object-top"
                        />
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-[#0D0D0D]">{member.name}</h5>
                      <p className="text-[10px] sm:text-xs text-[#F2A516] uppercase font-semibold">
                        {member.role}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-[#333333] text-sm italic">
                    Core team details coming soon...
                  </p>
                )}
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