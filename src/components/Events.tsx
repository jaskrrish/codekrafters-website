'use client';

import React, { useEffect, useRef } from 'react';
import { Russo_One, Montserrat } from 'next/font/google';

// Fonts must be initialized at module scope
const russoOne = Russo_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-russo-one',
  display: 'swap',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});


// Minimal types for clarity
type GSAPType = any;
type ScrollTriggerType = any;

const EventSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    // Dynamic import of GSAP to avoid SSR issues
    const loadGSAP = async () => {
      try {
        const all = await import('gsap/all');
        const { gsap, ScrollTrigger, ModifiersPlugin } = all as unknown as {
          gsap: GSAPType;
          ScrollTrigger: ScrollTriggerType;
          ModifiersPlugin: object;
        };

        gsap.registerPlugin(ScrollTrigger, ModifiersPlugin);

        ScrollTrigger.config({
          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
          ignoreMobileResize: true
        });
        
        // Set default ease for smoother transitions
        gsap.defaults({
          ease: "power2.inOut"
        });
        
        if (typeof window !== 'undefined') {
          requestAnimationFrame(() => {
            handleScroll(gsap, ScrollTrigger);
            
            cleanup = () => {
              ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
            };
          });
        }
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    loadGSAP();
    
    // Cleanup on unmount
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  const handleScroll = (gsap: GSAPType, ScrollTrigger: ScrollTriggerType): void => {
    // Remove scroller default since we're now part of main page scroll
    // ScrollTrigger.defaults({
    //   scroller: '.scroller',
    // });

    const sections = gsap.utils.toArray('section');
    
    sections.forEach((section: Element, index: number) => {
      const wrapper = section.querySelector('.wrapper');
      if (!wrapper) return;
      
      const sectionElement = section as HTMLElement;
      const wrapperElement = wrapper as HTMLElement;
      
      // Optimize performance with will-change
      gsap.set(wrapper, { willChange: 'transform' });
      
      // Ensure seamless loop by duplicating original content to exceed container width
      const originalHTMLKey = '__originalHTML__';
      const anyWrapper = wrapperElement as unknown as { [key: string]: string };
      if (!anyWrapper[originalHTMLKey]) {
        anyWrapper[originalHTMLKey] = wrapperElement.innerHTML;
      } else {
        wrapperElement.innerHTML = anyWrapper[originalHTMLKey];
      }

      // Measure original segment width (one full, non-repeating set)
      const measureOriginalWidth = (): number => {
        return wrapperElement.scrollWidth;
      };

      let originalWidth = measureOriginalWidth();
      const sectionWidth = sectionElement.offsetWidth;

      // Duplicate content until we have at least ~2.5x the section width
      // This guarantees no gaps during wrap even on large screens
      while (wrapperElement.scrollWidth < sectionWidth * 2.5 && originalWidth > 0) {
        wrapperElement.innerHTML += anyWrapper[originalHTMLKey];
      }

      // Recompute the original segment width in case images/layout adjusted
      // If originalWidth is 0 (images not measured yet), fall back to dividing by 2
      originalWidth = originalWidth || Math.max(1, Math.floor(wrapperElement.scrollWidth / 2));

      // Determine direction per visual row index (considering the text row at index 2)
      const rowIndex = index < 2 ? index : index + 1; // Account for text row in the middle
      const isRightToLeft = rowIndex % 2 === 1; // odd rows move R→L

      // Apply a phase offset for the 2nd image line (section index 1)
      // to avoid seeing the same sequence too soon. This shifts the loop start.
      const applyPhaseOffset = index === 1;
      const phaseOffset = applyPhaseOffset ? originalWidth * 0.8 : 0; // 40% shift

      const xStart = isRightToLeft ? -phaseOffset : -originalWidth + phaseOffset;
      const xEnd = isRightToLeft ? -originalWidth - phaseOffset : 0 + phaseOffset;

      const wrapX = gsap.utils.wrap(-originalWidth, 0);

      gsap.fromTo(
        wrapperElement,
        { x: xStart },
        {
          x: xEnd,
          ease: "none",
          modifiers: {
            x: (x: string) => `${wrapX(parseFloat(x))}px`,
          },
          scrollTrigger: {
            trigger: sectionElement,
            scrub: 5,
            start: "top bottom",
            end: "bottom top",
            invalidateOnRefresh: true,
            anticipatePin: 1,
            scroller: "body", // Use main page scroll
          },
        }
      );
    });

    // Add horizontal parallax effect to the Hackverse text (treat as row index 2)
    const hackverseText = document.querySelector('.hackverse-text');
    if (hackverseText && hackverseText.parentElement) {
      gsap.set(hackverseText, { willChange: 'transform' });
      
      // Text moves from left to center and stays there
      gsap.fromTo(
        hackverseText,
        { x: '-100%' }, // Start from left
        {
          x: '0%', // Move to center and stay
          ease: "none",
          scrollTrigger: {
            trigger: hackverseText.parentElement as Element,
            scrub: 4, // Increased from 1.5 to 4 for slower text movement
            start: "top bottom",
            end: "center center", // Stop at center of screen
            invalidateOnRefresh: true,
            anticipatePin: 1,
            scroller: "body", // Use main page scroll
          },
        }
      );
    }

    // Add smooth transition for the entire events section
    // This will create a gradient overlay at the top and bottom that fades in/out
    const eventsSection = document.querySelector('.events-section');
    if (eventsSection) {
      // Create top gradient overlay for smooth entry transition
      const topOverlay = document.createElement('div');
      topOverlay.className = 'absolute top-0 left-0 w-full pointer-events-none';
      topOverlay.style.height = '500px';
      topOverlay.style.background = 'linear-gradient(to bottom, #fffacd 0%, rgba(242, 240, 216, 0) 100%)';
      topOverlay.style.zIndex = '10';
      eventsSection.appendChild(topOverlay);

      // Create bottom gradient overlay for smooth exit transition
      const bottomOverlay = document.createElement('div');
      bottomOverlay.className = 'absolute bottom-0 left-0 w-full pointer-events-none';
      bottomOverlay.style.height = '500px';
      bottomOverlay.style.background = 'linear-gradient(to top, #fffacd 0%, rgba(242, 240, 216, 0) 100%)';
      bottomOverlay.style.zIndex = '10';
      bottomOverlay.style.pointerEvents = 'none'; // Ensure it doesn't block mouse interactions
      eventsSection.appendChild(bottomOverlay);

      // Animate the opacity of the section as it enters/exits viewport
      gsap.fromTo(
        eventsSection,
        { 
          backgroundImage: 'linear-gradient(0deg, #F2F0D8, #F2F0D8)',
          opacity: 0
        },
        {
          backgroundImage: 'linear-gradient(0deg, #F2F0D8, #F2F0D8)',
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: eventsSection,
            start: "top bottom-=200",
            end: "top center",
            toggleActions: "play none none reverse",
            scrub: true
          }
        }
      );

      // Animate the top gradient as the user scrolls
      gsap.fromTo(
        topOverlay,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: eventsSection,
            start: "top bottom-=300",
            end: "top+=400 center",
            toggleActions: "play none none reverse",
            scrub: true
          }
        }
      );

      // Animate the bottom gradient as the user scrolls - further reduced opacity and delayed start
      gsap.fromTo(
        bottomOverlay,
        { opacity: 0 },
        {
          opacity: 0.4, // Reduced from 0.7 to 0.4 for better content visibility
          scrollTrigger: {
            trigger: eventsSection,
            start: "bottom-=500 center", // Start later to let vikas section be fully visible
            end: "bottom-=100 top", // End very close to the bottom
            toggleActions: "play none none reverse",
            scrub: true
          }
        }
      );
      
      // Add a special animation for the last section (vikas) to ensure it stays visible for longer
      const vikasSection = document.querySelector('#vikas');
      if (vikasSection) {
        // Pin the vikas section to make it stay longer in view
        ScrollTrigger.create({
          trigger: vikasSection,
          start: "top center",
          end: "bottom top-=300", // Extended range to keep it visible longer
          pin: false, // Don't actually pin it, but use pinSpacing to create extra space
          pinSpacing: true,
          anticipatePin: 1,
          onEnter: () => {
            gsap.to(vikasSection, { 
              opacity: 1,
              duration: 0.3,
              ease: "power1.inOut"
            });
          },
          onLeave: () => {
            // Slow fade out when leaving
            gsap.to(vikasSection, { 
              opacity: 0.9, 
              duration: 1.5, 
              ease: "power1.inOut" 
            });
          },
          onEnterBack: () => {
            // Fast fade in when scrolling back up
            gsap.to(vikasSection, { 
              opacity: 1, 
              duration: 0.3, 
              ease: "power1.inOut" 
            });
          },
          onLeaveBack: () => {
            gsap.to(vikasSection, { 
              opacity: 1, 
              duration: 0.3, 
              ease: "power1.inOut" 
            });
          }
        });

        // Add separate animation for movement to make it stick around longer
        gsap.fromTo(
          vikasSection,
          { y: 0 },
          {
            y: 0, // Don't actually move it
            scrollTrigger: {
              trigger: vikasSection,
              scrub: 3, // Slow down the scroll effect
              start: "top bottom",
              end: "bottom+=300 top", // Extended end position
              invalidateOnRefresh: true
            }
          }
        );
      }
    }

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
  };

  // Image lists by folder
  const qonneqtImages = [
    'qonneqt-001.jpg',
    'qonneqt-002.jpg',
    'qonneqt-003.jpg',
    'qonneqt-004.jpg',
    'qonneqt-005.jpg',
    'qonneqt-006.png',
    'qonneqt-007.jpg',
    'qonneqt-008.jpg',
  ];
  const hackverseImages = [
    'hackverse-001.jpg',
    'hackverse-002.jpg',
    'hackverse-003.jpg',
    'hackverse-004.jpg',
    'hackverse-005.jpg',
    'hackverse-006.jpg',
    'hackverse-007.jpg',
    'hackverse-008.jpg',
    'hackverse-009.jpg',
    'hackverse-010.jpg',
  ];
  const launchpadImages = [
    'launchpad-001.jpg',
    'launchpad-002.jpg',
    'launchpad-003.png',
    'launchpad-004.jpg',
    'launchpad-005.jpg',
    'launchpad-006.jpg',
    'launchpad-007.jpg',
    'launchpad-008.jpg',
    'launchpad-009.jpg',
    'launchpad-010.jpg',
  ];
  const otherEventsImages = [
    'otherevents-001.png',
    'otherevents-002.png',
    'otherevents-003.png',
    'otherevents-004.png',
    'otherevents-005.png',
    'otherevents-006.png',
  ];

  return (
    <div 
        ref={scrollerRef}
        className="events-section events-section-transition overflow-x-hidden relative"
        style={{
          backgroundColor: '#F2F0D8',
          marginTop: '-3300px', // Changed from -500px to -3000px as requested
          paddingTop: '-3300px', // Corrected to positive value to match negative margin
          position: 'relative', // Ensure position context for absolute elements
          boxShadow: '0 -50px 100px 100px #F2F0D8', // Soft shadow at the top for blending
        }}
      >

        
        {/* First image line (swapped with previous third line) */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {launchpadImages.map((imageName: string, imageIndex: number) => (
              <div
                key={`img-1-${imageIndex}`}
                className="relative group m-2 flex-shrink-0"
              >
                <img
                  className="h-40 md:h-48 lg:h-56 rounded-xl transition-all duration-300 group-hover:scale-95 cursor-pointer will-change-transform"
                  src={`/launchpad/${imageName}`}
                  alt={`Other Event ${imageIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-base md:text-lg lg:text-xl font-semibold tracking-wide">Launchpad 2.0</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Second image line */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {hackverseImages.map((imageName: string, imageIndex: number) => (
              <div
                key={`img-2-${imageIndex}`}
                className="relative group m-2 flex-shrink-0"
              >
                <img
                  className="h-40 md:h-48 lg:h-56 rounded-xl transition-all duration-300 group-hover:scale-95 cursor-pointer will-change-transform"
                  src={`/hackverse/${imageName}`}
                  alt={`Other Event ${imageIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-base md:text-lg lg:text-xl font-semibold tracking-wide">Hackverse 2025</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Title with parallax effect */}
        <div className="relative overflow-hidden py-5" style={{ backgroundColor: '#F2F0D8' }}>
          <div className="hackverse-text will-change-transform">
            <div className={`w-full text-center drop-shadow-[0_2px_0_rgba(0,0,0,0.15)] leading-[0.85] ${russoOne.className}`}>
              <span className="text-4xl md:text-6xl text-[#0b1220] tracking-[0.02em]">CODE</span>
              <span className="text-4xl md:text-6xl text-[#F2B200] tracking-[0.02em] ml-1">KRAFTERS</span>
            </div>
            <div className={`w-full text-center drop-shadow-[0_2px_0_rgba(0,0,0,0.15)] mt-0 ${montserrat.className}`}>
              <span className="text-3xl md:text-5xl text-[#0b1220] tracking-[0.01em] font-black">EVENTS</span>
            </div>
          </div>
        </div>
        

        {/* Third image line (swapped with previous first line) */}
        <section>
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {qonneqtImages.map((imageName: string, imageIndex: number) => (
              <div
                key={`img-3-${imageIndex}`}
                className="relative group m-2 flex-shrink-0"
              >
                <img
                  className="h-40 md:h-48 lg:h-56 rounded-xl transition-all duration-300 group-hover:scale-95 cursor-pointer will-change-transform"
                  src={`/Qonneqt/${imageName}`}
                  alt={`Hackverse Event ${imageIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-base md:text-lg lg:text-xl font-semibold tracking-wide">Builder's Qonneqt</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fourth image line */}
        <section id="vikas" className="pb-40"> {/* Added ID "vikas" and increased padding bottom significantly */}
          <div className="wrapper flex text-[16vh] font-medium will-change-transform">
            {otherEventsImages.map((imageName: string, imageIndex: number) => (
              <div
                key={`img-4-${imageIndex}`}
                className="relative group m-2 flex-shrink-0"
              >
                <img
                  className="h-40 md:h-48 lg:h-56 rounded-xl transition-all duration-300 group-hover:scale-95 cursor-pointer will-change-transform"
                  src={`/otherevents/${imageName}`}
                  alt={`Hackverse Event ${imageIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-base md:text-lg lg:text-xl font-semibold tracking-wide">Other Events</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
  );
};

export default EventSection;