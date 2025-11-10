"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();  // ✅ detect current route

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

  /** ✅ Sync active state with URL changes */
  useEffect(() => {
    const current = navLinks.find((link) => link.href === pathname);
    if (current) setActiveLink(current.id);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (animTimerRef.current) {
        window.clearTimeout(animTimerRef.current);
      }
    };
  }, []);

  /** ✅ Smooth scroll only when href contains # */
  const smoothScrollTo = (target: HTMLElement | null, duration = 1400) => {
    if (!target) return;

    const start = window.pageYOffset;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;

    let startTime: number | null = null;

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, start + distance * ease(progress));

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  /** ✅ Main click handler */
  const handleLabelClick = (link: { id: string; href: string }) => {
    setActiveLink(link.id);
    setAnimatingId(link.id);

    const isHash = link.href.startsWith("#");

    if (isHash) {
      const targetId = link.href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      smoothScrollTo(targetEl);
    } else {
      router.push(link.href);
    }

    if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
    animTimerRef.current = window.setTimeout(() => setAnimatingId(null), 1400);
  };

  return (
    <nav className="fixed top-0 w-full z-50 pt-6">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div
            className="flex flex-col items-center"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            {/* Logo */}
            <div
              className="flex items-center justify-center"
              style={{
                backgroundColor: "#0D0D0D",
                width: isExpanded ? "60px" : "200px",
                height: isExpanded ? "48px" : "60px",
                overflow: "hidden",
                transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
                border: "1px solid rgba(242,242,242,0.15)",
                borderRadius: isExpanded ? "12px" : "24px",
              }}
            >
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/ck_logo.svg"
                  alt="CK Logo"
                  width={40}
                  height={32}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div
              className="mt-2 overflow-hidden"
              style={{
                backgroundColor: "#0D0D0D",
                opacity: isExpanded ? 1 : 0,
                pointerEvents: isExpanded ? "auto" : "none",
                transform: isExpanded
                  ? "translateY(0) scale(1)"
                  : "translateY(-15px) scale(0.92)",
                transformOrigin: "top center",
                transition:
                  "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
                maxHeight: isExpanded ? "200px" : "0px",
                border: "1px solid rgba(242,242,242,0.15)",
                borderRadius: "24px",
              }}
            >
              <div
                className="inline-flex nav-pill flex-row items-center gap-2 shadow-md transition-all duration-700"
                style={{
                  backgroundColor: "#0D0D0D",
                  padding: "12px 16px",
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = activeLink === link.id;
                  const isAnimating = animatingId === link.id;

                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLabelClick(link)}
                      className={`nav-link-button transition-all duration-200 transform flex items-center justify-center ${
                        isAnimating ? "money-roll" : ""
                      } ${isActive ? "active" : ""}`}
                      style={{
                        minWidth: "120px",
                        height: "40px",
                        padding: "0 16px",
                        backgroundColor: isActive ? "#F2A516" : "transparent",
                        color: isActive ? "#0D0D0D" : "#F2F2F2",
                        border: isActive
                          ? "none"
                          : "1px solid rgba(242,242,242,0.08)",
                        transitionDelay: `${index * 50}ms`,
                        borderRadius: "6px",
                        position: "relative",
                      }}
                    >
                      <div
                        className="dot-indicator"
                        style={{
                          position: "absolute",
                          top: "12px",
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: isActive ? "#0D0D0D" : "#F2F2F2",
                          transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      ></div>

                      <span
                        className="text-sm font-medium tracking-wider label label-bottom"
                        style={{
                          transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {link.label}
                      </span>

                      <span
                        className="text-sm font-medium tracking-wider label label-top"
                        style={{
                          position: "absolute",
                          transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {link.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Navigation */}
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

      {/* ✅ Animations preserved */}
      <style jsx>{`
        .nav-pill button {
          background: transparent;
          color: #f2f2f2;
          border: 0;
          cursor: pointer;
          transform-style: preserve-3d;
        }
          .dot-indicator {
  opacity: 1;
  transform: translateY(-6px);
}
.nav-link-button:hover .dot-indicator {
  transform: translateY(12px);
}
.nav-link-button.active .dot-indicator {
  transform: translateY(-6px);
}
.nav-link-button.active:hover .dot-indicator {
  transform: translateY(12px);
}
      `}</style>
    </nav>
  );
}
