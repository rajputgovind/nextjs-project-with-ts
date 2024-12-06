import React from "react";
// import { Home, BarChart2, Headphones, Box } from 'lucide-react'

import home from "../../public/home-card.svg";
import Image from "next/image";

const ChooseUsSection: React.FC = () => {
  return (
    <section className="container mx-auto md:pb-[110px] lg:pb-[110px] pb-[45px] px-3">
      <div className="">


        <div className="border-l-4 border-l-[#EF2BA0] px-3 mb-12">
          <p className="leading-[45px] mb-[10px]">
          <span className="text-3xl md:text-4xl font-semibold text-[#120F30] mb-2">
          Benefits of Choosing 
          </span>
          <br />
          <span className="text-3xl md:text-4xl font-semibold text-[#EF2BA0] mb-4">
          AI Property
          </span>
          </p>
          <p className="text-[#3A3A3A] md:text-[18px] leading-[22px] max-w-4xl">
          AI Property leverages cutting-edge technology to provide smart property matching, transparent market analysis, and seamless virtual tours.
          </p>
        </div>

        <div className="mb-8 overflow-x-auto pb-4 sm:overflow-x-visible sm:pb-0">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="w-72 sm:w-auto flex-shrink-0">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#F46BBC]">
                  <Image
                    src={home}
                    alt=""
                    className="w-12 h-12 text-purple-600 mb-4"
                  />

                  <h3 className="text-xl font-semibold text-[#EC008C] mb-2">
                    Smart Property Matching
                  </h3>
                  <p className="text-[#3A3A3A] text-[18px] leading-[22px]">
                    AI Property uses advanced algorithms to understand your
                    unique preferences
                  </p>
                </div>
              </div>
            </div>

            <div className="w-72 sm:w-auto flex-shrink-0">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#F46BBC]">
                  <Image
                    src={home}
                    alt=""
                    className="w-12 h-12 text-purple-600 mb-4"
                  />

                  <h3 className="text-xl font-semibold text-[#EC008C] mb-2">
                  Transparent Market Analysis
                  </h3>
                  <p className="text-[#3A3A3A] text-[18px] leading-[22px]">
                    AI Property uses advanced algorithms to understand your
                    unique preferences
                  </p>
                </div>
              </div>
            </div>

            <div className="w-72 sm:w-auto flex-shrink-0">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#F46BBC]">
                  <Image
                    src={home}
                    alt=""
                    className="w-12 h-12 text-purple-600 mb-4"
                  />

                  <h3 className="text-xl font-semibold text-[#EC008C] mb-2">
                  Personalized Support
                  </h3>
                  <p className="text-[#3A3A3A] text-[18px] leading-[22px]">
                    AI Property uses advanced algorithms to understand your
                    unique preferences
                  </p>
                </div>
              </div>
            </div>

            <div className="w-72 sm:w-auto flex-shrink-0">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#F46BBC]">
                  <Image
                    src={home}
                    alt=""
                    className="w-12 h-12 text-purple-600 mb-4"
                  />

                  <h3 className="text-xl font-semibold text-[#EC008C] mb-2">
                  Experience Real Estate in 3D
                  </h3>
                  <p className="text-[#3A3A3A] text-[18px] leading-[22px]">
                    AI Property uses advanced algorithms to understand your
                    unique preferences
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
