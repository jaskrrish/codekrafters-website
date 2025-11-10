"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

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
}

// Organized by domain with Heads first, then Leads
const TEAM_MEMBERS: TeamMember[] = [
  // Content Domain
  {
    id: 1,
    name: "Hari Prasad",
    role: "Content Head",
    description: "Leads the content strategy and vision for the organization.",
    imagePath: "/images/Hari-prasad.png",
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
    imagePath: "/images/Dhanush-Adithyan.png",
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
    social: {
      instagram: "https://instagram.com/abhinavka",
      github: "https://github.com/abhinavka",
      linkedin: "https://linkedin.com/in/abhinavka",
    },
  },
]

interface TeamMemberCardProps {
  member: TeamMember
  isLeft: boolean
  index: number
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, isLeft, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' },
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

  useEffect(() => {
    if (!isVisible) return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      const distance = Math.abs(elementCenter - viewportCenter)
      const maxDistance = window.innerHeight * (isMobile ? 0.5 : 0.6)

      const progress = Math.max(0, Math.min(1, 1 - distance / maxDistance))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible, isMobile])

  // Responsive sizing - mobile gets smaller dimensions
  const circleWidth = isMobile ? 240 : 360
  const minHeight = isMobile ? 140 : 200
  const maxHeight = isMobile ? 360 : 600
  
  const currentHeight = minHeight + (maxHeight - minHeight) * scrollProgress
  const imageScale = 0.78
  const imageOpacity = scrollProgress
  const imageYPosition = 100 - (100 * scrollProgress)

  const CircleContent = () => (
    <div className={`flex ${isMobile ? 'justify-center' : isLeft ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} w-full`}>
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: circleWidth,
          height: currentHeight,
          borderRadius: `${circleWidth / 2}px`,
          transition: "height 0.3s ease-out",
          backgroundColor: "white",
          boxShadow: isMobile 
            ? "0 6px 20px rgba(0, 0, 0, 0.08)" 
            : "0 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="absolute w-full h-full"
          style={{
            opacity: imageOpacity,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            transform: `translateY(${imageYPosition}%)`,
          }}
        >
          <img
            src={member.imagePath || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-contain object-center"
            style={{
              transform: `scale(${imageScale})`,
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )

  const TextContent = () => (
    <div className={`flex flex-col justify-center ${isMobile ? 'text-center items-center' : ''}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 md:text-3xl lg:text-4xl">
        {member.name}
      </h3>
      <p className="text-base font-semibold text-gray-700 mb-3 md:text-lg lg:text-xl md:mb-4">
        {member.role}
      </p>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 md:text-base md:mb-6 max-w-md">
        {member.description}
      </p>
      
      <div className="flex gap-3 md:gap-4">
        {member.social.instagram && (
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#fcb416] transition-colors p-2 -ml-2 rounded-lg hover:bg-white/50 active:scale-95"
            aria-label={`${member.name}'s Instagram`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#fcb416] transition-colors p-2 rounded-lg hover:bg-white/50 active:scale-95"
            aria-label={`${member.name}'s GitHub`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        )}
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#fcb416] transition-colors p-2 rounded-lg hover:bg-white/50 active:scale-95"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <div ref={ref} className="py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto px-4">
        {/* Desktop: Alternate layout based on isLeft */}
        {/* Mobile: Always same order (image, text) but centered */}
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
  return (
    <section 
      className="w-full py-10 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#fcb416',
        backgroundImage: `
          linear-gradient(rgba(100, 100, 100, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 100, 100, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-3 md:mb-4">
          Our Team
        </h2>
        <p className="text-center text-gray-800 mb-10 sm:mb-12 md:mb-16 lg:mb-24 text-sm sm:text-base max-w-2xl mx-auto">
          Meet the talented individuals driving innovation and excellence across our organization.
        </p>

        <div className="space-y-0">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} isLeft={index % 2 === 0} index={index} />
          ))}
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
  )
}

export default ExistingTeamMembersSection