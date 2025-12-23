"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0D0D0D] text-[#FFEFB4] pt-10 pb-10 px-6 md:px-12">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2A516] to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-10 text-center lg:text-left">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1 flex justify-center lg:justify-start">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <Image
                src="/logo.png"
                alt="CodeKrafters Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <h2 className="text-2xl font-extrabold tracking-wide">
                <span className="text-white">Code</span>
                <span className="text-[#F2A516]">Krafters</span>
              </h2>
            </div>

            <p className="mt-3 text-sm text-[#FFEFB4]/70 text-center lg:text-left leading-relaxed">
              <span>A student-driven tech club</span>
              <span className=" text-[#FFEFB4]/80 mt-1">
                at SRM Ramapuram
              </span>
            </p>
          </div>
        </div>

        {/* Explore */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-bold uppercase tracking-wide text-[#F2A516] text-sm mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-white">
            <li><Link href="/events" className="hover:text-[#F2A516]">Events</Link></li>
            <li><Link href="/projects" className="hover:text-[#F2A516]">Projects</Link></li>
            <li><Link href="/team" className="hover:text-[#F2A516]">Team</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-bold uppercase tracking-wide text-[#F2A516] text-sm mb-4">
            Social
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://www.instagram.com/codekrafterssrm.rmp/"
                target="_blank"
                className="flex items-center gap-2 text-white hover:text-[#F2A516]"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/codechef-srmrmp/"
                target="_blank"
                className="flex items-center gap-2 text-white hover:text-[#F2A516]"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-bold uppercase text-[#F2A516] tracking-wide text-sm mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-white">
            <li><Link href="/blog" className="hover:text-[#F2A516]">Blog</Link></li>
            <li><Link href="/krafterslink" className="hover:text-[#F2A516]">KraftersLink</Link></li>
          </ul>
        </div>

        {/* Join */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-bold uppercase text-[#F2A516] tracking-wide text-sm mb-4">
            Be a part of
          </h3>
          <Link
            href="/join"
            className="
              inline-block mt-2 px-6 py-3 rounded-xl
              bg-[#F2A516] text-[#0D0D0D] font-extrabold text-sm
              shadow-[3px_3px_0_#000]
              hover:shadow-[5px_5px_0_#000]
              transition-all
            "
          >
            Join Our Club
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-5 pt-6 border-t border-[#FFEFB4]/20 text-center text-xs text-[#FFEFB4]/60">
        © {new Date().getFullYear()}{" "}
        <span className="text-white">Code</span>
        <span className="text-[#F2A516]">Krafters</span>
      </div>
    </footer>
  );
}