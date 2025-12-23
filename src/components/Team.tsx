"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Github, Linkedin } from 'lucide-react';
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
      className="relative w-full bg-[#FFEFB4] overflow-hidden flex flex-col justify-between"
    >
      {/* Progress timer bar with responsive positioning and sizing */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 w-24 sm:w-32 md:w-40 h-1.5 sm:h-2 bg-[#0D0D0D]/20 rounded-full overflow-hidden">
        <motion.div
          key={activeIndex}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
          className="h-full bg-[#F2A516]"
        />
      </div>

      {/* Title section with responsive text sizes and positioning */}
      <div className="absolute top-3 sm:top-6 right-3 sm:right-10 text-right z-20">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D0D0D] uppercase tracking-tight">
          Our{" "}
          <span className="text-[#F2A516] underline decoration-[#0D0D0D] decoration-2 sm:decoration-3 md:decoration-4 underline-offset-2 sm:underline-offset-4">
            Team
          </span>
        </h1>
        <p className="text-[#333333] mt-1 sm:mt-2 text-xs sm:text-sm font-medium">
          The people behind CodeKrafters' magic 
        </p>
      </div>

      {/* Horizontal scroll panels with responsive padding and height */}
      <div
        ref={scrollContainerRef}
        className="flex flex-row w-full flex-1 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-2 sm:px-4 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8"
      >
        {DOMAINS.map((domain) => {
          const members = TEAM_MEMBERS.filter((m) => m.domain === domain.id);
          if (members.length === 0) return null;

          return (
            <div
              key={domain.id}
              className="flex-shrink-0 w-screen snap-center flex flex-col items-center justify-start"
            >
              {/* Domain title with responsive text sizes and spacing */}
              <div className="mb-6 sm:mb-16 md:mb-16 mt-6 sm:mt-10 md:mt-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] uppercase tracking-wide text-center">
                  {domain.label}
                </h2>
                <div className="h-1 sm:h-[2px] md:h-[3px] w-8 sm:w-12 md:w-16 bg-[#0D0D0D] mx-auto rounded-full mt-1.5 sm:mt-2"></div>
              </div>

              {/* CHANGED: Members grid - 2 rows on mobile/tablet, flex-wrap on desktop */}
              <div className="grid grid-cols-2 justify-items-center lg:flex lg:flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto px-2 sm:px-4">
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
                    className={`group ${members.length % 2 !== 0 && index === members.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
                  >
                    {/* Card with fixed height and text truncation to prevent box expansion */}
                    <div
                      className={`
                        ck-card relative bg-gradient-to-br bg-[#f9f7e5]
                        border-2 sm:border-3 border-[#0D0D0D] rounded-2xl sm:rounded-3xl
                        shadow-[3px_3px_0_#0D0D0D] sm:shadow-[6px_6px_0_#0D0D0D]
                        group-hover:shadow-[5px_5px_0_#0D0D0D] sm:group-hover:shadow-[10px_10px_0_#0D0D0D]
                        transition-all duration-300 p-3 sm:p-4 md:p-6
                        flex flex-col items-center text-center w-full lg:w-52 xl:w-56
                        h-60 sm:h-70 md:h-85 flex-shrink-0
                      `}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Floating circle with responsive sizing */}
                      <div className="absolute -top-3 sm:-top-5 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-[#F2A516]/30 rounded-full blur-lg sm:blur-xl opacity-70 group-hover:scale-110 transition-transform" />

                      {/* Image container with responsive sizing and flex-shrink-0 */}
                      <div className="w-24 sm:w-28 md:w-32 lg:w-36 h-24 sm:h-28 md:h-32 lg:h-36 overflow-hidden rounded-full border-2 border-[#0D0D0D] mb-2 sm:mb-3 bg-[#FFF2C6] shadow-inner flex-shrink-0">
                        <Image
                          src={member.imagePath || "/placeholder.svg"}
                          alt={member.name}
                          width={130}
                          height={130}
                          className="object-cover object-top w-full h-full"
                        />
                      </div>

                      {/* Name with responsive text size and line clamping */}
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-[#0D0D0D] group-hover:scale-105 transition-transform line-clamp-2">
                        {member.name}
                      </h3>

                      {/* Role with responsive text size and line clamping */}
                      <p className="text-[#F2A516] font-bold text-[10px] sm:text-xs md:text-sm uppercase mb-1.5 sm:mb-2 tracking-wide line-clamp-1">
                        {member.role}
                      </p>

                      {/* Social links with responsive icon sizing and spacing */}
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3">

                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            className="social-btn"
                          >
                            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Shadow hole with responsive scaling */}
                    <div className="w-28 sm:w-32 md:w-40 h-3 sm:h-4 md:h-5 mx-auto mt-2 sm:mt-3 bg-black/20 blur-lg sm:blur-xl rounded-full scale-75 sm:scale-90 group-hover:scale-100 sm:group-hover:scale-110 transition-all" />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom navigation with responsive padding, text sizes, and button layout */}
      <div className="w-full py-4 sm:py-6 md:py-8  items-center justify-center overflow-x-auto hidden md:block px-2 sm:px-4">
        <div className="relative bg-[#0D0D0D] border-2 sm:border-3 border-[#F2A516] rounded-full shadow-[4px_4px_0_#0D0D0D] sm:shadow-[8px_8px_0_#0D0D0D] px-3 sm:px-6 md:px-8 py-2 sm:py-4 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap">

          {DOMAINS.map((domain, index) => (
            <button
              key={domain.id}
              onClick={() => scrollToDomain(index)}
              className={`relative flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs md:text-sm uppercase transition-all px-2 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap ${
                activeIndex === index
                  ? "text-[#0D0D0D] bg-[#F2A516] shadow-[2px_2px_0_#FFEFB4] sm:shadow-[3px_3px_0_#FFEFB4]"
                  : "text-[#FFEFB4] hover:text-[#F2A516] hover:bg-[#0D0D0D]/50"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
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
          padding: 6px;
          background: #0d0d0d;
          color: #ffefb4;
          border-radius: 50%;
          box-shadow: 2px 2px 0 #f2a516;
          transition: 0.25s ease;
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 3px 3px 0 #f2a516;
        }

        @media (min-width: 768px) {
          .social-btn {
            padding: 8px;
            box-shadow: 3px 3px 0 #f2a516;
          }

          .social-btn:hover {
            transform: translateY(-3px);
            box-shadow: 5px 5px 0 #f2a516;
          }
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