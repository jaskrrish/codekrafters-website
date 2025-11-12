"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Github, Linkedin } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { TEAM_MEMBERS, DOMAINS } from "@/data/team-data";

export default function TeamComponent() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  // 🟡 Horizontal scroll with wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.9;
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // 🟡 Track active domain & reset timer on manual scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);
      // reset timer when user scrolls
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        startTimeRef.current = Date.now();
        setProgress(0);
      }, 200);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // 🟡 Auto-slide + progress animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number;
    const duration = 5000;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const ratio = Math.min(elapsed / duration, 1);
      setProgress(ratio * 100);

      if (ratio >= 1) {
        const nextIndex = (activeIndex + 1) % DOMAINS.length;
        container.scrollTo({
          left: container.clientWidth * nextIndex,
          behavior: "smooth",
        });
        setActiveIndex(nextIndex);
        startTimeRef.current = Date.now();
        setProgress(0);
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [activeIndex]);

  // 🟡 Manual click scroll + timer reset
  const scrollToDomain = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  return (
    <section
      id="team"
      className="relative w-full h-screen bg-[#FFEFB4] overflow-hidden flex flex-col justify-between"
    >
      {/* Timer Bar */}
      <div className="absolute top-6 left-6 w-[120px] h-2 bg-[#0D0D0D]/20 rounded-full overflow-hidden">
        <motion.div
          key={activeIndex}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
          className="h-full bg-[#F2A516]"
        />
      </div>

      <div className="absolute top-6 right-10 text-right">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#0D0D0D] uppercase tracking-tight">
          Our{" "}
          <span className="text-[#F2A516] underline decoration-[#0D0D0D] decoration-4 underline-offset-4">
            Team
          </span>
        </h1>
        <p className="text-[#333333] mt-2 text-sm font-medium">
          The people behind CodeKrafters’ magic
        </p>
      </div>

      {/* Horizontal Scroll */}
      <div
        ref={scrollContainerRef}
        className="flex flex-row w-full h-[75vh] overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-10 py-12"
      >
        {DOMAINS.map((domain) => {
          const members = TEAM_MEMBERS.filter((m) => m.domain === domain.id);
          if (members.length === 0) return null;

          return (
            <div
              key={domain.id}
              id={domain.id}
              className="flex-shrink-0 w-screen snap-center flex flex-col items-center justify-start"
            >
              <div className="mb-10 mt-15">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D0D0D] uppercase tracking-wide text-center">
                  {domain.label}
                </h2>
                <div className="h-[3px] w-16 bg-[#0D0D0D] mx-auto rounded-full mt-2"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true }}
                    className="bg-[#FFF7D6] border-[3px] border-[#0D0D0D] rounded-2xl shadow-[6px_6px_0_#0D0D0D] hover:shadow-[10px_10px_0_#0D0D0D] hover:-translate-y-1 transition-all duration-300 p-6 w-[250px] flex flex-col items-center text-center"
                  >
                    <div className="w-36 h-36 overflow-hidden rounded-full border-2 border-[#0D0D0D] mb-3 bg-[#FFF0BB]">
                      <Image
                        src={member.imagePath}
                        alt={member.name}
                        width={130}
                        height={130}
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#0D0D0D]">
                      {member.name}
                    </h3>
                    <p className="text-[#F2A516] font-semibold text-xs uppercase mb-2">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#333333] mb-4 leading-snug">
                      {member.description}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[3px_3px_0_#F2A516] hover:shadow-[5px_5px_0_#F2A516] transition-all duration-300 hover:-translate-y-1"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[3px_3px_0_#F2A516] hover:shadow-[5px_5px_0_#F2A516] transition-all duration-300 hover:-translate-y-1"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#0D0D0D] text-[#FFEFB4] rounded-full shadow-[3px_3px_0_#F2A516] hover:shadow-[5px_5px_0_#F2A516] transition-all duration-300 hover:-translate-y-1"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="w-full py-6 bg-[#0D0D0D] flex items-center justify-center gap-4">
        {DOMAINS.map((domain, index) => (
          <button
            key={domain.id}
            onClick={() => scrollToDomain(index)}
            className={`flex items-center gap-2 font-semibold text-sm uppercase transition-all ${
              activeIndex === index
                ? "text-[#F2A516]"
                : "text-[#FFEFB4] hover:text-[#F2A516]"
            }`}
          >
            <span
              className={`w-3 h-3 rounded-full border border-[#FFEFB4] transition-all ${
                activeIndex === index ? "bg-[#F2A516]" : "bg-transparent"
              }`}
            ></span>
            {domain.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
          opacity: 0.15;
          pointer-events: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
