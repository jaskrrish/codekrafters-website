// Custom hook to provide consistent ScrollTrigger handling
import { useLayoutEffect } from 'react';
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

/**
 * A hook that creates and manages a ScrollTrigger instance
 * @param options The ScrollTrigger options
 * @param dependencies The dependencies to watch for changes
 */
export const useScrollTrigger = (
  options: ScrollTriggerOptions,
  dependencies: any[] = []
) => {
  useLayoutEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    // Create the ScrollTrigger
    const trigger = ScrollTrigger.create(options);

    // Clean up on unmount
    return () => {
      trigger.kill();
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

export default useScrollTrigger;