"use client";
import ReactLenis, { useLenis } from "lenis/react";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

function StoryComponent() {
  gsap.registerPlugin(ScrollTrigger);
  // gsap.registerPlugin(ScrollSmoother)
  const lenisRef = useRef(null);
  const smthDivRef = useRef<HTMLDivElement>(null);
  const bgLg = useRef(null);
  // const bgSm = useRef(null);
  const manEnteringRef = useRef(null);
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
  const moiRef = useRef<HTMLImageElement>(null);
  const moiMobRef = useRef<HTMLImageElement>(null);

  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis);
  });

  useEffect(() => {
    function update(time: number): void {
      (lenisRef.current as { lenis?: { raf: (t: number) => void } } | null)?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Use ScrollTrigger.matchMedia for responsive first section animations
      ScrollTrigger.matchMedia({
        // Desktop first section animations
        "(min-width: 768px)": () => {
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
        },
        // Mobile first section animations
        "(max-width: 767px)": () => {
          if (smthDivRef.current) {
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
              .to(smthDivRef.current.querySelector('img[src="/story/srm-bg-png-mob.png"]'), { transform: "translateZ(2200px)" })
              .to(smthDivRef.current.querySelector('img[src="/story/man-entering-png-mob.png"]'), { opacity: 1 })
              .pause();
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Use ScrollTrigger.matchMedia for responsive comment section animations
      ScrollTrigger.matchMedia({
        // Desktop comment section animations
        "(min-width: 768px)": () => {
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
        },
        // Mobile comment section animations
        "(max-width: 767px)": () => {
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
            .to("#comment-1-mob", {
              yPercent: -120,
              xPercent: 55,
              opacity: 1,
            })
            .to("#comment-2-mob", {
              yPercent: -180,
              xPercent: 100,
              opacity: 1,
            })
            .to("#comment-3-mob", {
              yPercent: -180,
              xPercent: 215,
              opacity: 1,
            })
            .to("#panick-mob", {
              opacity: 0,
            });
        },
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
      // Use ScrollTrigger.matchMedia for responsive animations
      ScrollTrigger.matchMedia({
        // Desktop animations
        "(min-width: 768px)": () => {
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
        },
        // Mobile animations
        "(max-width: 767px)": () => {
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
            .to(walkingManMobRef.current, {
              transform: "translateZ(300px)",
            })
            .to(walkingManMobRef.current, {
              opacity: 0,
            })
            .to(ckMobRef.current, {
              opacity: 0,
            });
        },
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
        })
        .to("#man-with-badge-mob", {
          opacity: 0,
        });
    });
    return () => ctx.revert();
  });

  return (
    <div className="min-h-full max-w-full ">
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div
        ref={smthDivRef}
        className="min-h-screen max-w-full perspective-[2200px]"
        id="smth"
        onClick={() => {
          lenis?.scrollTo("#another-div", {
            duration: 1.5,
          });
        }}
      >
        {/* Desktop first section images */}
        <img
          src="/story/srm-bg-cropped-png.png"
          alt="Your clg bruv"
          className="z-10 w-full h-full absolute hidden md:block"
          id="zoom-in"
          ref={bgLg}
        />
        <img
          src="/story/man-entering-png.png"
          alt="Goi Entering SRM"
          className="z-0 w-full h-full absolute opacity-0 hidden md:block"
          ref={manEnteringRef}
        />

        {/* Mobile first section images */}
        <img
          src="/story/srm-bg-png-mob.png"
          alt="Your clg bruv (mobile)"
          className="z-10 w-full h-full absolute md:hidden"
        />
        <img
          src="/story/man-entering-png-mob.png"
          alt="Goi Entering SRM (mobile)"
          className="z-0 w-full h-full absolute opacity-0 md:hidden"
          id="man-entering-mob"
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
        {/* Desktop panicked man section */}
        <div
          className="flex items-center justify-center z-20 w-full h-full overflow-hidden hidden md:flex"
          id="panick"
        >
          <div className="z-20 flex items-center justify-center">
            <img
              src="/story/comment-1-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-60 bottom-40"
              id="comment-1"
              ref={commentOneRef}
            />{" "}
            <img
              src="/story/comment-2-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-80 bottom-50"
              id="comment-2"
              ref={commentTwoRef}
            />
            <img
              src="/story/comment-3-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-10 bottom-10"
              id="comment-3"
              ref={commentThreeRef}
            />
          </div>
          <img
            src="/story/oat-with-man-png.png"
            alt="Panicked Goi"
            className="z-10 w-full h-full"
          />
        </div>

        {/* Mobile panicked man section */}
        <div
          className="flex items-center justify-center z-20 w-full h-full overflow-hidden md:hidden"
          id="panick-mob"
        >
          <div className="z-20 flex items-center justify-center">
            <img
              src="/story/comment-1-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-5 bottom-10"
              id="comment-1-mob"
            />
            <img
              src="/story/comment-2-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-15 -bottom-10"
              id="comment-2-mob"
            />
            <img
              src="/story/comment-3-png.png"
              alt=""
              className="absolute w-1/4 h-1/4 opacity-0 left-8 -bottom-25"
              id="comment-3-mob"
            />
          </div>
          <img
            src="/story/oat-man-with-bg-png-mob.png"
            alt="Panicked Goi (mobile)"
            className="z-10 w-full h-full"
          />
        </div>

        {/* Desktop shocked man background */}
        <img
          src="/story/shocked-man-bg-png.png"
          className="h-full w-full absolute z-0 overflow-y-hidden hidden md:block"
          ref={sideLookingRef}
        />

        {/* Mobile shocked man background */}
        <img
          src="/story/shocked-man-png-mob.png"
          className="h-full w-full absolute z-0 overflow-y-hidden md:hidden"
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
          src="/story/oat-walking-bg-png.png"
          alt="Goi walking"
          className="w-full h-full absolute z-10 hidden md:block"
          ref={walkingManRef}
        />
        <img
          src="/story/ck-png.png"
          alt="Goi walking"
          className="w-full h-full absolute z-0 hidden md:block"
          id="ck"
          ref={ckRef}
        />
        <img
          src="/story/moi-png.png"
          alt="Ck moi"
          className="w-full h-full absolute -z-10 hidden md:block"
          ref={moiRef}
        />

        {/* Mobile walking images */}
        <img
          src="/story/oat-walking-bg-png-mob.png"
          alt="Goi walking (mob)"
          className="w-full h-full absolute z-10 md:hidden"
          ref={walkingManMobRef}
        />
        <img
          src="/story/ck-png-mob.png"
          alt="Goi walking (mob)"
          className="w-full h-full absolute z-0 md:hidden"
          id="ck-mob"
          ref={ckMobRef}
        />
        <img
          src="/story/moi-png-mob.png"
          alt="Ck moi (mob)"
          className="w-full h-full absolute -z-10 md:hidden"
          ref={moiMobRef}
        />
      </div>
      <div
        className="min-h-screen max-w-full bg-gray-100 flex items-center justify-center z-10 overflow-y-hidden overflow-x-hidden"
        id="ck-badge"
      >
        {/* Desktop badge section */}
        <img
          src="/story/man-ck-badge-png.png"
          alt="Man kuthifying ck badge"
          className="z-0 w-full h-full hidden md:block"
          id="man-with-badge"
        />
        <img
          src="/story/placement-png.png"
          alt="My goi got placedd!!"
          className="absolute -z-10 w-full h-full hidden md:block"
          id="placement"
        />

        {/* Mobile badge section */}
        <img
          src="/story/man-ck-badge-png-mob.png"
          alt="Man kuthifying ck badge (mobile)"
          className="z-0 w-full h-full md:hidden"
          id="man-with-badge-mob"
        />
        <img
          src="/story/placement-png-mob.png"
          alt="My goi got placedd!! (mobile)"
          className="absolute -z-10 w-full h-full md:hidden"
          id="placement-mob"
        />
      </div>
    </div>
  );
}

export default StoryComponent;
