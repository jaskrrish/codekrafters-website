"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0b0b0b] text-white border-t border-[#F2B200]/10">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/3 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#F2B200]/10 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] bg-[#F2B200]/5 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"></div>
      </div>

      {/* <CHANGE> Updated padding to be responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">

        {/* <CHANGE> Updated header section with responsive spacing and text sizes */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-14 relative">
          <div className="flex items-center gap-2 sm:gap-3 group hover:scale-[1.04] transition-transform duration-500">
            <Image
              src="/logo.png"
              alt="CodeKrafters"
              width={60}
              height={60}
              className="h-10 sm:h-12 w-auto drop-shadow-[0_0_20px_rgba(242,178,0,0.35)]"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] sm:tracking-[0.25em] uppercase leading-none select-none">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">CODE</span>
              <span className="text-[#F2B200] drop-shadow-[0_0_10px_rgba(242,178,0,0.6)]">KRAFTERS</span>
            </h1>
          </div>

          <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#F2B200] to-transparent rounded-full blur-[0.5px]" />

          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-lg leading-relaxed font-medium tracking-wide px-2 sm:px-0">
            Empowering <span className="text-[#F2B200] font-semibold">builders</span> through hackathons,
            innovation, and a thriving developer ecosystem.
          </p>
        </div>

        {/* <CHANGE> Updated grid layout to be responsive with proper gap and text sizes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-14 text-xs sm:text-sm">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-[10px] sm:text-xs">
              Explore
            </h4>
            <Link href="/events" className="text-gray-400 hover:text-[#F2B200] transition-colors text-xs sm:text-sm">Events</Link>
            <Link href="/projects" className="text-gray-400 hover:text-[#F2B200] transition-colors text-xs sm:text-sm">Projects</Link>
            <Link href="/team" className="text-gray-400 hover:text-[#F2B200] transition-colors text-xs sm:text-sm">Team</Link>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-[10px] sm:text-xs">
              Community
            </h4>
            <a
              href="https://www.instagram.com/codekrafterssrm.rmp"
              target="_blank"
              className="text-gray-400 hover:text-[#F2B200] transition-colors text-xs sm:text-sm"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/codechef-srmrmp"
              target="_blank"
              className="text-gray-400 hover:text-[#F2B200] transition-colors text-xs sm:text-sm"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-[10px] sm:text-xs">
              Resources
            </h4>
            <Link href="/blog" className="text-gray-400 hover:text-[#F2B200] transition-colors text-xs sm:text-sm">Blog</Link>
            <Link href="/krafterslink" className="text-gray-400 hover:text-[#F2B200] transition-colors text-xs sm:text-sm">
              KraftersLink
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-[10px] sm:text-xs">
              Be a part of
            </h4>
            <Link
              href="/join"
              className="px-3 sm:px-4 py-1.5 sm:py-2 mt-0 sm:mt-1 rounded-lg border border-[#F2B200]/40 hover:border-[#F2B200] hover:bg-[#F2B200]/20 transition-all duration-300 text-center text-gray-300 text-xs sm:text-sm"
            >
              Join Our Club
            </Link>
          </div>
        </div>

        <div className="border-t border-[#F2B200]/10"></div>

        {/* <CHANGE> Updated footer bottom section with responsive layout and text sizes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8">
          <p className="text-center sm:text-left order-2 sm:order-1">
            © {year} <span className="text-[#F2B200] font-semibold">CodeKrafters</span>. All rights reserved.
          </p>

          <div className="flex gap-4 sm:gap-5 order-1 sm:order-2">
            <a
              href="https://www.instagram.com/codekrafterssrm.rmp"
              target="_blank"
              className="hover:text-[#F2B200] transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zM12 7a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm4.75-2.75a1.25 1.25 0 1 0 1.24 1.25a1.25 1.25 0 0 0-1.24-1.25z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/codechef-srmrmp"
              target="_blank"
              className="hover:text-[#F2B200] transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4zm8 0h3.4v2h.05A4 4 0 0 1 15.5 7.75c3.85 0 4.55 2.53 4.55 5.82V24h-4v-9.4c0-2.24-.04-5.1-3.1-5.1c-3.1 0-3.58 2.42-3.58 4.92V24h-4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;