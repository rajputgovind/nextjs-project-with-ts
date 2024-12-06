"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MapComponent from "./MapComponent";
import { Property } from "@/interfaces/propertyinterface";

export default function Component({
  properties,
  mapRef,
}: {
  properties: Property[];
  mapRef: React.RefObject<HTMLDivElement>;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const sections =
    properties.length > 0
      ? [
          {
            title: "Unit Mix Breakdown",
            images: properties[0]?.unit_mix_breakdown?.map((img) => ({
              src: `${API_URL}${img}`,
              alt: "Unit Mix Breakdown Image",
            })),
          },
          {
            title: "Location",
            images: [{ src: "/map-img.png", alt: "Location Map Image" }],
          },
          {
            title: "Schematic",
            images: properties[0]?.schematic?.map((img) => ({
              src: `${API_URL}${img}`,
              alt: "Schematic Image",
            })),
          },
          {
            title: "Site Plan",
            images: properties[0]?.site_plan?.map((img) => ({
              src: `${API_URL}${img}`,
              alt: "Site Plan Image",
            })),
          },
        ]
      : [];

  const handleImageClick = (sectionIndex: number, index: number) => {
    setCurrentSection(sectionIndex); // Set the current section
    setCurrentIndex(index); // Set the image index to display in the slider
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
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="border-l-[3px] pl-4 border-l-[#EF2BA0] text-[36px] font-semibold mb-10">
              {section.title}
            </h2>
            {section.title !== "Location" ? (
              <div>
                <Image
                  src={section.images[0].src}
                  alt={section.images[0].alt}
                  width={900}
                  height={500}
                  className="rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(sectionIndex, 0)}
                />
              </div>
            ) : (
              <div className="w-full relative" ref={mapRef}>
                <div className="m-auto buy-map pt-4">
                  <MapComponent properties={properties} isSchoolShow={true} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isOpen &&
        currentSection !== null &&
        sections[currentSection]?.images?.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="relative w-full max-w-5xl p-8 bg-transparent"
            >
              <Slider {...settings}>
                {sections[currentSection]?.images?.map((image, index) => (
                  <div
                    key={index}
                    className="flex justify-center md:w-[800px] md:h-[500px]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="rounded-xl object-contain w-full h-full"
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
