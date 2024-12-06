'use client'

import { Target, Rocket, Diamond, Shield } from "lucide-react";
import Image from "next/image";
import about from "../../../public/about-img.png";
import city from "../../../public/city-day.png";
import { useEffect, useState } from "react";

const page = () => {
  const [ip, setIp] = useState("");
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIp();
  }, []);
  return (
    <div className="pt-[100px]">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="">
            <div className="text-[#7D7999] text-[20px] font-semibold uppercase tracking-wide mb-4">
              About Us
            </div>
            <h1 className="text-3xl md:text-[36px] text-[#0B0B0B] lg:text-[36px] font-semibold leading-[46px] mb-5">
              Guiding You to Your Dream Home with Advanced AI and Unmatched
              Insight {ip}
            </h1>
            <p className="text-[#3A3A3A] text-[18px] leading-[28px] mb-10">
              Our mission is to make finding your perfect home easier and more
              rewarding. By combining advanced AI technology with deep industry
              knowledge, we provide tailored insights that simplify your search
              and help you make informed decisions. With a commitment to driven
              recommendations, we&lsquo;re here to guide you every step of the
              way to your dream home. Let us guide you to the home of your
              dreams with clarity, confidence, and care.
            </p>
            <button className="rounded  bg-[#EC008C] hover:bg-pink-600 text-white text-[16px] font-medium px-10 py-3">
              Contact Us
            </button>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <Image
                src={about}
                alt="Modern city buildings"
                width={557}
                height={507}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Our Mission",
              image: "/bullseye.png",
              description:
                "We make property management easy with AI, faster, better service for owners and tenants.",
            },
            {
              title: "Our Vision",
              image: "/vision.png",
              description:
                "We make property management easy with AI, faster, better service for owners and tenants.",
            },
            {
              title: "Our Values",
              image: "/diamond.png",
              description:
                "Trust, innovation, and sustainability guide us in offering clear, AI-powered property management",
            },
            {
              title: "Our Goal",
              image: "/flag-two.png",
              description:
                "Help owners and tenants enjoy a smooth experience, reducing hassle through AI-driven support.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border-2 border-[#F46BBC] hover:border-[#c4398a] transition-colors"
            >
              {/* <feature.icon className="w-12 h-12 text-pink-500 mb-4" /> */}
              <img src={feature.image} alt="" className="mb-4" />

              <h3 className="text-[22px] font-medium text-[#EC008C] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#3A3A3A] text-[18px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-[#FDE6F4] py-16">
        <div className="container mx-auto px-4">
          <div className=" mx-auto">
            <div className="border-l-4 border-l-[#EF2BA0] px-3">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
                How we
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
                work
              </h3>
            </div>
            <div className="space-y-8 mt-8">
              {[
                {
                  title: "Understanding Your Needs",
                  description:
                    "We begin with a thorough consultation to understand your goals and property requirements.",
                },
                {
                  title: "Customized Onboarding",
                  description:
                    "Our team sets up seamless communication, billing, and maintenance systems tailored to your property.",
                },
                {
                  title: "Efficient Management & Maintenance",
                  description:
                    "From handling tenant requests to scheduling regular inspections, we take care of daily operations.",
                },
                {
                  title: "Insightful Reporting",
                  description:
                    "With AI-driven insights, you receive regular updates on property performance and maintenance needs.",
                },
                {
                  title: "Continuous Improvement",
                  description:
                    "We adapt our services based on your feedback, ensuring that your property runs smoothly and efficiently.",
                },
              ].map((step, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-[22px] text-[#0B0B0B] font-semibold">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-[#3A3A3A] text-[18px] font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto">
          <div className="border-l-4 border-l-[#EF2BA0] px-3">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
              Our Virtual Assistant for Direct Interaction
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
              AI Chatbot: Replace &lsquo;Meet the Team&lsquo;
            </h3>
          </div>
          <p className="text-[#3A3A3A] text-[18px] mb-6">
            Meet your virtual assistant, designed to streamline your experience
            and provide personalized support right when you need it. Our AI
            chatbot replaces the traditional &quot;Meet the Team&quot; section,
            making it easier than ever to connect directly with our services.
          </p>
          <p className="text-gray-600 mb-6">
            Whether you&apos;re a property owner, tenant, or community manager,
            the AI chatbot is here to assist with:
          </p>
          <div className="space-y-6">
            {[
              {
                title: "Answering Common Questions",
                description:
                  "Get immediate responses to frequently asked questions, tailored to your needs.",
              },
              {
                title: "Providing Service Guidance",
                description:
                  "Navigate our offerings with ease as the chatbot guides you through the services and solutions available.",
              },
              {
                title: "Troubleshooting Assistance",
                description:
                  "Encounter an issue? The chatbot can help troubleshoot common problems, saving you time and effort.",
              },
            ].map((feature, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-[#0B0B0B] font-medium">
                  {index + 1}. {feature.title}
                </h4>
                <p className="text-[#3A3A3A] text-[18px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h4 className="text-[22px] font-medium mb-2 text-[#0B0B0B]">
              24/7 Availability
            </h4>
            <p className="text-[#3A3A3A]">
              The AI chatbot is available around the clock, so you can access
              support anytime, day or night. Think of it as a reliable team
              member that&apos;s always ready to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-fluid mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center justify-between">
            <div className="space-y-6 m-auto px-4">
              <h2 className="text-3xl md:text-[36px] text-white font-semibold leading-[46px]">
                Ready to Find Your New Home?
                <br />
                Let Our AI Guide You!
              </h2>
              <button className="rounded-full bg-[#EC008C] custom-shadow-2 hover:bg-pink-600 text-white px-12 py-[14px] font-semibold">
                SEARCH FOR YOUR HOME
              </button>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              <Image src={city} alt="City skyline" fill className="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
