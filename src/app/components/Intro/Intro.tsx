"use client";
import { useAnimate, useInView, stagger } from "framer-motion";
import { useEffect } from "react";
import SplitType from "split-type";

const Intro = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(() => {
    new SplitType(scope.current.querySelector("h2"), {
      types: "lines,words",
      tagName: "span",
    });
  }, [scope]);

  useEffect(() => {
    if (inView) {
      animate(
        scope.current.querySelectorAll(".word"),
        {
          opacity: 1,
          transform: "translate(0%)",
        },
        {
          duration: 0.5,
          delay: stagger(0.2),
        }
      );
    }
  }, [inView, animate, scope]);
  return (
    <section className="section mt-12 md:mt-16 lg:mt-20" id="intro" ref={scope}>
      <div className="container mx-auto container-padding ">
        <h2 className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%]">
          Building beautiful websites with clean code and thoughtful design to
          help your business grow and stand out online
        </h2>
      </div>
    </section>
  );
};

export default Intro;
