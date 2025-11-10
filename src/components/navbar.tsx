"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const [animatingId, setAnimatingId] = useState<string | null>(null)
  const animTimerRef = useRef<any>(null)

  const navLinks = [
    { label: "HOME", href: "#", id: "home" },
    { label: "STORY", href: "#story", id: "story" },
    { label: "EVENTS", href: "/#events", id: "events" },
    { label: "OUR TEAM", href: "#team", id: "team" },
    { label: "SPONSORS", href: "#sponsors", id: "sponsors" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ]

  // Filter out STORY for mobile
  const mobileNavLinks = navLinks.filter(link => link.id !== "story")

  useEffect(() => {
    return () => {
      if (animTimerRef.current) {
        window.clearTimeout(animTimerRef.current)
      }
    }
  }, [])

  const smoothScrollTo = (element: HTMLElement | null, duration = 1400) => {
    if (!element) return

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime: number | null = null
    let animationFrameId: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      const ease = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      window.scrollTo(0, startPosition + distance * ease(progress))

      if (timeElapsed < duration) {
        animationFrameId = requestAnimationFrame(animation)
      }
    }

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }

    const originalScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = "auto"

    animationFrameId = requestAnimationFrame(animation)

    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior
    }, duration)
  }

  const handleLabelClick = (link: { id: string; href?: string }) => {
    setActiveLink(link.id)
    setAnimatingId(link.id)

    if (link.href) {
      const hashIndex = link.href.indexOf("#")
      if (hashIndex !== -1) {
        const hash = link.href.slice(hashIndex)
        if (hash === "#" || hash === "#0" || hash === "#/") {
          const startPosition = window.pageYOffset
          const distance = -startPosition
          let startTime: number | null = null
          let animationFrameId: number | null = null

          const originalScrollBehavior = document.documentElement.style.scrollBehavior
          document.documentElement.style.scrollBehavior = "auto"

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / 1400, 1)

            const ease = (t: number) => {
              return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            }

            window.scrollTo(0, startPosition + distance * ease(progress))

            if (timeElapsed < 1400) {
              animationFrameId = requestAnimationFrame(animation)
            } else {
              document.documentElement.style.scrollBehavior = originalScrollBehavior
            }
          }

          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
          }

          animationFrameId = requestAnimationFrame(animation)
        } else if (hash.length > 1) {
          const id = hash.slice(1)
          const el = document.getElementById(id)
          smoothScrollTo(el, 1400)
        }
      }
    }

    if (animTimerRef.current) window.clearTimeout(animTimerRef.current)
    animTimerRef.current = window.setTimeout(() => {
      setAnimatingId(null)
    }, 1400)
  }

  return (
    <nav className="fixed top-0 w-full z-50 pt-4 sm:pt-6">
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div
            className="flex flex-col items-center"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            {/* Logo Container */}
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
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  setIsExpanded((v) => !v)
                }}
                className="flex items-center justify-center"
              >
                <Image src="/ck_logo.svg" alt="CodeKrafters Logo" width={40} height={32} className="object-contain" />
              </Link>
            </div>

            {/* Menu Container - Appears below logo */}
            <div
              className="mt-2 overflow-hidden"
              style={{
                backgroundColor: "#0D0D0D",
                opacity: isExpanded ? 1 : 0,
                pointerEvents: isExpanded ? "auto" : "none",
                transform: isExpanded ? "translateY(0) scale(1)" : "translateY(-15px) scale(0.92)",
                transformOrigin: "top center",
                transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
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
                  const isActive = activeLink === link.id
                  const isAnimating = animatingId === link.id
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLabelClick(link)}
                      className={`nav-link-button transition-all duration-200 transform flex items-center justify-center ${isAnimating ? "money-roll" : ""} ${isActive ? "active" : ""}`}
                      style={{
                        minWidth: "120px",
                        height: "40px",
                        padding: "0 16px",
                        backgroundColor: isActive ? "#F2A516" : "transparent",
                        color: isActive ? "#0D0D0D" : "#F2F2F2",
                        border: isActive ? "none" : "1px solid rgba(242,242,242,0.08)",
                        transitionDelay: `${index * 50}ms`,
                        borderRadius: "6px",
                        zIndex: isActive ? 1 : 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        position: "relative",
                      }}
                    >
                      <div className="dot-indicator" style={{
                        position: "absolute",
                        top: "12px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#0D0D0D" : "#F2F2F2",
                        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}></div>
                      <span className="text-sm font-medium tracking-wider label label-bottom" style={{
                        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}>{link.label}</span>
                      <span className="text-sm font-medium tracking-wider label label-top" style={{
                        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                        position: "absolute",
                      }}>{link.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR - OPTIMIZED WITHOUT STORY */}
      <div 
        className="md:hidden fixed top-0 left-0 right-0 shadow-lg"
        style={{ 
          backgroundColor: "#0D0D0D",
          borderBottom: "1px solid rgba(242,242,242,0.15)"
        }}
      >
        <div className="flex justify-between items-center px-4 py-3">
          <Link href="/" className="flex items-center">
            <Image 
              src="/ck_logo.svg" 
              alt="CodeKrafters Logo" 
              width={36} 
              height={28} 
              className="object-contain" 
            />
          </Link>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg transition-colors active:scale-95"
            style={{ 
              backgroundColor: isExpanded ? "rgba(242,165,22,0.15)" : "rgba(242,242,242,0.08)",
              border: "1px solid rgba(242,242,242,0.1)"
            }}
            aria-label="Toggle menu"
          >
            {isExpanded ? (
              <X className="w-5 h-5" style={{ color: "#F2A516" }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: "#F2F2F2" }} />
            )}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN - WITHOUT STORY */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isExpanded ? "400px" : "0px",
            borderTop: isExpanded ? "1px solid rgba(242,242,242,0.1)" : "none"
          }}
        >
          <div className="py-2 px-4 space-y-1">
            {mobileNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  handleLabelClick(link)
                  setIsExpanded(false)
                }}
                className="block w-full text-left px-4 py-3 text-sm font-medium tracking-wider rounded-lg transition-all duration-200 active:scale-98"
                style={{
                  color: activeLink === link.id ? "#0D0D0D" : "#F2F2F2",
                  backgroundColor: activeLink === link.id ? "#F2A516" : "rgba(242,242,242,0.05)",
                  border: activeLink === link.id ? "none" : "1px solid rgba(242,242,242,0.08)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-pill button {
          background: transparent;
          color: #F2F2F2;
          border: 0;
          outline: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transform-style: preserve-3d;
          perspective: 800px;
        }
        .nav-pill button:hover {
          background: #BF8211;
          color: #0D0D0D;
        }
        .nav-pill button.active {
          background: #F2A516;
          color: #0D0D0D;
        }

        .nav-link-button .dot-indicator {
          opacity: 1;
          transform: translateY(-6px);
        }
        .nav-link-button:hover .dot-indicator {
          opacity: 1;
          transform: translateY(12px);
        }
        .nav-link-button.active .dot-indicator {
          opacity: 1;
          transform: translateY(-6px);
        }
        .nav-link-button.active:hover .dot-indicator {
          opacity: 1;
          transform: translateY(12px);
        }

        .nav-link-button .label-bottom {
          opacity: 1;
          transform: translateY(2px);
        }
        .nav-link-button:hover .label-bottom {
          opacity: 0;
          transform: translateY(25px);
        }
        .nav-link-button.active .label-bottom {
          opacity: 1;
          transform: translateY(2px);
        }
        .nav-link-button.active:hover .label-bottom {
          opacity: 0;
          transform: translateY(25px);
        }

        .nav-link-button .label-top {
          opacity: 0;
          transform: translateY(-25px);
        }
        .nav-link-button:hover .label-top {
          opacity: 1;
          transform: translateY(-10px);
        }
        .nav-link-button.active .label-top {
          opacity: 0;
          transform: translateY(-25px);
        }
        .nav-link-button.active:hover .label-top {
          opacity: 1;
          transform: translateY(-10px);
        }

        .nav-pill button.money-roll {
          z-index: 2;
          animation: rollAndSettle 1400ms cubic-bezier(.2,.8,.2,1) both;
        }

        .nav-pill button.money-roll::before {
          content: "";
          position: absolute;
          left: -60%;
          top: -40%;
          width: 220%;
          height: 180%;
          background: linear-gradient(90deg, rgba(242,165,22,0.95) 0%, rgba(191,130,17,0.9) 35%, rgba(115,78,10,0.85) 65%, rgba(242,242,242,0.05) 100%);
          transform: rotate(-12deg);
          opacity: 0.16;
          pointer-events: none;
          animation: stripeMove 600ms linear 0ms 2;
        }

        .nav-pill button .label {
          display: inline-block;
          backface-visibility: hidden;
          transform-origin: center;
        }
        .nav-pill button.money-roll .label {
          animation: spinText 1400ms cubic-bezier(.2,.8,.2,1) both;
        }

        @keyframes stripeMove {
          0% { transform: translateX(-40%) rotate(-12deg); opacity: 0.12; }
          50% { transform: translateX(0%) rotate(-12deg); opacity: 0.26; }
          100% { transform: translateX(40%) rotate(-12deg); opacity: 0; }
        }

        @keyframes rollAndSettle {
          0% { transform: translateY(0) rotateX(0) scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
          40% { transform: translateY(-22px) rotateX(720deg) scale(1.02); filter: drop-shadow(0 8px 18px rgba(0,0,0,0.25)); }
          70% { transform: translateY(-6px) rotateX(220deg) scale(1.01); }
          85% { transform: translateY(3px) rotateX(40deg) scale(0.995); }
          100% { transform: translateY(0) rotateX(0) scale(1); }
        }

        @keyframes spinText {
          0% { transform: rotateX(0); filter: blur(0px); }
          35% { transform: rotateX(720deg) translateZ(0); filter: blur(0.6px); }
          60% { transform: rotateX(240deg); filter: blur(0.2px); }
          85% { transform: rotateX(20deg); }
          100% { transform: rotateX(0); }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .active\\:scale-95:active {
            transform: scale(0.95);
          }
          .active\\:scale-98:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </nav>
  )
}