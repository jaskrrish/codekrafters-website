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

  // ----------------------------------------
  // Horizontal Scroll Wheel Support
  // ----------------------------------------
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

  // ----------------------------------------
  // Detect active domain + reset timer on scroll
  // ----------------------------------------
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIndex(index);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        startTimeRef.current = Date.now();
        setProgress(0);
      }, 200);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ----------------------------------------
  // Auto-slider progress bar + auto-scroll
  // ----------------------------------------
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

  // ----------------------------------------
  // Manual click → scroll & reset timer
  // ----------------------------------------
  const scrollToDomain = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  return (
    <section
      id="team"
      className="relative w-full h-screen  bg-[#FFEFB4] overflow-hidden flex flex-col justify-between"
    >
      {/* ----------------------------------------
          Progress Timer Bar
      ---------------------------------------- */}
      <div className="absolute top-6 left-6 w-[140px] h-2 bg-[#0D0D0D]/20 rounded-full overflow-hidden">
        <motion.div
          key={activeIndex}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
          className="h-full bg-[#F2A516]"
        />
      </div>

      {/* Title */}
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

      {/* ----------------------------------------
          Horizontal Scroll Panels
      ---------------------------------------- */}
      <div
        ref={scrollContainerRef}
        className="flex flex-row w-full h-[75vh] overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-10"
      >
        {DOMAINS.map((domain) => {
          const members = TEAM_MEMBERS.filter((m) => m.domain === domain.id);
          if (members.length === 0) return null;

          return (
            <div
              key={domain.id}
              className="flex-shrink-0 w-screen snap-center flex flex-col items-center justify-start"
            >
              {/* Domain Title */}
              <div className="mb-25 mt-20">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D0D0D] uppercase tracking-wide text-center">
                  {domain.label}
                </h2>
                <div className="h-[3px] w-16 bg-[#0D0D0D] mx-auto rounded-full mt-2"></div>
              </div>

              {/* MEMBERS */}
              <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    {/* CARD */}
                    <div
                      className={`
                        ck-card relative bg-gradient-to-br bg-[#f9f7e5]
                        border-[3px] border-[#0D0D0D] rounded-3xl
                        shadow-[6px_6px_0_#0D0D0D]
                        group-hover:shadow-[10px_10px_0_#0D0D0D]
                        transition-all duration-300 p-6
                        flex flex-col items-center text-center 
                      `}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Floating circle behind image */}
                      <div className="absolute -top-5 w-20 h-20 bg-[#F2A516]/30 rounded-full blur-xl opacity-70 group-hover:scale-110 transition-transform" />

                      {/* IMAGE */}
                      <div className="w-36 h-36 overflow-hidden rounded-full border-2 border-[#0D0D0D] mb-3 bg-[#FFF2C6] shadow-inner">
                        <Image
                          src={member.imagePath}
                          alt={member.name}
                          width={130}
                          height={130}
                          className="object-cover object-top w-full h-full"
                        />
                      </div>

                      {/* NAME + ROLE */}
                      <h3 className="text-xl font-extrabold text-[#0D0D0D] group-hover:scale-105 transition-transform">
                        {member.name}
                      </h3>

                      <p className="text-[#F2A516] font-bold text-xs uppercase mb-2 tracking-wide">
                        {member.role}
                      </p>

                      {/* SOCIALS */}
                      <div className="flex items-center justify-center gap-3 mt-3">
                        {member.social.instagram && (
                          <a
                            href={member.social.instagram}
                            target="_blank"
                            className="social-btn"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}

                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            className="social-btn"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}

                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            className="social-btn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* EXTRUDED SHADOW HOLE */}
                    <div className="w-40 h-5 mx-auto mt-3 bg-black/20 blur-xl rounded-full scale-90 group-hover:scale-110 transition-all" />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------------------------------
          Bottom Floating Timeline Navigation (Retro)
      ---------------------------------------- */}
      <div className="w-full py-8 flex items-center justify-center">
        <div className="relative bg-[#0D0D0D] border-[3px] border-[#F2A516] rounded-full shadow-[8px_8px_0_#0D0D0D] px-8 py-4 flex items-center justify-center gap-6">

          {DOMAINS.map((domain, index) => (
            <button
              key={domain.id}
              onClick={() => scrollToDomain(index)}
              className={`relative flex items-center gap-2 font-bold text-sm uppercase transition-all px-4 py-2 rounded-full ${
                activeIndex === index
                  ? "text-[#0D0D0D] bg-[#F2A516] shadow-[3px_3px_0_#FFEFB4]"
                  : "text-[#FFEFB4] hover:text-[#F2A516] hover:bg-[#0D0D0D]/50"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-[#0D0D0D] animate-pulse" 
                    : "bg-[#F2A516]"
                }`}
              ></span>
              {domain.label}
            </button>
          ))}
        </div>
      </div>

      {/* ----------------------------------------
          Scoped Styling
      ---------------------------------------- */}
      <style jsx>{`
        section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
          opacity: 0.12;
          pointer-events: none;
        }

        .social-btn {
          padding: 8px;
          background: #0d0d0d;
          color: #ffefb4;
          border-radius: 50%;
          box-shadow: 3px 3px 0 #f2a516;
          transition: 0.25s ease;
        }

        .social-btn:hover {
          transform: translateY(-3px);
          box-shadow: 5px 5px 0 #f2a516;
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