import Image from "next/image";
import React from "react";
import herobg from "../../public/hero-bg.svg";
import HomeSearch from "./HomeSearch";

// interface HeroSectionProps {
//   onSearchSelected: (locations: string[]) => void;
// }

const HeroSection = () => {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          className="w-full"
          src={herobg}
          alt="Background of white houses with red roofs"
          layout="fill"
          objectFit="cover"
          priority
        /> 
        <div className="absolute inset-0">
          <div className="relative top-1/4 m-auto h-full items-center justify-center">
            <h1 className="text-center text-xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-5xl">
              <span className="text-[#1E184F]">Find Your </span>
              <span className="text-[#EF2BA0]">Dream Property</span>
              <span className="text-[#1E184F]"> With</span>
              <br />
              <span className="text-[#1E184F]">AI-Powered Precision</span>
            </h1>

            <div className="mt-12 p-4 max-w-3xl w-full m-auto">
              <HomeSearch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
