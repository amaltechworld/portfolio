"use client"

import ArrowLeft from "../icons/arrow-left.svg";
import ArrowRight from "../icons/arrow-right.svg";
import { useScroll, motion, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Testimonial from "./Testimonial";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const testimonials = [
  {
    name: "Neeraj",
    company: "MyGala",
    role: "Founder and C.E.O",
    quote:
      "Amal, we truly appreciate your dedication to bringing our design vision to life within the given timeframe. Your commitment to excellence ensures we’ll collaborate again in the future.",
    image: "/neeraj.jpg",
    imagePositionY: 0.2,
  },
  {
    name: "Prabhul",
    company: "Robistaan Techlab Pvt. Ltd.",
    role: "Founder and C.E.O",
    quote:
      "Amal, innovative approach to styling our website truly exceeded expectations.",
    image: "/prabhul.jpeg",
    imagePositionY: 0.1,
  },
  {
    name: "Emily Watson",
    company: "Studio Minimal",
    role: "Creative Director",
    quote:
      "The collaborative process was amazing. Alex brought lots of fresh perspectives and innovative solutions.",
    image: "/testimonial-3.jpg",
    imagePositionY: 0.55,
  },
];

const Testimonials = () => {
  const titleRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: titleRef,
    offset: ['start end', 'end start']
  })

  const transformTop = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const transformBottom = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleClickPrev = () => {
    setTestimonialIndex((curr) => {
      if (curr === 0) {
        return testimonials.length - 1;
      }
      return curr - 1;
    });
  };

  const handleClickNext = () => {
    setTestimonialIndex((curr) => {
      if (curr === testimonials.length - 1) return 0;
      return curr + 1;
    })
  }

  return (
    <section className="section" id="testimonials">
      <h2
        className="text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden tracking-tighter "
        ref={titleRef}
      >
        <motion.span
          className="whitespace-nowrap"
          style={{
            x: transformTop,
          }}
        >
          Some nice words from my past clients
        </motion.span>
        <motion.span
          className="whitespace-nowrap self-end text-[#f97316]"
          style={{
            x: transformBottom,
          }}
        >
          Some nice words from my past clients
        </motion.span>
      </h2>
      {/* container div start */}
      <div className="container mx-auto container-padding">
        <div className="mt-20 ">
          <AnimatePresence mode="wait" initial={false}>
            {testimonials.map((t, index) =>
              index === testimonialIndex ? (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Testimonial {...t} />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
        {/* arrow button start*/}
        <div className="flex gap-4 mt-6 lg:mt-10">
          <button
            className="border border-stone-400 inline-flex items-center justify-center rounded-full hover:bg-[#f97316] hover:text-white hover:border-[#f97316] transition-all duration-300"
            onClick={handleClickPrev}
          >
            <ArrowLeft className="w-11 h-11" />
          </button>
          <button
            className="border border-stone-400 inline-flex items-center justify-center rounded-full hover:bg-[#f97316] hover:text-white hover:border-[#f97316] transition-all duration-300"
            onClick={handleClickNext}
          >
            <ArrowRight className="w-11 h-11" />
          </button>
        </div>
        {/* arrow button end*/}
      </div>
      {/* container div end */}
    </section>
  );
};

export default Testimonials;
