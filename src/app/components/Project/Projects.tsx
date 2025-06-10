"use client";
import Image from "next/image";
import ArrowUpRight from "../icons/arrow-up-right.svg";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const projects = [
  {
    name: "MyGala",
    image: "/project-1.png",
    link: "https://mygalagroup123.netlify.app/",
  },
  {
    name: "Wavelength Studios",
    image: "/project-2.jpg",
    link: "",
  },
  {
    name: "Nova Fitness",
    image: "/project-3.jpg",
    link: "",
  },
  {
    name: "Urban Plates",
    image: "/project-4.jpg",
    link: "",
  },
  {
    name: "Bloom Botanicals",
    image: "/project-5.jpg",
    link: "",
  },
];

const Projects = () => {
  return (
    <section className="section" id="projects">
      <div className="container container-padding mx-auto">
        <h2 className="text-4xl md:text-7xl lg:text-8xl">Selected Works</h2>
        {/* image div */}
        <div className="mt-10 md:mt-16 lg:mt-20">
          {projects.map(({ name, image, link }) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={name}
              className="border-t last:border-b border-stone-400 border-dotted py-6 md:py-8 lg:py-10 flex flex-col relative group/project"
            >
              <div className="absolute bottom-0 left-0 w-full h-0 group-hover/project:h-full transition-all duration-700 bg-stone-300 z-0"></div>
              <div className="relative z-10">
                {/* image for mobile- start*/}
                <div className="relative h-48 w-full aspect-video md:hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="size-full object-cover"
                  />
                </div>
                {/* image for mobile- end*/}

                {/* md:[grid-template-column:1fr_300px_max-content] */}
                <div className="mt-8 md:mt-0 flex justify-between items-center md:grid md:grid-cols-[1fr_auto_auto] md:gap-8">
                  <div className="lg:group-hover/project:pl-8 transition-all duration-700">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl">{name}</h3>
                  </div>
                  {/* image for medium and above- start*/}
                  <div className="relative w-68 hidden md:block">
                    <div className="absolute aspect-video w-full top-1/2 -translate-y-1/2 opacity-0 scale-90 group-hover/project:opacity-100 group-hover/project:scale-110 transition-all duration-500 z-10">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="size-full object-cover"
                      />
                    </div>
                  </div>
                  {/* image for medium and above- end*/}
                  <div className="lg:group-hover/project:pr-8 transition-all">
                    <div className="size-6 overflow-hidden">
                      <div className="h-6 w-12 flex group-hover/project:-translate-x-1/2 transition-transform duration-300">
                        <ArrowUpRight className="w-6 h-6" />
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
