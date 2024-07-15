import React, { useRef } from "react";
import { BackgroundCircles } from "../../../common/DesignHero";
export default function Hero() {
  const parallaxRef = useRef(null);

  return (
    <section className="p-page overflow-hidden bg-black-8">
      <div className="relative" ref={parallaxRef}>
        <div className="z-1 relative max-w-[62rem] mx-auto text-center mt-[5rem] mb-[3.875rem]">
          <h1 className="font-semibold mobile:text-[2.5rem] mobile:leading-[3.25rem] widescreen:text-[4rem] widescreen:leading-[4 rem] font-poppins text-back mb-6">
            Explore the Possibilities of&nbsp;AI&nbsp;Chatting with {` `}{" "}
            CodeMaster
          </h1>
          <p className="max-w-3xl mx-auto mb-6 text-back/60">
            Unleash the power of AI within Brainwave. Upgrade your productivity
            with Brainwave, the open AI chat app.
          </p>
        </div>
        <div className="relative mobile:max-w-[23rem] mx-auto widescreen:max-w-5xl widescreen:mb-[10rem] mobile:mb-[6rem]">
          <div className="relative z-1 mobile:aspect-[33/40] rounded-b-[0.9rem] overflow-hidden  widescreen:aspect-[1024/490] rounded-2xl border-black-6 border-4">
            <img
              src={"/images/robot.jpg"}
              className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
              width={1024}
              height={490}
              alt="AI"
            />
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
          <BackgroundCircles top={'-35rem'}/>
        </div>
      </div>
    </section>
  );
}
