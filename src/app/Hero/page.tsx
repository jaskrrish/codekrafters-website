"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { scale: 1, rotate: 0, y: 0 },
      {
        scale: 1.35,
        rotate: 4,
        y: -60,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top top",
          end: "bottom+=450 top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
      
      {/* BACKGROUND ANGLED SHAPES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[140%] h-[55%] bg-[#e2d9c7] rotate-[4deg]" />
        <div className="absolute top-[35%] left-[-10%] w-[140%] h-[60%] bg-[#776BF5] rotate-[-6deg]" />
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 w-full max-w-7xl px-6">
        
        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col items-center text-center pt-20 pb-10 space-y-8">
          {/* HEADING */}
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Step into the <br /> Spotlight
          </h1>
          
          {/* IMAGE */}
          <div
            ref={imgRef}
            className="relative w-[85%] h-[280px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/ck-core.jpg"
              fill
              alt="CodeKrafters"
              className="object-cover"
            />
          </div>
          
          {/* TEXT BLOCKS */}
          <p className="text-gray-200 max-w-sm px-4">
            Where ideas meet execution.  
            Where students turn into creators.  
            Where CodeKrafters rise.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-200 max-w-sm px-4">
            We build experiences, events, products and memories  
            that elevate ambition and spark creativity across campus.
          </p>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center pt-40">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Step into the <br /> Spotlight
            </h1>
            <p className="mt-4 text-gray-200 max-w-sm">
              Where ideas meet execution.  
              Where students turn into creators.  
              Where CodeKrafters rise.
            </p>
          </div>

          {/* CENTER HERO IMAGE */}
          <div className="flex items-center justify-center">
            <div
              ref={imgRef}
              className="relative w-[110%] h-[380px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/ck-core.jpg"
                fill
                alt="CodeKrafters"
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="flex flex-col justify-center pt-40 text-gray-200">
            <p className="text-lg leading-relaxed max-w-xs">
              We build experiences, events, products and memories  
              that elevate ambition and spark creativity across campus.
            </p>
          </div>
        </div>
      </div>

      {/* MASSIVE TYPOGRAPHY */}
      <div className="absolute bottom-[-2%] left-0 w-full text-center pointer-events-none">
        <h1 className="text-[22vw] font-black tracking-tight text-[#ffffff14] leading-none">
          CODEKRAFTERS
        </h1>
      </div>
    </section>
  );
}