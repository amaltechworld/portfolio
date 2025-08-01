"use client";

import ChevronIcon from "../icons/chevron-double-down.svg";
import HeroButton from "@/app/components/Hero/HeroButton";
import SplitType from "split-type";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  useAnimate,
  stagger,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const Hero = () => {
  const [titleScope, titleAnimate] = useAnimate();
  const [ready, setReady] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollingDiv = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollingDiv,
    offset: ["start end", "end end"],
  });

  // const isDesktop = useMediaQuery("(min-width: 768px)");
  const portraitWidth = useTransform(scrollYProgress, [0, 1], ["100%", "240%"]); // total grid column 12 | 12/5 is image area (right) 12/5 = 2.4 * 100 => 240

  useEffect(() => {
    if (!titleScope.current) return;

    // Hide the container initially
    titleScope.current.style.visibility = "hidden";

    new SplitType(titleScope.current, {
      types: "lines,words",
      tagName: "span",
    });

    const words = titleScope.current.querySelectorAll(".word");

    // Set initial hidden transform
    words.forEach((word: HTMLElement) => {
      word.style.opacity = "0";
      word.style.transform = "translateY(100%)";
      word.style.display = "inline-block";
    });

    titleScope.current.style.visibility = "visible"; // Reveal container

    titleAnimate(
      words,
      { transform: "translateY(0%)", opacity: 1 }, // Add opacity for better visibility
      {
        duration: 0.5,
        delay: stagger(0.1),
        onComplete: () => setReady(true),
      }
    );
  }, [titleAnimate, titleScope]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleClick = () => {
    setIsNavigating(true);
  };

  return (
    <section className="relative" id="hero">
      {/* content */}
      <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
        {/* left content */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="container mx-auto container-padding !max-w-full">
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl mt-40 md:mt-0 ${
                !ready ? "invisible" : ""
              }`}
              ref={titleScope}
            >
              Crafting digital experiences through code and creative design with
              Next.js
            </h1>
            {/* button div start */}
            <div className="flex flex-col md:flex-row mt-10 items-start md:items-center gap-6">
              {/* button 1 */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.5,
                  ease: "easeOut",
                }}
              >
                <Link
                  href="/monthly-project"
                  onClick={handleClick}
                  className="..."
                >
                  <HeroButton>
                    <span>View My Work</span>
                    <div className="size-5">
                      <ChevronIcon />
                    </div>
                  </HeroButton>
                </Link>
                {isNavigating && (
                  <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.75,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <span className="h-auto px-0 border-transparent inline-flex after: content-[''] after:h-px after:w-0 after:absolute after:top-full after:bg-[#f97316] hover:after:w-full after:transition-all after:duration-300 after:ease-in-out">
                  Let&apos;s Talk
                </span>
              </motion.div>
            </div>
          </div>
        </div>
        {/* right content */}
        <div className="md:col-span-5 relative">
          {/* hero image */}
          <motion.div
            className="relative h-96 mt-20 w-full md:mt-0 md:size-full md:absolute md:right-0 max-md:!w-full"
            // style={ isDesktop ? { width: portraitWidth } : {} }
            style={{
              width: portraitWidth,
              transform: `translateY(${isMobile ? "5rem" : "3.5rem"})`,
            }}
          >
            {/*  /hero-mobile-image.jpg*/}
            <Image
              src="/hero-image.jpg"
              alt="hero image"
              fill
              className=" object-cover filter grayscale"
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </motion.div>
        </div>
      </div>
      <div className="md:h-[200vh] relative" ref={scrollingDiv}></div>
    </section>
  );
};

export default Hero;
