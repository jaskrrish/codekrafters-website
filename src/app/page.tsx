"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

import { Navbar } from "@/components/navbar";
import StoryComponent from "@/components/Story";
import EventSection from "@/components/Events";
import TeamSection from "@/components/team-section";
import SponsorsComponent from "@/components/sponsor";
import Footer from "@/components/Footer";

export default function Home() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const ckTextRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const img = imageRef.current;
    const text = ckTextRef.current;

    if (!img || !text) return;

    // ============================
    // STATIC BREATHING ANIMATION (IMAGE)
    // ============================
    gsap.to(img, {
      scale: 1.03,
      y: -8,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // ============================
    // IMAGE HOVER BEAT PULSE
    // ============================
    img.addEventListener("mouseenter", () => {
      gsap.fromTo(
        img,
        { scale: 1.03 },
        {
          scale: 1.09,
          duration: 0.25,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    });

    // ============================
    // LETTER HOVER PULSE
    // ============================
    const letters = text.querySelectorAll(".ck-letter");

    text.addEventListener("mouseenter", () => {
      gsap.fromTo(
        letters,
        { scale: 1, y: 0 },
        {
          scale: 1.18,
          y: -6,
          duration: 0.23,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          stagger: 0.03,
        }
      );
    });
  }, []);

  return (
    <main
      className="min-h-screen bg-background"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <Navbar />

      {/* ================= HERO SECTION ================= */}
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
        {/* ======== CK BACKGROUND PLANES ======== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-18%] left-[-10%] w-[140%] h-[58%] bg-[#F9B000] rotate-[5deg] opacity-[0.18]" />
          <div className="absolute top-[32%] left-[-10%] w-[150%] h-[50%] bg-[#111111] rotate-[-6deg] opacity-[0.5]" />
        </div>

        {/* ================= IMAGE (RIGHT SIDE) ================= */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: "70vh", justifyContent: "flex-end" }}
        >
          <div
            ref={imageRef}
            className="relative w-[82%] md:w-[60%] lg:w-[45%] h-[70%] mr-10 mt-10 rounded-3xl overflow-hidden shadow-[0_0_40px_#0008]"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/ck-core.jpg"
              alt="CK Group"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* ================= LOWER TEXT BAND ================= */}
        <div
          className="w-full bg-black relative"
          style={{
            height: "30vh",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            overflow: "hidden",
          }}
        >
          {/* Top-right text */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "0.9rem",
            }}
          >
            <div style={{ width: "100%", textAlign: "right", paddingRight: "1vw" }}>
              <div
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "clamp(20px, 1vw, 20px)",
                  letterSpacing: "0.16em",
                  marginBottom: 1,
                  fontWeight: 600,
                }}
              >
                SRM RAMAPURAM
              </div>

              {/* ================= SPLIT LETTER TITLE ================= */}
              <h1
                ref={ckTextRef}
                style={{
                  color: "#F9B000",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                  lineHeight: 0.88,
                  margin: 0,
                  textAlign: "right",
                  transform: "translateY(8%)",
                  letterSpacing: "-0.02em",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                {"CODEKRAFTERS".split("").map((letter, i) => (
                  <span
                    key={i}
                    className="ck-letter inline-block"
                    style={{
                      display: "inline-block",
                      transformOrigin: "center bottom",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          {/* Bottom-left text */}
          <div
            style={{
              paddingLeft: "4vw",
              paddingRight: "4vw",
              paddingTop: "6.5rem",
              paddingBottom: "2.5rem",
              color: "rgba(255,255,255,0.95)",
              maxWidth: "1200px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                fontWeight: 700,
              }}
            >
              (Text area — replace this with your copy)
            </h2>
            <p style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.6 }}>
              This region remains the same as your original design.
            </p>
          </div>
        </div>
      </section>

      {/* REST OF PAGE */}
      <div id="story" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <StoryComponent />
      </div>

      <div id="events" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <EventSection />
      </div>

      <div id="team" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <TeamSection />
      </div>

      <div id="sponsors" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <SponsorsComponent />
      </div>

      <div id="contact" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <Footer />
      </div>
    </main>
  );
}
