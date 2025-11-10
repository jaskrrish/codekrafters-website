"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useMemo, memo } from "react"

interface TeamMember {
  id: number
  name: string
  role: string
  imagePath: string
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
  { id: 15, name: "Abhinav KA", role: "Operations Head", imagePath: "/images/Abhinav.png" },
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
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const isActive = activeImageId === member.id
  const isPresident = member.id === 1

  useEffect(() => {
    setIsMounted(true)
    const updateDevice = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    updateDevice()
    window.addEventListener("resize", updateDevice)
    return () => window.removeEventListener("resize", updateDevice)
  }, [])

  const handleCardClick = () => {
    if ((isMobile || isTablet) && onImageClick) {
      onImageClick(isActive ? -1 : member.id)
    }
  }

  const getContainerStyle = () => {
    if (isMobile) return { width: "280px", height: "300px" }
    if (isTablet) return { width: "160px", height: "172px" }
    return { width: "213px", height: "254px" }
  }

  const roleLabel = getRoleLabel(member.role)

  if (!isMounted) {
    return (
      <div className="relative">
        <div style={getContainerStyle()}>
          <div className="w-full h-full overflow-hidden shadow-lg bg-yellow-400 relative rounded-lg flex flex-col">
            <div className="h-1/4 flex items-center justify-center bg-yellow-400">
              <span className="font-bold text-black text-center px-2 uppercase" style={{ fontSize: '20px', letterSpacing: '1.5px' }}>
                {roleLabel}
              </span>
            </div>
            <div className="h-3/4 relative overflow-hidden">
              <img
                src={member.imagePath}
                alt={member.name}
                className={`w-full h-full object-cover ${isPresident ? 'object-center' : 'object-top'}`}
              />
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
          cursor: isMobile || isTablet ? "pointer" : "default",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={!isMobile && !isTablet ? { scale: 1.05, transition: { duration: 0.2 } } : {}}
        onClick={handleCardClick}
      >
        <div className="w-full h-full overflow-hidden shadow-xl bg-yellow-400 ring-2 ring-white/20 group-hover:ring-4 group-hover:ring-white/40 transition-all duration-300 relative flex flex-col rounded-lg">
          {/* Role label */}
          <div className="h-1/4 flex items-center justify-center bg-yellow-400">
            <span 
              className="font-bold text-black text-center px-2 uppercase"
              style={{ 
                fontSize: isMobile ? '18px' : '20px', 
                letterSpacing: '1.5px',
                fontWeight: '700'
              }}
            >
              {roleLabel}
            </span>
          </div>
          
          {/* Image container */}
          <div className="h-3/4 relative overflow-hidden">
            <img
              src={member.imagePath}
              alt={member.name}
              className={`w-full h-full object-cover transition-all duration-300 ${isPresident ? 'object-center' : 'object-top'}`}
              loading={member.id <= 12 ? "eager" : "lazy"}
            />
          </div>

          {/* Hover/Active overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-2 transition-opacity duration-300 ${
              !isMobile && !isTablet
                ? "opacity-0 group-hover:opacity-100"
                : isActive
                  ? "opacity-100"
                  : "opacity-0"
            }`}
          >
            <p className={`font-bold text-white leading-tight ${isMobile ? 'text-sm' : 'text-xs'}`}>
              {member.name}
            </p>
            <p className={`text-white leading-tight ${isMobile ? 'text-xs' : 'text-xs'}`}>
              {member.role}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
})

TeamMemberCard.displayName = "TeamMemberCard"

// Animated Title Component
const AnimatedTitle = memo<{ isMounted: boolean; isMobile?: boolean; delay: number }>(
  ({ isMounted, isMobile = false, delay }) => {
    const content = (
      <div className={`flex flex-col items-center justify-center ${isMobile ? 'mb-6' : ''}`}>
        <span className={`font-extrabold ${isMobile ? 'text-xl' : 'text-4xl lg:text-5xl'}`}>
          CODE<span className="text-yellow-500">KRAFTERS</span>
        </span>
        <span className={`font-semibold block ${isMobile ? 'text-base text-gray-800' : 'text-2xl'}`}>
          CORE TEAM
        </span>
      </div>
    )

    if (!isMounted) return content

    return (
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      >
        {content}
      </motion.div>
    )
  }
)

AnimatedTitle.displayName = "AnimatedTitle"

const TeamMemberComponent = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [activeImageId, setActiveImageId] = useState<number | null>(null)
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-rotate mobile groups
  useEffect(() => {
    if (!isMobile) return
    
    const interval = setInterval(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % 7)
    }, 5000)

    return () => clearInterval(interval)
  }, [isMobile])

  // Team slices for desktop/tablet
  const teamSlices = useMemo(
    () => ({
      first5: TEAM_MEMBERS.slice(0, 5),
      second5: TEAM_MEMBERS.slice(5, 10),
      member10: TEAM_MEMBERS[10],
      member11: TEAM_MEMBERS[11],
      third5: TEAM_MEMBERS.slice(12, 17),
      fourth5: TEAM_MEMBERS.slice(17, 22),
      last4: TEAM_MEMBERS.slice(22, 26),
    }),
    []
  )

  // Mobile groups - 2x2 grid
  const mobileTeamGroups = useMemo(
    () => [
      TEAM_MEMBERS.slice(0, 4),
      TEAM_MEMBERS.slice(4, 8),
      TEAM_MEMBERS.slice(8, 12),
      TEAM_MEMBERS.slice(12, 16),
      TEAM_MEMBERS.slice(16, 20),
      TEAM_MEMBERS.slice(20, 24),
      TEAM_MEMBERS.slice(24, 26), // Last 2
    ],
    []
  )

  const handleImageClick = (id: number) => {
    setActiveImageId(id === -1 ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#f0f0d5] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Desktop Layout (>= 1024px) */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5 gap-8 xl:gap-12 place-items-center">
          {/* Row 1 */}
          {teamSlices.first5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={index * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          {/* Row 2 */}
          {teamSlices.second5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 5) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          {/* Row 3: Title in middle */}
          <TeamMemberCard
            member={teamSlices.member10}
            delay={0.5}
            activeImageId={activeImageId}
            onImageClick={handleImageClick}
          />
          <div className="col-span-3 flex justify-center">
            <AnimatedTitle isMounted={isMounted} delay={0.6} />
          </div>
          <TeamMemberCard
            member={teamSlices.member11}
            delay={0.5}
            activeImageId={activeImageId}
            onImageClick={handleImageClick}
          />
          {/* Row 4 */}
          {teamSlices.third5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 13) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          {/* Row 5 */}
          {teamSlices.fourth5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 18) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          {/* Row 6: Last 4 */}
          {teamSlices.last4.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 23) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Tablet Layout (640px - 1024px) */}
      <div className="hidden sm:block lg:hidden">
        <div className="grid grid-cols-5 gap-6 place-items-center max-w-4xl mx-auto">
          {teamSlices.first5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={index * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          {teamSlices.second5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 5) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          <TeamMemberCard
            member={teamSlices.member10}
            delay={0.5}
            activeImageId={activeImageId}
            onImageClick={handleImageClick}
          />
          <div className="col-span-3 flex justify-center">
            <AnimatedTitle isMounted={isMounted} delay={0.6} />
          </div>
          <TeamMemberCard
            member={teamSlices.member11}
            delay={0.5}
            activeImageId={activeImageId}
            onImageClick={handleImageClick}
          />
          {teamSlices.third5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 13) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          {teamSlices.fourth5.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 18) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          {teamSlices.last4.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              delay={(index + 23) * 0.05}
              activeImageId={activeImageId}
              onImageClick={handleImageClick}
            />
          ))}
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Mobile Layout (< 640px) - 2x2 Grid */}
      <div className="block sm:hidden w-full max-w-lg mx-auto">
        <AnimatedTitle isMounted={isMounted} isMobile delay={0.2} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroupIndex}
            className="grid grid-cols-2 gap-4 place-items-center px-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
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
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6">
          {mobileTeamGroups.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGroupIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentGroupIndex ? "bg-yellow-500 w-6" : "bg-gray-400"
              }`}
              aria-label={`Go to group ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress indicator */}
        <div className="text-center mt-3 text-sm text-gray-700">
          Group {currentGroupIndex + 1} of {mobileTeamGroups.length}
        </div>
      </div>
    </div>
  )
}

export default TeamMemberComponent