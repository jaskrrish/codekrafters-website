"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useMemo, memo } from "react"

interface TeamMember {
  id: number
  name: string
  role: string
}

interface TeamMemberCardProps {
  member: TeamMember
  delay?: number
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: "John Smith", role: "CEO & Founder" },
  { id: 2, name: "Sarah Johnson", role: "CTO" },
  { id: 3, name: "Mike Chen", role: "Lead Designer" },
  { id: 4, name: "Emma Davis", role: "Product Manager" },
  { id: 5, name: "Alex Wilson", role: "Developer" },
  { id: 6, name: "Lisa Brown", role: "Marketing Lead" },
  { id: 7, name: "David Lee", role: "Backend Developer" },
  { id: 8, name: "Amy Zhang", role: "UX Designer" },
  { id: 9, name: "Tom Wilson", role: "DevOps Engineer" },
  { id: 10, name: "Kate Miller", role: "Frontend Developer" },
  { id: 11, name: "Ryan Garcia", role: "Data Scientist" },
  { id: 12, name: "Sophie Turner", role: "QA Engineer" },
  { id: 13, name: "James Rodriguez", role: "Sales Manager" },
  { id: 14, name: "Olivia Kim", role: "Content Writer" },
  { id: 15, name: "Chris Evans", role: "System Admin" },
  { id: 16, name: "Maya Patel", role: "Business Analyst" },
  { id: 17, name: "Jake Thompson", role: "Mobile Developer" },
  { id: 18, name: "Rachel Green", role: "HR Manager" },
  { id: 19, name: "Mark Johnson", role: "Security Expert" },
  { id: 20, name: "Anna White", role: "Product Designer" },
  { id: 21, name: "Peter Parker", role: "Full Stack Developer" },
  { id: 22, name: "Grace Liu", role: "AI Specialist" },
  { id: 23, name: "Sam Wilson", role: "Cloud Architect" },
  { id: 24, name: "Zoe Adams", role: "Operations Manager" },
]

// Memoized team member card component
const TeamMemberCard = memo<TeamMemberCardProps>(({ member, delay = 0 }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    setIsMounted(true)
    // Set device type on mount and on resize
    const updateDeviceType = () => {
      if (window.innerWidth < 640) setDeviceType('mobile')
      else if (window.innerWidth < 1024) setDeviceType('tablet')
      else setDeviceType('desktop')
    }
    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  const textShadowStyle = useMemo(() => ({
    textShadow: "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)"
  }), [])

  // Toggle overlay and color on mobile/tablet
  const handleCardClick = () => {
    if (deviceType === 'mobile' || deviceType === 'tablet') {
      setShowOverlay((prev) => !prev)
    }
  }

  if (!isMounted) {
    return (
      <div className="relative group">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white relative">
            <Image
              src={`https://i.pravatar.cc/150?img=${member.id}`}
              alt={member.name}
              width={150}
              height={150}
              className="w-full h-full object-cover grayscale transition-all duration-300"
              priority={member.id <= 12}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-1 opacity-0 transition-opacity duration-300">
              <p
                className="font-bold text-white text-[8px] sm:text-[9px] md:text-[10px] leading-tight"
                style={textShadowStyle}
              >
                {member.name}
              </p>
              <p
                className="text-white text-[7px] sm:text-[8px] md:text-[9px] leading-tight"
                style={textShadowStyle}
              >
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
        className="w-16 h-16 sm:w-[82px] sm:h-[82px] md:w-[98px] md:h-[98px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={deviceType === 'desktop' ? {
          scale: 1.1,
          transition: { duration: 0.2 },
        } : {}}
        onClick={handleCardClick}
        style={{ cursor: (deviceType === 'mobile' || deviceType === 'tablet') ? 'pointer' : 'default' }}
      >
        <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white ring-2 ring-white/20 group-hover:ring-4 group-hover:ring-white/40 transition-all duration-300 relative">
          <Image
            src={`https://i.pravatar.cc/150?img=${member.id}`}
            alt={member.name}
            width={150}
            height={150}
            className={
              `w-full h-full object-cover transition-all duration-300 ` +
              (deviceType === 'desktop'
                ? 'grayscale group-hover:grayscale-0'
                : (showOverlay ? '' : 'grayscale'))
            }
            priority={member.id <= 12}
          />
          <div
            className={
              `absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-1 transition-opacity duration-300 ` +
              (deviceType === 'desktop'
                ? 'opacity-0 group-hover:opacity-100'
                : (showOverlay ? 'opacity-100' : 'opacity-0'))
            }
          >
            <p
              className="font-bold text-white text-[8px] sm:text-[9px] md:text-[10px] leading-tight"
              style={textShadowStyle}
            >
              {member.name}
            </p>
            <p
              className="text-white text-[7px] sm:text-[8px] md:text-[9px] leading-tight"
              style={textShadowStyle}
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
        <span>
          CODE<span className="text-yellow-500">KRAFTERS</span>
        </span>
        <span className="block">CORE TEAM</span>
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
  }
)

AnimatedTitle.displayName = "AnimatedTitle"

