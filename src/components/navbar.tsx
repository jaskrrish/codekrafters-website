"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { label: "HOME", href: "/", id: "home" },
    { label: "EVENTS", href: "/events", id: "events" },
    { label: "OUR TEAM", href: "/team", id: "team" },
    { label: "PROJECTS", href: "/projects", id: "projects" },
    { label: "BLOG", href: "/blog", id: "blog" },
    { label: "KRAFTERSLINK", href: "/krafterslink", id: "krafterslink" },
    { label: "JOIN US", href: "/join", id: "join" },
  ];

  /* Detect Active Route */
  useEffect(() => {
    const current = navLinks.find((l) => l.href === pathname);
    if (current) setActiveLink(current.id);
  }, [pathname]);

  const handleLabelClick = (link: { id: string; href: string }) => {
    setActiveLink(link.id);
    router.push(link.href);
  };

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-[#0D0D0D]
        md:bg-transparent
        md:backdrop-blur-0
        md:pt-6
        pt-safe
      "
    >
      {/* DESKTOP NAV */}
      <div className="hidden md:flex justify-center w-full">
        <div
          className="flex flex-col items-center"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => {
            setIsExpanded(false);
            setHoveredLink(null);
          }}
        >
          {/* LOGO */}
          <div
            className="flex items-center justify-center transition-all"
            style={{
              backgroundColor: "#0D0D0D",
              width: isExpanded ? "60px" : "200px",
              height: isExpanded ? "48px" : "60px",
              borderRadius: isExpanded ? "12px" : "24px",
              border: "1px solid rgba(242,242,242,0.15)",
              overflow: "hidden",
              transition: "all 900ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <Link href="/">
              <Image
                src="/ck_logo.svg"
                alt="CK Logo"
                width={40}
                height={32}
                className="object-contain"
              />
            </Link>
          </div>

          {/* EXPANDED MENU */}
          <div
            className="mt-2"
            style={{
              opacity: isExpanded ? 1 : 0,
              pointerEvents: isExpanded ? "auto" : "none",
              transform: isExpanded
                ? "translateY(0) scale(1)"
                : "translateY(-15px) scale(0.92)",
              transition:
                "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex gap-2 bg-[#0D0D0D] p-3 rounded-2xl border border-[#2a2a2a]">
              {navLinks.map((link) => {
                const isActive = activeLink === link.id;
                const isHovered = hoveredLink === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLabelClick(link)}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-4 py-2 text-xs sm:text-sm font-medium tracking-wider text-[#F2F2F2] hover:text-[#F2A516] transition-all"
                  >
                    {link.label}

                    {/* ACTIVE + HOVER UNDERLINE */}
                    <div
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
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

      {/* MOBILE HEADER */}
      <div
        className="md:hidden flex justify-between items-center px-3 sm:px-4 py-3 sm:py-4"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <Link href="/">
          <Image
            src="/ck_logo.svg"
            alt="CK Logo"
            width={32}
            height={28}
            className="w-8 h-7 sm:w-10 sm:h-8 object-contain"
          />
        </Link>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Menu"
          className="p-2 rounded-lg transition-colors"
          style={{
            backgroundColor: isExpanded
              ? "rgba(242,242,242,0.1)"
              : "transparent",
          }}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: "#0D0D0D",
          borderTop: "1px solid rgba(242,242,242,0.15)",
        }}
      >
        <div className="flex flex-col space-y-2 px-4 py-4">
          {navLinks.map((link) => {
            const isActive = activeLink === link.id;

            return (
              <button
                key={link.id}
                onClick={() => {
                  handleLabelClick(link);
                  setIsExpanded(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-semibold tracking-wide rounded-lg transition-all active:scale-95"
                style={{
                  color: isActive ? "#0D0D0D" : "#F2F2F2",
                  backgroundColor: isActive ? "#F2A516" : "transparent",
                  border: isActive
                    ? "none"
                    : "1px solid rgba(242,242,242,0.08)",
                  minHeight: "44px",
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
