"use client";
import ReactLenis, { useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";

// Custom hook for media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  gsap.registerPlugin(ScrollTrigger);
  // gsap.registerPlugin(ScrollSmoother)
  const lenisRef = useRef<any>(null);
  const smthDivRef = useRef<HTMLDivElement>(null);
  const bgLg = useRef(null);
  const bgSm = useRef(null);
  const manEnteringRef = useRef(null);
  const anotherDivRef = useRef<HTMLDivElement>(null);
  const commentOneRef = useRef<HTMLImageElement>(null);
  const commentTwoRef = useRef<HTMLImageElement>(null);
  const commentThreeRef = useRef<HTMLImageElement>(null);
  const sideLookingRef = useRef<HTMLImageElement>(null);
  const walkingRef = useRef<HTMLDivElement>(null);
  const walkingManRef = useRef<HTMLImageElement>(null);
  const ckRef = useRef<HTMLImageElement>(null);

  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis);
  });

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: smthDivRef.current,
            pin: smthDivRef.current,
            scrub: 3,
            start: "0% 0%",
            endTrigger: anotherDivRef.current,
          },
        })
        .to(bgLg.current, { transform: "translateZ(2200px)" })
        .to(manEnteringRef.current, { opacity: 1 })
        .pause();
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: anotherDivRef.current,
            pin: anotherDivRef.current,
            scrub: 1,
            start: "0% 0%",
            endTrigger: walkingRef.current,
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
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    // gsap.registerEffect({
    //   name: "zoom",
    //   effect: (targets: any, config: any) => {
    //     const vars = { transformOrigin: "0px 0px", ...config },
    //       { scale, origin } = config,
    //       clamp = gsap.utils.clamp(-100 * (scale - 1), 0);
    //     delete vars.origin;
    //     vars.xPercent = clamp((0.5 - origin[0] * scale) * 100);
    //     vars.yPercent = clamp((0.5 - origin[1] * scale) * 100);
    //     vars.overwrite = "auto";
    //     return gsap.to(targets, vars);
    //   },
    //   extendTimeline: true,
    //   defaults: { origin: [0.5, 0.5], scale: 2 },
    // });
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: walkingRef.current,
            pin: walkingRef.current,
            scrub: 1,
            start: "0% 0%",
            endTrigger: "#ck-badge",
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
    });
    return () => ctx.revert();
  });

  useLayoutEffect(() => {
    // Only using id's here. No refs.
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            pin: "#ck-badge",
            trigger: "#ck-badge",
            scrub: 1,
            start: "0% 0%",
          },
        })
        .to("#man-with-badge", {
          opacity: 0,
        });
    });
    return () => ctx.revert();
  });

  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div
        ref={smthDivRef}
        className="min-h-screen w-full perspective-[2200px] overflow-x-hidden"
        id="smth"
        onClick={() => {
          lenis?.scrollTo("#another-div", {
            duration: 1.5,
          });
        }}
      >
        <img
          src="/srm-bg-cropped-png.png"
          alt="Your clg bruv"
          className="z-10 w-full h-full absolute block object-cover"
          id="zoom-in"
          ref={bgLg}
        />
        <img
          src={isMobile ? "/man-entering-png-mob.png" : "/man-entering-png.png"}
          alt="Goi Entering SRM"
          className="z-0 w-full h-full absolute opacity-0 object-cover"
          ref={manEnteringRef}
        />
      </div>

      <div
        className="min-h-screen w-full bg-gray-100 flex items-center justify-center z-10 overflow-hidden"
        id="another-div"
        onClick={() => {
          lenis?.scrollTo("#smth", {
            duration: 1.5,
          });
        }}
        ref={anotherDivRef}
      >
        <div
          className="flex items-center justify-center z-20 w-full h-full overflow-hidden"
          id="panick"
        >
          <div className="z-20 flex items-center justify-center">
            <img
              src="/comment-1-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-60 bottom-40"
              id="comment-1"
              ref={commentOneRef}
            />{" "}
            <img
              src="/comment-2-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-80 bottom-50"
              id="comment-2"
              ref={commentTwoRef}
            />
            <img
              src="/comment-3-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-10 bottom-10"
              id="comment-3"
              ref={commentThreeRef}
            />
          </div>
                  <img
          src={isMobile ? "/oat-with-man-png-mob.png" : "/oat-with-man-png.png"}
          alt="Panicked Goi"
          className="z-10 w-full h-full object-cover"
        />
        </div>
        <img
          src="/shocked-man-bg-png.png"
          className="h-full w-full absolute z-0 overflow-y-hidden object-cover"
          ref={sideLookingRef}
        />
      </div>

      {/* <div
        className="min-h-screen max-w-full bg-gray-100 bg-[url(/oat-bg-png.png)] bg-no-repeat bg-cover flex items-end justify-center z-10 overflow-y-hidden"
        id="another-div"
        onClick={() => {
          lenis?.scrollTo("#smth", {
            duration: 1.5,
          });
        }}
        ref={anotherDivRef}
      >
        <div
          className="flex items-end justify-center z-20 bg-[url(/oat-bg-png.png)] bg-no-repeat bg-cover w-full h-full overflow-hidden"
          id="panick"
        >
          <div className="flex items-center justify-center">
            <img
              src="/comment-1-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-60 bottom-40"
              id="comment-1"
              ref={commentOneRef}
            />{" "}
            <img
              src="/comment-2-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-60 bottom-50"
              id="comment-2"
              ref={commentTwoRef}
            />
            <img
              src="/comment-3-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-100 bottom-50"
              id="comment-3"
              ref={commentThreeRef}
            />
          </div>
          <img
            src="/panicked-man-png.png"
            alt="Panicked Goi"
            className="relative z-10 bottom-[-22.5vh] right-[5vw]"
          />
        </div>
        <img
          src="/shocked-man-bg-png.png"
          className="h-full w-full absolute z-0 overflow-y-hidden"
          ref={sideLookingRef}
        />
      </div> */}

      <div
        className="min-h-screen w-full bg-gray-100 flex items-center justify-center z-10 overflow-hidden perspective-[500px]"
        ref={walkingRef}
      >
        <img
          src={isMobile ? "/oat-walking-bg-png-mob.png" : "/oat-walking-bg-png.png"}
          alt="Goi walking"
          className="w-full h-full absolute z-10 object-cover"
          ref={walkingManRef}
        />
        <img
          src={isMobile ? "/ck-png-mob.png" : "/ck-png.png"}
          alt="Goi walking"
          className="w-full h-full absolute z-0 object-cover"
          id="ck"
          ref={ckRef}
        />
        <img
          src={isMobile ? "/moi-png-mob.png" : "/moi-png.png"}
          alt="Ck moi"
          className="w-full h-full absolute -z-10 object-cover"
        />
      </div>
      <div
        className="min-h-screen w-full bg-gray-100 flex items-center justify-center z-10 overflow-hidden"
        id="ck-badge"
      >
        <img
          src={isMobile ? "/man-ck-badge-png-mob.png" : "/man-ck-badge-png.png"}
          alt="Man kuthifying ck badge"
          className="z-0 w-full h-full object-cover"
          id="man-with-badge"
        />
        <img
          src={isMobile ? "/placement-png-mob.png" : "/placement-png.png"}
          alt="My goi got placedd!!"
          className="absolute -z-10 w-full h-full object-cover"
          id="placement"
        />
      </div>
    </div>
  );
}

export default Hero;
