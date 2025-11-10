"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Navbar } from "@/components/navbar";
import StoryComponent from "@/components/Story";
import EventSection from "@/components/Events";
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

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    
    gsap.to(img, {
      keyframes: [
        { y: -6, rotate: 0.3, duration: 2.2 },
        { y: 0, rotate: 0, duration: 2.2 }
      ],
      repeat: -1,
      ease: "sine.inOut"
    });

    
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

  
  useEffect(() => {
    if (!leftRailRef.current) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLDivElement>(".slot-line");

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
    }, leftRailRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    gsap.to(img, {
      keyframes: [
        { y: -6, rotate: 0.3, duration: 2.2 },
        { y: 0, rotate: 0, duration: 2.2 }
      ],
      repeat: -1,
      ease: "sine.inOut"
    });

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

        {/* HERO TOP */}
        <div className="relative w-full flex flex-1 px-[3vw] pt-[2.5vh] gap-6">
          
          {/* LEFT TAGLINE */}
          <div ref={leftRailRef} className="flex flex-col justify-center ml-10 select-none" style={{ width: "40%" }}>

            <div className="max-w-[700px]">
              {taglineLines.map((line, i) => (
                <div
                  key={line}
                  className="slot-line font-extrabold leading-[0.86]"
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 5.4rem)",
                    color: i % 2 === 0 ? "#F9B000" : "#FFFFFF",
                    marginBottom: i === taglineLines.length - 1 ? 0 : "-0.08em"
                  }}
                >
                  {splitToSpans(line)}
                </div>
              ))}
            </div>

            <div
              ref={arrowRef}
              className="mt-6 flex items-center gap-3 opacity-70"
            >
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="scroll" fill className="object-contain" />
              </div>
              <p className="text-white/70 uppercase tracking-[0.22em] text-sm">Scroll Down</p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex items-center justify-end" style={{ width: "70%" }}>
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

        {/* BOTTOM BAND — CODEKRAFTERS STATIC */}
        <div
          className="w-full bg-black"
          style={{
            height: "30vh",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <div className="w-full flex justify-end pt-[0.9rem]">
            <div className="w-full text-right pr-[1vw]">
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "clamp(20px, 1vw, 20px)",
                  letterSpacing: "0.16em",
                  marginBottom: 1,
                  fontWeight: 600
                }}
              >
                SRM RAMAPURAM
              </p>

              {/* STATIC — NO ANIMATION */}
              <h1
                style={{
                  color: "#F9B000",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                  lineHeight: 0.88,
                  margin: 0,
                  textAlign: "right",
                  transform: "translateY(8%)",
                  letterSpacing: "-0.02em"
                }}
              >
                CODEKRAFTERS
              </h1>
            </div>
          </div>

          <div className="px-[4vw] pt-[6.5rem] pb-[2.5rem] text-white max-w-[1200px]">
            <h2 className="font-bold text-[clamp(1rem,2vw,1.25rem)] m-0">
              (Text area — replace this with your copy)
            </h2>
            <p className="opacity-90 mt-2 leading-relaxed">
              This region remains the same as your original design.
            </p>
          </div>
        </div>
      </section>

      {/* REST OF PAGE */}
      <div id="story">
        <StoryComponent />
      </div>
      <div id="events">
        <EventSection />
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