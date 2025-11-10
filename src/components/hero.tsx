"use client";
import React from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionTemplate,
  useSpring,
} from "motion/react";

const springVars = {
  stiffness: 100,
  damping: 20,
};

const HeroPage = () => {
  const { scrollYProgress } = useScroll();
  
  // Mobile-responsive mask size
  const maskSize = useSpring(
    useTransform(scrollYProgress, [0, 1], ["8000", "300"]),
    springVars
  );
  
  // Mobile-responsive mask position
  const maskPosition = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-1000", "50"]),
    springVars
  );

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const outerImageOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const whiteOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <div className="relative h-[100vh] bg-black overflow-hidden">
      {/* outer image - mobile optimized */}
      <motion.div
        className="absolute inset-0 h-screen w-screen bg-[url('/CK_group.png')] bg-fixed bg-cover bg-center"
        style={{
          scale: imageScale,
          opacity: outerImageOpacity,
          backgroundAttachment: typeof window !== 'undefined' && window.innerWidth < 768 ? 'scroll' : 'fixed',
        }}
      ></motion.div>

      {/* mask image - commented out but mobile-optimized when enabled */}
      {/* <motion.div
        className="fixed flex m-auto h-full w-full inset-0 [mask-image:url('/ck_logo.svg')] [mask-repeat:no-repeat]"
        style={{
          maskSize: useMotionTemplate`${maskSize}px`,
          maskPosition: useMotionTemplate`center ${maskPosition}px`,
        }}
      >
        <motion.div
          style={{
            scale: imageScale,
          }}
          className="fixed inset-0 h-full w-full bg-[url('/ck_group.jpeg')] bg-fixed bg-cover bg-center md:bg-fixed"
        ></motion.div> 

        <motion.div 
          style={{
            opacity: whiteOpacity,
          }}
          className="fixed inset-0 h-full w-full bg-white"
        ></motion.div>
      </motion.div> */}

      <style jsx global>{`
        /* Improve mobile scroll performance */
        @media (max-width: 768px) {
          body {
            -webkit-overflow-scrolling: touch;
          }
          
          /* Disable background-attachment: fixed on mobile for better performance */
          .bg-fixed {
            background-attachment: scroll !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroPage;