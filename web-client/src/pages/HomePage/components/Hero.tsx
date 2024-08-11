import React, { useRef } from "react";
import { BackgroundCircles } from "../../../common/DesignHero";
export default function Hero() {
  const parallaxRef = useRef(null);

  return (
    <section className="p-page overflow-hidden bg-black-8">
      <div className="relative" ref={parallaxRef}>
        <div className="z-1 relative max-w-[62rem] mx-auto text-center mt-[5rem] mb-[3.875rem]">
          <h1 className="font-semibold mobile:text-[2.5rem] mobile:leading-[3.25rem] widescreen:text-[4rem] widescreen:leading-[4 rem] font-poppins text-back mb-6">
            Every idea has a first line of code. Prep for jobs and sharpen your
            skills
          </h1>
          <p className="max-w-3xl mx-auto mb-6 text-back/60">
            CodeRank is the best platform to help you enhance your skills,
            expand your knowledge and prepare for technical interviews.
          </p>
        </div>
        <div className="relative mobile:max-w-[23rem] mx-auto widescreen:max-w-5xl widescreen:mb-[10rem] mobile:mb-[6rem]">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative z-1 mobile:aspect-[33/40] rounded-b-[0.9rem] overflow-hidden  widescreen:aspect-[1024/490] rounded-2xl">
              <img
                src={"/images/Hero.jpeg"}
                className="w-full h-full"
                width={1024}
                height={490}
                alt="AI"
              />
            </div>
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={"/images/hero-background.jpg"}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
          <BackgroundCircles top={"-35rem"} />
        </div>
      </div>
    </section>
  );
}
