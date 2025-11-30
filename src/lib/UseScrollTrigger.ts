// <CHANGE> Custom hook with mobile responsiveness support for ScrollTrigger handling
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTriggerOptions {
  trigger: string | Element;
  start?: string;
  end?: string;
  endTrigger?: string | Element;
  pin?: boolean;
  scrub?: boolean | number;
  markers?: boolean;
  anticipatePin?: number;
  onUpdate?: (self: ScrollTrigger) => void;
  onEnter?: (self: ScrollTrigger) => void;
  onLeave?: (self: ScrollTrigger) => void;
  onEnterBack?: (self: ScrollTrigger) => void;
  onLeaveBack?: (self: ScrollTrigger) => void;
  toggleClass?: { targets: string | Element | Element[], className: string };
  [key: string]: any;
}

// <CHANGE> Helper function to get viewport-aware ScrollTrigger options
const getResponsiveOptions = (options: ScrollTriggerOptions): ScrollTriggerOptions => {
  if (typeof window === 'undefined') return options;

  const isMobile = window.innerWidth < 768;
  
  // <CHANGE> Optimize for mobile: reduce scrub, adjust animations
  if (isMobile) {
    return {
      ...options,
      // Reduce scrub smoothing on mobile for better performance
      scrub: typeof options.scrub === 'number' 
        ? Math.min(options.scrub, 1) 
        : options.scrub,
      // Disable pin on very small screens for better scroll performance
      pin: options.pin && window.innerWidth > 640 ? options.pin : false,
      // Adjust anticipatePin for mobile
      anticipatePin: options.anticipatePin && window.innerWidth > 640 
        ? options.anticipatePin 
        : 0,
    };
  }

  return options;
};

/**
 * A hook that creates and manages a ScrollTrigger instance with mobile responsiveness
 * @param options The ScrollTrigger options
 * @param dependencies The dependencies to watch for changes
 */
export const useScrollTrigger = (
  options: ScrollTriggerOptions,
  dependencies: any[] = []
) => {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    // <CHANGE> Use responsive options based on viewport
    const responsiveOptions = getResponsiveOptions(options);

    // Create the ScrollTrigger
    triggerRef.current = ScrollTrigger.create(responsiveOptions);

    // Clean up on unmount
    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
  }, dependencies);
};

/**
 * A hook that refreshes ScrollTrigger when the component mounts and on dependency changes
 * @param dependencies The dependencies to watch for changes
 */
export const useScrollTriggerRefresh = (dependencies: any[] = []) => {
  useLayoutEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    // Refresh ScrollTrigger to recalculate positions
    ScrollTrigger.refresh(true);

    // No cleanup needed
  }, dependencies);
};

/**
 * A hook that handles responsive ScrollTrigger updates on window resize
 * Ensures animations work correctly across different viewport sizes
 */
export const useScrollTriggerResponsive = () => {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      // <CHANGE> Debounce resize events to improve performance
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);
};

export default useScrollTrigger;