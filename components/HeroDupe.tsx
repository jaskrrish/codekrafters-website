"use client";
import ReactLenis, { useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";

function HeroDupe() {
  gsap.registerPlugin(ScrollTrigger);
  // gsap.registerPlugin(ScrollSmoother)
  const lenisRef = useRef<any>(null);
  const smthDivRef = useRef<HTMLDivElement>(null);
  const smthDivLgRef = useRef<HTMLDivElement>(null);
  const smthDivMobRef = useRef<HTMLDivElement>(null);
  const bgLg = useRef(null);
  const bgSm = useRef(null);
  const manEnteringRef = useRef(null);
  const manEnteringMobRef = useRef(null);
  const anotherDivRef = useRef<HTMLDivElement>(null);
  const commentOneRef = useRef<HTMLImageElement>(null);
  const commentTwoRef = useRef<HTMLImageElement>(null);
  const commentThreeRef = useRef<HTMLImageElement>(null);
  const sideLookingRef = useRef<HTMLImageElement>(null);
  const walkingRef = useRef<HTMLDivElement>(null);
  const walkingManRef = useRef<HTMLImageElement>(null);
  const walkingManMobRef = useRef<HTMLImageElement>(null);
  const ckRef = useRef<HTMLImageElement>(null);
  const ckMobRef = useRef<HTMLImageElement>(null);
  const moiMobRef = useRef<HTMLImageElement>(null);

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
      // Desktop bg timeline uses the desktop smth div
      gsap
        .timeline({
          scrollTrigger: {
            trigger: smthDivLgRef.current,
            pin: smthDivLgRef.current,
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
      // Mobile bg timeline uses the mobile smth div and mobile manEntering
      gsap
        .timeline({
          scrollTrigger: {
            trigger: smthDivMobRef.current,
            pin: smthDivMobRef.current,
            scrub: 3,
            start: "0% 0%",
            endTrigger: anotherDivRef.current,
          },
        })
        .to(bgSm.current, { transform: "translateZ(2200px)" })
        .to(manEnteringMobRef.current, { opacity: 1 })
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
    // guard: require the walking container to be present
    if (!walkingRef.current) {
      console.debug("GSAP walking: walkingRef not ready yet");
      return;
    }

    let mm: any;
    const ctx = gsap.context(() => {
      mm = ScrollTrigger.matchMedia({});

      mm.add({
        "(min-width: 768px)": function () {
          console.debug("GSAP walking: desktop branch active");
          // Desktop: animate desktop walking image and desktop CK
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: walkingRef.current,
              pin: walkingRef.current,
              scrub: 1,
              start: "0% 0%",
              endTrigger: "#ck-badge",
            },
          });
          tl.to(walkingManRef.current, { transform: "translateZ(300px)" })
            .to(walkingManRef.current, { opacity: 0 })
            .to(ckRef.current, { opacity: 0 });
          console.debug("GSAP walking: desktop timeline created", tl);
        },
        "(max-width: 767px)": function () {
          console.debug("GSAP walking: mobile branch active");
          // Mobile: animate mobile walking image and mobile CK
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: walkingRef.current,
              pin: walkingRef.current,
              scrub: 1,
              start: "0% 0%",
              endTrigger: "#ck-badge",
            },
          });
          tl.to(walkingManMobRef.current, { transform: "translateZ(300px)" })
            .to(walkingManMobRef.current, { opacity: 0 })
            .to(ckMobRef.current, { opacity: 0 });
          console.debug("GSAP walking: mobile timeline created", tl);
        },
      });
    });

    return () => {
      ctx.revert();
      mm && mm.revert();
    };
  }, []);

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
    <div className="min-h-full max-w-full">
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      {/* Desktop smth div */}
      <div
        ref={smthDivLgRef}
        className="min-h-screen max-w-full perspective-[2200px] hidden md:block"
        id="smth-lg"
        onClick={() => {
          lenis?.scrollTo("#another-div", {
            duration: 1.5,
          });
        }}
      >
        <img
          src="/srm-bg-cropped-png.png"
          alt="Your clg bruv"
          className="z-10 w-full h-full absolute"
          id="zoom-in"
          ref={bgLg}
        />
        <img
          src="/man-entering-png.png"
          alt="Goi Entering SRM"
          className="z-0 w-full h-full absolute opacity-0"
          ref={manEnteringRef}
        />
      </div>

      {/* Mobile smth div */}
      <div
        ref={smthDivMobRef}
        className="min-h-screen max-w-full perspective-[2200px] block md:hidden"
        id="smth-mob"
        onClick={() => {
          lenis?.scrollTo("#another-div", {
            duration: 1.5,
          });
        }}
      >
        <img
          src="/srm-bg-png-mob.png"
          alt="Your clg bruv"
          className="z-10 w-full h-full absolute"
          ref={bgSm}
        />
        <img
          src="/man-entering-png-mob.png"
          alt="Goi Entering SRM"
          className="z-0 w-full h-full absolute opacity-0"
          ref={manEnteringMobRef}
        />
      </div>

      <div
        className="min-h-screen max-w-full bg-gray-100 flex items-center justify-center z-10 overflow-y-hidden"
        id="another-div"
        onClick={() => {
          lenis?.scrollTo("#smth", {
            duration: 1.5,
          });
        }}
        ref={anotherDivRef}
      >
        {/* Desktop panick */}
        <div
          className="items-center justify-center z-20 w-full h-full overflow-hidden hidden md:flex"
          id="panick"
        >
          <div className="z-20 flex items-center justify-center">
            <img
              src="/comment-1-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-60 bottom-40"
              id="comment-1"
              ref={commentOneRef}
            />
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
            src="/oat-with-man-png.png"
            alt="Panicked Goi"
            className="z-10 w-full h-full"
          />
        </div>

        {/* Mobile panick */}
        <div
          className="flex items-center justify-center z-20 w-full h-full overflow-hidden md:hidden"
          id="panick-mob"
        >
          <div className="z-20 flex items-center justify-center">
            <img
              src="/comment-1-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-12 bottom-10"
              id="comment-1-mob"
              ref={commentOneRef}
            />
            <img
              src="/comment-2-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-24 bottom-16"
              id="comment-2-mob"
              ref={commentTwoRef}
            />
            <img
              src="/comment-3-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-4 bottom-4"
              id="comment-3-mob"
              ref={commentThreeRef}
            />
          </div>
          <img
            src="/oat-man-with-bg-png-mob.png"
            alt="Panicked Goi (mob)"
            className="z-10 w-full h-full"
          />
        </div>

        <img
          src="/shocked-man-png-mob.png"
          className="h-full w-full absolute z-0 overflow-y-hidden md:hidden"
          ref={sideLookingRef}
        />

        <img
          src="/shocked-man-bg-png.png"
          className="h-full w-full absolute z-0 overflow-y-hidden hidden md:block"
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
              className="absolute w-1/4 h-1/4 opacity-0 left-80 bottom-50"
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
        className="min-h-screen max-w-full bg-gray-100 flex items-center justify-center z-10 overflow-y-hidden overflow-x-hidden perspective-[500px]"
        ref={walkingRef}
      >
        {/* Desktop walking images */}
        <img
          src="/oat-walking-bg-png.png"
          alt="Goi walking"
          className="w-full h-full absolute z-10 hidden md:block"
          ref={walkingManRef}
        />
        <img
          src="/ck-png.png"
          alt="Goi walking"
          className="w-full h-full absolute z-0 hidden md:block"
          id="ck"
          ref={ckRef}
        />
        <img
          src="/moi-png.png"
          alt="Ck moi"
          className="w-full h-full absolute -z-10 hidden md:block"
        />

        {/* Mobile walking images */}
        <img
          src="/oat-walking-bg-png-mob.png"
          alt="Goi walking (mob)"
          className="w-full h-full absolute z-10 md:hidden"
          ref={walkingManMobRef}
        />
        <img
          src="/ck-png-mob.png"
          alt="Goi walking (mob)"
          className="w-full h-full absolute z-0 md:hidden"
          id="ck-mob"
          ref={ckMobRef}
        />
        <img
          src="/moi-png-mob.png"
          alt="Ck moi (mob)"
          className="w-full h-full absolute -z-10 md:hidden"
          ref={moiMobRef}
        />
      </div>
      <div
        className="min-h-screen max-w-full bg-gray-100 flex items-center justify-center z-10 overflow-y-hidden overflow-x-hidden"
        id="ck-badge"
      >
        <img
          src="/man-ck-badge-png.png"
          alt="Man kuthifying ck badge"
          className="z-0 w-full h-full"
          id="man-with-badge"
        />
        <img
          src="/placement-png.png"
          alt="My goi got placedd!!"
          className="absolute -z-10 w-full h-full"
          id="placement"
        />
      </div>
    </div>
  );
}

export default HeroDupe;
