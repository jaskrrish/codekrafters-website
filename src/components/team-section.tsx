"use client"

import { useRef, useState, useLayoutEffect } from "react"
import DivisionCard from "./division-card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useScrollTriggerRefresh } from "@/lib/UseScrollTrigger"
  
const divisions = [
  {
    id: 1,
    name: "President",
    quote: "Leading the club with vision and passion.",
    images: ["/images/PRESIDENT.png"],
    members: [{ name: "Jas K Krish Singh", designation: "President" }],
  },
  {
    id: 2,
    name: "Operations Heads",
    quote: "Ensuring everything runs smoothly behind the scenes.",
    images: ["/images/Abhinav4.png", "/images/Yashvanth.png"],
    members: [
      { name: "Abhinav", designation: "Head" },
      { name: "Yaswanth", designation: "Head" },
    ],
  },
  {
    id: 3,
    name: "Content Team",
    quote: "Creating content that inspires and engages.",
    images: ["/images/Aaron.png", "/images/Hari-prasad.png", "/images/hatim.png"],
    members: [
      { name: "Aaron", designation: "Head" },
      { name: "Hari Prasad Krishnamurthy", designation: "Head" },
      { name: "Noorul Hatim", designation: "Lead" },
    ],
  },
  {
    id: 4,
    name: "Creatives",
    quote: "Bringing ideas to life through visuals and design.",
    images: ["/images/bhavna.png", "/images/Akash.png", "/images/Sashank.png"],
    members: [
      { name: "Bhavna", designation: "Head" },
      { name: "Akash Ravindran", designation: "Head" },
      { name: "Sashank", designation: "Lead" },
    ],
  },
  {
    id: 5,
    name: "Competitive Programming",
    quote: "Coding challenges that sharpen our skills.",
    images: ["/images/shashi.png", "/images/Manasa.png", "/images/mrudu.png"],
    members: [
      { name: "Shashikumar", designation: "Head" },
      { name: "Manasa", designation: "Lead" },
      { name: "Mrudhubashni", designation: "Lead" },
    ],
  },
  {
    id: 6,
    name: "Web3 Team",
    quote: "Exploring the decentralized future.",
    images: ["/images/Deepanshu.png", "/images/Achyuth.png", "/images/Sanjay.png"],
    members: [
      { name: "Deepanshu", designation: "Head" },
      { name: "Achyuth", designation: "Lead" },
      { name: "Sanjay Ganesh", designation: "Lead" },
    ],
  },
  {
    id: 7,
    name: "Cybersecurity Team",
    quote: "Protecting our digital assets and information.",
    images: ["/images/Dhanush-Adithyan.png", "/images/Rishit.png", "/images/Adithya.png"],
    members: [
      { name: "Dhanush Adithyan", designation: "Head" },
      { name: "Archangel", designation: "Head" },
      { name: "Adithya", designation: "Lead" },
    ],
  },
  {
    id: 8,
    name: "PR & Management",
    quote: "Connecting people and managing the club image.",
    images: ["/images/Kavya.png", "/images/pragathi.png", "/images/Siddharth.png", "/images/Satya.png"],
    members: [
      { name: "Kavya", designation: "Head" },
      { name: "Pragathi", designation: "Head" },
      { name: "Siddarth", designation: "Lead" },
      { name: "Satya", designation: "Lead" },
    ],
  },
  {
    id: 9,
    name: "Development Team",
    quote: "Building tools and platforms to empower the club.",
    images: ["/images/Nitesh.png", "/images/Srivatsa.png", "/images/Vikas.png", "/images/VinothAnandgani.png"],
    members: [
      { name: "Nithesh", designation: "Head" },
      { name: "Srivatsa", designation: "Head" },
      { name: "Vikas", designation: "Lead" },
      { name: "Vinoth", designation: "Lead" },
    ],
  },
]

