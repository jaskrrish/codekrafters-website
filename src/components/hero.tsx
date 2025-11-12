"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const leftRailRef = useRef<HTMLDivElement | null>(null);
  const codekraftersRef = useRef<HTMLHeadingElement | null>(null); // 🟡 new ref for the text

  const taglineLines = useMemo(() => ["IT'S", "MORE THAN", "A CLUB"], []);

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

  const images = [
    "/group/group4.jpg",
    "/group/group3.jpg",
    "/group/group2.jpg",
    "/group/group1.jpg",
  ];
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current as any);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as any);
    };
  }, []);

  const goto = (n: number) => {
    setIndex(((n % images.length) + images.length) % images.length);
    startInterval();
  };
  const next = () => goto(index + 1);
  const prev = () => goto(index - 1);

  // 🟡 Image breathing + hover tilt
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    gsap.to(img, {
      keyframes: [
        { y: -6, rotate: 0.3, duration: 2.2 },
        { y: 0, rotate: 0, duration: 2.2 },
      ],
      repeat: -1,
      ease: "sine.inOut",
    });

    const enter = () =>
      gsap.to(img, {
        scale: 1.03,
        rotate: 0.7,
        duration: 0.3,
        ease: "power2.out",
      });
    const leave = () => gsap.to(img, { scale: 1, rotate: 0, duration: 0.4 });

    img.addEventListener("mouseenter", enter);
    img.addEventListener("mouseleave", leave);

    return () => {
      img.removeEventListener("mouseenter", enter);
      img.removeEventListener("mouseleave", leave);
    };
  }, []);

  // 🟡 Tagline animations
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
              repeatDelay: gsap.utils.random(0.7, 1.2),
              yoyo: true,
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
          ease: "sine.inOut",
        });
        gsap.to(arrowRef.current, {
          opacity: 0.35,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, leftRailRef);

    return () => ctx.revert();
  }, []);

  // 🟡 Background rotation with scroll
  useEffect(() => {
    const yellowLayer = document.querySelector(".bg-layer-yellow");
    const blackLayer = document.querySelector(".bg-layer-black");

    if (!yellowLayer || !blackLayer) return;

    gsap.to(yellowLayer, {
      rotation: -8,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(blackLayer, {
      rotation: 8,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 🟡 CODEKRAFTERS hover animation
  useEffect(() => {
    const heading = codekraftersRef.current;
    if (!heading) return;

    const chars = heading.querySelectorAll(".char");

    const hoverEnter = () => {
      gsap.to(chars, {
        y: -15,
        rotation: gsap.utils.random(-10, 10, 1, true),
        color: "#FFFFFF",
        stagger: {
          each: 0.05,
          from: "center",
        },
        ease: "back.out(2)",
        duration: 0.4,
      });
    };

    const hoverLeave = () => {
      gsap.to(chars, {
        y: 0,
        rotation: 0,
        color: "#F9B000",
        stagger: {
          each: 0.03,
          from: "edges",
        },
        ease: "back.in(1.5)",
        duration: 0.5,
      });
    };

    heading.addEventListener("mouseenter", hoverEnter);
    heading.addEventListener("mouseleave", hoverLeave);

    return () => {
      heading.removeEventListener("mouseenter", hoverEnter);
      heading.removeEventListener("mouseleave", hoverLeave);
    };
  }, []);

  return (
    <section
      id="home"
      className="w-full relative overflow-hidden"
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
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
                  marginBottom: i === taglineLines.length - 1 ? 0 : "-0.08em",
                }}
              >
                {splitToSpans(line)}
              </div>
            ))}
          </div>

          <div ref={arrowRef} className="mt-6 flex items-center gap-3 opacity-70">
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
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              else if (e.key === "ArrowRight") next();
            }}
            className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_#0008]"
            style={{
              width: "clamp(400px, 70%, 700px)",
              height: "70%",
              marginRight: "clamp(20px, 3vw, 60px)",
              marginTop: "clamp(20px, 2vh, 40px)",
            }}
          >
            {images.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 bg-center bg-cover transition-opacity duration-[900ms] rounded-3xl`}
                style={{
                  backgroundImage: `url('${src}')`,
                  opacity: index === i ? 1 : 0,
                  transitionTimingFunction: "ease-in-out",
                  borderRadius: "inherit",
                  willChange: "opacity",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
                aria-hidden={index !== i}
              />
            ))}

            <button
              onClick={() => prev()}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white"
              style={{ backdropFilter: "blur(4px)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => next()}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white"
              style={{ backdropFilter: "blur(4px)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-black h-[30vh] flex flex-col justify-end items-end z-10 pr-[3vw] pb-[2vh]">
        <div className="text-right">
          <p
            className="mb-2"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(18px, 1vw, 20px)",
              letterSpacing: "0.16em",
              fontWeight: 600,
              textAlign: "right",
            }}
          >
            SRMIST RAMAPURAM
          </p>

          <h1
            ref={codekraftersRef}
            className="font-black leading-none cursor-pointer select-none"
            style={{
              color: "#F9B000",
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
              letterSpacing: "-0.02em",
              display: "inline-block",
              textAlign: "right",
            }}
          >
            {"CODEKRAFTERS".split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{
                  display: "inline-block",
                  willChange: "transform, color",
                  transformOrigin: "center",
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>

    </section>
  );
};

export default Hero;
