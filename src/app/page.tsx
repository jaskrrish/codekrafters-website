"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Navbar } from "@/components/navbar";
import StoryComponent from "@/components/Story";
import EventSection from "@/components/Events";
import TeamSection from "@/components/team-section";
import SponsorsComponent from "@/components/sponsor";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const leftRailRef = useRef<HTMLDivElement | null>(null);

  const taglineLines = useMemo(
    () => ["IT'S", "MORE THAN", "A CLUB"],
    []
  );

  const splitToSpans = (text: string) =>
    text.split("").map((ch, idx) => (
      <span
        key={`${text}-${idx}`}
        className="slot-char inline-block will-change-transform"
        style={{ display: "inline-block" }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  // -----------------------
  // HERO IMAGE ANIMATION
  // -----------------------
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    // subtle idle motion
    gsap.to(img, {
      keyframes: [
        { y: -6, rotate: 0.3, duration: 2.2 },
        { y: 0, rotate: 0, duration: 2.2 }
      ],
      repeat: -1,
      ease: "sine.inOut"
    });

    // hover bump
    const enter = () =>
      gsap.to(img, {
        scale: 1.03,
        rotate: 0.7,
        duration: 0.3,
        ease: "power2.out"
      });
    const leave = () =>
      gsap.to(img, { scale: 1, rotate: 0, duration: 0.4 });

    img.addEventListener("mouseenter", enter);
    img.addEventListener("mouseleave", leave);

    return () => {
      img.removeEventListener("mouseenter", enter);
      img.removeEventListener("mouseleave", leave);
    };
  }, []);

  // -----------------------------------
  // LEFT TAGLINE — CASINO ROLLING FX (WORKS ON BOTH MOBILE & DESKTOP)
  // -----------------------------------
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const lines = document.querySelectorAll<HTMLDivElement>(".slot-line");
      
      lines.forEach((line, lineIndex) => {
        const chars = line.querySelectorAll<HTMLSpanElement>(".slot-char");

        chars.forEach((char, charIndex) => {
          gsap.fromTo(
            char,
            { yPercent: 110, rotateX: -90 },
            {
              yPercent: 0,
              rotateX: 0,
              duration: gsap.utils.random(1, 1.25),
              ease: "back.out(3)",
              delay: charIndex * 0.04 + lineIndex * 0.15,
              repeat: -1,
              repeatDelay: gsap.utils.random(0.7, 1.2),
              yoyo: true
            }
          );
        });
      });

      // scroll-down indicator bounce
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 10,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        gsap.to(arrowRef.current, {
          opacity: 0.35,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(".slot-char");
    };
  }, []);

  // -----------------------
  // BACKGROUND LAYERS SCROLL ROTATION
  // -----------------------
  useEffect(() => {
    const yellowLayer = document.querySelector('.bg-layer-yellow');
    const blackLayer = document.querySelector('.bg-layer-black');
    
    if (!yellowLayer || !blackLayer) return;

    gsap.to(yellowLayer, {
      rotation: -8,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(blackLayer, {
      rotation: 8,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-background" style={{ scrollSnapType: "y mandatory" }}>
      <Navbar />

      <section
        id="home"
        className="w-full relative overflow-hidden"
        style={{
          scrollSnapAlign: "start",
          scrollSnapStop: "always",
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* background planes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-18%] left-[-10%] w-[140%] h-[58%] bg-[#F9B000] rotate-[5deg] opacity-[0.18]" />
          <div className="absolute top-[32%] left-[-10%] w-[150%] h-[50%] bg-[#111111] rotate-[-6deg] opacity-[0.5]" />
        </div>

        {/* HERO TOP - MOBILE OPTIMIZED */}
        <div className="relative w-full flex flex-1 px-4 md:px-[3vw] pt-4 md:pt-[2.5vh] gap-3 md:gap-6">
          
          {/* MOBILE: Column Layout (Image on top, Text below) */}
          <div className="flex md:hidden flex-col w-full items-center gap-6">
            {/* IMAGE - MOBILE TOP */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_#0008] w-full max-w-[90%]"
              style={{ height: "40vh" }}
            >
              <Image
                src="/ck-core.jpg"
                alt="CK Group"
                fill
                priority
                className="object-cover select-none pointer-events-none"
              />
            </div>

            {/* TAGLINE - MOBILE BELOW IMAGE WITH ANIMATION */}
            <div 
              ref={leftRailRef} 
              className="flex flex-col justify-center items-center select-none w-full"
            >
              <div className="max-w-[700px] text-center">
                {taglineLines.map((line, i) => (
                  <div
                    key={line}
                    className="slot-line font-extrabold leading-[0.86]"
                    style={{
                      fontSize: "clamp(2rem, 12vw, 5.4rem)",
                      color: i % 2 === 0 ? "#F9B000" : "#FFFFFF",
                      marginBottom: i === taglineLines.length - 1 ? 0 : "-0.08em"
                    }}
                  >
                    {splitToSpans(line)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP: Side-by-side Layout */}
          <div className="hidden md:flex w-full gap-6">
            {/* LEFT TAGLINE - DESKTOP */}
            <div 
              ref={leftRailRef} 
              className="flex flex-col justify-center items-start ml-10 select-none w-[40%]"
            >
              <div className="max-w-[700px] text-left">
                {taglineLines.map((line, i) => (
                  <div
                    key={line}
                    className="slot-line font-extrabold leading-[0.86]"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 5.4rem)",
                      color: i % 2 === 0 ? "#F9B000" : "#FFFFFF",
                      marginBottom: i === taglineLines.length - 1 ? 0 : "-0.08em"
                    }}
                  >
                    {splitToSpans(line)}
                  </div>
                ))}
              </div>

              {/* SCROLL INDICATOR - DESKTOP ONLY */}
              <div
                ref={arrowRef}
                className="flex mt-6 items-center gap-3 opacity-70"
              >
                <div className="relative w-8 h-8">
                  <Image src="/logo.png" alt="scroll" fill className="object-contain" />
                </div>
                <p className="text-white/70 uppercase tracking-[0.22em] text-sm">Scroll Down</p>
              </div>
            </div>

            {/* RIGHT IMAGE - DESKTOP */}
            <div className="flex relative items-center justify-end" style={{ width: "70%" }}>
              <div
                ref={imageRef}
                className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_#0008]"
                style={{
                  width: "clamp(400px, 70%, 700px)",
                  height: "70%",
                  marginRight: "clamp(20px, 3vw, 60px)",
                  marginTop: "clamp(20px, 2vh, 40px)"
                }}
              >
                <Image
                  src="/ck-core.jpg"
                  alt="CK Group"
                  fill
                  priority
                  className="object-cover select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAND — CODEKRAFTERS STATIC */}
        <div
          className="w-full bg-black"
          style={{
            height: "auto",
            minHeight: "30vh",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <div className="w-full flex justify-center md:justify-end pt-3 md:pt-[0.9rem] px-4">
            <div className="w-full text-center md:text-right md:pr-[1vw]">
              <p
                className="text-white/85 text-sm md:text-base lg:text-lg font-semibold tracking-[0.16em] mb-1"
              >
                SRM RAMAPURAM
              </p>

              {/* ✅ STATIC — NO ANIMATION */}
              <h1
                className="text-[#F9B000] font-black leading-[0.88] m-0"
                style={{
                  fontSize: "clamp(2.5rem, 10vw, 8.5rem)",
                  letterSpacing: "-0.02em"
                }}
              >
                CODEKRAFTERS
              </h1>
            </div>
          </div>

          {/*<div className="px-4 md:px-[4vw] pt-8 md:pt-[6.5rem] pb-6 md:pb-[2.5rem] text-white max-w-[1200px]">
            <h2 className="font-bold text-base md:text-lg lg:text-xl m-0">
              (Text area — replace this with your copy)
            </h2>
            <p className="opacity-90 mt-2 text-sm md:text-base leading-relaxed">
              This region remains the same as your original design.
            </p>
          </div>*/}
        </div>
      </section>

      {/* STORY SECTION - HIDDEN ON MOBILE, SHOWN ON MD+ */}
      <div id="story" className="hidden md:block">
        <StoryComponent />
      </div>

      {/* REST OF PAGE */}
      <div id="events">
        <EventSection />
      </div>
      <div id="team">
        <TeamSection/>
      </div>
      <div id="sponsors">
        <SponsorsComponent />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}