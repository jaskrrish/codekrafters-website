"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/Footer"

interface TeamMember {
  id: number
  name: string
  role: string
  description: string
  imagePath: string
  social: {
    instagram?: string
    github?: string
    linkedin?: string
  }
  domain: string
}

// Organized by domain with Heads first, then Leads
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 0,
    name: "President",
    role: "Club President",
    description: "Oversees all domains and leads CodeKrafters.",
    imagePath: "/images/PRESIDENT.png",
    domain: "president",
    social: {}
  },

  // Content Domain
  {
    id: 1,
    name: "Hari Prasad",
    role: "Content Head",
    description: "Leads the content strategy and vision for the organization.",
    imagePath: "/images/Hari-prasad.png",
    domain: "content",
    social: {
      instagram: "https://instagram.com/hariprasad",
      github: "https://github.com/hariprasad",
      linkedin: "https://linkedin.com/in/hariprasad",
    },
  },
  {
    id: 2,
    name: "Aaron Samuel",
    role: "Content Lead",
    description: "Drives content initiatives and execution.",
    imagePath: "/images/Aaron.png",
    domain: "content",
    social: {
      instagram: "https://instagram.com/aaronsamuel",
      github: "https://github.com/aaronsamuel",
      linkedin: "https://linkedin.com/in/aaronsamuel",
    },
  },
  {
    id: 19,
    name: "Noorul Hatim",
    role: "Content Lead",
    description: "Leads content talent development.",
    imagePath: "/images/hatim.png",
    domain: "content",
    social: {
      instagram: "https://instagram.com/noorulhatim",
      github: "https://github.com/noorulhatim",
      linkedin: "https://linkedin.com/in/noorulhatim",
    },
  },

  // Development Domain
  {
    id: 3,
    name: "Srivatsa",
    role: "Development Head",
    description: "Oversees all development operations and technical strategy.",
    imagePath: "/images/Srivatsa.png",
    domain: "development",
    social: {
      instagram: "https://instagram.com/srivatsa",
      github: "https://github.com/srivatsa",
      linkedin: "https://linkedin.com/in/srivatsa",
    },
  },
  {
    id: 4,
    name: "Nithesh",
    role: "Development Head",
    description: "Manages development teams and project delivery.",
    imagePath: "/images/Nitesh.png",
    domain: "development",
    social: {
      instagram: "https://instagram.com/nithesh",
      github: "https://github.com/nithesh",
      linkedin: "https://linkedin.com/in/nithesh",
    },
  },
  {
    id: 5,
    name: "Vikas Pritam",
    role: "Development Lead",
    description: "Drives technical excellence and innovation.",
    imagePath: "/images/Vikas.png",
    domain: "development",
    social: {
      instagram: "https://instagram.com/vikaspritam",
      github: "https://github.com/vikaspritam",
      linkedin: "https://linkedin.com/in/vikaspritam",
    },
  },
  {
    id: 6,
    name: "Vinoth Anand Gani",
    role: "Development Lead",
    description: "Leads development initiatives and team growth.",
    imagePath: "/images/VinothAnandgani.png",
    domain: "development",
    social: {
      instagram: "https://instagram.com/vinothanandhgani",
      github: "https://github.com/vinothanandhgani",
      linkedin: "https://linkedin.com/in/vinothanandhgani",
    },
  },

  // Cyber Security Domain
  {
    id: 7,
    name: "Dhanush Adithyan",
    role: "Cyber Security Head",
    description: "Leads security strategy and threat prevention.",
    imagePath: "/images/DhanushAdithyan.png",
    domain: "cyber",
    social: {
      instagram: "https://instagram.com/dhanushadithyan",
      github: "https://github.com/dhanushadithyan",
      linkedin: "https://linkedin.com/in/dhanushadithyan",
    },
  },
  {
    id: 8,
    name: "Rishit Chanda",
    role: "Cyber Security Head",
    description: "Manages security operations and compliance.",
    imagePath: "/images/Rishit.png",
    domain: "cyber",
    social: {
      instagram: "https://instagram.com/rishitchanda",
      github: "https://github.com/rishitchanda",
      linkedin: "https://linkedin.com/in/rishitchanda",
    },
  },
  {
    id: 9,
    name: "Adithya Krishna",
    role: "Cybersecurity Lead",
    description: "Drives security initiatives and team development.",
    imagePath: "/images/Adithya.png",
    domain: "cyber",
    social: {
      instagram: "https://instagram.com/adithyakrishna",
      github: "https://github.com/adithyakrishna",
      linkedin: "https://linkedin.com/in/adithyakrishna",
    },
  },

  // Competitive Programming Domain
  {
    id: 10,
    name: "Shashi Kumar",
    role: "Competitive Programming Head",
    description: "Oversees competitive programming initiatives.",
    imagePath: "/images/shashi.png",
    domain: "cp",
    social: {
      instagram: "https://instagram.com/shashikumar",
      github: "https://github.com/shashikumar",
      linkedin: "https://linkedin.com/in/shashikumar",
    },
  },
  {
    id: 11,
    name: "Mrudu Bhashini",
    role: "Competitive Programming Lead",
    description: "Leads training and competition strategy.",
    imagePath: "/images/mrudu.png",
    domain: "cp",
    social: {
      instagram: "https://instagram.com/mrudubhashini",
      github: "https://github.com/mrudubhashini",
      linkedin: "https://linkedin.com/in/mrudubhashini",
    },
  },
  {
    id: 12,
    name: "Manasa Dhavala",
    role: "Competitive Programming Lead",
    description: "Manages program growth and talent development.",
    imagePath: "/images/Manasa.png",
    domain: "cp",
    social: {
      instagram: "https://instagram.com/manasadhavala",
      github: "https://github.com/manasadhavala",
      linkedin: "https://linkedin.com/in/manasadhavala",
    },
  },

  // Web3 Domain
  {
    id: 13,
    name: "Deepanshu Sinha",
    role: "Web3 Head",
    description: "Leads Web3 strategy and blockchain initiatives.",
    imagePath: "/images/Deepanshu.png",
    domain: "web3",
    social: {
      instagram: "https://instagram.com/deepanshusinha",
      github: "https://github.com/deepanshusinha",
      linkedin: "https://linkedin.com/in/deepanshusinha",
    },
  },
  {
    id: 14,
    name: "Achyuth PV",
    role: "Web3 Lead",
    description: "Drives Web3 projects and innovation.",
    imagePath: "/images/Achyuth.png",
    domain: "web3",
    social: {
      instagram: "https://instagram.com/achyuthpv",
      github: "https://github.com/achyuthpv",
      linkedin: "https://linkedin.com/in/achyuthpv",
    },
  },
  {
    id: 15,
    name: "Sanjay Ganesh K",
    role: "Web3 Lead",
    description: "Manages Web3 ecosystem and partnerships.",
    imagePath: "/images/Sanjay.png",
    domain: "web3",
    social: {
      instagram: "https://instagram.com/sanjayganeshk",
      github: "https://github.com/sanjayganeshk",
      linkedin: "https://linkedin.com/in/sanjayganeshk",
    },
  },

  // Creatives Domain
  {
    id: 16,
    name: "Bhavna J",
    role: "Creatives Head",
    description: "Leads creative vision and design excellence.",
    imagePath: "/images/bhavna.png",
    domain: "creatives",
    social: {
      instagram: "https://instagram.com/bhavnaj",
      github: "https://github.com/bhavnaj",
      linkedin: "https://linkedin.com/in/bhavnaj",
    },
  },
  {
    id: 17,
    name: "Akash R",
    role: "Creatives Head",
    description: "Manages creative team and projects.",
    imagePath: "/images/Akash.png",
    domain: "creatives",
    social: {
      instagram: "https://instagram.com/akashr",
      github: "https://github.com/akashr",
      linkedin: "https://linkedin.com/in/akashr",
    },
  },
  {
    id: 18,
    name: "Sashank",
    role: "Creatives Lead",
    description: "Drives creative initiatives and brand growth.",
    imagePath: "/images/Sashank.png",
    domain: "creatives",
    social: {
      instagram: "https://instagram.com/sashank",
      github: "https://github.com/sashank",
      linkedin: "https://linkedin.com/in/sashank",
    },
  },

  // PR & Management Domain
  {
    id: 20,
    name: "Banu Pragathi",
    role: "PR & Management Head",
    description: "Oversees PR strategy and management operations.",
    imagePath: "/images/pragathi.png",
    domain: "pr",
    social: {
      instagram: "https://instagram.com/banupragathi",
      github: "https://github.com/banupragathi",
      linkedin: "https://linkedin.com/in/banupragathi",
    },
  },
  {
    id: 21,
    name: "Kavya Reddy Ch",
    role: "PR & Management Head",
    description: "Manages organizational relationships and growth.",
    imagePath: "/images/Kavya.png",
    domain: "pr",
    social: {
      instagram: "https://instagram.com/kavyareddych",
      github: "https://github.com/kavyareddych",
      linkedin: "https://linkedin.com/in/kavyareddych",
    },
  },
  {
    id: 22,
    name: "Siddarth Kilari",
    role: "PR & Management Lead",
    description: "Drives PR initiatives and communications.",
    imagePath: "/images/Siddharth.png",
    domain: "pr",
    social: {
      instagram: "https://instagram.com/siddarthkilari",
      github: "https://github.com/siddarthkilari",
      linkedin: "https://linkedin.com/in/siddarthkilari",
    },
  },
  {
    id: 23,
    name: "Satya Lohith",
    role: "PR & Management Lead",
    description: "Leads management strategy and team development.",
    imagePath: "/images/Satya.png",
    domain: "pr",
    social: {
      instagram: "https://instagram.com/satyalohith",
      github: "https://github.com/satyalohith",
      linkedin: "https://linkedin.com/in/satyalohith",
    },
  },

  // Operations Domain
  {
    id: 24,
    name: "Yashvanth MR",
    role: "Operations Head",
    description: "Leads operational efficiency and scaling.",
    imagePath: "/images/Yashvanth.png",
    domain: "operations",
    social: {
      instagram: "https://instagram.com/yashvanthmr",
      github: "https://github.com/yashvanthmr",
      linkedin: "https://linkedin.com/in/yashvanthmr",
    },
  },
  {
    id: 25,
    name: "Abhinav KA",
    role: "Operations Head",
    description: "Manages operations and process optimization.",
    imagePath: "/images/Abhinav.png",
    domain: "operations",
    social: {
      instagram: "https://instagram.com/abhinavka",
      github: "https://github.com/abhinavka",
      linkedin: "https://linkedin.com/in/abhinavka",
    },
  },
]

