"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { addSearch, removeSearch } from "../redux/slice/recentSearchSlice";
import axios from "axios";
import PropertyCard from "@/components/PropertyCard";
interface RecentSearch {
  id: string;
  text: string;
  context?: {
    id: string;
    text: string;
  }[];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}
type FeatureContext = { id: string; text: string };
type Feature = {
  id: string;
  context?: FeatureContext[];
};

interface Location {
  latitude: number;
  longitude: number;
}

interface Property {
  _id: string;
  images: { path: string }[];
  max_price: string;
  min_price: string;
  location: { city_address: string };
  room_counting: number;
  bath_counting: number;
  car_places_counting: number;
  status: string;
  pin_code: string;
  is_leasehold: boolean;
  lease_year: number;
  name: string
}

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const recentSearches = useSelector(
    (state: RootState) => state.recentSearch.searches
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<RecentSearch[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [addressPincode, setAddressPincode] = useState<number[]>([]);
  const [tagToPincodeMap, setTagToPincodeMap] = useState<
    Record<string, number>
  >({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [propertyArea, setPropertyArea] = useState<string>("");
  const [location, setlocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [propertyData, setPropertyData] = useState<Property[]>([]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));

    setAddressPincode((prevPincodes) =>
      prevPincodes.filter((pincode) => pincode !== tagToPincodeMap[tag])
    );

    // Remove the tag-to-pincode mapping
    setTagToPincodeMap((prevMap) => {
      const { [tag]: _, ...newMap } = prevMap; // Exclude the removed tag
      return newMap;
    });
  };

  const handleSearchSelect = async (search: RecentSearch) => {
    // setInitialState(true);
    if (!selectedTags.includes(search.text)) {
      const newTags = [...selectedTags, search.text];
      setSelectedTags(newTags);
      dispatch(addSearch(search)); // Save to recent searches

      // Extract address components for the selected tag
      const locality = search.text;
      const state =
        search.context?.find((c) => c.id.includes("region"))?.text || "";
      const country =
        search.context?.find((c) => c.id.includes("country"))?.text || "";
      const pinCode =
        search.context?.find((c) => c.id.includes("postcode"))?.text || "";
      const [longitude, latitude] = search?.geometry?.coordinates || [];

      setlocation((preview) => ({
        ...preview,
        longitude: longitude,
        latitude: latitude,
      }));

      if (pinCode) {
        const numericPinCode = Number(pinCode);
        setAddressPincode((prev) => [...prev, numericPinCode]);
        setTagToPincodeMap((prevMap) => ({
          ...prevMap,
          [search.text]: numericPinCode,
        }));
      }
    }
    setInputValue(""); // Clear input after selection
    setIsDropdownOpen(false);
  };
  const visibleTags = selectedTags.slice(0, window.innerWidth < 768 ? 2 : 4); // 2 tags on mobile, 4 on desktop

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setInputValue(query);
    if (query.length > 2) {
      // Trigger search after a minimum length
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_KEY}`
      );
      const data = await response.json();

      // Map results to recent search format
      const results = data?.features?.map(
        (feature: {
          id: string;
          place_name: string;
          context?: { id: string; text: string }[];
          geometry: { coordinates: number[]; text: string };
        }) => ({
          id: feature?.id,
          text: feature?.place_name,
          context: feature?.context || [],
          geometry: feature?.geometry || [],
        })
      );
      const newData = results.filter(
        (feature: Feature) =>
          feature.context &&
          feature.context.some((ctx: Feature) => ctx.id.startsWith("postcode."))
      );
      setSearchResults(newData);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchClick = async () => {
    try {
      const uniquePincodes = Array.from(new Set(addressPincode)); // Ensure unique pincodes
      const addressesQuery = uniquePincodes.join("-");
      // await dispatch(fetchPropertiesByMultipleQuery([addressesQuery]));
      // router.push("/buy");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearchProperty = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = {
        max_price: maxPrice,
        min_price: minPrice,
        property_area: propertyArea,
        location: location,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CHAT_BOT_API_URL}/afford`,
        data
      );
      setPropertyData(response?.data);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="md:max-w-4xl lg:max-w-4xl w-full m-auto py-6">
        <div className="bg-white rounded-3xl border border-[#A3A0B7] p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-[22px] leading-[22px] md:text-3xl font-semibold mb-5">
              Affordability Analysis Form
            </h2>
            <p className="text-[#767676] max-w-2xl mx-auto text-[14px]">
              Quickly assess your financial capacity and explore options
              tailored to your budget. Fill out the form to get personalized
              insights and make informed decisions.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Minimum Price"
                className="rounded-lg border-[#A3A0B7] border h-12 text-base"
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Maximum Price"
                className="rounded-lg border-[#A3A0B7] border h-12 text-base"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <Input
                placeholder="Property Area"
                className="rounded-lg border-[#A3A0B7] border h-12 text-base"
                onChange={(e) => setPropertyArea(e.target.value)}
              />

              <div className="relative" ref={containerRef}>
                <div className="flex w-full bg-transparent px-3 py-1 shadow-sm rounded-lg border-[#A3A0B7] border h-12 text-base">
                  <div
                    className="flex-1 flex items-center gap-2 overflow-x-auto custom-scrollbar-2 whitespace-nowrap px-2"
                    style={{ maxWidth: "100%" }} // Prevents the tags from going outside
                  >
                    {visibleTags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center bg-gray-100 text-sm px-2 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-gray-400 hover:text-gray-600"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="search"
                      placeholder={
                        selectedTags?.length === 0 ? "Search location" : ""
                      }
                      value={inputValue}
                      onChange={handleSearchChange}
                      onFocus={() => setIsDropdownOpen(true)}
                      className="flex-1 outline-none text-sm md:text-base min-w-[120px] bg-transparent"
                    />
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute left-0 top-12 w-full bg-white rounded-b-2xl shadow-sm mt-2 border border-gray-100 overflow-y-auto max-h-[150px] custom-scrollbar z-30">
                    <div className="p-4">
                      {/* Search Results Section */}
                      {searchResults?.length > 0 && (
                        <>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Search Results
                          </h3>
                          <ul className="space-y-1">
                            {searchResults?.map((result) => (
                              <li
                                key={result.id}
                                className="flex items-center px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                onClick={() => handleSearchSelect(result)}
                              >
                                <Search
                                  size={16}
                                  className="text-gray-400 mr-2"
                                />
                                <span className="text-sm">{result.text}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {/* Recent Searches Section */}
                      {recentSearches?.length > 0 && (
                        <>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Recent Searches
                          </h3>
                          <ul className="space-y-1 mb-4">
                            {recentSearches?.map((search) => (
                              <li
                                key={search?.id}
                                className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                onClick={() => handleSearchSelect(search)}
                              >
                                <div className="flex items-center">
                                  <Search
                                    size={16}
                                    className="text-gray-400 mr-2"
                                  />
                                  <span className="text-sm">
                                    {search?.text}
                                  </span>
                                </div> 
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeSearch(search?.id));
                                  }}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X size={16} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                className="bg-[#EC008C] hover:bg-pink-600 text-white rounded px-[20px] py-[10px] text-base"
                onClick={handleSearchProperty}
              >
                Search Property
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-l-4 border-l-[#EF2BA0] px-3 mb-[60px] mt-5">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
          Recommended
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-2">
          Properties
        </h3>
        <p className="text-[18px] leading-[22px] text-[#3A3A3A]">
          View and explore the results of your affordability analysis to find
          options that match your financial capacity.
        </p>
      </div>
      <div className="mb-11 overflow-x-auto pb-4 sm:overflow-x-visible sm:pb-0 mt-[78px]">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyData
            ?.slice(0, 4)
            ?.map((property: Property, index: number) => (
              <div key={index} className="w-72 sm:w-auto flex-shrink-0">
                <PropertyCard
                  imageUrl={
                    property.images?.length > 0
                      ? `${process.env.NEXT_PUBLIC_API_URL}${property.images[0].path}`
                      : "/property-img.svg"
                  }
                  location={property?.location.city_address}
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
  );
};

export default Page;
