import { Star, Phone } from "lucide-react";
import Image from "next/image";
import agent from '../../public/agent-img.png'
import React from "react";

const AgentCard = () => {
  return (
    <div>
      <div className="overflow-hidden border p-5">
        <div className="">
          <div className="flex items-center gap-3">
            <Image
              src={agent}
              alt="Helen Zhang"
              width={66}
              height={66}
              className="rounded-full bg-white object-contain w-[66px] h-[66px]"
            />
            <div>
              <h3 className="font-semibold text-lg">Helen Zhang</h3>
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <span className="font-medium">4.9</span>
                <span className="text-gray-600">(25 Reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700">
            Excellent service from the very start. I got valuable advices in
            terms of deciding the best time to put the property...{" "}
            <button className="text-pink-500 font-medium">Read More</button>
          </p>

          <div className="flex items-center gap-3 my-5">
            <button className="flex-1 rounded-full h-11 border">Content Agent</button>
            <button className="h-11 w-11 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center ">
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="bg-gray-100 p-4 text-center text-gray-700">
          UOL Group Limited
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
