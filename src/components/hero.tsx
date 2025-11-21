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
  const codekraftersRef = useRef<HTMLHeadingElement | null>(null);

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

  // Image breathing + hover tilt
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

  // Tagline animations
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

  // Background rotation with scroll
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

  // CODEKRAFTERS hover animation
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
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background planes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-layer-yellow absolute top-[-18%] left-[-10%] w-[140%] h-[58%] bg-[#F9B000] rotate-[5deg] opacity-[0.18]" />
        <div className="bg-layer-black absolute top-[32%] left-[-10%] w-[150%] h-[50%] bg-[#111111] rotate-[-6deg] opacity-[0.5]" />
      </div>

      {/* HERO TOP SECTION */}
      <div className="relative w-full flex flex-col lg:flex-row flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-24 lg:pt-20 xl:pt-24 pb-4 sm:pb-6 md:pb-8 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">

        {/* LEFT TAGLINE */}
        <div
          ref={leftRailRef}
          className="
            select-none
            flex flex-col justify-center items-center lg:items-start
            w-full lg:w-[45%] xl:w-[40%]
            text-center lg:text-left
            order-1 lg:order-1
          "
        >
          <div className="w-full max-w-[90%] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]">
            {taglineLines.map((line, i) => (
              <div
                key={line}
                className="slot-line font-extrabold leading-[0.86]"
                style={{
                  fontSize: "clamp(2.5rem, 8vw + 0.5rem, 5.4rem)",
                  color: i % 2 === 0 ? "#F9B000" : "#FFFFFF",
                  marginBottom: i === taglineLines.length - 1 ? 0 : "-0.08em",
                }}
              >
                {splitToSpans(line)}
              </div>
            ))}
          </div>

          {/* Scroll arrow */}
          <div
            ref={arrowRef}
            className="mt-4 sm:mt-6 md:mt-8 hidden lg:flex items-center gap-3 opacity-70"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
              <Image src="/logo.png" alt="scroll" fill className="object-contain" />
            </div>
            <p className="text-white/70 uppercase tracking-[0.22em] text-xs sm:text-sm">
              Scroll Down
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="
          relative 
          flex items-center justify-center lg:justify-end 
          w-full lg:w-[55%] xl:w-[60%]
          order-2 lg:order-2
        ">
          <div
            ref={imageRef}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              else if (e.key === "ArrowRight") next();
            }}
            className="
              relative rounded-2xl sm:rounded-3xl overflow-hidden 
              shadow-[0_0_30px_#0006] sm:shadow-[0_0_40px_#0008]
              w-[90%] sm:w-[85%] md:w-[80%] lg:w-[85%] xl:w-[75%]
              max-w-[700px]
            "
            style={{
              height: "clamp(280px, 45vh, 480px)",
              maxHeight: "50vh",
            }}
          >
            {images.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 bg-center bg-cover transition-opacity duration-[900ms] rounded-2xl sm:rounded-3xl"
                style={{
                  backgroundImage: `url('${src}')`,
                  opacity: index === i ? 1 : 0,
                  transitionTimingFunction: "ease-in-out",
                  borderRadius: "inherit",
                  willChange: "opacity",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
              />
            ))}

            {/* Navigation arrows - hidden on touch devices */}
            <button
              onClick={() => prev()}
              aria-label="Previous"
              className="
                hidden sm:flex 
                absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 
                w-8 h-8 sm:w-10 sm:h-10 
                rounded-full bg-black/40 hover:bg-black/60 
                items-center justify-center text-white
                transition-all duration-200
              "
            >
              <svg viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => next()}
              aria-label="Next"
              className="
                hidden sm:flex 
                absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 
                w-8 h-8 sm:w-10 sm:h-10 
                rounded-full bg-black/40 hover:bg-black/60 
                items-center justify-center text-white
                transition-all duration-200
              "
            >
              <svg viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile swipe indicators */}
            <div className="flex sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 gap-1.5 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goto(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${index === i ? 'bg-white w-6' : 'bg-white/50'}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CODEKRAFTERS TEXT */}
      <div className="
        w-full bg-black 
        flex flex-col justify-center items-center lg:items-end
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
        py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8
        text-center lg:text-right
        flex-shrink-0
        min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] xl:min-h-[200px]
      ">
        <div className="w-full flex flex-col items-center lg:items-end">
          <p
            className="mb-1 sm:mb-1.5 md:mb-2"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(11px, 2vw + 0.2rem, 18px)",
              letterSpacing: "clamp(0.1em, 0.4vw, 0.14em)",
              fontWeight: 600,
            }}
          >
            SRMIST RAMAPURAM
          </p>

          <h1
            ref={codekraftersRef}
            className="font-black leading-[0.9] cursor-pointer select-none"
            style={{
              color: "#F9B000",
              fontSize: "clamp(1.75rem, 8vw + 0.3rem, 6.5rem)",
              letterSpacing: "-0.01em",
              display: "inline-block",
              wordBreak: "keep-all",
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