import React from 'react'
import Image from 'next/image'
import ProcessCard from './ProcessCard'
import grp from '../../public/property-group.png'
const processSteps = [
  {
    title: 'Start Your Search',
    description: 'Filter properties by location, type, price, and amenities with our intuitive search tool.',
    color: 'pink' as const,
  },
  {
    title: 'Explore Listings',
    description: 'Explore detailed listings with high-quality images and descriptions for a complete property view.',
    color: 'purple' as const,
  },
  {
    title: 'Compare Properties',
    description: 'Compare properties side-by-side to easily evaluate features, prices, and amenities.',
    color: 'purple' as const,
  },
  {
    title: 'Expert Assistance',
    description: 'Experience virtual tours of properties and receive personalized support from real estate experts.',
    color: 'pink' as const,
  },
  {
    title: 'Receive AI Suggestions',
    description: 'AI recommends properties based on your criteria, revealing options you might have missed.',
    color: 'pink' as const,
  },
  {
    title: 'Finalize Your Choice',
    description: 'We provide resources to guide you through a smooth buying or renting process.',
    color: 'purple' as const,
  },
]

const ProcessSection: React.FC = () => {
  return (
    <section className="container mx-auto px-3 md:mb-[110px] lg:mb-[110px] mb-[45px]">
      <div className="">
  

        <div className="border-l-4 border-l-[#EF2BA0] px-3">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30] mb-2">
               A Seamless Process
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-4">
        Tailored for You
        </h3>
        <p className="text-[#3A3A3A] md:text-[18px] leading-[22px] mb-8 max-w-4xl">
        AI Experience a seamless property journey with our straightforward, user-friendly process
        </p>
      </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 mb-8 overflow-x-auto pb-4 lg:overflow-x-visible lg:pb-0">
            <div className="flex lg:grid lg:grid-cols-2 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="w-72 lg:w-auto flex-shrink-0">
                  <ProcessCard {...step} />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/3">
            <div className="relative w-full h-full">
              <Image
                src={grp}
                alt="Property collage"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection