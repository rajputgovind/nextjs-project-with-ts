"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { fetchRecommendedProperty } from "@/app/redux/slice/propertyMetaDataSlice";
import PropertyCard from "./PropertyCard";

interface Location {
  longitude: number;
  latitude: number;
  city_address: string;
}

interface Image {
  _id: string;
  title: string;
  fileName: string;
  recordType: string;
  recordId: string;
  path: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface PropertyOwnerDetails {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  description: string;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  mobile: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PropertyDetails {
  address: string;
  city: string;
  country: string;
  description: string;
  full_address: string;
  name: string;
  propertyOwnerDetails: PropertyOwnerDetails;
  property_type: string;
  state: string;
  title: string;
}

export interface RecommendedPropertyData {
  _id: string;
  location: Location;
  max_price: string;
  min_price: string;
  area: string;
  bath_counting: number;
  room_counting: number;
  isParking: boolean;
  parking_area_counting: number;
  car_places_counting: number;
  features: string[];
  property: string;
  propertyDetails: PropertyDetails;
  status: string;
  construction_status: string;
  pin_code: string;
  floor: number;
  bhk: string;
  facing: string;
  flat_number: string;
  sold_out_date: string | null;
  is_leasehold: boolean;
  lease_year: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  images: Image[];
  name: string
}

const images = [
  { src: "/pvt-spaces.png", alt: "1 Bedroom + Study" },
  { src: "/pvt-space-two.png", alt: "1 Bedroom Loft" },
  { src: "/pvt-space-three.png", alt: "1 Bedroom Suite" },
  { src: "/pvt-spaces.png", alt: "1 Bedroom + Study" },

  { src: "/pvt-space-two.png", alt: "1 Bedroom Loft" },

  { src: "/pvt-space-three.png", alt: "1 Bedroom Suite" },

  { src: "/pvt-spaces.png", alt: "1 Bedroom + Study" },

  { src: "/pvt-space-two.png", alt: "1 Bedroom Loft" },

  { src: "/pvt-spaces.png", alt: "1 Bedroom + Study" },
];

export default function RecommendedProperty({
  property,
}: {
  property: RecommendedPropertyData | undefined;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [recommendedProperty, setRecommendedProperty] =
    useState<RecommendedPropertyData[]>();

  useEffect(() => {
    if (property) {
      handleCompareProperties();
    }
  }, [property]);

  const handleCompareProperties = async () => {
    try {
      const recommendedRes = await dispatch(fetchRecommendedProperty(property));
      setRecommendedProperty(recommendedRes?.payload);
    } catch (error) {
      console.error("Error fetching property metadata:", error);
    }
  };

  const filteredRecommendedProperties = recommendedProperty?.filter(
    (prop) => prop._id !== property?._id
  );
  // console.log("filterdRecom",filteredRecommendedProperties)
  return (
    <>
      {filteredRecommendedProperties &&
        filteredRecommendedProperties?.length > 0 && (
          <div className="container mx-auto  py-8">
            <div className="space-y-8">
              <div className="border-l-4 border-l-[#EF2BA0] px-3">
                <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
                  Recommended
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
                  Properties
                </h3>
              </div>
              <div className="mb-11 overflow-x-auto pb-4 sm:overflow-x-visible sm:pb-0 mt-[78px]">
                <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredRecommendedProperties &&
                    filteredRecommendedProperties?.length > 0 &&
                    filteredRecommendedProperties?.map((property, index) => (
                      <div key={index} className="w-72 sm:w-auto flex-shrink-0">
                        <PropertyCard
                          imageUrl={
                            property.images?.length > 0
                              ? `${process.env.NEXT_PUBLIC_API_URL}${property.images[0].path}`
                              : "/property-img.svg"
                          }
                          location={property?.location?.city_address}
                          parking={property?.car_places_counting}
                          underOffer={property?.status === "under offer"}
                          id={property?._id}
                          is_leasehold={property?.is_leasehold}
                          lease_year={property?.lease_year}
                          name={property?.name}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
