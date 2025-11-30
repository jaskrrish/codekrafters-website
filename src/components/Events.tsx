'use client';

import React from "react";
import { Russo_One, Montserrat } from 'next/font/google';

const russoOne = Russo_One({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["800", "900"] });

function Card({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative group mx-2 sm:mx-3 md:mx-4 flex-shrink-0">
      <img
        src={src || "/placeholder.svg"}
        alt={label}
        loading="lazy"
        className="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 w-auto rounded-lg sm:rounded-xl transition-transform duration-300 group-hover:scale-95"
      />

      <div className="absolute inset-0 bg-black/60 rounded-lg sm:rounded-xl opacity-0 
        group-hover:opacity-100 transition-opacity duration-300 
        flex items-center justify-center pointer-events-none">
        <span className="text-white text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-center px-2">
          {label}
        </span>
      </div>
    </div>
  );
}

function EventRow({
  images,
  folder,
  label,
  reverse = false,
}: {
  images: string[];
  folder: string;
  label: string;
  reverse?: boolean;
}) {
  const doubled = [...images, ...images];

  return (
    <section className="w-full overflow-hidden py-4 sm:py-6 md:py-8">
      <div className={`scroll-row ${reverse ? "reverse" : ""}`}>
        {doubled.map((img, i) => (
          <Card key={`${folder}-${i}`} src={`/${folder}/${img}`} label={label} />
        ))}
      </div>

      <style jsx>{`
        .scroll-row {
          display: flex;
          width: max-content;     
          animation: scrollX 25s linear infinite;
        }

        .scroll-row.reverse {
          animation-direction: reverse;
        }

        .scroll-row:hover {
          animation-play-state: paused;
        }
        @keyframes scrollX {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

export default function EventSection() {
  const launchpadImages = [
    "launchpad-001.jpg",
    "launchpad-002.jpg",
    "launchpad-003.png",
    "launchpad-004.jpg",
    "launchpad-005.jpg",
    "launchpad-006.jpg",
    "launchpad-007.jpg",
    "launchpad-008.jpg",
    "launchpad-009.jpg",
    "launchpad-010.jpg",
  ];

  const hackverseImages = [
    "hackverse-001.jpg",
    "hackverse-002.jpg",
    "hackverse-003.jpg",
    "hackverse-004.jpg",
    "hackverse-005.jpg",
    "hackverse-006.jpg",
    "hackverse-007.jpg",
    "hackverse-008.jpg",
    "hackverse-009.jpg",
    "hackverse-010.jpg",
  ];

  const qonneqtImages = [
    "qonneqt-001.jpg",
    "qonneqt-002.jpg",
    "qonneqt-003.jpg",
    "qonneqt-004.jpg",
    "qonneqt-005.jpg",
    "qonneqt-006.png",
    "qonneqt-007.jpg",
    "qonneqt-008.jpg",
  ];

  const otherEventsImages = [
    "otherevents-001.png",
    "otherevents-002.png",
    "otherevents-003.png",
    "otherevents-004.png",
    "otherevents-005.png",
    "otherevents-006.png",
  ];

  return (
    <div className="w-full bg-[#FFEFB4] overflow-x-hidden">
      {/* Row 1 - Left Scroll */}
      <EventRow
        images={launchpadImages}
        folder="launchpad"
        label="Launchpad 2.0"
      />

      {/* Row 2 - Right Scroll */}
      <EventRow
        images={hackverseImages}
        folder="hackverse"
        label="Hackverse 2025"
        reverse
      />

      {/* Title */}
      <div className="text-center py-8 sm:py-12 md:py-16 px-4">
        <h2 className={`${russoOne.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight`}>
          <span className="text-[#0b1220]">CODE</span>
          <span className="text-[#F2B200]">KRAFTERS </span>
        </h2>
        <h2 className={`${russoOne.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight`}>
          <span className="text-[#0b1220]">EVENTS</span>
        </h2>
      </div>

      {/* Row 3 - Left Scroll */}
      <EventRow
        images={qonneqtImages}
        folder="Qonneqt"
        label="Builder's Qonneqt"
      />

      {/* Row 4 - Right Scroll */}
      <EventRow
        images={otherEventsImages}
        folder="otherevents"
        label="Other Events"
        reverse
      />
    </div>
  );
}