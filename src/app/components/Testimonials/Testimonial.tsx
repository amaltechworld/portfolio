
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, type HTMLAttributes } from "react";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView, motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";


const Testimonial = (
  props: {
    quote: string;
    name: string;
    role: string;
    company: string;
    imagePositionY: number;
    image: string;
    className?: string;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const {
    quote,
    name,
    role,
    company,
    imagePositionY,
    image,
    className,
    ...rest
  } = props;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  const { scope: quoteScope, entranceAnimation: quoteEntranceAnimation } =
    useTextRevealAnimation(true);

  const { scope: citeScope, entranceAnimation: citeEntranceAnimation } =
    useTextRevealAnimation(false);

  useEffect(() => {
    if (isInView) {
      quoteEntranceAnimation().then(() => {
        citeEntranceAnimation();
      });
    }
  }, [isInView, quoteEntranceAnimation, citeEntranceAnimation]);


  return (
    <>
      <div
        ref={containerRef}
        className={twMerge(
          "md:grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center",
          className
        )}
        {...rest}
      >
        <div className="relative aspect-square md:aspect-[9/16] md:col-span-2 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover w-full h-full"
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{
                objectPosition: `50% ${imagePositionY * 100}%`,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
              key={image}
                className="absolute h-full bg-stone-900"
                initial={{
                  width: "100%",
                }}
                animate={{ width: 0 }}
                exit={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </AnimatePresence>
          </div>
        </div>

        <blockquote className="md:col-span-3">
          <div
            className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0 invisible"
            ref={quoteScope}
          >
            <span>&ldquo;</span>
            {quote}
            <span>&rdquo;</span>
          </div>
          <cite
            className="mt-4 md:mt-8 not-italic block md:text-lg lg:text-xl invisible"
            ref={citeScope}
          >
            {name}, {role} at {company}
          </cite>
        </blockquote>
      </div>
    </>
  );
};

export default Testimonial;
