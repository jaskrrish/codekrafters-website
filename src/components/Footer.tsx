"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F2F0D8] text-[#0b1220] border-t border-[#0b1220]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">

        {/* BRAND CENTERED */}
        <div className="flex flex-col items-center text-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="CodeKrafters"
              width={50}
              height={50}
              className="h-9 sm:h-10 md:h-11 w-auto"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest uppercase leading-none">
              <span className="text-black">CODE</span>
              <span className="text-[#F2B200]">KRAFTERS</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#0b1220]/70 max-w-md leading-relaxed px-4">
            Empowering builders through hackathons, innovation events, and a thriving developer ecosystem.
          </p>
        </div>

        {/* 4-Column SaaS Grid - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12 text-xs sm:text-sm">

          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="font-semibold text-[#0b1220] text-sm sm:text-base">Explore</h4>
            <Link href="/events" className="hover:text-[#F2B200] transition-colors">Events</Link>
            <Link href="/projects" className="hover:text-[#F2B200] transition-colors">Projects</Link>
            <Link href="/team" className="hover:text-[#F2B200] transition-colors">Team</Link>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="font-semibold text-[#0b1220] text-sm sm:text-base">Community</h4>
            <a href="https://www.instagram.com/codekrafterssrm.rmp" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2B200] transition-colors">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/codechef-srmrmp" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2B200] transition-colors">
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="font-semibold text-[#0b1220] text-sm sm:text-base">Resources</h4>
            <Link href="/blog" className="hover:text-[#F2B200] transition-colors">Blog</Link>
            <Link href="/krafterslink" className="hover:text-[#F2B200] transition-colors">KraftersLink</Link>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 col-span-2 md:col-span-1">
            <h4 className="font-semibold text-[#0b1220] text-sm sm:text-base">Be a part of the future</h4>
            <Link
              href="/join"
              className="px-3 sm:px-4 py-1.5 sm:py-2 mt-1 rounded-lg border border-[#0b1220]/20 hover:border-[#F2B200] hover:bg-[#F2B200]/20 transition-colors text-center text-xs sm:text-sm font-medium"
            >
              Join Our Club
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#0b1220]/10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-[#0b1220]/60 pt-4 sm:pt-5 md:pt-6 gap-3 md:gap-0">
          <p className="text-center md:text-left">© {year} CodeKrafters. All rights reserved.</p>

          <div className="flex gap-4 sm:gap-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/codekrafterssrm.rmp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2B200] transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zM12 7a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm4.75-2.75a1.25 1.25 0 1 0 1.24 1.25a1.25 1.25 0 0 0-1.24-1.25z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/codechef-srmrmp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2B200] transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" className="sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4zm8 0h3.4v2h.05A4 4 0 0 1 15.5 7.75c3.85 0 4.55 2.53 4.55 5.82V24h-4v-9.4c0-2.24-.04-5.1-3.1-5.1c-3.1 0-3.58 2.42-3.58 4.92V24h-4z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;