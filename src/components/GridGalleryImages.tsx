"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Property } from "@/interfaces/propertyinterface";

export default function Component({
  properties,
}: {
  properties: Property | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const settings = {
    initialSlide: currentIndex,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="container mx-auto  py-8">
      <div className="space-y-8">
        <h2 className="border-l-[3px] pl-4 border-l-[#EF2BA0] text-[36px] font-semibold mb-10">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {properties?.images.map((image, index) => (
            <div key={index}>
              <div className="h-[220px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${image?.path}`}
                  alt={image?.title}
                  width={330}
                  height={220}
                  className="cursor-pointer h-full object-cover"
                  onClick={() => handleImageClick(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl p-8 bg-transparent"
          >
            <Slider {...settings}>
              {properties?.images?.map((image, index) => (
                <div
                  key={index}
                  className="flex justify-center md:w-[800px] md:h-[500px]"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${image?.path}`}
                    alt={image?.title}
                    width={800}
                    height={600}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
