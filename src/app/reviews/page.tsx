"use client";

import { Star, Phone } from "lucide-react";
import Image from "next/image";
import agent from "../../../public/agent-img.png";
import call from "../../../public/call.png";
import star from "../../../public/star-glow.png";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export default function Component() {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Black, Marvin",
      avatar: "/agent-img.png",
      rating: 3,
      date: "24 May, 2020",
      text: "This AI-Powered Property-Finding Website Makes Searching For Real Estate Quick And Personalized. With Smart Recommendations Based On User Preferences, Detailed Neighborhood Insights, And A Highly Interactive Map, It Offers A Seamless Experience. Great For Buyers And Renters Who Want A Streamlined, Intelligent Way To Find Their Next Home!",
    },
    {
      id: 2,
      name: "Flores, Juanita",
      avatar: "/agent-img.png",
      rating: 4,
      date: "8 Sep, 2020",
      text: "This AI-Powered Property-Finding Website Makes Searching For Real Estate Quick And Personalized. With Smart Recommendations Based On User Preferences, Detailed Neighborhood Insights, And A Highly Interactive Map, It Offers A Seamless Experience. Great For Buyers And Renters Who Want A Streamlined, Intelligent Way To Find Their Next Home!",
    },
    {
      id: 3,
      name: "Miles, Esther",
      avatar: "/agent-img.png",
      rating: 5,
      date: "22 Oct, 2020",
      text: "This AI-Powered Property-Finding Website Makes Searching For Real Estate Quick And Personalized. With Smart Recommendations Based On User Preferences, Detailed Neighborhood Insights, And A Highly Interactive Map, It Offers A Seamless Experience. Great For Buyers And Renters Who Want A Streamlined, Intelligent Way To Find Their Next Home!",
    },
    {
      id: 4,
      name: "Henry, Arthur",
      avatar: "/agent-img.png",
      rating: 3,
      date: "17 Oct, 2020",
      text: "This AI-Powered Property-Finding Website Makes Searching For Real Estate Quick And Personalized. With Smart Recommendations Based On User Preferences, Detailed Neighborhood Insights, And A Highly Interactive Map, It Offers A Seamless Experience. Great For Buyers And Renters Who Want A Streamlined, Intelligent Way To Find Their Next Home!",
    },
    {
      id: 5,
      name: "Nguyen, Shane",
      avatar: "/agent-img.png",
      rating: 5,
      date: "8 Sep, 2020",
      text: "This AI-Powered Property-Finding Website Makes Searching For Real Estate Quick And Personalized. With Smart Recommendations Based On User Preferences, Detailed Neighborhood Insights, And A Highly Interactive Map, It Offers A Seamless Experience. Great For Buyers And Renters Who Want A Streamlined, Intelligent Way To Find Their Next Home!",
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-pink-500 stroke-pink-500"
                : "fill-gray-200 stroke-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8">Reviews and Experiences</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-[10px] custom-shadow-3 p-6 bg-white">
                <div className="md:flex items-start justify-between mb-4">
                  <div className="md:flex items-center gap-3 ">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <h3 className="font-medium text-[18px] text-black">{review.name}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <StarRating rating={review.rating} />

                  <span className="text-[#3A3A3A] text-[18px] mb-0">
                    {review.date}
                  </span>
                </div>
                <p className="text-[#3A3A3A] leading-relaxed text-[18px]">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="border rounded-lg p-8 bg-white custom-shadow-3">
            <h2 className="text-[20px] font-normal mb-4 text-[#0B0B0B]">
              Rate Your Experience
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-[#EC008C] text-white text-[18px] font-semibold py-4 md:px-20 rounded-full hover:bg-pink-600 transition-colors">
                WRITE A REVIEW
              </button>
              <button className="w-full border border-[#EC008C] text-[#EF2BA0] py-4 md:px-20 rounded-full  font-semibold transition-colors">
                ASK A QUESTION
              </button>
            </div>
          </div>

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
