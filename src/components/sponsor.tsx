"use client";

import Image from "next/image";
import type React from "react";
import { useMemo } from "react";

interface CompanyLogo {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
}

const SponsorsComponent: React.FC = () => {
  const companies = useMemo<CompanyLogo[]>(
    () => [
      { id: 1, name: "Coinex", imageUrl: "/sponsor/coin.png", alt: "Coinex Logo" },
      { id: 2, name: "Devfolio", imageUrl: "/sponsor/devfolios.png", alt: "Devfolio Logo" },
      { id: 3, name: "Edu Chain", imageUrl: "/sponsor/educhains.png", alt: "Edu Chain Logo" },
      { id: 4, name: "ETHIndia", imageUrl: "/sponsor/ethin.png", alt: "ETHIndia Logo" },
      { id: 5, name: "Kana Labs", imageUrl: "/sponsor/kanas.png", alt: "Kana Labs Logo" },
      { id: 6, name: "Kanini", imageUrl: "/sponsor/kaninis.png", alt: "Kanini Logo" },
      { id: 7, name: "Polygon", imageUrl: "/sponsor/polygons.png", alt: "Polygon Logo" },
      { id: 8, name: "Qoneqt", imageUrl: "/sponsor/q.png", alt: "Qoneqt Logo" },
      { id: 9, name: "Aptos", imageUrl: "/sponsor/aptoss.png", alt: "Aptos Logo" },
      { id: 10, name: "ICP", imageUrl: "/sponsor/icpss.png", alt: "ICP Logo" },
      { id: 11, name: "Risein", imageUrl: "/sponsor/riseins.png", alt: "Risein Logo" },
      { id: 12, name: "PNB Metlife", imageUrl: "/sponsor/pnb.png", alt: "PNB Metlife Logo" },
    ],
    []
  );

  const column1 = companies.slice(0, 4);
  const column2 = companies.slice(4, 8);
  const column3 = companies.slice(8, 12);

  const renderLogoCard = (company: CompanyLogo) => (
  <div
    key={company.id}
    className="sponsor-card flex-shrink-0 bg-white/90 rounded-2xl overflow-hidden border-2 border-gray-800/20 group relative"
    style={{
      width: "clamp(220px, 70vw, 320px)",
      height: "clamp(160px, 45vw, 240px)",
      background: "linear-gradient(135deg, #FFEFB3 0%, #FFDA4D 100%)",
    }}
  >
    <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4">
      <Image
        src={company.imageUrl}
        alt={company.alt}
        fill
        sizes="(max-width: 768px) 220px, 320px"
        className="object-contain p-4 sm:p-8 drop-shadow-lg"
      />
    </div>

    {/* Desktop hover overlay */}
    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-8 pointer-events-none">
      <span className="text-white text-2xl font-bold tracking-wider">
        {company.name}
      </span>
    </div>
  </div>
);


  return (
    <div
      className="flex flex-col items-center justify-center relative py-20"
      style={{ backgroundColor: "#FFEFB3" }}
    >
      {/* HEADER */}
      <div className="text-center mb-16 px-4 z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          <span className="text-[#0b1220]">LOVED BY</span>{" "}
          <span className="text-[#F2B200]">SPONSORS</span>
        </h2>
        <p className="text-[#0b1220]/70 text-sm md:text-base max-w-2xl mx-auto tracking-wide">
          Creators worldwide trust our community for their innovation needs
        </p>
      </div>

      {/* DESKTOP – unchanged */}
      <div className="hidden md:block w-full overflow-hidden relative">
        <div className="flex gap-3 px-6 max-w-[1100px] mx-auto">
          {[column1, column2, column3].map((col, idx) => (
            <div key={idx} className="flex-1 overflow-hidden relative" style={{ height: "700px" }}>
              <div className={idx === 1 ? "scroll-column-up" : "scroll-column-down"}>
                {[...col, ...col, ...col].map((c, i) => (
                  <div key={`${idx}-${c.id}-${i}`} className="mb-6">
                    {renderLogoCard(c)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FFEFB4] to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFEFB4] to-transparent pointer-events-none z-10"></div>
      </div>

      {/* MOBILE – 3 ROW HORIZONTAL + EDGE FADES */}
      <div className="block md:hidden w-full overflow-hidden relative mt-8 space-y-6">
        {/* LEFT FADE */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#FFEFB4] to-transparent pointer-events-none z-10" />
        {/* RIGHT FADE */}
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#FFEFB4] to-transparent pointer-events-none z-10" />

        <div className="horizontal-row">
          {[...column1, ...column1, ...column1].map((c, i) => (
            <div key={`m1-${c.id}-${i}`} className="mx-3">
              {renderLogoCard(c)}
            </div>
          ))}
        </div>

        <div className="horizontal-row-reverse">
          {[...column2, ...column2, ...column2].map((c, i) => (
            <div key={`m2-${c.id}-${i}`} className="mx-3">
              {renderLogoCard(c)}
            </div>
          ))}
        </div>

        <div className="horizontal-row">
          {[...column3, ...column3, ...column3].map((c, i) => (
            <div key={`m3-${c.id}-${i}`} className="mx-3">
              {renderLogoCard(c)}
            </div>
          ))}
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#FFEFB4] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#FFEFB4] to-transparent pointer-events-none"></div>
      </div>

      <style jsx>{`
        .scroll-column-down {
          display: flex;
          flex-direction: column;
          animation: scrollDown 40s linear infinite;
        }
        .scroll-column-up {
          display: flex;
          flex-direction: column;
          animation: scrollUp 40s linear infinite;
        }

        @keyframes scrollDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
        @keyframes scrollUp {
          0% { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
        }

        /* MOBILE horizontal rows */
        .horizontal-row,
        .horizontal-row-reverse {
          display: flex;
          width: max-content;
        }
        .horizontal-row {
          animation: scrollX 28s linear infinite;
        }
        .horizontal-row-reverse {
          animation: scrollXReverse 28s linear infinite;
        }

        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollXReverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .sponsor-card {
            width: 220px !important;
            height: 160px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorsComponent;
