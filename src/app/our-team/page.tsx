"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PaperTearPage() {
  const container = useRef<HTMLDivElement>(null);
  const leftHalf = useRef<HTMLDivElement>(null);
  const rightHalf = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);

  const divisions = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: `Division ${i + 1}`,
    quote: "This is placeholder content.",
    members: ["John", "Jane", "Someone"],
  }));

  useLayoutEffect(() => {
    let current = 0;

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=3000",
      scrub: true,
      onUpdate(self) {
        const newIndex = Math.floor(self.progress * divisions.length);

        if (newIndex !== current) {
          current = newIndex;
          tearEffect(() => {
            setIndex(current % divisions.length);
          });
        }
      },
    });
  }, []);

  function tearEffect(onHalfway: () => void) {
    const tl = gsap.timeline();

    // Tear open: halves move apart, rotate, reveal background
    tl.to(
      leftHalf.current,
      {
        x: "-60vw",
        rotation: -10,
        duration: 0.35,
        ease: "power2.in",
      },
      0
    );
    tl.to(
      rightHalf.current,
      {
        x: "60vw",
        rotation: 10,
        duration: 0.35,
        ease: "power2.in",
      },
      0
    );

    // Halfway point → change card content
    tl.add(() => onHalfway(), "-=0.1");

    // Snap back new card halves together
    tl.to(
      [leftHalf.current, rightHalf.current],
      {
        x: "0vw",
        rotation: 0,
        duration: 0.35,
        ease: "power3.out",
      },
      "+=0.1"
    );
  }

  const card = divisions[index];

  return (
    <div ref={container} className="w-full h-[400vh] bg-black text-white">
      {/* CENTERED CARD */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* LEFT TEAR HALF */}
        <div
          ref={leftHalf}
          className="
            w-[45%] md:w-[45%] h-[35vh] md:h-[70vh] 
            bg-zinc-900 border-r border-white/20
            rounded-l-3xl p-4 md:p-10 
            flex flex-col justify-center
            absolute left-[2.5%] md:left-[5%] top-[20%] md:top-[15%]
          "
          style={{ transformOrigin: "right center" }}
        >
          <h1 className="text-2xl md:text-4xl font-bold">{card.title}</h1>
          <p className="opacity-60 mt-2 md:mt-3 text-sm md:text-base">{card.quote}</p>
        </div>

        {/* RIGHT TEAR HALF */}
        <div
          ref={rightHalf}
          className="
            w-[45%] md:w-[45%] h-[35vh] md:h-[70vh]
            bg-zinc-900 border-l border-white/20
            rounded-r-3xl p-4 md:p-10 
            flex flex-col justify-center
            absolute right-[2.5%] md:right-[5%] top-[20%] md:top-[15%]
          "
          style={{ transformOrigin: "left center" }}
        >
          <h2 className="text-lg md:text-2xl mb-2 md:mb-4">Members</h2>
          <ul className="opacity-70 text-sm md:text-lg space-y-1 md:space-y-2">
            {card.members.map((m, i) => (
              <li key={i}>• {m}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-white/50 mt-10 text-sm md:text-base px-4">Scroll to tear the page</p>
    </div>
  );
}