import React from "react";
import { useRouter } from "next/navigation";
const AssistanceSection: React.FC = () => {
  const router = useRouter()
  
  return (
    <div className="px-3">
      <section className="max-w-7xl mb-[110px] custom-gradient rounded-lg p-6 md:py-9 md:px-12 flex flex-col md:flex-row items-center justify-between container mx-auto">
        <div className="text-white mb-4 md:mb-0 md:mr-6">
          <h2 className="text-2xl md:text-4xl font-semibold mb-5">
            Need assistance?
          </h2>
          <div className="md:flex items-center md:gap-6">
          <p className="text-sm md:text-2xl font-normal">
            Our Homematch AI chat is here to help you 24/7! Just click below to
            start a conversation, and let our AI guide you to the answers you
            need.
          </p>
          <button onClick={() => router.push('/contact')} className="bg-[#EF2BA0] hover:bg-pink-600 text-white md:text-xl w-[207px]  px-2 py-2 rounded-lg text-sm mt-5">
            Contact Us
          </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssistanceSection;
