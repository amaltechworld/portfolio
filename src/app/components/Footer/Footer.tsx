"use client";

import UpRightArrow from "../icons/arrow-up-right.svg";
import FooterButton from "@/app/components/Footer/FooterButton";

const navItems = [
  {
    href: "#intro",
    label: "About",
  },
  {
    href: "#projects",
    label: "Projects",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#faqs",
    label: "Faqs",
  },
  {
    href: "https://github.com/amaltechworld",
    label: "GitHub",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const Footer = () => {

  // prevent the default jump behaviour (animate the closing of nav, smoothly)
  const handleClickMobileNavItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const url = new URL(e.currentTarget.href);
    const hash = url.hash;

    if (!hash) {
      window.open(url.toString(), "_blank");
      return;
    }

    const target = document.querySelector(hash);

    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="bg-stone-900 text-white" id="contact">
      <div className="container mx-auto container-padding">
        {/* py added div-start */}
        <div className="section">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-green-400 animate-pulse"></div>{" "}
            {/* green indicator */}
            <span className="uppercase">Built with Next.js by Amal Raj</span>
          </div>
          <div className="md:grid md:grid-cols-3 md:items-center">
            {/* md: left side */}
            <div className="md:col-span-2">
              <h2 className="text-4xl md:text-7xl lg:text-8xl mt-8 font-extralight">
                Enough talk. Let&apos;s make something great together.
              </h2>
              <FooterButton
                iconAfter={<UpRightArrow className="size-5 " />}
                onClick={() => {
                  window.location.href =
                    "mailto:amaltechworld@gmail.com?subject=Website Inquiry&body=Hi Amal, I’m interested in a website.";
                }}
              >
                amaltechworld@gmail.com
              </FooterButton>
            </div>
            {/* nav section md: right side */}
            <div className="md:col-span-1">
              <nav className="flex flex-col md:items-end gap-8 mt-16 md:mt-0">
                {navItems.map(({ href, label, target, rel }) => (
                  <a
                    href={href}
                    key={label}
                    className="group relative"
                    onClick={handleClickMobileNavItem}
                    {...(target && { target })}
                    {...(rel && { rel })}
                  >
                    <button className="text-lg cursor-pointer relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-orange-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 group-hover:before:scale-x-100">
                      {label}
                    </button>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {/* py added div-end */}
        <p className="py-16 text-white/30 text-sm">
          Copyright &copy; Amal Raj &bull; All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
