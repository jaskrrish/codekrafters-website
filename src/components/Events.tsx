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
        className="events-section overflow-x-hidden"
        style={{
          backgroundColor: '#F2F0D8',
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
        <section>
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