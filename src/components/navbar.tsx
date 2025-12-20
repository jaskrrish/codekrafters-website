"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Users,
  FolderKanban,
  BookOpen,
  Link as LinkIcon,
  UserPlus,
} from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { label: "HOME", href: "/", id: "home", icon: Home },
    { label: "EVENTS", href: "/events", id: "events", icon: Calendar },
    { label: "OUR TEAM", href: "/team", id: "team", icon: Users },
    { label: "PROJECTS", href: "/projects", id: "projects", icon: FolderKanban },
    { label: "BLOG", href: "/blog", id: "blog", icon: BookOpen },
    { label: "KRAFTERSLINK", href: "/krafterslink", id: "krafterslink", icon: LinkIcon },
    { label: "JOIN US", href: "/join", id: "join", icon: UserPlus },
  ];

  useEffect(() => {
    const current = navLinks.find((l) => l.href === pathname);
    if (current) setActiveLink(current.id);
  }, [pathname]);

  const handleNavigate = (link: { id: string; href: string }) => {
    setActiveLink(link.id);
    setIsExpanded(false);
    router.push(link.href);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pt-safe">
      <div className="flex justify-center w-full pt-4">
        <div
          className="flex flex-col items-center"
          onMouseEnter={() => {
  if (window.innerWidth >= 768) {
    setIsExpanded(true);
  }
}}

          onMouseLeave={() => {
  if (window.innerWidth >= 768) {
    setIsExpanded(false);
  }
  setHoveredLink(null);
}}

        >
          <button
            onClick={() => {
  if (window.innerWidth < 768) {
    setIsExpanded((p) => !p);
  }
}}

            className="flex items-center justify-center"
            style={{
              backgroundColor: "#0D0D0D",
              width: isExpanded ? "56px" : "180px",
              height: isExpanded ? "48px" : "56px",
              borderRadius: isExpanded ? "12px" : "24px",
              border: "1px solid rgba(242,242,242,0.15)",
              transition: "all 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <Image
              src="/ck_logo.svg"
              alt="CK Logo"
              width={36}
              height={28}
              className="object-contain"
            />
          </button>

          <div
            className="mt-2"
            style={{
              opacity: isExpanded ? 1 : 0,
              pointerEvents: isExpanded ? "auto" : "none",
              transform: isExpanded
                ? "translateY(0) scale(1)"
                : "translateY(-14px) scale(0.95)",
              transition:
                "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex gap-2 bg-[#0D0D0D] p-3 rounded-2xl border border-[#2a2a2a]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeLink === link.id;
                const isHovered = hoveredLink === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavigate(link)}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    title={link.label}
                    className="relative flex items-center justify-center px-3 py-2"
                  >
                    <Icon className="w-5 h-5 text-[#F2F2F2] md:hidden" />

                    <span
                      className="hidden md:inline text-xs sm:text-sm font-medium tracking-wider transition-colors"
                      style={{
                        color:
                          isActive || isHovered ? "#F2A516" : "#F2F2F2",
                      }}
                    >
                      {link.label}
                    </span>

                    <div
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 hidden md:block"
                      style={{
                        width: isActive || isHovered ? "70%" : "0%",
                        height: "2px",
                        backgroundColor: "#F2A516",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