const DOMAINS = [
  { id: "president", label: "President" },
  { id: "content", label: "Content" },
  { id: "development", label: "Development" },
  { id: "cyber", label: "Cyber Security" },
  { id: "cp", label: "Competitive Programming" },
  { id: "web3", label: "Web3" },
  { id: "creatives", label: "Creatives" },
  { id: "pr", label: "PR & Management" },
  { id: "operations", label: "Operations" },
]

interface TeamMemberCardProps {
  member: TeamMember
  isLeft: boolean
  index: number
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, isLeft, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const circleSize = isMobile ? 240 : 320
  const containerHeight = isMobile ? 300 : 400

  const needsTopFocus = [
    "Vikas Pritam",
    "Vinoth Anand Gani",
    "Mrudu Bhashini",
    "Manasa Dhavala",
    "Bhavna J",
    "Siddarth Kilari",
    "Satya Lohith",
  ]

  const shouldUseObjectTop = needsTopFocus.includes(member.name)
  const objectFitClass = shouldUseObjectTop ? "object-cover object-top" : "object-contain"

  const CircleContent = () => (
    <div
      className={`flex ${isMobile ? "justify-center" : isLeft ? "justify-center md:justify-end" : "justify-center md:justify-start"} w-full`}
    >
      <div>
        <div
          className="relative flex items-center justify-center overflow-hidden transform transition-shadow duration-500 hover:shadow-2xl"
          style={{
            width: circleSize,
            height: containerHeight,
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: isMobile ? "0 6px 20px rgba(0, 0, 0, 0.12)" : "0 10px 40px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
            <img
              src={member.imagePath || "/placeholder.svg"}
              alt={member.name}
              className={`w-full h-full ${objectFitClass} transform transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-1`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const TextContent = () => (
    <div className={`flex flex-col justify-center ${isMobile ? "text-center items-center" : ""}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 md:text-3xl lg:text-4xl">{member.name}</h3>
      <p className="text-base font-semibold text-gray-700 mb-3 md:text-lg lg:text-xl md:mb-4">{member.role}</p>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 md:text-base md:mb-6 max-w-md">{member.description}</p>

      <div className="flex gap-3 md:gap-4">
        {member.social.instagram && (
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-white/70 active:scale-95"
            aria-label={`${member.name}'s Instagram`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-white/70 active:scale-95"
            aria-label={`${member.name}'s GitHub`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors p-3 rounded-lg hover:bg-white/70 active:scale-95"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <div
  id={`domain-${member.domain}`}
  ref={ref}
  className="py-6 sm:py-8 md:py-12 lg:py-16"
  data-domain={member.domain}
>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full max-w-6xl ml-auto px-4">
        {isLeft ? (
          <>
            <div className="w-full md:w-1/2">
              <CircleContent />
            </div>
            <div className="w-full md:w-1/2">
              <TextContent />
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <TextContent />
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <CircleContent />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const ExistingTeamMembersSection: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState("content")
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)

  // When the footer becomes visible, compute overlap and lift the fixed timeline up
  useEffect(() => {
    const footerEl = document.querySelector("footer") as HTMLElement | null
    const timelineEl = timelineRef.current
    if (!footerEl || !timelineEl) return

    // keep refs outside observer so we can remove listeners in cleanup
    let currentOnScroll: ((() => void) | null) = null
    let currentRaf: number | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        // helper to compute and apply overlap offset
        const updateOverlap = () => {
          if (!footerEl || !timelineEl) return
          const footerRect = footerEl.getBoundingClientRect()
          const timelineRect = timelineEl.getBoundingClientRect()
          const overlap = Math.max(0, timelineRect.bottom - footerRect.top) + 24
          if (overlap > 0) {
            timelineEl.style.transform = `translateY(calc(-50% - ${overlap}px))`
          } else {
            timelineEl.style.transform = "translateY(-50%)"
          }
        }

        const createScrollHandler = () => {
          return () => {
            if (currentRaf !== null) return
            currentRaf = window.requestAnimationFrame(() => {
              updateOverlap()
              currentRaf = null
            })
          }
        }

        if (entry.isIntersecting) {
          // footer is visible: update once and start listening to scroll so timeline moves up as user scrolls into footer
          updateOverlap()
          if (!currentOnScroll) {
            currentOnScroll = createScrollHandler()
            window.addEventListener("scroll", currentOnScroll, { passive: true })
          }
        } else {
          // footer not visible — reset and remove listener
          timelineEl.style.transform = "translateY(-50%)"
          if (currentOnScroll) {
            window.removeEventListener("scroll", currentOnScroll)
            currentOnScroll = null
          }
          if (currentRaf) {
            window.cancelAnimationFrame(currentRaf)
            currentRaf = null
          }
        }
      },
      { root: null, threshold: 0 }
    )

    observer.observe(footerEl)

    const handleResize = () => {
      // recompute current state in case sizes changed
      if (!footerEl || !timelineEl) return
      const footerRect = footerEl.getBoundingClientRect()
      const timelineRect = timelineEl.getBoundingClientRect()
      const overlap = Math.max(0, timelineRect.bottom - footerRect.top) + 24
      if (overlap > 0) {
        timelineEl.style.transform = `translateY(calc(-50% - ${overlap}px))`
      } else {
        timelineEl.style.transform = "translateY(-50%)"
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
      if (currentOnScroll) {
        window.removeEventListener("scroll", currentOnScroll)
        currentOnScroll = null
      }
      if (currentRaf) {
        window.cancelAnimationFrame(currentRaf)
        currentRaf = null
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-domain]")
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i] as HTMLElement
        const elementTop = element.offsetTop
        
        if (scrollPosition >= elementTop) {
          const domain = element.getAttribute("data-domain")
          if (domain && domain !== activeDomain) {
            setActiveDomain(domain)
          }
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeDomain])

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        // Reduced top padding so the title sits closer under the Navbar
        className="w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-10 sm:pb-12 md:pb-16 lg:pb-24 relative overflow-hidden"
        style={{
          backgroundColor: "#F2EFDC",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="w-full flex px-4 relative">
        {/* Timeline Sidebar */}
        <div className="hidden md:block md:w-1/2 lg:w-2/5">
          <div
            ref={timelineRef}
            // start the timeline lower so the top items are visible (not cut off)
            className="fixed top-[94%] -translate-y-1/2 pl-8 lg:pl-20 xl:pl-24 z-10 w-1/2 lg:w-2/5 transition-transform duration-300"
          >
            <div className="flex flex-col gap-6 lg:gap-8">
              {DOMAINS.map((domain) => {
                const isActive = activeDomain === domain.id
                return (
                  <div
  key={domain.id}
  onClick={() => {
    const el = document.getElementById(`domain-${domain.id}`)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - window.innerHeight * 0.3,
        behavior: "smooth"
      })
    }
  }}
  className="cursor-pointer transition-all duration-500 ease-out ..."
>

                    <div className="flex items-center gap-4 lg:gap-6">
                      <div
                        className={`rounded-full transition-all duration-500 ease-out ${
                          // Reduced heights: smaller on both active and inactive states
                          isActive ? "w-2 h-12 lg:h-16 bg-gray-900 shadow-lg" : "w-1.5 h-8 lg:h-10 bg-gray-800"
                        }`}
                      />
                      <span
                        className={`transition-all duration-500 ease-out leading-tight ${
                              isActive
                                ? "text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight"
                                : "text-lg lg:text-xl xl:text-2xl font-semibold text-gray-700"
                        }`}
                            style={{
                              color: isActive ? "#F2A516" : undefined,
                              textShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
                            }}
                      >
                        {domain.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex justify-end">
          <div className="w-full max-w-3xl">
            {/* Title (centered, placed closer to navbar) */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-transparent bg-clip-text mb-3 md:mb-4"
              style={{ backgroundImage: 'linear-gradient(90deg, #F2A516 0%, #000 50%, #1f2937 100%)' }}
            >
              Our Team
            </h2>

            <p className="text-center text-gray-700 mb-10 sm:mb-12 md:mb-16 lg:mb-24 text-sm sm:text-base mx-auto max-w-lg">
              <span style={{ color: '#F2A516' }} className="font-semibold">Meet</span> the talented individuals driving innovation and excellence across our organization.
            </p>

            {/* Members */}
            <div className="space-y-20">
              {TEAM_MEMBERS.map((member, index) => (
                <div className="flex justify-end" key={member.id}>
                  <div className="w-full max-w-2xl">
                    <TeamMemberCard member={member} isLeft={index % 2 === 0} index={index} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          section {
            background-size: 15px 15px !important;
          }
        }
      `}</style>
    </section>
      <Footer />
    </>
  )
}

export default ExistingTeamMembersSection