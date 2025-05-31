"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ReactLenis } from "lenis/react";

const SmoothScrollLenis = () => {
  return (
    <div className="bg-zinc-50">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
      </ReactLenis>
    </div>
  );
};

export default SmoothScrollLenis;

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      className="relative w-full"
      style={{ height: `calc(${SECTION_HEIGHT}px + 80vh)` }}
    >
      <CenteredImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-50" />
    </div>
  );
};

const CenteredImage = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );
  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["60%", "100%"]
  );
  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [25, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  return (
    <motion.div
      className="sticky h-screen top-0 w-full"
      style={{
        opacity,
        backgroundSize,
        clipPath,
        backgroundImage: "url(/srm-black-gate.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="relative mx-auto max-w-5xl px-4 pt-[200px]">
        <ParallaxImg
          src="/intro_dialogue.png"
          alt="intro dialogue box"
          start={-100}
          end={300}
          className="mx-auto w-1/3"
        />
      <ParallaxImg
        src="/ck-guy.png"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end - 1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [1, 0], [start, end]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      style={{ opacity, transform }}
      ref={ref}
      src={src}
      alt={alt}
      className={className}
    />
  );
};
