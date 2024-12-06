"use client";
import Image from "next/image";
import arrow from '../../public/arrow.png'
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What types of properties can I find on your platform?",
      answer: "You can find residential, commercial, and rental properties.",
    },
    {
      question: "How can I filter properties in my search?",
      answer:
        "Our platform offers filters by price, location, property type, and more.",
    },
    {
      question: "How does the AI property matching work?",
      answer:
        "Our AI algorithm recommends properties based on your preferences.",
    },
    {
      question: "Is there a cost associated with using your platform?",
      answer:
        "Using the platform is free for basic searches; premium services may incur charges.",
    },
    {
      question: "Can I schedule a virtual tour of a property?",
      answer: "Yes, you can schedule virtual tours through our platform.",
    },
    {
      question: "How do I get in touch with your support team?",
      answer:
        "Our support team is available via chat, email, and phone support.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="container mx-auto md:pb-32 lg:pb-32 pb-[45px] px-2">
      <div className="border-l-4 border-l-[#EF2BA0] px-3">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30] mb-2">
          Helpful Answers to
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-4">
          Common Questions
        </h3>
        <p className="text-[#3A3A3A] md:text-[18px] leading-[22px] mb-8 max-w-4xl">
          Our FAQ section provides clear answers to the most common queries we
          receive. If you have any other questions, feel free to reach out!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
             
            className="bg-[#FDE6F4] rounded-lg border border-[#F796D0] p-5 cursor-pointer transition-all"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[#120F30] font-medium md:text-[20px] lg:text-[20px] text-sm">{faq.question}</h3>
              <span
                className={`transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                <Image src={arrow} alt="" width={17} height={17}/>
              </span>
            </div>
            {activeIndex === index && (
              <p className="text-[#3A3A3A] mt-2 text-sm md:text-[16px] lg:text-[16px]">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
