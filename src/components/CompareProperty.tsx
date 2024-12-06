"use client";

import { fetchCompareProperties } from "@/app/redux/slice/propertyMetaDataSlice";
import { AppDispatch } from "@/app/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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

export interface PropertyData {
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
}

export default function CompareProperty({
  property,
}: {
  property: PropertyData | undefined;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [compareProperty, setCompareProperty] = useState<PropertyData[]>();

  useEffect(() => {
    if (property) {
      handleCompareProperty();
    }
  }, [property]);

  const handleCompareProperty = async () => {
    try {
      const compareRes = await dispatch(fetchCompareProperties(property));
      setCompareProperty(compareRes?.payload);
    } catch (error) {
      console.error("Error fetching property metadata:", error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className="border-l-4 border-l-[#EF2BA0] px-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
            Compare
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
            Properties
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="">
            <div className={`flex flex-col border p-1 rounded bg-[#FDE6F4]`}>
              <div className="relative h-[200px] w-full">
                <img
                  // src={`${process.env.NEXT_PUBLIC_API_URL}${property?.images[0]?.path}`}
                  src={
                    property && property?.images.length > 0
                      ? `${process.env.NEXT_PUBLIC_API_URL}${property.images[0].path}`
                      : "/pool-home.png"
                  }
                  alt={property?.images[0]?.title || "property image"}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className={`px-1 py-2 bg-[#FDE6F4]`}>
                <h3 className="font-medium text-[17px] text-black">
                  {property?.propertyDetails?.name}
                </h3>
              </div>
            </div>
            <div className="text-center flex m-auto justify-center items-center my-5">
              <p className="text-[16px] mb-0 text-black font-semibold">
                Compare with
              </p>
            </div>

            <div className="">
              <div className="flex bg-[#FDE6F4]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                <span className="text-black mr-3">Price </span>
                <span className="text-black">
                  ${property?.min_price} - ${property?.max_price}
                </span>
              </div>
              <div className="flex bg-[#FDE6F4]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                <span className="text-black mr-3">Size(SF)</span>
                <span className="text-black">{property?.area}(sf)</span>
              </div>
              <div className="flex bg-[#FDE6F4]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                <span className="text-black mr-3">No of BR</span>
                <span className="text-black">{property?.bhk}</span>
              </div>
              <div className="flex bg-[#FDE6F4]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                <span className="text-black mr-3">Location</span>
                <span className="text-black truncate">
                  {property?.location?.city_address}
                </span>
              </div>
            </div>
          </div>
          {compareProperty
            ?.filter((prop) => prop._id !== property?._id)
            ?.slice(0, 3)
            .map((property, index) => (
              <div className="" key={property?._id}>
                <div
                  className={`flex flex-col border p-1 rounded bg-[#F5F2F2]`}
                >
                  <div className="relative h-[200px] w-full">
                    <img
                      src={
                        property && property?.images.length > 0
                          ? `${process.env.NEXT_PUBLIC_API_URL}${property.images[0].path}`
                          : "/pool-home.png"
                      }
                      alt={property?.images[0]?.title || "property image"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className={`px-1 py-2 bg-[#F5F2F2]`}>
                    <h3 className="font-medium text-[17px] text-black">
                      {property?.propertyDetails?.name}
                    </h3>
                  </div>
                </div>
                <div className="text-center flex m-auto justify-center items-center my-5">
                  <p className="text-[16px] mb-0 text-black font-semibold">
                    {index + 1}st
                    {/* {index == 0 ? "st" : "nd"} */}
                  </p>
                </div>

                <div className="">
                  <div className="flex bg-[#F7F6FB]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                    <span className="text-black mr-3">Price </span>
                    <span className="text-black">
                      ${property?.min_price} - ${property?.max_price}
                    </span>
                  </div>
                  <div className="flex bg-[#F5F2F2]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                    <span className="text-black mr-3">Size(SF)</span>
                    <span className="text-black">{property?.area}(sf)</span>
                  </div>
                  <div className="flex bg-[#F5F2F2]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                    <span className="text-black mr-3">No of BR</span>
                    <span className="text-black">{property?.bhk}</span>
                  </div>
                  <div className="flex bg-[#F5F2F2]  p-4 justify-between md:text-[16px] text-sm font-semibold mb-[2px]">
                    <span className="text-black mr-3">Location</span>
                    <span className="text-black truncate">
                      {property?.location?.city_address}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
