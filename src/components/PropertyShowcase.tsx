"use client";

import { useState, useRef, useEffect } from "react";
import { X, InfoIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import mail from "../../public/mail-icon.png";
import phone from "../../public/Icon-call.png";
import user from "../../public/user-icon.svg";
import agent from "../../public/agent-img.png";
import call from "../../public/call.png";
import star from "../../public/star-glow.png";
import Slider from "react-slick"; // Importing slick slider for the modal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import link from "../../public/link.png";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ImageGallery from "./ImageGallery";
import AmenitiesGrid from "./AmenitiesGrid";
import FloorPlane from "./FloorPlane";
import GridGalleryImages from "./GridGalleryImages";
import cal from "../../public/calender.png";
import Loader from "./Loader";
import MapComponent from "./MapComponent";
import schoolImage from "../../public/schoolImage.jpg";
import CompareProperty from "./CompareProperty";
import RecommendedProperty from "./RecommendedProperty";
import {
  getPropertyMetaDataById,
  getSingleProperty,
} from "@/app/redux/slice/propertySlice";
import { Property } from "@/interfaces/propertyinterface";
import { PropertyMetaData } from "@/interfaces/propertyMetadataInterface";

type Tab = "gallery" | "floor-plan" | "location" | "schools";
interface PropertyShowcaseProps {
  id: string;
}

const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({ id }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<Tab>("gallery");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propertyData, setPropertyData] = useState<Property>();
  const [propertyMetaData, setPropertyMetaData] = useState<PropertyMetaData[]>(
    []
  );
  const [galleryImages, setGalleryImages] = useState<
    Array<{ title: string; path: string }>
  >([]);
  const { propertySchools } = useSelector(
    (state: RootState) => state?.properties
  );
  const { loading } = useSelector((state: RootState) => state.property);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isFloorModalOpen, setIsFloorModalOpen] = useState(false);
  const unitTypes: UnitType[] = [
    {
      type: "1 Bedroom + Study",
      priceRange: "$1,707,000 - $1,798,00",
      pricePerUnit: "$3,109",
      available: 34,
      totalUnits: 34,
    },
    {
      type: "1 Bedroom Loft",
      priceRange: "UNAVAILABLE",
      pricePerUnit: "UNAVAILABLE",
      available: 5,
      totalUnits: 5,
      isUnavailable: true,
    },
    {
      type: "1 Bedroom Suite",
      priceRange: "$1,650,000 - $1,675,00",
      pricePerUnit: "$3,133",
      available: 33,
      totalUnits: 33,
    },
    {
      type: "1 Bedroom Dual-Key",
      priceRange: "$2,623,000 - $2,685,00",
      pricePerUnit: "$3,045",
      available: 34,
      totalUnits: 34,
    },
    {
      type: "2 Bedroom Premium",
      priceRange: "$2,404,000 - $2,454,00",
      pricePerUnit: "$3,059",
      available: 15,
      totalUnits: 15,
    },
    {
      type: "Flip / Switch",
      priceRange: "$2,482,000 - $2,581,000",
      pricePerUnit: "$3,127",
      available: 17,
      totalUnits: 17,
    },
  ];

  const suggestedProperties: SuggestedProperty[] = [
    {
      title: "Modern Apartment in CBD",
      image: "/placeholder.svg?height=200&width=300",
      price: "$1,200,000 - $1,500,000",
      location: "Central Business District",
    },
    {
      title: "Luxury Condo with Sea View",
      image: "/placeholder.svg?height=200&width=300",
      price: "$2,100,000 - $2,400,000",
      location: "East Coast",
    },
    {
      title: "Family Home in Quiet Neighborhood",
      image: "/placeholder.svg?height=200&width=300",
      price: "$1,800,000 - $2,100,000",
      location: "Tampines",
    },
  ];

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setShowSuggestionsModal(true);
  };

  // Fetch property metadata by ID
  useEffect(() => {
    const fetchSingleProperty = async () => {
      try {
        const response = await dispatch(getSingleProperty({ id })); // Replace with your actual API endpoint
        console.log("repsonsesssssss", response);
        setPropertyData(response?.payload);
        setGalleryImages(response?.payload?.images);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    const fetchPropertyMetaData = async () => {
      try {
        const response = await dispatch(getPropertyMetaDataById({ id }));
        console.log("rrrrrrr", response);
        setPropertyMetaData(response?.payload);
      } catch (error) {
        console.error("Error fetching property meta data:", error);
      }
    };
    fetchSingleProperty();
    fetchPropertyMetaData();
  }, [id]);

  const tabs = [
    { id: "gallery", label: "Gallery" },
    { id: "floor-plan", label: "Floor Plan" },
    { id: "location", label: "Location" },
    { id: "schools", label: "School's around" },
  ] as const;

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const openFloorModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsFloorModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsFloorModalOpen(false);
  };
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen || isFloorModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isFloorModalOpen]);

  // Slick Slider settings for modal
  const sliderSettings = {
    initialSlide: currentImageIndex,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dots: false,
    arrows: true,
    afterChange: (index: number) => setCurrentImageIndex(index),
  };

  interface UnitType {
    type: string;
    priceRange: string;
    pricePerUnit: string;
    available: number;
    totalUnits: number;
    isUnavailable?: boolean;
  }

  interface SuggestedProperty {
    title: string;
    image: string;
    price: string;
    location: string;
  }

  interface LoanOffer {
    bank: "DBS" | "OCBC" | "UOB";
    amount: string;
    tenure: string;
  }

  const offers: LoanOffer[] = [
    {
      bank: "DBS",
      amount: "2,119.27",
      tenure: "25-year",
    },
    {
      bank: "OCBC",
      amount: "3,339.15",
      tenure: "20-year",
    },
    {
      bank: "UOB",
      amount: "5,559.99",
      tenure: "15-year",
    },
  ];
  const renderTabContent = () => {
    switch (activeTab) {
      case "gallery":
        return (
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="lg:w-1/2">
              {galleryImages && galleryImages?.length > 0 ? (
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden group"
                  onClick={() => openModal(0)}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${galleryImages[0].path}`}
                    alt={galleryImages[0].title || "Property Main View"}
                    // fill
                    className="object-cover w-full h-full  rounded-2xl"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Image src={link} alt="" />
                  </div>
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {galleryImages?.slice(1, 5)?.map((img, index) => (
                <div
                  key={index}
                  className="relative h-[195px] rounded-2xl overflow-hidden group"
                  onClick={() => openModal(index + 1)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${img.path}`}
                    alt={img.title || `Interior View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {index === 3 ? (
                      <span className="text-white text-lg font-semibold">
                        View More +
                      </span>
                    ) : (
                      <Image src={link} alt="" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "floor-plan":
        return (
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="lg:w-1/2">
              {propertyData?.floorimages &&
              propertyData?.floorimages?.length > 0 ? (
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden group"
                  onClick={() => openFloorModal(0)}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${propertyData?.floorimages[0]?.path}`}
                    alt={
                      propertyData?.floorimages[0]?.title ||
                      "Property Main View"
                    }
                    // fill
                    // className="object-cover"
                    className="object-cover w-full h-full  rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Image src={link} alt="" />
                  </div>
                </div>
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {propertyData?.floorimages?.slice(1, 5)?.map((img, index) => (
                <div
                  key={index}
                  className="relative h-[195px] rounded-2xl overflow-hidden group"
                  onClick={() => openFloorModal(index + 1)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${img?.path}`}
                    alt={img?.title || `Interior View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {index === 3 ? (
                      <span className="text-white text-lg font-semibold">
                        View More +
                      </span>
                    ) : (
                      <Image src={link} alt="" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "location":
        return (
          <div
            className="relative h-[400px] rounded-2xl overflow-hidden group"
            // onClick={() => openModal(8)}
          >
            {/* <Image src={map} alt="Location Map" fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Image src={link} alt="" />
            </div> */}
            {/* Right Section - Map */}
            <div className="w-full relative">
              <div className=" m-auto buy-map pt-4">
                <MapComponent
                  properties={propertyData ? [propertyData] : []}
                  isSchoolShow={false}
                />
              </div>
            </div>
          </div>
        );

      case "schools":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[400px]">
            {propertySchools && propertySchools?.length > 0 ? (
              propertySchools?.slice(0, 4).map((school, index) => (
                <div
                  key={index}
                  className="p-2 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  // onClick={() => openModal(index + 9)}
                >
                  <div className="relative h-[243px] rounded-xl overflow-hidden mb-4 group">
                    <Image
                      src={schoolImage}
                      alt={`School ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">
                    School Name: {school?.text}
                  </h3>
                  {/* <p className="text-sm text-gray-600">
                    Place Name: {school?.place_name}
                  </p> */}
                  <p className="text-sm text-gray-600">
                    Distance: {school?.distance} KM
                  </p>
                </div>
              ))
            ) : (
              <p>No Schools</p>
            )}
          </div>
        );
    }
  };

  // Scroll to the map section
  const handleSeeOnMapClick = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="mx-2">
        {loading && <Loader />}
        <div className="mx-auto p-5 container border border-[#A3A0B7] my-5 rounded-3xl">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="p-4">{renderTabContent()}</div>
            {/* Navigation Tabs */}
            <div className="flex gap-4 p-4 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                  flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                      : "bg-pink-50 text-gray-700 hover:bg-pink-100"
                  }
                `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="">
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h1 className="text-[40px] text-[#3A3A3A] font-medium mb-2">
                    {propertyData?.name}
                  </h1>
                  {/* <p className="text-[35px] text-[#000000] mb-4">
                    ${propertyData?.min_price} to ${propertyData?.max_price}
                  </p> */}
                  <div className="flex gap-4 mb-4 items-center">
                    <p className="text-[#3A3A3A]">Ownership Type</p>
                    <span className="bg-[#E7E7E7] px-[16px] text-[14px] rounded-full text-[#1E184F] py-[8px] border border-[#A3A0B7]">
                      {propertyData?.is_leasehold ? "Leasehold" : "Freehold"}
                    </span>
                    <span
                      className="bg-[#1E184F] text-[#E9E8ED] px-[16px] py-[8px] rounded-full text-[14px] cursor-pointer"
                      onClick={handleSeeOnMapClick}
                    >
                      See on Map
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="bg-[#EC008C] hover:bg-pink-600 text-white rounded-[4px] px-5 py-3 flex items-center gap-2"
                    >
                      <Image
                        src="/calender-two.png"
                        alt=""
                        width={18}
                        height={18}
                      />{" "}
                      Book Showflat
                    </button>
                    <button className="border text-white border-gray-300 rounded-[4px] px-5 py-3 flex items-center gap-2 bg-[#EC008C]">
                      <Image src="/receipt.png" alt="" width={18} height={18} />{" "}
                      Full Price List
                    </button>
                  </div>
                </div>

                <div>
                  <div className="border-l-4 border-l-[#EF2BA0] px-3">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
                      Available Units &
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
                      Price
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {propertyMetaData.map((property, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-white"
                      >
                        <h3 className="font-medium mb-3">1 Bedroom + Study</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded">
                              $
                            </span>
                            <span
                            // className={
                            //   unit.isUnavailable ? "text-gray-400" : ""
                            // }
                            >
                              ${property.min_price} - ${property?.max_price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-pink-100 text-pink-500 text-xs px-2 py-1 rounded">
                              $psf
                            </span>
                            <span>$3,109</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-500 text-xs px-2 py-1 rounded">
                              {property?.status}
                            </span>
                            <span>50 units</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 md:pt-[100px] pt-5">
                  <div className="border-l-4 border-l-[#EF2BA0] px-3">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
                      Factsheet about
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
                      Property
                    </h3>
                  </div>
                  <div className="bg-[#F7F6FB] rounded-[30px] border border-[#A3A0B7]">
                    <div className="p-8 sm:p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-2 sm:gap-y-4">
                        <div className="font-medium text-black text-[22px]">
                          Name:
                        </div>
                        <div className="text-[#EF2BA0] text-[22px]">
                          {propertyData?.name}
                        </div>

                        <div className="font-medium text-black text-[22px]">
                          Developer:
                        </div>
                        <div className="text-[#EF2BA0] text-[22px]">
                          {propertyData?.project_developer}
                        </div>

                        <div className="font-medium text-black text-[22px]">
                          Type:
                        </div>
                        <div className="text-[#EF2BA0] text-[22px]">
                          {propertyData?.property_type}
                        </div>

                        <div className="font-medium text-black text-[22px]">
                          Total Units:
                        </div>
                        <div className="text-[#EF2BA0] text-[22px]">1025</div>

                        <div className="font-medium text-black text-[22px]">
                          Location:
                        </div>
                        <div className="text-[#EF2BA0] text-[22px]">
                          {propertyData?.full_address}
                        </div>

                        <div className="font-medium text-black text-[22px]">
                          Tenure:
                        </div>
                        <div className="text-[#EF2BA0] text-[22px]">
                          {propertyData?.lease_year} Years
                        </div>

                        <div className="font-medium text-black text-[22px]">
                          Crossover:
                        </div>
                        <div className="text-[#EF2BA0] text-[22px]">Left</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-5 md:pt-[55px]">
                  <div className="border-l-4 border-l-[#EF2BA0] px-3">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
                      Property
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
                      Descriptions
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {/* <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Timeless leasehold Elegance in a Prized Locale
                    </h3> */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {propertyData?.description}
                    </p>
                  </div>
                </div>

                <ImageGallery
                  properties={propertyData ? [propertyData] : []}
                  mapRef={mapRef}
                />
                <AmenitiesGrid />
                <FloorPlane />
                <GridGalleryImages properties={propertyData} />

                {/* Enquire form */}
                <div className="md:pt-[100px] pt-5">
                  <div className="border-l-[3px] pl-4 border-l-[#EF2BA0] text-[36px] font-semibold mb-10">
                    <p>Property</p>
                    <p className="text-[#EF2BA0]">Enquiry</p>
                  </div>
                  <div className="bg-[#F7F6FB] rounded-[20px] p-6 max-w-2xl">
                    <div className="flex justify-between items-center mb-6  ">
                      <h2 className="text-[22px] font-semibold text-[#0B0B0B]">
                        Find out more about this project
                      </h2>
                    </div>
                    <form className="space-y-4">
                      <div className="space-y-2 mb-[24px]">
                        <p className="font-medium text-[18px] text-[#0B0B0B]">
                          I am interested in
                        </p>
                        <div className="space-y-2">
                          <label className="flex items-center text-[#0B0B0B] text-[16px] gap-2">
                            <input type="checkbox" className="" /> Brochure
                          </label>
                          <label className="flex items-center gap-2 text-[#0B0B0B] text-[16px]">
                            <input
                              type="checkbox"
                              className="rounded text-pink-500 focus:ring-pink-500"
                            />{" "}
                            Price List
                          </label>
                          <label className="flex items-center gap-2 text-[#0B0B0B] text-[16px]">
                            <input
                              type="checkbox"
                              className="rounded text-pink-500 focus:ring-pink-500"
                            />{" "}
                            Showflat Appointment
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                        <Image src={user} alt="" className="mr-3" />

                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                      <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                        <Image src={mail} alt="" className="mr-3" />
                        <input
                          type="email"
                          placeholder="E-mail Address"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                      <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                        <Image src={phone} alt="" className="mr-3" />
                        <input
                          type="tel"
                          placeholder="Contact Number"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                      <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                        {/* <i className="fas fa-calendar-alt text-[#7D7999] mr-3"></i> */}
                        <Image src={cal} alt="" />
                        <input
                          type="date"
                          className="w-full outline-none appearance-none bg-transparent  placeholder-[#7D7999]"
                          placeholder="Choose appointment date"
                        />
                      </div>
                      <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                        {/* <i className="fas fa-calendar-alt text-[#7D7999] mr-3"></i> */}
                        <Image src={cal} alt="" />
                        <input
                          type="time"
                          className="w-full outline-none appearance-none bg-transparent  placeholder-[#7D7999]"
                          placeholder="Choose appointment date"
                        />
                      </div>
                      <div className="space-y-5 ">
                        <p className="font-medium text-[18px] text-[#0B0B0B]">
                          I am interested in the following unit types
                        </p>
                        <div className="space-y-2">
                          {unitTypes.map((unit, index) => (
                            <label
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                className="rounded text-pink-500 focus:ring-pink-500"
                              />{" "}
                              {unit.type}
                            </label>
                          ))}
                        </div>
                      </div>

                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          className="mt-1 rounded text-pink-500 focus:ring-pink-500"
                        />
                        <span className="text-[16] font-medium text-[#0B0B0B]">
                          By submitting this form, you are deemed to have agreed
                          to our Privacy Policy and consent that we or our sales
                          representative may contact you for the purpose of your
                          enquiry via voice call, email, SMS, WhatsApp,
                          regardless of your registration status with the DNS
                          registry. (Personal Data Protection Act 2012)
                        </span>
                      </label>

                      <button
                        type="submit"
                        className="px-5 bg-[#EC008C] hover:bg-pink-600 text-white rounded-full py-2 custom-shadow-2"
                      >
                        Yes Please
                      </button>
                    </form>
                  </div>
                </div>

                {/* loan offer cards */}
                <div className="md:w-1/2 w-full md:pt-[100px] pt-5">
                  <div className="flex  flex-col gap-4">
                    {offers.map((offer) => (
                      <div
                        key={offer.bank}
                        className="relative bg-white rounded-3xl border border-[#A3A0B7] p-6 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-lg font-normal text-black">
                              Home loan offer
                            </h3>
                            <InfoIcon className="w-4 h-4 text-[#3A3A3A]" />
                          </div>
                          <Image
                            src={`/dbs-grp.png`}
                            alt={`${offer.bank} logo`}
                            width={60}
                            height={24}
                            className="object-contain"
                          />
                        </div>

                        <div className="items-center justify-between  flex">
                          <div>
                            <div className="flex items-baseline gap-1 ">
                              <span className="text-[#EC008C] text-2xl font-semibold">
                                $
                              </span>
                              <span className="text-[#EC008C] text-3xl font-semibold">
                                {offer.amount}
                              </span>
                              <span className="text-[#EC008C] text-xl">
                                /mth
                              </span>
                            </div>
                            <p className="text-[#3A3A3A] text-[14px]">
                              Up to {offer.tenure} tenure
                            </p>
                          </div>
                          <button className="rounded-full bg-[#FDE6F4] hover:bg-pink-100 text-black text-[14px]  font-medium px-6 flex items-center py-2">
                            Apply Now
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>{/* <CompareProperty/> */}</div>
              </div>

              {/* Agent Card - Sticky */}
              <div className="relative">
                <div className="lg:sticky lg:top-24 lg:bottom-4 h-fit">
                  <div className="bg-white rounded-[20px] border border-[#A3A0B7] custom-hover hover:border-[#FDE6F4]">
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={agent}
                          alt="name"
                          width={66}
                          height={66}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-medium text-[22px] leading-[26.5px] mb-3">
                            Helen Zang
                          </h3>
                          <div className="flex items-center gap-1">
                            <Image src={star} alt="" />
                            <span className="font-medium">4.9</span>
                            <span className="text-[#3A3A3A]">(25 Reviews)</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#3A3A3A] text-[18px] leading-[30px] mb-6">
                        Excellent service from the very start. I got valuable
                        advices in terms of deciding the best time to put the
                        property...
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
                    <div className="py-4 text-[22px] text-[#443F6D]  text-center bg-[#E9E8ED] hover:bg-[#fde6f4] overflow-hidden rounded-b-[20px]">
                      UOL Group Limited
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {/* <RecommendedProperty property={propertyData} /> */}
            </div>

            <div className="mt-8">
              {/* <CompareProperty property={propertyData} /> */}
            </div>
          </div>

          {/* Booking Modal */}

          {showBookingModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 custom-scrollbar">
                <div className="">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                      Find out more about this project
                    </h2>
                    <button
                      onClick={handleCloseBookingModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <form className="space-y-4">
                    <div className="space-y-2 mb-[24px]">
                      <p className="font-medium text-[18px] text-[#0B0B0B]">
                        I am interested in
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center text-[#0B0B0B] text-[16px] gap-2">
                          <input type="checkbox" className="" /> Brochure
                        </label>
                        <label className="flex items-center gap-2 text-[#0B0B0B] text-[16px]">
                          <input
                            type="checkbox"
                            className="rounded text-pink-500 focus:ring-pink-500"
                          />{" "}
                          Price List
                        </label>
                        <label className="flex items-center gap-2 text-[#0B0B0B] text-[16px]">
                          <input
                            type="checkbox"
                            className="rounded text-pink-500 focus:ring-pink-500"
                          />{" "}
                          Showflat Appointment
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                      <Image src={user} alt="" className="mr-3" />

                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full outline-none bg-transparent"
                      />
                    </div>
                    <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                      <Image src={mail} alt="" className="mr-3" />
                      <input
                        type="email"
                        placeholder="E-mail Address"
                        className="w-full outline-none bg-transparent"
                      />
                    </div>
                    <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                      <Image src={phone} alt="" className="mr-3" />
                      <input
                        type="tel"
                        placeholder="Contact Number"
                        className="w-full outline-none bg-transparent"
                      />
                    </div>
                    <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                      {/* <i className="fas fa-calendar-alt text-[#7D7999] mr-3"></i> */}
                      <Image src={cal} alt="" />
                      <input
                        type="date"
                        className="w-full outline-none appearance-none bg-transparent  placeholder-[#7D7999]"
                        placeholder="Choose appointment date"
                      />
                    </div>
                    <div className="flex items-center border border-[#7D7999] rounded-full px-3 py-2">
                      {/* <i className="fas fa-calendar-alt text-[#7D7999] mr-3"></i> */}
                      <Image src={cal} alt="" />
                      <input
                        type="time"
                        className="w-full outline-none appearance-none bg-transparent  placeholder-[#7D7999]"
                        placeholder="Choose appointment date"
                      />
                    </div>
                    <div className="space-y-5 ">
                      <p className="font-medium text-[18px] text-[#0B0B0B]">
                        I am interested in the following unit types
                      </p>
                      <div className="space-y-2">
                        {unitTypes.map((unit, index) => (
                          <label
                            key={index}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              className="rounded text-pink-500 focus:ring-pink-500"
                            />{" "}
                            {unit.type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1 rounded text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-[16] font-medium text-[#0B0B0B]">
                        By submitting this form, you are deemed to have agreed
                        to our Privacy Policy and consent that we or our sales
                        representative may contact you for the purpose of your
                        enquiry via voice call, email, SMS, WhatsApp, regardless
                        of your registration status with the DNS registry.
                        (Personal Data Protection Act 2012)
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="px-5 bg-[#EC008C] hover:bg-pink-600 text-white rounded-full py-2 custom-shadow-2"
                    >
                      Yes Please
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions Modal */}
          {showSuggestionsModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    Suggested Properties to Visit
                  </h2>
                  <button
                    onClick={() => setShowSuggestionsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  {suggestedProperties.map((property, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={property.image}
                        alt={property.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{property.title}</h3>
                        <p className="text-sm text-gray-600">
                          {property.location}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {property.price}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-2">
                    View All Similar Properties
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal with Slick Slider */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="relative w-full max-w-5xl p-8 bg-transparent"
            >
              <Slider {...sliderSettings}>
                {galleryImages?.map((img, index) => (
                  <div
                    key={index}
                    className="flex justify-center md:w-[800px] md:h-[500px]"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${img.path}`}
                      alt={img.title || `Image ${index + 1}`}
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        {/* Modal with Slick Slider */}
        {isFloorModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="relative w-full max-w-5xl p-8 bg-transparent"
            >
              <Slider {...sliderSettings}>
                {propertyData?.floorimages?.map((img, index) => (
                  <div
                    key={index}
                    className="flex justify-center md:w-[800px] md:h-[500px]"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${img.path}`}
                      alt={img.title || `Image ${index + 1}`}
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyShowcase;
