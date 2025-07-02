"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const TeamHeaderComplete = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const teamMembers = [
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

  const TeamMemberCard = ({ member, delay = 0 }) => {
    if (!isMounted) {
      // Server-side render: simple version without animations or hover effects
      return (
        <div className="relative group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white relative">
              <img
                src={`https://i.pravatar.cc/150?img=${member.id}`}
                alt={`Team member ${member.id}`}
                className="w-full h-full object-cover grayscale transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-1 opacity-0 transition-opacity duration-300">
                <p
                  className="font-bold text-white text-[8px] sm:text-[9px] md:text-[10px] leading-tight drop-shadow-lg shadow-black/80"
                  style={{
                    textShadow:
                      "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {member.name}
                </p>
                <p
                  className="text-white text-[7px] sm:text-[8px] md:text-[9px] leading-tight drop-shadow-lg shadow-black/80"
                  style={{
                    textShadow:
                      "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Client-side render: full version with animations and hover effects
    return (
      <div className="relative group">
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white ring-2 ring-white/20 group-hover:ring-4 group-hover:ring-white/40 transition-all duration-300 relative">
            <img
              src={`https://i.pravatar.cc/150?img=${member.id}`}
              alt={`Team member ${member.id}`}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p
                className="font-bold text-white text-[8px] sm:text-[9px] md:text-[10px] leading-tight drop-shadow-lg shadow-black/80"
                style={{
                  textShadow:
                    "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {member.name}
              </p>
              <p
                className="text-white text-[7px] sm:text-[8px] md:text-[9px] leading-tight drop-shadow-lg shadow-black/80"
                style={{
                  textShadow:
                    "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {member.role}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <header className="h-screen bg-[#FFF5D7] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Desktop Layout (>= 768px) - ORIGINAL LAYOUT PRESERVED */}
      <div className="hidden md:block">
        {/* Row 1: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamMembers.slice(0, 5).map((member, index) => (
            <TeamMemberCard key={`desktop-row1-${member.id}`} member={member} delay={index * 0.05} />
          ))}
        </div>

        {/* Row 2: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamMembers.slice(5, 10).map((member, index) => (
            <TeamMemberCard key={`desktop-row2-${member.id}`} member={member} delay={(index + 5) * 0.05} />
          ))}
        </div>

        {/* Row 3: 2 images (left and right) with title in middle */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {/* Left image */}
          <TeamMemberCard member={teamMembers[10]} delay={1.0} />

          {/* Title section in middle */}
          {isMounted ? (
            <motion.div
              className="flex flex-col items-center justify-center"
              style={{ width: "calc(3 * 96px + 2 * 16px)" }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 drop-shadow-lg text-center">
                CODE<span className="text-yellow-500">KRAFTERS</span> CORE TEAM
              </h3>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center" style={{ width: "calc(3 * 96px + 2 * 16px)" }}>
              <h3 className="text-3xl font-bold text-gray-900 drop-shadow-lg text-center">
                CODE<span className="text-yellow-500">KRAFTERS</span> CORE TEAM
              </h3>
            </div>
          )}

          {/* Right image */}
          <TeamMemberCard member={teamMembers[11]} delay={1.0} />
        </div>

        {/* Row 4: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamMembers.slice(12, 17).map((member, index) => (
            <TeamMemberCard key={`desktop-row4-${member.id}`} member={member} delay={(index + 13) * 0.05} />
          ))}
        </div>

        {/* Row 5: 5 images */}
        <div className="flex justify-center items-center gap-4 mb-4">
          {teamMembers.slice(17, 22).map((member, index) => (
            <TeamMemberCard key={`desktop-row5-${member.id}`} member={member} delay={(index + 18) * 0.05} />
          ))}
        </div>

        {/* Row 6: 2 images only */}
        <div className="flex justify-center items-center gap-4">
          <div className="flex gap-4" style={{ width: "calc(5 * 96px + 4 * 16px)", justifyContent: "flex-start" }}>
            {teamMembers.slice(22, 24).map((member, index) => (
              <TeamMemberCard key={`desktop-row6-${member.id}`} member={member} delay={(index + 23) * 0.05} />
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Layout (640px - 768px) */}
      <div className="hidden sm:block md:hidden">
        {/* Row 1: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamMembers.slice(0, 4).map((member, index) => (
            <TeamMemberCard key={`tablet-row1-${member.id}`} member={member} delay={index * 0.05} />
          ))}
        </div>

        {/* Row 2: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamMembers.slice(4, 8).map((member, index) => (
            <TeamMemberCard key={`tablet-row2-${member.id}`} member={member} delay={(index + 4) * 0.05} />
          ))}
        </div>

        {/* Row 3: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-4">
          {teamMembers.slice(8, 12).map((member, index) => (
            <TeamMemberCard key={`tablet-row3-${member.id}`} member={member} delay={(index + 8) * 0.05} />
          ))}
        </div>

        {/* Title Section */}
        {isMounted ? (
          <motion.div
            className="flex flex-col items-center justify-center mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 drop-shadow-lg text-center">
              CODE<span className="text-yellow-500">KRAFTERS</span> CORE TEAM
            </h3>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900 drop-shadow-lg text-center">
              CODE<span className="text-yellow-500">KRAFTERS</span> CORE TEAM
            </h3>
          </div>
        )}

        {/* Row 4: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamMembers.slice(12, 16).map((member, index) => (
            <TeamMemberCard key={`tablet-row4-${member.id}`} member={member} delay={(index + 12) * 0.05} />
          ))}
        </div>

        {/* Row 5: 4 images */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {teamMembers.slice(16, 20).map((member, index) => (
            <TeamMemberCard key={`tablet-row5-${member.id}`} member={member} delay={(index + 16) * 0.05} />
          ))}
        </div>

        {/* Row 6: 4 images */}
        <div className="flex justify-center items-center gap-3">
          {teamMembers.slice(20, 24).map((member, index) => (
            <TeamMemberCard key={`tablet-row6-${member.id}`} member={member} delay={(index + 20) * 0.05} />
          ))}
        </div>
      </div>

      {/* Mobile Layout (< 640px) */}
      <div className="block sm:hidden">
        {/* Row 1: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamMembers.slice(0, 5).map((member, index) => (
            <TeamMemberCard key={`mobile-row1-${member.id}`} member={member} delay={index * 0.05} />
          ))}
        </div>

        {/* Row 2: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamMembers.slice(5, 10).map((member, index) => (
            <TeamMemberCard key={`mobile-row2-${member.id}`} member={member} delay={(index + 5) * 0.05} />
          ))}
        </div>

        {/* Row 3: 2 images (left and right) with title in middle */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {/* Left image */}
          <TeamMemberCard member={teamMembers[10]} delay={1.0} />

          {/* Title section in middle */}
          {isMounted ? (
            <motion.div
              className="flex flex-col items-center justify-center"
              style={{ width: "calc(3 * 64px + 2 * 8px)" }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            >
              <h3 className="text-sm font-bold text-gray-900 drop-shadow-lg text-center leading-tight">
                CODE<span className="text-yellow-500">KRAFTERS</span>
              </h3>
              <h4 className="text-xs font-semibold text-gray-800 text-center">CORE TEAM</h4>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center" style={{ width: "calc(3 * 64px + 2 * 8px)" }}>
              <h3 className="text-sm font-bold text-gray-900 drop-shadow-lg text-center leading-tight">
                CODE<span className="text-yellow-500">KRAFTERS</span>
              </h3>
              <h4 className="text-xs font-semibold text-gray-800 text-center">CORE TEAM</h4>
            </div>
          )}

          {/* Right image */}
          <TeamMemberCard member={teamMembers[11]} delay={1.0} />
        </div>

        {/* Row 4: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamMembers.slice(12, 17).map((member, index) => (
            <TeamMemberCard key={`mobile-row4-${member.id}`} member={member} delay={(index + 13) * 0.05} />
          ))}
        </div>

        {/* Row 5: 5 images */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {teamMembers.slice(17, 22).map((member, index) => (
            <TeamMemberCard key={`mobile-row5-${member.id}`} member={member} delay={(index + 18) * 0.05} />
          ))}
        </div>

        {/* Row 6: 2 images only */}
        <div className="flex justify-center items-center gap-2">
          <div className="flex gap-2" style={{ width: "calc(5 * 64px + 4 * 8px)", justifyContent: "flex-start" }}>
            {teamMembers.slice(22, 24).map((member, index) => (
              <TeamMemberCard key={`mobile-row6-${member.id}`} member={member} delay={(index + 23) * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TeamHeaderComplete