export default function TeamSection() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
  }
  
  // Use the custom hook to ensure ScrollTrigger refreshes properly
  useScrollTriggerRefresh()

  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeDivision, setActiveDivision] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  // Use a fixed yellow background color for consistency
  const [bgColor, setBgColor] = useState("var(--retro-bg)")

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || typeof window === 'undefined') return

    // Calculate total steps based on division images
    let totalSteps = 0
    
    // Set fixed number of steps for each division
    // First division (President) gets exactly 13 steps regardless of image count
    const stepsPerDivision = divisions.map(d => d.id === 1 ? 13 : d.images.length);
    
    // Calculate total steps
    totalSteps = stepsPerDivision.reduce((sum, steps) => sum + steps, 0);

    // Add a small margin to ensure we don't hit the end of scroll exactly
    // This helps prevent the blank screen issue
    totalSteps -= 0.5;

    // Create the GSAP context and ScrollTrigger
    const ctx = gsap.context(() => {
      // Create the timeline with ScrollTrigger
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top", 
          // Increase scroll distance to accommodate more steps in President division
          end: `+=${(divisions.length - 1 + 13/6) * 90}%`, // Adjusted for the 13 steps in President
          pin: true,
          scrub: 0.8, // Smoother scrub effect
          anticipatePin: 1,
          pinSpacing: true, // Ensure proper spacing
          fastScrollEnd: true, // Better handling of fast scrolls
          preventOverlaps: true, // Prevent section overlapping
          onUpdate: (self) => {
            // Get the scroll progress and clamp it to avoid edge issues
            const progress = self.progress;
            const clampedProgress = Math.min(progress, 0.98);
            
            // Calculate current step based on progress
            const currentStep = Math.min(Math.floor(clampedProgress * totalSteps), totalSteps - 1);

            // Determine which division and image to show
            let stepCount = 0;
            let newDivision = 0;
            let newImageIndex = 0;
            
            // Create steps map for each division
            const stepsPerDivision = divisions.map(d => d.id === 1 ? 12 : d.images.length);

            // Loop through divisions to find current position
            for (let i = 0; i < divisions.length; i++) {
              const divisionSteps = stepsPerDivision[i];
              
              if (currentStep < stepCount + divisionSteps) {
                newDivision = i;
                
                // For President division (id 1)
                if (divisions[i].id === 1) {
                  // Get step within this division
                  const stepWithinDivision = currentStep - stepCount;
                  
                  // Check if we've completed all steps for President
                  if (stepWithinDivision >= 13) {
                    // Move to next division
                    if (i + 1 < divisions.length) {
                      newDivision = i + 1;
                      newImageIndex = 0;
                    }
                  } else {
                    // For the single image of President, repeat the same image but change
                    // other visual aspects based on the step count
                    newImageIndex = 0; // Always show first (only) image
                    
                    // We can update other visual aspects in render based on step if needed
                    // For now, just log the step to verify it's working
                    console.log(`President division, step ${stepWithinDivision} of 13`);
                  }
                } else {
                  // Normal behavior for other divisions - cycle through images
                  newImageIndex = Math.min(currentStep - stepCount, divisions[i].images.length - 1);
                }
                break;
              }
              
              stepCount += divisionSteps;
            }

            // Update state variables
            setActiveDivision(newDivision);
            setCurrentImageIndex(newImageIndex);
            setScrollProgress(clampedProgress * 100);

            // Ensure the section has the yellow background
            if (section) {
              section.style.backgroundColor = "var(--retro-bg)";
              section.classList.add("team-section");
            }
          },
          onLeave: () => {
            // When leaving this section, DON'T clear all props since that removes our background
            // Only clear specific properties we need to reset
            gsap.set(section, { 
              clearProps: "transform,opacity,visibility"
            });
            
            // Make sure the background color is preserved
            if (section) {
              section.style.backgroundColor = "var(--retro-bg)";
              section.classList.add("team-section");
            }
          },
          onEnterBack: () => {
            // When scrolling back into this section
            ScrollTrigger.refresh();
            
            // Explicitly set the background to yellow
            if (section) {
              section.style.backgroundColor = "var(--retro-bg)";
              section.classList.add("team-section");
            }
          }
        },
      });
      
      // Add a small animation to smooth the transition to the next section
      gsap.to("#events", {
        scrollTrigger: {
          trigger: "#events",
          start: "top bottom-=10%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    // Cleanup function
    return () => {
      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || 
            trigger.vars.trigger === "#events") {
          trigger.kill();
        }
      });
      ctx.revert(); // Revert the GSAP context
    };
  }, []);

  const handleDivisionClick = (index: number) => {
    setActiveDivision(index)
    setCurrentImageIndex(0)
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--retro-bg)", // Always use the CSS variable directly
        backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%, transparent)`,
        backgroundSize: "40px 40px",
        transition: "background-color 0.5s ease",
      }}
      className="team-section relative w-full h-screen overflow-hidden will-change-transform"
    >
      <div className="absolute inset-0 pointer-events-none" />

      {/* Main Content */}
      <div ref={containerRef} className="relative w-full h-full">
        <div
          className="flex h-full transition-all duration-700 ease-out"
          style={{
            transform: `translateX(-${activeDivision * 100}%)`,
          }}
        >
          {divisions.map((division) => (
            <div key={division.id} className="w-full h-full flex-shrink-0">
              <DivisionCard
                division={division}
                currentImageIndex={currentImageIndex}
                isActive={divisions[activeDivision].id === division.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          backgroundColor: "var(--retro-primary)",
          borderTop: "4px solid var(--retro-secondary)",
        }}
        className="absolute bottom-0 left-0 right-0 h-3 shadow-lg"
      >
        <div
          style={{
            backgroundColor: "var(--retro-secondary)",
            width: `${scrollProgress}%`,
          }}
          className="h-full transition-all duration-300 shadow-lg"
        />
      </div>

      {/* Division Buttons */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {divisions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDivisionClick(index)}
            style={{
              backgroundColor:
                index === activeDivision
                  ? "var(--retro-secondary)"
                  : "var(--retro-light)",
              color: "var(--retro-primary)",
              borderColor: "var(--retro-primary)",
              transform: index === activeDivision ? "scale(1.1)" : "scale(1)",
            }}
            className={`transition-all duration-300 font-black text-xs uppercase tracking-widest border-4 px-3 py-1 ${
              index === activeDivision ? "px-4 py-2 shadow-lg" : "hover:bg-retro-secondary"
            }`}
            aria-label={`Go to ${divisions[index].name} division`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Image Indicators */}
      <div
        style={{
          backgroundColor: "var(--retro-light)",
          borderColor: "var(--retro-primary)",
        }}
        className="absolute top-8 right-8 flex gap-2 z-10 px-4 py-3 border-4 shadow-lg"
      >
        {divisions[activeDivision].images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            style={{
              backgroundColor:
                currentImageIndex === index
                  ? "var(--retro-primary)"
                  : "var(--retro-secondary)",
              borderColor: "var(--retro-primary)",
              width: currentImageIndex === index ? "32px" : "12px",
            }}
            className="h-3 transition-all duration-300 border-2"
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          backgroundColor: "var(--retro-secondary)",
          color: "var(--retro-primary)",
          borderColor: "var(--retro-primary)",
        }}
        className="absolute top-8 left-8 text-sm z-10 px-4 py-2 border-4 font-black shadow-lg"
      >
        <p className="uppercase tracking-widest">↓ SCROLL ↓</p>
      </div>
    </section>
  )
}