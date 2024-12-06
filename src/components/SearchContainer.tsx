"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { addSearch, removeSearch } from "@/app/redux/slice/recentSearchSlice";
import {
  addPinCodes,
  addAddressLocations,
  addTagPincodeAndAddress,
} from "@/app/redux/slice/propertyMetaDataSlice";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import search from "../../public/Search-button.svg";
import Image from "next/image";
import dollar from "../../public/dollar.png";
import home from "../../public/home-1.png";
import towel from "../../public/Towel.svg";
import { useRouter } from "next/navigation";
import { refactor } from "@/lib/utils";
import {
  getAllProperties,
  getPropertyByPincodes,
} from "@/app/redux/slice/propertySlice";

interface RecentSearch {
  id: string;
  text: string;
  pincode: number;
  context?: {
    id: string;
    text: string;
  }[];
  geometry?: {
    type: string;
    coordinates: [number, number];
  };
}
type FeatureContext = { id: string; text: string };
type Feature = {
  id: string;
  context?: FeatureContext[];
};

export default function SearchContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const recentSearches = useSelector(
    (state: RootState) => state.recentSearch.searches
  );
  const { addressLocations, addressPinCodes, tagPincodeAndAddress } =
    useSelector((state: RootState) => state.properties);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(addressLocations);
  // TODO:FIX THE TS THING
  const [searchResults, setSearchResults] = useState<
    { text: string; pincode: number; id: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [addressPincode, setAddressPincode] =
    useState<number[]>(addressPinCodes);
  const [tagToPincodeMap, setTagToPincodeMap] =
    useState<Record<string, number>>(tagPincodeAndAddress);
  const containerRef = useRef<HTMLDivElement>(null);

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
      const { [tag]: _, ...newMap } = prevMap;
      return newMap;
    });
  };

  const handleSearchSelect = async (search: RecentSearch) => {
    // setInitialState(true);
    if (!selectedTags.includes(search.text)) {
      const newTags = [...selectedTags, search.text];
      setSelectedTags(newTags);

      //@ts-expect-error idk
      dispatch(addSearch(search)); // Save to recent searches

      const pinCode = search.pincode || "";
      if (pinCode) {
        const numericPinCode = Number(pinCode);
        setAddressPincode((prev) => [...prev, numericPinCode]);
        setTagToPincodeMap((prevMap) => ({
          ...prevMap,
          [search.text]: numericPinCode,
        }));
      }
    }
    setInputValue("");
    setIsDropdownOpen(false);
  };

  const visibleTags = addressLocations?.slice(
    0,
    window.innerWidth < 768 ? 2 : 4
  ); // 2 tags on mobile, 4 on desktop

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setInputValue(query);
    if (query.length > 2) {
      // Trigger search after a minimum length
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_KEY}`
      );
      const data = await response.json();
      console.log("data", data);
      // Map results to recent search format
      const results = data?.features?.map(
        (feature: {
          id: string;
          place_name: string;
          context?: { id: string; text: string }[];
        }) => ({
          id: feature?.id,
          text: feature?.place_name,
          context: feature?.context || [],
        })
      );
      const newData = results.filter(
        (feature: Feature) =>
          feature.context &&
          feature.context.some((ctx: Feature) => ctx.id.startsWith("postcode."))
      );

      const newARR = refactor(newData);
      setSearchResults(newARR);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchClick = async () => {
    try {
      console.log("addresssPincode", addressPinCodes);
      if (addressPinCodes?.length > 0) {
        // Prepare query for API call
        const uniquePincodes = Array.from(new Set(addressPincode)); // Ensure unique pincodes
        const addressesQuery = uniquePincodes.join("-");
        await dispatch(getPropertyByPincodes([addressesQuery]));

        // router.push("/buy");
      } else {
        await dispatch(getAllProperties()).unwrap();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const handleAddPincode = async () => {
      dispatch(addPinCodes(addressPincode));
      dispatch(addAddressLocations(selectedTags));
      dispatch(addTagPincodeAndAddress(tagToPincodeMap));
    };
    handleAddPincode();
  }, [addressPincode, selectedTags, dispatch]); // Add all dependencies

  return (
    <div className="relative" ref={containerRef}>
      <div className="bg-[#E9E8ED] rounded-2xl p-4">
        <div className="relative mb-4">
          <div className="flex flex-col md:flex-row items-center bg-white rounded-full pr-2 overflow-hidden py-2 h-[55px]">
            {/* Scrollable Tag Container */}
            <div className="flex-1 flex items-center gap-2 overflow-x-auto whitespace-nowrap px-4 py-2 custom-scrollbar-2">
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
                className="flex-1 min-w-[120px] outline-none text-sm md:text-base bg-transparent"
              />
            </div>
            {/* Optional Search Button */}
            <div className="flex space-x-2 md:space-x-3 absolute right-0 top-0">
              <button onClick={handleSearchClick}>
                <Image src={search} alt="" width={55} />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center border border-[#A3A0B7] bg-white rounded-[10px] text-sm hover:bg-gray-50 transition-colors">
            <div className="bg-[#E9E8ED] h-full rounded-l-[10px] py-2 px-2 flex items-center justify-center overflow-hidden">
              <Image alt="" src={dollar} />
            </div>
            <span className="hidden md:inline mx-2 text-[14px] text-black font-normal">
              Select Price Range
            </span>
            <span className="md:hidden text-[14px] text-black font-normal mx-2">
              Price
            </span>
          </button>
          <button className="flex items-center border border-[#A3A0B7] bg-white rounded-[10px] text-sm hover:bg-gray-50 transition-colors">
            <div className="bg-[#E9E8ED] h-full rounded-l-[10px] py-2 px-2 flex items-center justify-center overflow-hidden">
              <Image alt="" src={home} />
            </div>
            <span className="hidden md:inline mx-2 text-[14px] text-black font-normal">
              Select Property Type
            </span>
            <span className="md:hidden text-[14px] text-black font-normal mx-2">
              Type
            </span>
          </button>
          <button className="flex items-center border border-[#A3A0B7] bg-white rounded-[10px] text-sm hover:bg-gray-50 transition-colors">
            <div className="bg-[#E9E8ED] h-full rounded-l-[10px] py-2 px-2 flex items-center justify-center overflow-hidden">
              <Image alt="" src={towel} />
            </div>
            <span className="hidden md:inline text-[14px] text-black font-normal mx-2">
              Select Amenities
            </span>
            <span className="md:hidden text-[14px] text-black font-normal mx-2">
              Amenities
            </span>
          </button>
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute left-0 w-full bg-white rounded-b-2xl shadow-sm mt-2 border border-gray-100 overflow-y-auto max-h-[150px] custom-scrollbar z-30">
            <div className="p-4">
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
                        <Search size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">{result.text}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
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
                        //@ts-expect-error idk
                        onClick={() => handleSearchSelect(search)}
                      >
                        <div className="flex items-center">
                          <Search size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm">{search?.text}</span>
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
  );
}
