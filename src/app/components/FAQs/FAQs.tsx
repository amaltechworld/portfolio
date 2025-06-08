"use client";
import { useState } from "react";
import PlusIcon from "../icons/plus.svg";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "It depends on the complexity of the website and the scope of the project.",
  },
  {
    question: "What is your development process like?",
    answer:
      "I follow a hands-on approach starting with project planning, building out the core features, and regular check-ins to make sure everything matches your needs.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, I work with clients globally and can accommodate different time zones for meetings and communication.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "I have experience across various industries including technology, retail, hospitality, and professional services, bringing fresh perspectives to each project.",
  },
];

const FAQs = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="faqs">
      <div className="container mx-auto container-padding">
        <h2 className="text-4xl md:text-7xl lg:text-8xl"> FAQs</h2>
        <div className="mt-10 md:mt-16 lg:mt-20">
          {faqs.map(({ question, answer }, faqIndex) => (
            <div
              key={question}
              className="border-t border-stone-400 border-dotted last:border-b py-6 md:py-8 lg:py-10 cursor-pointer relative isolate group/faq"
              onClick={() => {
                if (faqIndex === selectedIndex) {
                  setSelectedIndex(null);
                } else {
                  setSelectedIndex(faqIndex);
                }
              }}
            >
              {/* transition bg- div-start */}
              <div
                className={twMerge(
                  "absolute h-0 w-full bottom-0 left-0 bg-stone-300 -z-10 group-hover/faq:h-full transition-all duration-700",
                  faqIndex === selectedIndex && "h-full "
                )}
              ></div>
              {/* transition bg- div-end */}
              <div
                className={twMerge(
                  "flex justify-between items-center gap-4 transition-all duration-500",
                  faqIndex === selectedIndex && "scale-85"
                )}
              >
                {/* qusetion */}
                <div className="text-2xl md:text-3xl lg:text-4xl">
                  {question}
                </div>
                {/* icon */}
                <div
                  className={twMerge(
                    "inline-flex items-center size-11 border border-stone-400 rounded-full shrink-0 transition duration-300 bg-stone-200",
                    faqIndex === selectedIndex && "rotate-45"
                  )}
                >
                  <PlusIcon />
                </div>
              </div>
              {/* answer div-start */}
              <AnimatePresence>
                {faqIndex === selectedIndex && (
                  <motion.div
                    className={twMerge(
                      "overflow-hidden",
                      faqIndex === selectedIndex && "scale-90"
                    )}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <p className="text-xl mt-4">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* answer div-end */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
