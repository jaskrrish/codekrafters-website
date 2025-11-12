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

  const column1 = companies.slice(0, 4);
  const column2 = companies.slice(4, 8);
  const column3 = companies.slice(8, 12);

  const allCompanies = [...companies];

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

  const renderLogoCard = (company: CompanyLogo) => (
    <div
      key={company.id}
      className="sponsor-card flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-gray-800/20 hover:border-[#F2B200] transition-all duration-300 hover:shadow-2xl hover:shadow-[#F2B200]/30 group mb-6 relative"
      style={{
        width: "320px",
        height: "240px",
        background: "linear-gradient(135deg, #FFEFB3 0%, #FFDA4D 100%)",
      }}
    >
      <div className="image-container relative w-full h-full flex items-center justify-center p-4">
        <Image
          src={company.imageUrl}
          alt={company.alt}
          fill
          sizes="320px"
          className={`filter brightness-100 group-hover:brightness-110 transition-all duration-500 drop-shadow-lg ${
            company.id === 1
              ? "object-contain p-8"
              : company.id === 8
              ? "object-contain p-10"
              : company.id === 11
              ? "object-contain p-6"
              : "object-contain p-8"
          }`}
          onError={(e) => handleImageError(e, company.name)}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 pointer-events-none">
        <span className="text-white text-2xl font-bold tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
          {company.name}
        </span>
      </div>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F2B200]/30 via-[#FFDA4D]/20 to-[#F2B200]/30 blur-xl"></div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative py-20"
      style={{ backgroundColor: "#FFEFB3" }}
    >
      <div className="text-center mb-16 px-4 z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          <span className="text-[#0b1220]">LOVED BY</span>{" "}
          <span className="text-[#F2B200]">SPONSORS</span>
        </h2>
        <p className="text-[#0b1220]/70 text-sm md:text-base max-w-2xl mx-auto tracking-wide">
          Creators worldwide trust our community for their innovation needs
        </p>
      </div>

      <div className="w-full overflow-hidden relative">
        <div className="flex gap-3 px-6 max-w-[1100px] mx-auto">
          <div
            className="flex-1 overflow-hidden relative"
            style={{ height: "700px" }}
          >
            <div className="scroll-column-down">
              {[...column1, ...column1, ...column1].map((company, idx) => (
                <div key={`col1-${company.id}-${idx}`}>
                  {renderLogoCard(company)}
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex-1 overflow-hidden relative"
            style={{ height: "700px" }}
          >
            <div className="scroll-column-up">
              {[...column2, ...column2, ...column2].map((company, idx) => (
                <div key={`col2-${company.id}-${idx}`}>
                  {renderLogoCard(company)}
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex-1 overflow-hidden relative"
            style={{ height: "700px" }}
          >
            <div className="scroll-column-down">
              {[...column3, ...column3, ...column3].map((company, idx) => (
                <div key={`col3-${company.id}-${idx}`}>
                  {renderLogoCard(company)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FFEFB4] to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFEFB4] to-transparent pointer-events-none z-10"></div>
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

        .scroll-column-down:hover,
        .scroll-column-up:hover {
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

        /* Responsive styles */
        @media (max-width: 1024px) {
          .scroll-column-down,
          .scroll-column-up {
            animation-duration: 30s;
          }
        }

        @media (max-width: 768px) {
          .flex.gap-3 {
            gap: 0.75rem;
          }

          .sponsor-card {
            width: 220px !important;
            height: 160px !important;
          }
        }

        @media (max-width: 640px) {
          .flex.gap-3 {
            flex-direction: column;
            align-items: center;
          }

          .flex-1 {
            width: 100%;
            max-width: 340px;
            height: 450px !important;
          }

          .sponsor-card {
            width: 280px !important;
            height: 200px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorsComponent;
