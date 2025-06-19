"use client";
import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import ArrowUpRight from "../icons/arrow-up-right.svg"
import Link from "next/link";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
  {
    label: "About",
    href: "#intro",
  },
  {
    label: "Selected Works",
    href: "#projects",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
  {
    href: "https://github.com/amaltechworld",
    label: "GitHub",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topLineScope, topLineAnimate] = useAnimate();
  const [bottomLineScope, bottomLineAnimate] = useAnimate();
  const [navScope, navAnimate] = useAnimate();

  useEffect(() => {
    if (isOpen) {
      topLineAnimate([
        [
          topLineScope.current,
          {
            translateY: 4,
          },
        ],
        [
          topLineScope.current,
          {
            rotate: 45,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            translateY: -4,
          },
        ],
        [
          bottomLineScope.current,
          {
            rotate: -45,
          },
        ],
      ]);
      // navbar animate: height from 0 to 100%
      navAnimate(
        navScope.current,
        {
          height: "100%",
        },
        {
          duration: 0.7,
        }
      );
    } else {
      topLineAnimate([
        [
          topLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          topLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          bottomLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      navAnimate(navScope.current, { height: 0 });
    }
  }, [
    isOpen,
    topLineAnimate,
    topLineScope,
    bottomLineAnimate,
    bottomLineScope,
    navAnimate,
    navScope,
  ]);

  // prevent the default jump behaviour (animate the closing of nav, smoothly)
  const handleClickMobileNavItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);

    const url = new URL(e.currentTarget.href);
    const hash = url.hash;

    //  Ignore external links (GitHub, LinkedIn, etc.)
    if (!hash || e.currentTarget.target === "_blank") {
      window.open(url.toString(), "_blank");
      return;
    }
    const target = document.querySelector(hash);

    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
  }

  const [contactIsOpen, contactSetIsOpen] = useState(false);

  return (
    <header>
      {/* navbar- start */}
      <div
        className="fixed top-0 left-0 w-full h-0 overflow-hidden bg-stone-900 z-10"
        ref={navScope}
      >
        <nav className="mt-20 flex flex-col">
          {navItems.map(({ href, label, target, rel }) => (
            <a
              href={href}
              key={label}
              className="text-stone-200 border-t last:border-b border-stone-800 py-3 group relative" //py?
              // onClick={(e) => handleClickMobileNavItem(e)}
              onClick={handleClickMobileNavItem}
              {...(target && { target })}
              {...(rel && { rel })}
            >
              {/* seperate absolute div for bg while hovering */}
              <div className="absolute w-full h-0 bg-stone-800 group-hover:h-full transition-all duration-500 z-[-1] bottom-0"></div>
              {/* nav content */}
              <div className="container mx-auto container-padding !max-w-full flex items-center justify-between z-10">
                <span className="text-3xl group-hover:pl-4 transition-all duration-500">
                  {label}
                </span>
                <ArrowUpRight className="size-6" />
              </div>
            </a>
          ))}
        </nav>
      </div>
      {/* navbar- end */}
      {/* left content-LOGO start  */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-md mix-blend-difference z-[100]">
        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[4rem] !max-w-full">
          <div className="flex justify-between h-20 items-center ">
            <div>
              <Link href="/" className="group pointer-events-auto ">
                <span className="relative text-xl text-white font-bold uppercase cursor-pointer">
                  Amal&nbsp; Raj
                  {/* Underline */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* left content end  */}

      {/* right content -SVG icon*/}
      <div className="fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[4rem] !max-w-full">
          <div className="flex justify-end h-20  items-center">
            <div className="flex items-center gap-4">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="size-11 bg-stone-200 border border-stone-400 rounded-full inline-flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* top bar */}

                  <motion.rect
                    x="3"
                    y="7"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={topLineScope}
                    style={{
                      transformOrigin: "12px 16px",
                    }}
                  />
                  {/* bottom bar */}
                  <motion.rect
                    x="3"
                    y="15"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={bottomLineScope}
                    style={{
                      transformOrigin: "12px 8px",
                    }}
                  />
                </svg>
              </div>

              {/* <button className="bg-[#f97316] h-11 px-6 rounded-xl border border-[#f97316] uppercase hidden md:inline-flex items-center">
                CONTACT ME
              </button> */}
              <div className="relative">
                {/* Contact Button */}
                <button
                  className="bg-[#f97316] h-11 px-6 rounded-xl border border-[#f97316] uppercase hidden md:inline-flex items-center cursor-pointer"
                  onClick={() => contactSetIsOpen(!isOpen)}
                  onMouseEnter={() => contactSetIsOpen(true)}
                  onMouseLeave={() => contactSetIsOpen(false)}
                >
                  CONTACT ME
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-12 left-0 w-48 bg-[#e7e5e4] shadow-lg rounded-lg transition-all duration-300 ease-in-out ${
                    contactIsOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                  onMouseEnter={() => contactSetIsOpen(true)}
                  onMouseLeave={() => contactSetIsOpen(false)}
                >
                  <ul className="py-2">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/amaltechworld/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 hover:bg-gray-50 hover:ml-2 transition-all"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:amaltechworld@gmail.com?subject=Website Inquiry&body=Hi Amal, I’m interested in a website."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 hover:bg-gray-50 hover:ml-2 transition-all"
                      >
                        Gmail
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/8943374122"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 hover:bg-gray-50 hover:ml-2 transition-all"
                      >
                        WhatsApp
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* right side end */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
