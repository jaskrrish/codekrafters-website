"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useMemo, memo } from "react"
import { Poppins, Orbitron, League_Spartan } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'], // Specify desired weights
  variable: '--font-poppins', // Optional: for use with CSS variables
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700','900'], // Specify desired weights
  variable: '--font-orbitron', // Optional: for use with CSS variables
});

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'], // Specify desired weights
  variable: '--font-league-spartan', // Optional: for use with CSS variables
});

interface TeamMember {
  id: number
  name: string
  role: string
  imagePath: string // Add this field
}


interface TeamMemberCardProps {
  member: TeamMember
  delay?: number
  activeImageId?: number | null
  onImageClick?: (id: number) => void
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: "Jas Krrish Singh", role: "President", imagePath: "/images/PRESIDENT.png" },
  { id: 2, name: "Srivatsa", role: "Development Head", imagePath: "/images/Srivatsa.png" },
  { id: 3, name: "Nithesh", role: "Development Head", imagePath: "/images/Nitesh.png" },
  { id: 4, name: "Dhanush Adithyan", role: "Cyber Security Head", imagePath: "/images/Dhanush-Adithyan.png" },
  { id: 5, name: "Rishit Chanda", role: "Cyber Security Head", imagePath: "/images/Rishit.png" },
  { id: 6, name: "Shashi Kumar", role: "Competitive Programming Head", imagePath: "/images/shashi.png" },
  { id: 7, name: "Deepanshu Sinha", role: "Web3 Head", imagePath: "/images/Deepanshu.png" },
  { id: 8, name: "Bhavna J", role: "Creatives Head", imagePath: "/images/bhavna.png" },
  { id: 9, name: "Banu Pragathi", role: "PR & Management Head", imagePath: "/images/pragathi.png" },
  { id: 10, name: "Kavya Reddy Ch", role: "PR & Management Head", imagePath: "/images/Kavya.png" },
  { id: 11, name: "Akash R", role: "Creatives Head", imagePath: "/images/Akash.png" },
  { id: 12, name: "Hari Prasad", role: "Content Head", imagePath: "/images/Hari-prasad.png" },
  { id: 13, name: "Aaron Samuel", role: "Content Head", imagePath: "/images/Aaron.png" },
  { id: 14, name: "Yashvanth MR", role: "Operations Head", imagePath: "/images/Yashvanth.png" },
  { id: 15, name: "Abhinav KA", role: "Operations Head", imagePath: "/images/Abhinav2.png" },
  { id: 16, name: "Adithya Krishna", role: "Cybersecurity Lead", imagePath: "/images/Adithya.png" },
  { id: 17, name: "Vikas Pritam", role: "Development Lead", imagePath: "/images/Vikas.png" },
  { id: 18, name: "Vinoth Anand Gani", role: "Development Lead", imagePath: "/images/VinothAnandgani.png" },
  { id: 19, name: "Achyuth PV", role: "Web3 Lead", imagePath: "/images/Achyuth.png" },
  { id: 20, name: "Sanjay Ganesh K", role: "Web3 Lead", imagePath: "/images/Sanjay.png" },
  { id: 21, name: "Mrudu Bhashini", role: "Competitive Programming Lead", imagePath: "/images/mrudu.png" },
  { id: 22, name: "Manasa Dhavala", role: "Competitive Programming Lead", imagePath: "/images/Manasa.png" },
  { id: 23, name: "Siddarth Kilari", role: "PR & Management Lead", imagePath: "/images/Siddharth.png" },
  { id: 24, name: "Satya Lohith", role: "PR & Management Lead", imagePath: "/images/Satya.png" },
  { id: 25, name: "Sashank", role: "Creatives Lead", imagePath: "/images/Sashank.png" },
  { id: 26, name: "Noorul Hatim", role: "Creatives Lead", imagePath: "/images/hatim.png" },
]

// Helper function to get role label
const getRoleLabel = (role: string): string => {
  if (role.toLowerCase().includes("president")) return "President"
  if (role.toLowerCase().includes("lead")) return "Lead"
  if (role.toLowerCase().includes("head")) return "Head"
  return "Member"
}

