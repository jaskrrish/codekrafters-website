"use client";
import ReactLenis, { useLenis } from "lenis/react";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";

function StoryComponent() {
  gsap.registerPlugin(ScrollTrigger);
  
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef(null);
  
  // Section refs
  const smthDivRef = useRef<HTMLDivElement>(null);
  const anotherDivRef = useRef<HTMLDivElement>(null);
  const walkingRef = useRef<HTMLDivElement>(null);
  const ckBadgeRef = useRef<HTMLDivElement>(null);
  
  // Desktop refs
  const bgLg = useRef<HTMLImageElement>(null);
  const manEnteringRef = useRef<HTMLImageElement>(null);
  const commentOneRef = useRef<HTMLImageElement>(null);
  const commentTwoRef = useRef<HTMLImageElement>(null);
  const commentThreeRef = useRef<HTMLImageElement>(null);
  const walkingManRef = useRef<HTMLImageElement>(null);
  const ckRef = useRef<HTMLImageElement>(null);
  
  // Mobile refs
  const bgMobRef = useRef<HTMLImageElement>(null);
  const manEnteringMobRef = useRef<HTMLImageElement>(null);
  const commentOneMobRef = useRef<HTMLImageElement>(null);
  const commentTwoMobRef = useRef<HTMLImageElement>(null);
  const commentThreeMobRef = useRef<HTMLImageElement>(null);
  const walkingManMobRef = useRef<HTMLImageElement>(null);
  const ckMobRef = useRef<HTMLImageElement>(null);

  const lenis = useLenis((lenis) => {
    console.log(lenis);
  });

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    function update(time: number): void {
      (lenisRef.current as { lenis?: { raf: (t: number) => void } } | null)?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  // First section: Entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile entrance animation
        if (smthDivRef.current && bgMobRef.current && manEnteringMobRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: smthDivRef.current,
              pin: smthDivRef.current,
              scrub: 2,
              start: "top top",
              end: "+=150%",
              anticipatePin: 1,
            },
          })
          .to(bgMobRef.current, { 
            scale: 1.5,
            ease: "power2.inOut"
          })
          .to(manEnteringMobRef.current, { 
            opacity: 1,
            duration: 0.5 
          }, "-=0.3");
        }
      } else {
        // Desktop entrance animation
        if (smthDivRef.current && bgLg.current && manEnteringRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: smthDivRef.current,
              pin: smthDivRef.current,
              scrub: 3,
              start: "top top",
              end: "+=200%",
            },
          })
          .to(bgLg.current, { 
            transform: "translateZ(2200px)"
          })
          .to(manEnteringRef.current, { 
            opacity: 1 
          });
        }
      }
    });
    return () => ctx.revert();
  }, [isMobile]);

  // Second section: Comments appearing
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile comments animation
        if (anotherDivRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: anotherDivRef.current,
              pin: anotherDivRef.current,
              scrub: 1,
              start: "top top",
              end: "+=150%",
              anticipatePin: 1,
            },
          });

          if (commentOneMobRef.current) {
            tl.to(commentOneMobRef.current, {
              yPercent: -100,
              xPercent: 20,
              opacity: 1,
              ease: "power2.out"
            });
          }
          
          if (commentTwoMobRef.current) {
            tl.to(commentTwoMobRef.current, {
              yPercent: -150,
              xPercent: 50,
              opacity: 1,
              ease: "power2.out"
            }, "-=0.3");
          }
          
          if (commentThreeMobRef.current) {
            tl.to(commentThreeMobRef.current, {
              yPercent: -120,
              xPercent: 100,
              opacity: 1,
              ease: "power2.out"
            }, "-=0.3");
          }
          
          tl.to("#panick-mob", {
            opacity: 0,
            ease: "power2.in"
          });
        }
      } else {
        // Desktop comments animation
        if (anotherDivRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: anotherDivRef.current,
              pin: anotherDivRef.current,
              scrub: 1,
              start: "top top",
              end: "+=200%",
            },
          })
          .to(commentOneRef.current, {
            yPercent: -120,
            xPercent: 55,
            opacity: 1,
          })
          .to(commentTwoRef.current, {
            yPercent: -180,
            xPercent: 100,
            opacity: 1,
          })
          .to(commentThreeRef.current, {
            yPercent: -180,
            xPercent: 215,
            opacity: 1,
          })
          .to("#panick", {
            opacity: 0,
          });
        }
      }
    });
    return () => ctx.revert();
  }, [isMobile]);

  // Third section: Walking animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile walking animation
        if (walkingRef.current && walkingManMobRef.current && ckMobRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: walkingRef.current,
              pin: walkingRef.current,
              scrub: 1,
              start: "top top",
              end: "+=150%",
              anticipatePin: 1,
            },
          })
          .to(walkingManMobRef.current, {
            scale: 1.3,
            ease: "power2.inOut"
          })
          .to(walkingManMobRef.current, {
            opacity: 0,
            ease: "power2.in"
          })
          .to(ckMobRef.current, {
            opacity: 0,
            ease: "power2.in"
          }, "-=0.2");
        }
      } else {
        // Desktop walking animation
        if (walkingRef.current && walkingManRef.current && ckRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: walkingRef.current,
              pin: walkingRef.current,
              scrub: 1,
              start: "top top",
              end: "+=200%",
            },
          })
          .to(walkingManRef.current, {
            transform: "translateZ(300px)",
          })
          .to(walkingManRef.current, {
            opacity: 0,
          })
          .to(ckRef.current, {
            opacity: 0,
          });
        }
      }
    });
    return () => ctx.revert();
  }, [isMobile]);

  // Fourth section: Badge reveal
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const badgeId = isMobile ? "#man-with-badge-mob" : "#man-with-badge";
      
      if (ckBadgeRef.current) {
        gsap.timeline({
          scrollTrigger: {
            pin: ckBadgeRef.current,
            trigger: ckBadgeRef.current,
            scrub: 1,
            start: "top top",
            end: isMobile ? "+=100%" : "+=150%",
            anticipatePin: 1,
          },
        })
        .to(badgeId, {
          opacity: 0,
          scale: 0.9,
          ease: "power2.in"
        });
      }
    });
    return () => ctx.revert();
  }, [isMobile]);

  const handleSectionClick = (targetId: string) => {
    lenis?.scrollTo(targetId, {
      duration: isMobile ? 1 : 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-900">
      <ReactLenis 
        root 
        options={{ 
          autoRaf: false,
          lerp: isMobile ? 0.08 : 0.1,
          duration: isMobile ? 1 : 1.2,
          smoothWheel: true,
          touchMultiplier: isMobile ? 1.5 : 2,
        }} 
        ref={lenisRef} 
      />
      
      {/* Section 1: Entrance */}
      <div
        ref={smthDivRef}
        className="relative min-h-screen w-full overflow-hidden"
        style={{ 
          perspective: isMobile ? '1000px' : '2200px',
          touchAction: 'pan-y pinch-zoom'
        }}
        onClick={() => handleSectionClick("#another-div")}
      >
        {/* Desktop images */}
        <img
          src="/story/srm-bg-cropped-png.png"
          alt="College entrance"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          ref={bgLg}
          loading="eager"
        />
        <img
          src="/story/man-entering-png.png"
          alt="Man entering"
          className="absolute inset-0 w-full h-full object-cover opacity-0 hidden md:block"
          ref={manEnteringRef}
          loading="eager"
        />

        {/* Mobile images */}
        <img
          src="/story/srm-bg-png-mob.png"
          alt="College entrance"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          ref={bgMobRef}
          loading="eager"
        />
        <img
          src="/story/man-entering-png-mob.png"
          alt="Man entering"
          className="absolute inset-0 w-full h-full object-cover opacity-0 md:hidden"
          ref={manEnteringMobRef}
          loading="eager"
        />
        
        {/* Touch indicator for mobile */}
        {isMobile && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm opacity-70 animate-bounce pointer-events-none">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-xs">Scroll</span>
          </div>
        )}
      </div>

      {/* Section 2: Comments */}
      <div
        ref={anotherDivRef}
        className="relative min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden"
        style={{ touchAction: 'pan-y pinch-zoom' }}
        onClick={() => handleSectionClick("#walking")}
        id="another-div"
      >
        {/* Desktop version */}
        <div
          className="relative flex items-center justify-center w-full h-full hidden md:flex"
          id="panick"
        >
          <div className="relative z-20 w-full h-full flex items-center justify-center">
            <img
              src="/story/comment-1-png.png"
              alt="Comment 1"
              className="absolute w-1/5 h-auto opacity-0 left-[15%] bottom-[35%]"
              ref={commentOneRef}
              loading="lazy"
            />
            <img
              src="/story/comment-2-png.png"
              alt="Comment 2"
              className="absolute w-1/5 h-auto opacity-0 left-[25%] bottom-[25%]"
              ref={commentTwoRef}
              loading="lazy"
            />
            <img
              src="/story/comment-3-png.png"
              alt="Comment 3"
              className="absolute w-1/5 h-auto opacity-0 left-[10%] bottom-[15%]"
              ref={commentThreeRef}
              loading="lazy"
            />
          </div>
          <img
            src="/story/oat-with-man-png.png"
            alt="Panicked person"
            className="absolute inset-0 w-full h-full object-cover z-10"
            loading="lazy"
          />
        </div>

        {/* Mobile version */}
        <div
          className="relative flex items-center justify-center w-full h-full md:hidden"
          id="panick-mob"
        >
          <div className="relative z-20 w-full h-full flex items-center justify-center">
            <img
              src="/story/comment-1-png.png"
              alt="Comment 1"
              className="absolute w-[30%] h-auto opacity-0 left-[5%] bottom-[30%]"
              ref={commentOneMobRef}
              loading="lazy"
            />
            <img
              src="/story/comment-2-png.png"
              alt="Comment 2"
              className="absolute w-[30%] h-auto opacity-0 left-[10%] bottom-[20%]"
              ref={commentTwoMobRef}
              loading="lazy"
            />
            <img
              src="/story/comment-3-png.png"
              alt="Comment 3"
              className="absolute w-[30%] h-auto opacity-0 left-[8%] bottom-[10%]"
              ref={commentThreeMobRef}
              loading="lazy"
            />
          </div>
          <img
            src="/story/oat-man-with-bg-png-mob.png"
            alt="Panicked person"
            className="absolute inset-0 w-full h-full object-cover z-10"
            loading="lazy"
          />
        </div>

        {/* Background images */}
        <img
          src="/story/shocked-man-bg-png.png"
          className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
          alt="Background"
          loading="lazy"
        />
        <img
          src="/story/shocked-man-png-mob.png"
          className="absolute inset-0 w-full h-full object-cover z-0 md:hidden"
          alt="Background"
          loading="lazy"
        />
      </div>

      {/* Section 3: Walking */}
      <div
        ref={walkingRef}
        id="walking"
        className="relative min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden"
        style={{ 
          perspective: isMobile ? '300px' : '500px',
          touchAction: 'pan-y pinch-zoom'
        }}
      >
        {/* Desktop version */}
        <img
          src="/story/oat-walking-bg-png.png"
          alt="Walking scene"
          className="absolute inset-0 w-full h-full object-cover z-10 hidden md:block"
          ref={walkingManRef}
          loading="lazy"
        />
        <img
          src="/story/ck-png.png"
          alt="CK"
          className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
          ref={ckRef}
          loading="lazy"
        />
        <img
          src="/story/moi-png.png"
          alt="Background detail"
          className="absolute inset-0 w-full h-full object-cover -z-10 hidden md:block"
          loading="lazy"
        />

        {/* Mobile version */}
        <img
          src="/story/oat-walking-bg-png-mob.png"
          alt="Walking scene"
          className="absolute inset-0 w-full h-full object-cover z-10 md:hidden"
          ref={walkingManMobRef}
          loading="lazy"
        />
        <img
          src="/story/ck-png-mob.png"
          alt="CK"
          className="absolute inset-0 w-full h-full object-cover z-0 md:hidden"
          ref={ckMobRef}
          loading="lazy"
        />
        <img
          src="/story/moi-png-mob.png"
          alt="Background detail"
          className="absolute inset-0 w-full h-full object-cover -z-10 md:hidden"
          loading="lazy"
        />
      </div>

      {/* Section 4: Badge */}
      <div
        ref={ckBadgeRef}
        className="relative min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden"
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        {/* Desktop version */}
        <img
          src="/story/man-ck-badge-png.png"
          alt="Badge achievement"
          className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
          id="man-with-badge"
          loading="lazy"
        />
        <img
          src="/story/placement-png.png"
          alt="Placement success"
          className="absolute inset-0 w-full h-full object-cover -z-10 hidden md:block"
          loading="lazy"
        />

        {/* Mobile version */}
        <img
          src="/story/man-ck-badge-png-mob.png"
          alt="Badge achievement"
          className="absolute inset-0 w-full h-full object-cover z-0 md:hidden"
          id="man-with-badge-mob"
          loading="lazy"
        />
        <img
          src="/story/placement-png-mob.png"
          alt="Placement success"
          className="absolute inset-0 w-full h-full object-cover -z-10 md:hidden"
          loading="lazy"
        />
        
        {/* End indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-700 text-sm opacity-70 pointer-events-none z-10">
          <span className="text-lg">🎉</span>
          <p className="text-xs mt-1">The End</p>
        </div>
      </div>
    </div>
  );
}

export default StoryComponent;