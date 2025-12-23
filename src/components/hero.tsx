"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLDivElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const leftRailRef = useRef<HTMLDivElement | null>(null)
  const codekraftersRef = useRef<HTMLHeadingElement | null>(null)
  const milestonesRef = useRef<HTMLDivElement | null>(null)

  const taglineLines = useMemo(() => ["IT'S", "MORE THAN", "A CLUB"], [])

  const milestones = [
    { value: 7, suffix: "", label: "DOMAINS" },
    { value: 150, suffix: "+", label: "MEMBERS" },
    { value: 10, suffix: "+", label: "EVENTS" },
  ]

  const [counters, setCounters] = useState(milestones.map(() => 0))

  const splitToSpans = (text: string) =>
    text.split("").map((ch, idx) => (
      <span
        key={`${text}-${idx}`}
        className="slot-char inline-block will-change-transform"
        style={{ display: "inline-block" }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ))

  const images = [
    "/group/group4.jpg",
    "/group/group3.jpg",
    "/group/group2.jpg",
    "/group/group1.jpg",
  ]

  const [index, setIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 4000)
  }

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const goto = (n: number) => {
    setIndex(((n % images.length) + images.length) % images.length)
    startInterval()
  }
  const next = () => goto(index + 1)
  const prev = () => goto(index - 1)

  /* IMAGE breathing + hover tilt */
  useEffect(() => {
    const img = imageRef.current
    if (!img) return

    gsap.to(img, {
      keyframes: [
        { y: -6, rotate: 0.3, duration: 2.2 },
        { y: 0, rotate: 0, duration: 2.2 },
      ],
      repeat: -1,
      ease: "sine.inOut",
    })

    const enter = () =>
      gsap.to(img, {
        scale: 1.03,
        rotate: 0.7,
        duration: 0.3,
        ease: "power2.out",
      })

    const leave = () =>
      gsap.to(img, { scale: 1, rotate: 0, duration: 0.4 })

    img.addEventListener("mouseenter", enter)
    img.addEventListener("mouseleave", leave)

    return () => {
      img.removeEventListener("mouseenter", enter)
      img.removeEventListener("mouseleave", leave)
    }
  }, [])

  /* TAGLINE slot animation */
  useEffect(() => {
    if (!leftRailRef.current) return

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLDivElement>(".slot-line")

      lines.forEach((line, lineIndex) => {
        const chars = line.querySelectorAll<HTMLSpanElement>(".slot-char")

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
            },
          )
        })
      })

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 10,
          opacity: 0.35,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }, leftRailRef)

    return () => ctx.revert()
  }, [])

  /* MILESTONE counters */
  useEffect(() => {
    if (!milestonesRef.current) return

    const ctx = gsap.context(() => {
      milestones.forEach((milestone, idx) => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: milestone.value,
          duration: 2,
          delay: 0.8 + idx * 0.2,
          ease: "power2.out",
          onUpdate: () => {
            setCounters((prev) => {
              const next = [...prev]
              next[idx] = Math.round(obj.val)
              return next
            })
          },
        })
      })
    }, milestonesRef)

    return () => ctx.revert()
  }, [])

  /* BACKGROUND rotation on scroll */
  useEffect(() => {
    const yellow = document.querySelector(".bg-layer-yellow")
    const black = document.querySelector(".bg-layer-black")

    if (!yellow || !black) return

    gsap.to(yellow, {
      rotation: -8,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    gsap.to(black, {
      rotation: 8,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
  }, [])

  /* CODEKRAFTERS hover */
  useEffect(() => {
    const heading = codekraftersRef.current
    if (!heading) return

    const chars = heading.querySelectorAll(".char")

    const enter = () =>
      gsap.to(chars, {
        y: -15,
        rotation: gsap.utils.random(-10, 10, 1, true),
        color: "#FFFFFF",
        stagger: { each: 0.05, from: "center" },
        ease: "back.out(2)",
        duration: 0.4,
      })

    const leave = () =>
      gsap.to(chars, {
        y: 0,
        rotation: 0,
        color: "#F9B000",
        stagger: { each: 0.03, from: "edges" },
        ease: "back.in(1.5)",
        duration: 0.5,
      })

    heading.addEventListener("mouseenter", enter)
    heading.addEventListener("mouseleave", leave)

    return () => {
      heading.removeEventListener("mouseenter", enter)
      heading.removeEventListener("mouseleave", leave)
    }
  }, [])

  return (
    <section
      id="home"
      className="w-full relative overflow-hidden"
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-layer-yellow absolute top-[-18%] left-[-10%] w-[140%] h-[58%] bg-[#F9B000] rotate-[5deg] opacity-[0.15]" />
        <div className="bg-layer-black absolute top-[32%] left-[-10%] w-[150%] h-[50%] bg-[#111111] rotate-[-6deg] opacity-[0.45]" />
      </div>      {/* MAIN */}
      <div className="relative flex flex-col lg:flex-row flex-1 px-6 pt-35 lg:pt-20 gap-8">
        {/* LEFT */}
        <div
          ref={leftRailRef}
          className="flex flex-col justify-start md:justify-center items-center lg:items-start w-full lg:w-[45%] text-center lg:text-left"
        >
          <div className="max-w-[600px]">
            {taglineLines.map((line, i) => (
              <div
                key={line}
                className="slot-line font-extrabold leading-[0.86]"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  color: i % 2 === 0 ? "#F9B000" : "#FFFFFF",
                }}
              >
                {splitToSpans(line)}
              </div>
            ))}
          </div>

          {/* MILESTONES - Desktop only */}
          <div
            ref={milestonesRef}
            className="hidden lg:grid grid-cols-3 gap-6 mt-10 max-w-[600px]"
          >
            {milestones.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-[#F9B000] font-black text-6xl">
                  {counters[i]}
                  {m.suffix}
                </div>
                <div className="text-white/70 tracking-widest text-s mt-2">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div ref={arrowRef} className="hidden lg:flex items-center gap-2 mt-8">
            <Image src="/logo.png" alt="scroll" width={28} height={28} />
            <span className="text-white/70 tracking-widest text-xs">
              SCROLL DOWN
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center items-center lg:ml-10 w-full lg:w-[55%]">
          <div
            ref={imageRef}
            className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_#000a] w-[90%] sm:w-[85%] lg:w-[72%] max-w-[560px]"
            style={{ height: "clamp(260px, 38vh, 440px)" }}
          >
            {images.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{
                  backgroundImage: `url('${src}')`,
                  opacity: index === i ? 1 : 0,
                }}
              />
            ))}

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 rounded-full w-9 h-9 flex items-center justify-center text-white"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 rounded-full w-9 h-9 flex items-center justify-center text-white"
            >
              ›
            </button>
          </div>

          {/* MILESTONES - Mobile/Tablet only (below image) */}
          <div className="grid grid-cols-3 gap-6 mt-8 lg:hidden w-full max-w-[560px]">
            {milestones.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-[#F9B000] font-black text-4xl sm:text-5xl">
                  {counters[i]}
                  {m.suffix}
                </div>
                <div className="text-white/70 tracking-widest text-xs sm:text-sm mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="w-full bg-black py-6 px-6 flex flex-col items-center lg:items-end">
        <p className="text-white/80 tracking-widest text-sm">
          SRMIST RAMAPURAM
        </p>

        <h1
          ref={codekraftersRef}
          className="font-black text-[#F9B000]"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
        >
          {"CODEKRAFTERS".split("").map((c, i) => (
            <span key={i} className="char inline-block">
              {c}
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}

export default Hero