"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Laptop, PenTool, Shield, Code, Globe, Palette, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { TEAM_MEMBERS } from "@/data/team-data";

// 🟡 Define all domains
const DOMAINS = [
  { id: "content", name: "Content", icon: PenTool, desc: "Crafting engaging stories and visuals that define CodeKrafters’ voice." },
  { id: "development", name: "Development", icon: Code, desc: "Building robust products, websites, and tools that power our ecosystem." },
  { id: "cybersec", name: "Cyber Security", icon: Shield, desc: "Defending systems, spreading awareness, and teaching ethical hacking." },
  { id: "cp", name: "Competitive Programming", icon: Laptop, desc: "Sharpening logic and algorithms for hackathons and coding contests." },
  { id: "web3", name: "Web3", icon: Globe, desc: "Exploring decentralized apps, blockchain tech, and on-chain innovation." },
  { id: "creatives", name: "Creatives", icon: Palette, desc: "Designing visuals, posters, and brand experiences that pop." },
  { id: "pr", name: "Public Relations", icon: Users, desc: "Connecting CodeKrafters with communities and managing collaborations." },
  { id: "operations", name: "Operations", icon: Wrench, desc: "Handling logistics, event flow, and everything behind the scenes." },
];

export default function DomainsSection() {
  const [selectedDomain, setSelectedDomain] = useState<any | null>(null);

  // 🧩 Modal open handler
  const handleOpen = (domain: any) => {
    setSelectedDomain(domain);
  };

  // 🧩 Modal close handler
  const handleClose = () => {
    setSelectedDomain(null);
  };

  // 🧠 Helper: fetch members by domain id
  const getCoreMembers = (domainId: string) => {
    return TEAM_MEMBERS.filter((m) => m.domain === domainId);
  };

  return (
    <section
      id="domains"
      className="relative min-h-screen bg-[#FFEFB4] flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-6xl font-extrabold uppercase text-[#0D0D0D] tracking-tight mb-12 text-center"
      >
        Our{" "}
        <span className="text-[#F2A516] underline decoration-[#0D0D0D] decoration-4 underline-offset-4">
          Domains
        </span>
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl px-8">
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
            className="relative bg-[#FFF7D6] border-[3px] border-[#0D0D0D] rounded-2xl 
                       shadow-[6px_6px_0_#0D0D0D] hover:shadow-[10px_10px_0_#0D0D0D] hover:-translate-y-1 
                       transition-all duration-300 p-8 flex flex-col items-center text-center before:content-[''] 
                       before:absolute before:inset-x-6 before:-bottom-4 before:h-5 before:rounded-[50%] 
                       before:bg-[#0D0D0D]/20 before:blur-md before:opacity-70 group"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-[3px] border-[#0D0D0D] bg-[#FFF0BB] mb-5 shadow-[4px_4px_0_#0D0D0D]">
              <domain.icon className="w-10 h-10 text-[#F2A516]" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0D0D0D] uppercase mb-2">{domain.name}</h3>
            <p className="text-sm text-[#333333] leading-snug font-medium">{domain.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* 🟡 Modal Popup */}
      <AnimatePresence>
        {selectedDomain && (
          <motion.div
            className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={selectedDomain.id}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-[#FFF7D6] border-[3px] border-[#0D0D0D] rounded-3xl 
                         shadow-[10px_10px_0_#0D0D0D] w-[90%] max-w-4xl p-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[3px_3px_0_#F2A516] hover:shadow-[5px_5px_0_#F2A516] transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-[3px] border-[#0D0D0D] bg-[#FFF0BB] shadow-[4px_4px_0_#0D0D0D]">
                  <selectedDomain.icon className="w-8 h-8 text-[#F2A516]" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-[#0D0D0D] uppercase">
                    {selectedDomain.name}
                  </h3>
                  <p className="text-[#333333] font-medium text-sm">{selectedDomain.desc}</p>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-[#0D0D0D]/50 my-6"></div>

              {/* Core Team */}
              <h4 className="text-2xl font-extrabold text-[#0D0D0D] mb-4 text-center">
                Core Team
              </h4>
              <div className="flex flex-wrap justify-center gap-8">
                {getCoreMembers(selectedDomain.id).length > 0 ? (
                  getCoreMembers(selectedDomain.id).map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#FFEFB4] border-[3px] border-[#0D0D0D] rounded-2xl p-4 w-[180px] text-center shadow-[4px_4px_0_#0D0D0D]"
                    >
                      <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-full border-2 border-[#0D0D0D]">
                        <Image
                          src={member.imagePath}
                          alt={member.name}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full object-top"
                        />
                      </div>
                      <h5 className="text-sm font-bold text-[#0D0D0D]">{member.name}</h5>
                      <p className="text-xs text-[#F2A516] uppercase font-semibold">
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

      {/* Paper texture overlay */}
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
