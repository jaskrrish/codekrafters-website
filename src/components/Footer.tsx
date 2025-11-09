"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F2F0D8] text-[#0b1220] border-t border-[#0b1220]/10">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* BRAND CENTERED */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="CodeKrafters"
              width={50}
              height={50}
              className="h-11 w-auto"
            />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase leading-none">
              <span className="text-black">CODE</span>
              <span className="text-[#F2B200]">KRAFTERS</span>
            </h1>
          </div>

          <p className="text-sm text-[#0b1220]/70 max-w-md leading-relaxed">
            Empowering builders through hackathons, innovation events, and a thriving developer ecosystem.
          </p>
        </div>

        {/* 4-Column SaaS Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12 text-sm">

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#0b1220]">Explore</h4>
            <Link href="/events" className="hover:text-[#F2B200]">Events</Link>
            <Link href="/projects" className="hover:text-[#F2B200]">Projects</Link>
            <Link href="/team" className="hover:text-[#F2B200]">Team</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#0b1220]">Community</h4>
            <a href="https://www.instagram.com/codekrafterssrm.rmp" target="_blank" className="hover:text-[#F2B200]">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/codechef-srmrmp" target="_blank" className="hover:text-[#F2B200]">
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#0b1220]">Resources</h4>
            <Link href="/blog" className="hover:text-[#F2B200]">Blog</Link>
            <Link href="/krafterslink" className="hover:text-[#F2B200]">KraftersLink</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#0b1220]">Be a part of the future</h4>
            <Link
              href="/join"
              className="px-4 py-2 mt-1 rounded-lg border border-[#0b1220]/20 hover:border-[#F2B200] hover:bg-[#F2B200]/20 transition-colors text-center"
            >
              Join Our Club
            </Link>
           
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#0b1220]/10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-[#0b1220]/60 py-4 -mb-10">
          <p>© {year} CodeKrafters. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/codekrafterssrm.rmp"
              target="_blank"
              className="hover:text-[#F2B200]"
              aria-label="Instagram"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zM12 7a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm4.75-2.75a1.25 1.25 0 1 0 1.24 1.25a1.25 1.25 0 0 0-1.24-1.25z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/codechef-srmrmp"
              target="_blank"
              className="hover:text-[#F2B200]"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
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
