"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const animTimerRef = useRef<any>(null);

  const navLinks = [
    { label: "HOME", href: "/", id: "home" },
    { label: "EVENTS", href: "/events", id: "events" },
    { label: "OUR TEAM", href: "/team", id: "team" },
    { label: "PROJECTS", href: "/projects", id: "projects" },
    { label: "BLOG", href: "/blog", id: "blog" },
    { label: "KRAFTERSLINK", href: "/krafterslink", id: "krafterslink" },
    { label: "JOIN US", href: "/join", id: "join" },
  ];

  // Detect active route
  useEffect(() => {
    const current = navLinks.find((link) => link.href === pathname);
    if (current) setActiveLink(current.id);
  }, [pathname]);

  useEffect(() => {
    return () => animTimerRef.current && clearTimeout(animTimerRef.current);
  }, []);

  const handleLabelClick = (link: { id: string; href: string }) => {
    setActiveLink(link.id);
    setAnimatingId(link.id);
    router.push(link.href);
    animTimerRef.current = setTimeout(() => setAnimatingId(null), 1200);
  };

  return (
    <nav className="fixed top-0 w-full z-50 pt-6">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex flex-col items-center">
            {/* 🔸 Logo Area - hover trigger limited to logo */}
            <div
              className="flex items-center justify-center cursor-pointer"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              style={{
                backgroundColor: "#0D0D0D",
                width: isExpanded ? "60px" : "200px",
                height: isExpanded ? "48px" : "60px",
                overflow: "hidden",
                transition: "all 900ms cubic-bezier(0.16,1,0.3,1)",
                border: "1px solid rgba(242,242,242,0.15)",
                borderRadius: isExpanded ? "12px" : "24px",
                pointerEvents: "auto",
              }}
            >
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/ck_logo.svg"
                  alt="CK Logo"
                  width={40}
                  height={32}
                  className="object-contain select-none"
                />
              </Link>
            </div>

            {/* Navigation links (only visible when expanded) */}
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
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLabelClick(link)}
                      className="relative px-4 py-2 text-sm font-medium tracking-wider text-[#F2F2F2] hover:text-[#F2A516] transition-all duration-300 nav-link-button"
                    >
                      {link.label}
                      <div
                        className="underline-indicator"
                        style={{
                          position: "absolute",
                          bottom: "4px",
                          left: "50%",
                          width: isActive ? "70%" : "0%",
                          height: "2px",
                          backgroundColor: "#F2A516",
                          borderRadius: "2px",
                          transform: "translateX(-50%)",
                          transition:
                            "width 400ms cubic-bezier(0.16,1,0.3,1)",
                        }}
                      ></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className="md:hidden flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/ck_logo.svg"
            alt="CK Logo"
            width={40}
            height={32}
            className="object-contain"
          />
        </Link>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg transition-colors"
          aria-label="Toggle menu"
          style={{
            backgroundColor: isExpanded
              ? "rgba(242,242,242,0.1)"
              : "transparent",
          }}
        >
          {isExpanded ? (
            <X className="w-5 h-5" style={{ color: "#F2F2F2" }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: "#F2F2F2" }} />
          )}
        </button>
      </div>

      {isExpanded && (
        <div
          className="md:hidden py-4 space-y-2 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundColor: "#0D0D0D",
            borderTop: "1px solid rgba(242,242,242,0.15)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                handleLabelClick(link);
                setIsExpanded(false);
              }}
              className="block w-full text-left px-4 py-3 text-sm font-medium tracking-wider rounded-lg transition-all duration-300"
              style={{
                color: activeLink === link.id ? "#0D0D0D" : "#F2F2F2",
                backgroundColor:
                  activeLink === link.id ? "#F2A516" : "transparent",
                border:
                  activeLink === link.id
                    ? "none"
                    : "1px solid rgba(242,242,242,0.08)",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .underline-indicator {
          pointer-events: none;
        }

        /* All nav elements use pointer cursor */
        .nav-link-button,
        button,
        a {
          cursor: pointer;
        }

        /* Smooth hover feedback */
        button:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </nav>
  );
}
