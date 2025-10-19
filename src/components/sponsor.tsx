"use client"

import Image from "next/image"
import type React from "react"
import { useMemo } from "react"

interface CompanyLogo {
  id: number
  name: string
  imageUrl: string
  alt: string
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
      }
    ],
    [],
  )

  const headerText = useMemo(
    () => "WE PARTNER WITH VISIONARY DEVELOPERS AND PUBLISHERS TO LAUNCH THE NEXT GENERATION OF INNOVATIVE IDEAS",
    [],
  )

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, companyName: string) => {
    const img = e.currentTarget
    const container = img.closest('.image-container')
    if (container) {
      container.innerHTML = `
        <div class="w-full h-full flex items-center justify-center bg-gray-800/50 rounded border border-gray-600">
          <span class="text-xs text-gray-300 text-center px-2 font-medium">${companyName}</span>
        </div>
      `
    }
  }

  return (
    <div className="min-h-screen text-black flex items-center justify-center relative" style={{ backgroundColor: '#FFEFB3' }}>
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-xs md:text-sm lg:text-base font-bold tracking-[0.2em] leading-relaxed max-w-4xl mx-auto text-black">
            {headerText}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group relative border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              style={{
                backgroundColor: '#FFDA4D',
                width: '100%',
                maxWidth: '180px',
                aspectRatio: '16/9',
                margin: '0 auto'
              }}
            >
              <div className="image-container absolute inset-2 flex items-center justify-center p-2 rounded-lg">
                <Image
                  src={company.imageUrl}
                  alt={company.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className={`filter brightness-75 group-hover:brightness-100 transition-all duration-300 ${
                    company.id === 1
                      ? 'object-contain p-4'
                      : company.id === 8
                      ? 'object-contain p-2 md:p-8' // Mobile: p-2, Desktop: p-8
                      : company.id === 11
                      ? 'object-contain p-2 md:p-4' // Mobile: p-2, Desktop: p-4  
                      : 'object-contain p-4'
                  }`}
                  onError={(e) => handleImageError(e, company.name)}
                  priority={company.id <= 8} // Prioritize first 8 images
                />
              </div>

              {/* Enhanced overlay with solid black background and white text */}
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center rounded-lg z-10">
                <span className="text-base md:text-lg font-bold text-white text-center px-4 tracking-wider transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {company.name}
                </span>
              </div>

              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SponsorsComponent