// Memoized mobile title component
const MobileTitle = memo<{ isMounted: boolean; delay: number }>(({ isMounted, delay }) => {
  const content = (
    <div className="flex flex-col items-center justify-center">
      <span className="text-sm font-bold text-gray-900 drop-shadow-lg text-center leading-tight">
        CODE<span className="text-yellow-500">KRAFTERS</span>
      </span>
      <span className="text-xs font-semibold text-gray-800 text-center">CORE TEAM</span>
    </div>
  )

  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ width: "calc(3 * 64px + 2 * 8px)" }}>
        {content}
      </div>
    )
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      style={{ width: "calc(3 * 64px + 2 * 8px)" }}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {content}
    </motion.div>
  )
})

MobileTitle.displayName = "MobileTitle"

const TeamHeaderComplete = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Memoized team member slices
  const teamSlices = useMemo(() => ({
    first5: TEAM_MEMBERS.slice(0, 5),
    second5: TEAM_MEMBERS.slice(5, 10),
    member10: TEAM_MEMBERS[10],
    member11: TEAM_MEMBERS[11],
    third5: TEAM_MEMBERS.slice(12, 17),
    fourth5: TEAM_MEMBERS.slice(17, 22),
    last2: TEAM_MEMBERS.slice(22, 24),
    // Tablet slices
    tablet1: TEAM_MEMBERS.slice(0, 4),
    tablet2: TEAM_MEMBERS.slice(4, 8),
    tablet3: TEAM_MEMBERS.slice(8, 12),
    tablet4: TEAM_MEMBERS.slice(12, 16),
    tablet5: TEAM_MEMBERS.slice(16, 20),
    tablet6: TEAM_MEMBERS.slice(20, 24),
  }), [])

  return (
    <header className="h-screen bg-[#FFF5D7] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Desktop Layout (>= 768px) */}
      <div className="hidden md:block">
        {/* Row 1: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamSlices.first5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={index * 0.05} />
          ))}
        </div>

        {/* Row 2: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamSlices.second5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 5) * 0.05} />
          ))}
        </div>

        {/* Row 3: 2 images with title in middle */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <TeamMemberCard member={teamSlices.member10} delay={1.0} />
          
          <div style={{ width: "calc(3 * 96px + 2 * 16px)" }}>
            <AnimatedTitle
              isMounted={isMounted}
              className="text-3xl font-bold text-gray-900 drop-shadow-lg text-center"
              delay={1.2}
            />
          </div>

          <TeamMemberCard member={teamSlices.member11} delay={1.0} />
        </div>

        {/* Row 4: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamSlices.third5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 13) * 0.05} />
          ))}
        </div>

        {/* Row 5: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamSlices.fourth5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 18) * 0.05} />
          ))}
        </div>

        {/* Row 6: 2 images only */}
        <div className="flex justify-center items-center gap-4">
          <div className="flex gap-4" style={{ width: "calc(5 * 96px + 4 * 16px)", justifyContent: "flex-start" }}>
            {teamSlices.last2.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} delay={(index + 23) * 0.05} />
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Layout (640px - 768px) */}
      <div className="hidden sm:block md:hidden">
        {/* Row 1: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamSlices.tablet1.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={index * 0.05} />
          ))}
        </div>

        {/* Row 2: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamSlices.tablet2.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 4) * 0.05} />
          ))}
        </div>

        {/* Row 3: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-4">
          {teamSlices.tablet3.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 8) * 0.05} />
          ))}
        </div>

        {/* Title Section */}
        <div className="mb-4">
          <AnimatedTitle
            isMounted={isMounted}
            className="text-2xl font-bold text-gray-900 drop-shadow-lg text-center"
            delay={0.8}
          />
        </div>

        {/* Row 4: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamSlices.tablet4.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 12) * 0.05} />
          ))}
        </div>

        {/* Row 5: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamSlices.tablet5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 16) * 0.05} />
          ))}
        </div>

        {/* Row 6: 4 images */}
        <div className="flex justify-center items-center gap-3">
          {teamSlices.tablet6.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 20) * 0.05} />
          ))}
        </div>
      </div>

      {/* Mobile Layout (< 640px) */}
      <div className="block sm:hidden">
        {/* Row 1: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamSlices.first5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={index * 0.05} />
          ))}
        </div>

        {/* Row 2: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamSlices.second5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 5) * 0.05} />
          ))}
        </div>

        {/* Row 3: 2 images with title in middle */}
        <div className="flex justify-center items-center gap-2 mb-2">
          <TeamMemberCard member={teamSlices.member10} delay={1.0} />
          <MobileTitle isMounted={isMounted} delay={1.2} />
          <TeamMemberCard member={teamSlices.member11} delay={1.0} />
        </div>

        {/* Row 4: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamSlices.third5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 13) * 0.05} />
          ))}
        </div>

        {/* Row 5: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamSlices.fourth5.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} delay={(index + 18) * 0.05} />
          ))}
        </div>

        {/* Row 6: 2 images only */}
        <div className="flex justify-center items-center gap-2">
          <div className="flex gap-2" style={{ width: "calc(5 * 64px + 4 * 8px)", justifyContent: "flex-start" }}>
            {teamSlices.last2.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} delay={(index + 23) * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TeamHeaderComplete