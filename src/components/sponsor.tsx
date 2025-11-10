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
      {
        id: 1,
        name: "Coinex",
        imageUrl: "/sponsor/coin.png",
        alt: "Coinex Logo",
      },
      {
        id: 2,
        name: "Devfolio",
        imageUrl: "/sponsor/devfolios.png",
        alt: "Devfolio Logo",
      },
      {
        id: 3,
        name: "Edu Chain",
        imageUrl: "/sponsor/educhains.png",
        alt: "Edu Chain Logo",
      },
      {
        id: 4,
        name: "ETHIndia",
        imageUrl: "/sponsor/ethin.png",
        alt: "ETHIndia Logo",
      },
      {
        id: 5,
        name: "Kana Labs",
        imageUrl: "/sponsor/kanas.png",
        alt: "Kana Labs Logo",
      },
      {
        id: 6,
        name: "Kanini",
        imageUrl: "/sponsor/kaninis.png",
        alt: "Kanini Logo",
      },
      {
        id: 7,
        name: "Polygon",
        imageUrl: "/sponsor/polygons.png",
        alt: "Polygon Logo",
      },
      {
        id: 8,
        name: "Qoneqt",
        imageUrl: "/sponsor/q.png",
        alt: "Qoneqt Logo",
      },
      {
        id: 9,
        name: "Aptos",
        imageUrl: "/sponsor/aptoss.png",
        alt: "Aptos Logo",
      },
      {
        id: 10,
        name: "ICP",
        imageUrl: "/sponsor/icpss.png",
        alt: "ICP Logo",
      },
      {
        id: 11,
        name: "Risein",
        imageUrl: "/sponsor/riseins.png",
        alt: "Risein Logo",
      },
      {
        id: 12,
        name: "PNB Metlife",
        imageUrl: "/sponsor/pnb.png",
        alt: "PNB Metlife Logo",
      },
    ],
    []
  );

  // Split companies into 3 columns (4 companies each)
  const column1 = companies.slice(0, 4);
  const column2 = companies.slice(4, 8);
  const column3 = companies.slice(8, 12);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    companyName: string
  ) => {
    const img = e.currentTarget;
    const container = img.closest(".image-container");
    if (container) {
      container.innerHTML = `
        <div class="w-full h-full flex items-center justify-center bg-gray-800/50 rounded border border-gray-600">
          <span class="text-sm text-gray-300 text-center px-2 font-medium">${companyName}</span>
        </div>
      `;
    }
  };

  const renderLogoCard = (company: CompanyLogo, isMobile: boolean = false) => (
    <div
      key={company.id}
      className="sponsor-card flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-800/20 hover:border-[#F2B200] transition-all duration-300 hover:shadow-2xl hover:shadow-[#F2B200]/30 group mb-4 sm:mb-6 relative"
    >
      <div className="image-container relative w-full h-full flex items-center justify-center">
        <Image
          src={company.imageUrl}
          alt={company.alt}
          width={isMobile ? 200 : 280}
          height={isMobile ? 140 : 200}
          className={`filter brightness-100 group-hover:brightness-110 transition-all duration-500 drop-shadow-lg object-contain ${
            company.id === 1
              ? "p-4 sm:p-6 md:p-8"
              : company.id === 8
              ? "p-6 sm:p-8 md:p-10"
              : company.id === 11
              ? "p-3 sm:p-4 md:p-6"
              : "p-4 sm:p-6 md:p-8"
          }`}
          onError={(e) => handleImageError(e, company.name)}
        />
      </div>

      {/* Company name overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-6 md:pb-8 pointer-events-none">
        <span className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg px-2 text-center">
          {company.name}
        </span>
      </div>

      {/* Colorful glow effect on hover */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F2B200]/30 via-[#FFDA4D]/20 to-[#F2B200]/30 blur-xl"></div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "#FFEFB3" }}
    >
      {/* Header Section */}
      <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4 z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 tracking-tight">
          <span className="text-[#0b1220]">LOVED BY</span>{" "}
          <span className="text-[#F2B200]">SPONSORS</span>
        </h2>
        <p className="text-[#0b1220]/70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto tracking-wide">
          Creators worldwide trust our community for their innovation needs
        </p>
      </div>

      {/* Three Column Infinite Scroll - Desktop & Tablet */}
      <div className="hidden sm:block w-full overflow-hidden relative">
        <div className="flex gap-2 sm:gap-3 px-3 sm:px-6 max-w-[1100px] mx-auto">
          {/* Column 1 - Scroll Down */}
          <div
            className="flex-1 overflow-hidden relative column-container"
          >
            <div className="scroll-column-down">
              {[...column1, ...column1, ...column1].map((company, idx) => (
                <div key={`col1-${company.id}-${idx}`}>
                  {renderLogoCard(company, false)}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Scroll Up */}
          <div
            className="flex-1 overflow-hidden relative column-container"
          >
            <div className="scroll-column-up">
              {[...column2, ...column2, ...column2].map((company, idx) => (
                <div key={`col2-${company.id}-${idx}`}>
                  {renderLogoCard(company, false)}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - Scroll Down */}
          <div
            className="flex-1 overflow-hidden relative column-container"
          >
            <div className="scroll-column-down">
              {[...column3, ...column3, ...column3].map((company, idx) => (
                <div key={`col3-${company.id}-${idx}`}>
                  {renderLogoCard(company, false)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-[#FFEFB3] to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#FFEFB3] to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Single Column Scroll - Mobile Only */}
      <div className="sm:hidden w-full overflow-hidden relative">
        <div className="flex justify-center px-4">
          <div className="overflow-hidden relative" style={{ height: "500px", width: "100%", maxWidth: "300px" }}>
            <div className="scroll-column-down-mobile">
              {[...companies, ...companies, ...companies].map((company, idx) => (
                <div key={`mobile-${company.id}-${idx}`}>
                  {renderLogoCard(company, true)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FFEFB3] to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FFEFB3] to-transparent pointer-events-none z-10"></div>
      </div>

      <style jsx>{`
        /* Desktop/Tablet Columns */
        .column-container {
          height: 550px;
        }

        @media (min-width: 768px) {
          .column-container {
            height: 650px;
          }
        }

        @media (min-width: 1024px) {
          .column-container {
            height: 700px;
          }
        }

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

        .scroll-column-down:hover,
        .scroll-column-up:hover {
          animation-play-state: paused;
        }

        /* Mobile Single Column */
        .scroll-column-down-mobile {
          display: flex;
          flex-direction: column;
          animation: scrollDown 50s linear infinite;
        }

        .scroll-column-down-mobile:active {
          animation-play-state: paused;
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Sponsor Card Responsive Sizes */
        .sponsor-card {
          width: 260px;
          height: 180px;
          background: linear-gradient(135deg, #FFEFB3 0%, #FFDA4D 100%);
        }

        @media (min-width: 640px) {
          .sponsor-card {
            width: 200px;
            height: 150px;
          }
        }

        @media (min-width: 768px) {
          .sponsor-card {
            width: 220px;
            height: 160px;
          }
        }

        @media (min-width: 1024px) {
          .sponsor-card {
            width: 280px;
            height: 200px;
          }
        }

        @media (min-width: 1280px) {
          .sponsor-card {
            width: 320px;
            height: 240px;
          }
        }

        /* Performance optimizations */
        @media (max-width: 640px) {
          .scroll-column-down-mobile {
            will-change: transform;
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorsComponent;