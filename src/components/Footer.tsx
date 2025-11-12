"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0b0b0b] text-white border-t border-[#F2B200]/10">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#F2B200]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F2B200]/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col items-center text-center gap-4 mb-14 relative">
          <div className="flex items-center gap-3 group hover:scale-[1.04] transition-transform duration-500">
            <Image
              src="/logo.png"
              alt="CodeKrafters"
              width={60}
              height={60}
              className="h-12 w-auto drop-shadow-[0_0_20px_rgba(242,178,0,0.35)]"
            />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-[0.25em] uppercase leading-none select-none">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">CODE</span>
              <span className="text-[#F2B200] drop-shadow-[0_0_10px_rgba(242,178,0,0.6)]">KRAFTERS</span>
            </h1>
          </div>

          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#F2B200] to-transparent rounded-full blur-[0.5px]" />

          <p className="text-sm md:text-base text-gray-400 max-w-lg leading-relaxed font-medium tracking-wide">
            Empowering <span className="text-[#F2B200] font-semibold">builders</span> through hackathons,
            innovation, and a thriving developer ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14 text-sm">
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-xs">
              Explore
            </h4>
            <Link href="/events" className="text-gray-400 hover:text-[#F2B200] transition-colors">Events</Link>
            <Link href="/projects" className="text-gray-400 hover:text-[#F2B200] transition-colors">Projects</Link>
            <Link href="/team" className="text-gray-400 hover:text-[#F2B200] transition-colors">Team</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-xs">
              Community
            </h4>
            <a
              href="https://www.instagram.com/codekrafterssrm.rmp"
              target="_blank"
              className="text-gray-400 hover:text-[#F2B200] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/codechef-srmrmp"
              target="_blank"
              className="text-gray-400 hover:text-[#F2B200] transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-xs">
              Resources
            </h4>
            <Link href="/blog" className="text-gray-400 hover:text-[#F2B200] transition-colors">Blog</Link>
            <Link href="/krafterslink" className="text-gray-400 hover:text-[#F2B200] transition-colors">
              KraftersLink
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#F2B200] uppercase tracking-wide text-xs">
              Be a part of the future
            </h4>
            <Link
              href="/join"
              className="px-4 py-2 mt-1 rounded-lg border border-[#F2B200]/40 hover:border-[#F2B200] hover:bg-[#F2B200]/20 transition-all duration-300 text-center text-gray-300"
            >
              Join Our Club
            </Link>
          </div>
        </div>

        <div className="border-t border-[#F2B200]/10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p className="text-center md:text-left">
            © {year} <span className="text-[#F2B200] font-semibold">CodeKrafters</span>. All rights reserved.
          </p>

          <div className="flex gap-5 mt-3 md:mt-0">
            <a
              href="https://www.instagram.com/codekrafterssrm.rmp"
              target="_blank"
              className="hover:text-[#F2B200] transition-colors"
              aria-label="Instagram"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zM12 7a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm4.75-2.75a1.25 1.25 0 1 0 1.24 1.25a1.25 1.25 0 0 0-1.24-1.25z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/codechef-srmrmp"
              target="_blank"
              className="hover:text-[#F2B200] transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
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
