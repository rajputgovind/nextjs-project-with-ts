"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import agent from "../../../public/agent-img.png";
import call from "../../../public/call.png";
import star from "../../../public/star-glow.png";

interface Question {
  title: string;
  answers: number;
  following: number;
  avatar: string;
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("recently-answered");
  
  const questions: Question[] = [
    {
      title: "What makes Singapore's property market unique?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "Which areas in Singapore are best for property investment?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "What is the Central Business District (CBD) known for?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "Are there affordable residential areas in Singapore?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "What are the current property trends in Singapore?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "Which areas are suitable for expatriates in Singapore?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "What is the government's role in property regulation?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "Is renting a popular option in Singapore?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "What is the future outlook for Singapore's property market?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "What are the benefits of living in suburban areas like Tampines?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title:
        "How do public housing (HDB) and private housing differ in Singapore?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "What are some popular luxury property areas in Singapore?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title: "Are there opportunities for commercial property investment?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
    {
      title:
        "What are the transportation advantages in Singapore's property areas?",
      answers: 2,
      following: 3,
      avatar: "/faq-profile.png",
    },
  ];



  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
        Interactive Forums and Local Discussions in Central Business District
        </h1>

        {/* Search Section */}
        <div className="bg-[#443F6D] rounded-3xl md:px-[230px] py-4 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row gap-4 border rounded-full bg-white">
            <input
              type="text"
              placeholder="GOT QUESTIONS? THE LOCALS HAVE ANSWERS!"
              className="flex-1 rounded-full px-6 py-3 text-sm w-full bg-transparent outline-none"
            />
            <button className="bg-[#EC008C] text-white rounded-full px-8 py-3 font-medium hover:bg-pink-600 w-full sm:w-auto">
              ASK QUESTION
            </button>
          </div>
        </div>

        

        <div className="lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 flex flex-col  gap-8">
          {/* Questions Section */}
          <div className="lg:col-span-2">
            <h2 className="text-[22px] font-bold mb-7">
              Latest Responses in Orchard Road
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab("recently-answered")}
                className={`px-4 py-2 rounded-full text-sm${
                  activeTab === "recently-answered"
                    ? "bg-tranparent text-[#EC008C]  border border-[#EC008C] "
                    : "bg-transparent text-[#0B0B0B] border border-[#0B0B0B]"
                }`}
              >
                Recently Answered
              </button>
              <button
                onClick={() => setActiveTab("recently-asked")}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeTab === "recently-asked"
                    ? "bg-tranparent text-[#EC008C]  border border-[#EC008C] "
                    : "bg-transparent text-[#0B0B0B] border border-[#0B0B0B]"
                }`}
              >
                Recently Asked
              </button>
              <button
                onClick={() => setActiveTab("unanswered")}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeTab === "unanswered"
                    ? "bg-tranparent text-[#EC008C]  border border-[#EC008C] "
                    : "bg-transparent text-[#0B0B0B] border border-[#0B0B0B]"
                }`}
              >
                Unanswered
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Image
                    src={question.avatar}
                    alt="User avatar"
                    width={70}
                    height={70}
                    className="rounded-full flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <Link
                      href="#"
                      className="text-[#EF2BA0] hover:underline block truncate text-[22px]"
                    >
                      {question.title}
                    </Link>
                    <div className="text-[18px] text-[#3A3A3A] mt-1">
                      {question.answers} answers {question.following} following
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8 flex-wrap bg-[#FDE6F4] md:w-max m-auto px-6 py-4 rounded-full custom-shadow-2">
              <button className="w-8 h-8 font-semibold flex items-center justify-center rounded-full text-[#3A3A3A]">
                {"<"}
              </button>
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    page === 1 ? "bg-[#443F6D] text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="px-2">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-full">
                20
              </button>
              <button className="w-8 h-8 font-semibold flex items-center justify-center rounded-full text-[#3A3A3A]">
                {">"}
              </button>
            </div>
          </div>

          {/* Agents Section */}
          <div className="bg-white rounded-[20px] border border-[#A3A0B7] h-max">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={agent}
                  alt=""
                  width={66}
                  height={66}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium text-[22px] leading-[26.5px] mb-3">
                    Ralph Edwards
                  </h3>
                  <div className="flex items-center gap-1">
                    <Image src={star} alt="" />
                    <span className="font-medium">4.9</span>
                    <span className="text-[#3A3A3A]">(25 Reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-[#3A3A3A] text-[18px] leading-[30px] mb-6">
                Excellent service from the very start. I got valuable advices in
                terms of deciding the best time to put the property...
                <button className="text-pink-500 font-medium ml-1">
                  Read More
                </button>
              </p>
              <div className="flex items-center gap-3 mb-6">
                <button className="flex-1 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50">
                  Content Agent
                </button>
                <button className="h-11 w-11 rounded-full bg-[#FDE6F4] hover:bg-pink-600 flex items-center justify-center">
                  <Image src={call} alt="" />
                </button>
              </div>
            </div>
            <div className="py-4 text-[22px] text-[#443F6D]  text-center bg-[#E9E8ED]  overflow-hidden rounded-b-[20px]">
              UOL Group Limited
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