// Memoized team member card component
const TeamMemberCard = memo<TeamMemberCardProps>(({ member, delay = 0, activeImageId, onImageClick }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  // Check if this image is the active one
  const isActive = activeImageId === member.id

  useEffect(() => {
    setIsMounted(true)
    // Set device type on mount and on resize
    const updateDeviceType = () => {
      if (window.innerWidth < 640) setDeviceType("mobile")
      else if (window.innerWidth < 1024) setDeviceType("tablet")
      else setDeviceType("desktop")
    }

    updateDeviceType()
    window.addEventListener("resize", updateDeviceType)
    return () => window.removeEventListener("resize", updateDeviceType)
  }, [])

  // const textShadowStyle = useMemo(
  //   () => ({
  //     textShadow:
  //       "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)",
  //   }),
  //   [],
  // )

  // Role label styling with League Spartan, larger font size, and reduced letter spacing to match Canva
  const roleLabelStyle = useMemo(
    () => ({
      fontSize: '25px', // Very slight increase from 24px
      letterSpacing: '1.5px', // Slightly reduced from 2px
      lineHeight: '1.63', // Line spacing 1.63 from Canva
      textTransform: 'uppercase' as const, // Ensure uppercase like in Canva
      fontWeight: '700', // Make it bolder to match Canva appearance
    }),
    [],
  )

  // Toggle overlay and color on mobile/tablet
  const handleCardClick = () => {
    if (deviceType === "mobile" || deviceType === "tablet") {
      if (onImageClick) {
        // If clicking the same image, toggle it off, otherwise set it as active
        onImageClick(isActive ? -1 : member.id)
      }
    }
  }

  // Get container dimensions based on device type
  const getContainerStyle = () => {
    switch (deviceType) {
      case "mobile":
        return { width: "320px", height: "340px" } // Increased from 200px width and 280px height
      case "tablet":
        return { width: "160.8px", height: "171.78px" }
      case "desktop":
        return { width: "212.8px", height: "253.78px" }
      default:
        return { width: "212.8px", height: "253.78px" }
    }
  }

  const roleLabel = getRoleLabel(member.role)
  
  // Check if this is the first member (President)
  const isPresident = member.id === 1

  if (!isMounted) {
    return (
      <div className="relative group">
        {/* Fixed size container based on device type */}
        <div style={getContainerStyle()}>
          <div className="w-full h-full overflow-hidden shadow-lg bg-yellow-400 relative rounded-lg flex flex-col">
            {/* Role label - consistent 25% for all cards */}
            <div className="h-1/4 flex items-center justify-center bg-yellow-400">
              <span 
                className={`${leagueSpartan.className} text-black font-bold text-center px-2`}
                style={roleLabelStyle}
              >
                {roleLabel}
              </span>
            </div>
            {/* Image container - consistent 75% for all cards */}
            <div className="h-3/4 relative overflow-hidden">
              <Image
                src={member.imagePath}
                alt={member.name}
                fill
                className={`object-cover transition-all duration-300 ${isPresident ? 'object-center' : 'object-top'}`}
                priority={member.id <= 12}
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 160.8px, 273px"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-2 opacity-0 transition-opacity duration-300">
              <p className="font-bold text-white text-sm leading-tight" >
                {member.name}
              </p>
              <p className="text-white text-sm leading-tight">
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group">
      <motion.div
        style={{
          ...getContainerStyle(),
          cursor: deviceType === "mobile" || deviceType === "tablet" ? "pointer" : "default",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={deviceType === "desktop" ? { scale: 1.1, transition: { duration: 0.2 } } : {}}
        onClick={handleCardClick}
      >
        <div className="w-full h-full overflow-hidden shadow-lg bg-yellow-400 ring-2 ring-white/20 group-hover:ring-4 group-hover:ring-white/40 transition-all duration-300 relative flex flex-col">
          {/* Role label - consistent 25% for all cards */}
          <div className="h-1/4 flex items-center justify-center bg-yellow-400">
            <span 
              className={`${leagueSpartan.className} text-black font-bold text-center px-2`}
              style={roleLabelStyle}
            >
              {roleLabel}
            </span>
          </div>
          {/* Image container - consistent 75% for all cards */}
          <div className="h-3/4 relative overflow-hidden">
            <Image
              src={member.imagePath}
              alt={member.name}
              fill
              className={`object-cover transition-all duration-300 ${isPresident ? 'object-center' : 'object-top'}`}
              priority={member.id <= 12}
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 160.8px, 273px"
            />
          </div>

          <div
            className={
              `absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-1 sm:p-2 transition-opacity duration-300 ` +
              (deviceType === "desktop" ? "opacity-0 group-hover:opacity-100" : isActive ? "opacity-100" : "opacity-0")
            }
          >
            <p
              className={`font-bold text-white leading-tight ${
                deviceType === "desktop"
                  ? "text-xs sm:text-xs md:text-sm"
                  : deviceType === "mobile"
                    ? "text-sm"
                    : "text-xs"
              }`}
              // style={textShadowStyle}
            >
              {member.name}
            </p>
            <p
              className={`text-white leading-tight ${
                deviceType === "desktop"
                  ? "text-xs sm:text-xs md:text-xs"
                  : deviceType === "mobile"
                    ? "text-xs"
                    : "text-xs"
              }`}
              // style={textShadowStyle}
            >
              {member.role}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
})

TeamMemberCard.displayName = "TeamMemberCard"

// Memoized title component
const AnimatedTitle = memo<{ isMounted: boolean; className: string; delay: number }>(
  ({ isMounted, className, delay }) => {
    const content = (
      <div className={className + " flex flex-col items-center justify-center"}>
        <span className={`${orbitron.className} font-extrabold`}>
          CODE<span className="text-yellow-500">KRAFTERS</span>
        </span>
        <span className={`${poppins.className} block`}>CORE TEAM</span>
      </div>
    )

    if (!isMounted) return <div className="flex flex-col items-center justify-center">{content}</div>

    return (
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      >
        {content}
      </motion.div>
    )
  },
)

AnimatedTitle.displayName = "AnimatedTitle"

// Memoized mobile title component
const MobileTitle = memo<{ isMounted: boolean; delay: number }>(({ isMounted, delay }) => {
  const content = (
    <div className="flex flex-col items-center justify-center mb-6">
      <span className={`text-lg font-bold ${orbitron.className}`}>CODE<span className="text-yellow-500">KRAFTERS</span></span>
      <span className={`text-sm font-semibold text-gray-800 text-center ${poppins.className}`}>CORE TEAM</span>
    </div>
  )

  if (!isMounted) {
    return <div className="flex flex-col items-center justify-center mb-6">{content}</div>
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {content}
    </motion.div>
  )
})

MobileTitle.displayName = "MobileTitle"

const TeamMemberComponent = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [activeImageId, setActiveImageId] = useState<number | null>(null)
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Mobile group rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % 6) // 6 groups total (24 members / 4 per group)
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [])

  // Memoized team member slices
  const teamSlices = useMemo(
    () => ({
      first5: TEAM_MEMBERS.slice(0, 5),
      second5: TEAM_MEMBERS.slice(5, 10),
      member10: TEAM_MEMBERS[10],
      member11: TEAM_MEMBERS[11],
      third5: TEAM_MEMBERS.slice(12, 17),
      fourth5: TEAM_MEMBERS.slice(17, 22),
      last2: TEAM_MEMBERS.slice(22, 26),
    }),
    [],
  )

  // Mobile team member groups - organizing all 24 members into 6 groups of 4
  const mobileTeamGroups = useMemo(
    () => [
      TEAM_MEMBERS.slice(0, 4), // Group 1: Members 1-4
      TEAM_MEMBERS.slice(4, 8), // Group 2: Members 5-8
      TEAM_MEMBERS.slice(8, 12), // Group 3: Members 9-12
      TEAM_MEMBERS.slice(12, 16), // Group 4: Members 13-16
      TEAM_MEMBERS.slice(16, 20), // Group 5: Members 17-20
      TEAM_MEMBERS.slice(20, 26), // Group 6: Members 21-24
    ],
    [],
  )

  const handleImageClick = (id: number) => {
    setActiveImageId(id === -1 ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#f0f0d5] flex flex-col items-center justify-start px-4 py-8 overflow-y-auto relative">
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Desktop Layout (>= 1024px) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-12 place-items-center">
            {/* Row 1: 5 images */}
            {teamSlices.first5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={index * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 2: 5 images */}
            {teamSlices.second5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 5) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 3: 2 images with title in middle */}
            <TeamMemberCard
              member={teamSlices.member10}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
            <div className="col-span-3 flex justify-center">
              <AnimatedTitle
                isMounted={isMounted}
                className="text-4xl lg:text-5xl font-bold text-gray-900 drop-shadow-lg text-center"
                delay={1.2}
              />
            </div>
            <TeamMemberCard
              member={teamSlices.member11}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
            {/* Row 4: 5 images */}
            {teamSlices.third5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 13) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 5: 5 images */}
            {teamSlices.fourth5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 18) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 6: 2 images centered in first 2 columns */}
            {teamSlices.last2.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 23) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            <div className="col-span-3"></div>
          </div>
        </div>

        {/* Tablet Layout (640px - 1024px) */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-5 gap-8 place-items-center max-w-4xl mx-auto">
            {/* Row 1: 5 images */}
            {teamSlices.first5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={index * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 2: 5 images */}
            {teamSlices.second5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 5) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 3: 2 images with title in middle */}
            <TeamMemberCard
              member={teamSlices.member10}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
            <div className="col-span-3 flex justify-center">
              <AnimatedTitle
                isMounted={isMounted}
                className="text-2xl sm:text-3xl font-bold text-gray-900 drop-shadow-lg text-center"
                delay={1.2}
              />
            </div>
            <TeamMemberCard
              member={teamSlices.member11}
              delay={1.0}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
            {/* Row 4: 5 images */}
            {teamSlices.third5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 13) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 5: 5 images */}
            {teamSlices.fourth5.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 18) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Row 6: 2 images in first 2 columns */}
            {teamSlices.last2.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                delay={(index + 23) * 0.05}
                activeImageId={activeImageId}
                onImageClick={handleImageClick}
              />
            ))}
            <div className="col-span-3"></div>
          </div>
        </div>

        {/* Mobile Layout (< 640px) */}
        <div className="block sm:hidden">
          <div className="flex flex-col items-center max-w-sm mx-auto">
            {/* Mobile Title */}
            <MobileTitle isMounted={isMounted} delay={0.2} />

            {/* Mobile Grid - Rotating groups of 4 members vertically */}
            <motion.div
              key={currentGroupIndex}
              className="flex flex-col gap-6 items-center"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.1,
              }}
            >
              {mobileTeamGroups[currentGroupIndex].map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  delay={index * 0.1}
                  activeImageId={activeImageId}
                  onImageClick={handleImageClick}
                />
              ))}
            </motion.div>

            {/* Group indicator dots */}
            <div className="flex gap-2 mt-6">
              {mobileTeamGroups.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentGroupIndex ? "bg-yellow-500" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamMemberComponent