"use client";

import { useState } from "react";
import {
  Star,
  Phone,
  Flag,
  MessageCircle,
  Share2,
  Heart,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

import agent from "../../public/agent-img.png";
import call from "../../public/call.png";
import star from "../../public/star-glow.png";

export default function QueryAnswer() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Question Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/agent-img.png"
                alt="marenap"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-medium">marenap</span>
            </div>
            <h1 className="text-2xl font-medium mb-4 text-[#101010] text-[28px] leading-[48px]">
              Why is the CBD important to Singapore&apos;s economy?
            </h1>
            <p className="text-[#343D42] mb-4 text-[16px] leading-[30px]">
              Hi
              <br />I am relocating to Brisbane and I need to get my security
              deposit back but don&apos;t have much time to clean the apartment
              myself? Do you know anybody who can help me at low cost?
            </p>
            <div className="flex justify-between items-center mb-4">
              <p className="text-[11px] text-[#95A4A7] mb-0">
                The opinions expressed here are those of the individual and not
                those of Homely.com.au
              </p>
              <button className="text-[#343D42] hover:text-gray-800 flex items-center gap-2 mb-0">
                <Flag className="w-[12px] h-[16px] " />
                <p className="text-[#343D42] text-[12px]">Report</p>
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-sm text-[#343D42]">
                3 people following this question
              </span>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <Heart
                    className={`w-[16.5px] h-[21px] text-[#101010] ${
                      isFollowing ? "fill-pink-500 stroke-pink-500" : ""
                    }`}
                  />
                  Follow
                </button>
                <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-800">
                  <Image src="/share-icon.png" alt="" width={16} height={21} />
                  Share
                </button>
              </div>
            </div>
            <button className="bg-[#FF0086] text-white px-6 py-2 rounded-full hover:bg-pink-600">
              Answer question
            </button>
          </div>

          {/* Answers Section */}
          <div>
            <h2 className="text-xl font-bold mb-6">2 Answers</h2>

            {/* Answer 1 */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/agent-img.png"
                  alt="Marvin McKinney"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="font-medium">Marvin McKinney</span>
              </div>
              <p className="text-[#343D42] mb-4 text-[16px] leading-[30px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className=" mb-4">
                Check them out:{" "}
                <a
                  href="https://www.zerospot.com.au/cleaning-services/end-of-lease-cleaning-melbourne/"
                  className="hover:underline text-[#FF0086] text-[16px] leading-[28px]"
                >
                  https://www.zerospot.com.au/cleaning-services/end-of-lease-cleaning-melbourne/
                </a>
              </p>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <button className="text-[#475A6B] hover:text-gray-600">
                    <ThumbsUp className="w-[16px] h-[21px]" />
                  </button>
                  <span className="bg-[#E9ECF1] px-[18px] rounded-[18px]">
                    1
                  </span>
                </div>
                <button className="text-[#475A6B] hover:text-gray-600">
                  <Image
                    src="/icon-comment.png"
                    width={16}
                    height={21}
                    alt=""
                  />
                </button>
                <button className="text-[#475A6B] hover:text-gray-600">
                  <Image src="/share-icon.png" alt="" width={16} height={21} />
                </button>
              </div>
              <div className="flex justify-between items-center mb-4">
              <p className="text-[11px] text-[#95A4A7] mb-0">
                The opinions expressed here are those of the individual and not
                those of Homely.com.au
              </p>
              <button className="text-[#343D42] hover:text-gray-800 flex items-center gap-2 mb-0">
                <Flag className="w-[12px] h-[16px] " />
                <p className="text-[#343D42] text-[12px]">Report</p>
              </button>
            </div>
            </div>
            <hr className="border-[#E9ECF1] mb-8" />
            {/* Answer 2 */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/agent-img.png"
                  alt="Marvin McKinney"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="font-medium">Marvin McKinney</span>
              </div>
              <p className="text-[#343D42] mb-4 text-[16px] leading-[30px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className=" mb-4">
                Check them out:{" "}
                <a
                  href="https://www.zerospot.com.au/cleaning-services/end-of-lease-cleaning-melbourne/"
                  className="hover:underline text-[#FF0086] text-[16px] leading-[28px]"
                >
                  https://www.zerospot.com.au/cleaning-services/end-of-lease-cleaning-melbourne/
                </a>
              </p>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <button className="text-[#475A6B] hover:text-gray-600">
                    <ThumbsUp className="w-[16px] h-[21px]" />
                  </button>
                  <span className="bg-[#E9ECF1] px-[18px] rounded-[18px]">
                    1
                  </span>
                </div>
                <button className="text-[#475A6B] hover:text-gray-600">
                  <Image
                    src="/icon-comment.png"
                    width={16}
                    height={21}
                    alt=""
                  />
                </button>
                <button className="text-[#475A6B] hover:text-gray-600">
                  <Image src="/share-icon.png" alt="" width={16} height={21} />
                </button>
              </div>
              <div className="flex justify-between items-center mb-4">
              <p className="text-[11px] text-[#95A4A7] mb-0">
                The opinions expressed here are those of the individual and not
                those of Homely.com.au
              </p>
              <button className="text-[#343D42] hover:text-gray-800 flex items-center gap-2 mb-0">
                <Flag className="w-[12px] h-[16px] " />
                <p className="text-[#343D42] text-[12px]">Report</p>
              </button>
            </div>
            </div>
            <hr className="border-[#E9ECF1] mb-8" />

            <button className="bg-[#FF0086] text-white px-6 py-2 rounded-full hover:bg-pink-600">
              Answer question
            </button>
          </div>
        </div>

        {/* Agents Sidebar */}
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
  );
}
