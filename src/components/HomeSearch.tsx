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
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import search from "../../public/Search-button.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { refactor } from "@/lib/utils";
import { getPropertyByPincodes } from "@/app/redux/slice/propertySlice";

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
      console.log(search, "search");
      // const pinCode =
      //   search.context?.find((c) => c.id.includes("postcode"))?.text || "";
      const pinCode = search.pincode || "";
      console.log(pinCode, "search");
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
      setSearchResults(refactor(newData));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchClick = async () => {
    try {
      // Prepare query for API call
      const uniquePincodes = Array.from(new Set(addressPincode)); // Ensure unique pincodes
      const addressesQuery = uniquePincodes.join("-");
      await dispatch(getPropertyByPincodes([addressesQuery]));

      router.push("/buy");
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
    <div className="max-w-7xl mx-auto md:px-9 px-2 bg-white rounded-[20px] custom-shadow-2">
      <nav className="flex items-center gap-2 justify-between py-4 border-b border-gray-200 px-4">
        <button className="text-[#443F6D] hover:text-[#EF2BA0] hover:underline">
          Buy
        </button>
        <button className="text-[#443F6D] hover:text-[#EF2BA0] hover:underline">
          Launch
        </button>
        <button className="text-[#443F6D] hover:text-[#EF2BA0] hover:underline">
          Commercial
        </button>
        <button className="text-[#443F6D] hover:text-[#EF2BA0] hover:underline">
          Project
        </button>
        <button className="text-[#443F6D] hover:text-[#EF2BA0] hover:underline">
          Flat
        </button>
      </nav>

      <div className="py-4 relative" ref={containerRef}>
        <div className="flex items-stretch h-[46px]">
          <div className="relative flex items-center border border-gray-200 border-r-0 rounded-l-md px-4">
            <button className="md:flex hidden items-center gap-2 text-[#64748b] ">
              All Property
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center border-y border-gray-200 overflow-hidden">
            <Search className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
            <div className="flex-1 flex items-center overflow-x-auto whitespace-nowrap px-3 custom-scrollbar-search">
              {selectedTags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center bg-gray-100 text-gray-800 text-sm rounded-full px-2 py-1 mr-2"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder={
                  selectedTags.length === 0 ? "Search 'Orchard Road'" : ""
                }
                className="flex-1 outline-none text-[15px] text-gray-600 placeholder:text-gray-400 min-w-[100px]"
                value={inputValue}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownOpen(true)}
              />
            </div>
            <div className="h-full w-[1px] bg-gray-200 flex-shrink-0" />
            <button className="px-4 flex-shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <button
            className="px-8 bg-[#EF2BA0] text-white font-medium rounded-r-md hover:bg-[#ff2391] transition-colors flex-shrink-0 cursor-pointer"
            onClick={handleSearchClick}
            disabled={!addressPincode.length}
          >
            Search
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute  top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-4  max-h-[130px] z-10 custom-scrollbar">
            <div className="flex justify-between gap-2 mb-1 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
              <button className="flex items-center border border-[#A3A0B7]  bg-white  rounded-[10px] text-sm hover:bg-gray-50 transition-colors">
                <div className="bg-[#E9E8ED] h-full rounded-l-[10px] py-2 px-2 flex items-center justify-center overflow-hidden">
                  <Image alt="" src="/dollar.png" width={16} height={16} />
                </div>

                <span className="hidden md:inline mx-2 text-[14px] text-black font-normal ">
                  Select Price Range
                </span>
                <span className="md:hidden text-[14px] text-black font-normal mx-2">
                  Price
                </span>
              </button>
              <button className="flex items-center border border-[#A3A0B7]  bg-white  rounded-[10px] text-sm hover:bg-gray-50 transition-colors">
                <div className="bg-[#E9E8ED] h-full rounded-l-[10px] py-2 px-2 flex items-center justify-center overflow-hidden">
                  <Image src="/home-1.png" alt="" width={16} height={16} />
                </div>

                <span className="hidden md:inline text-[14px] text-black font-normal mx-2">
                  Select Property Type
                </span>
                <span className="md:hidden text-[14px] text-black font-normal mx-2">
                  Type
                </span>
              </button>
              <button className="flex items-center border border-[#A3A0B7]  bg-white  rounded-[10px] text-sm hover:bg-gray-50 transition-colors">
                <div className="bg-[#E9E8ED] h-full rounded-l-[10px] py-2 px-2 flex items-center justify-center overflow-hidden">
                  <Image alt="" src="Towel.svg" width={16} height={16} />
                </div>
                <span className="hidden md:inline text-[14px] text-black font-normal mx-2">
                  Select Amenities
                </span>
                <span className="md:hidden text-[14px] text-black font-normal mx-2">
                  Amenities
                </span>
              </button>
            </div>

            <div>
              {searchResults.length > 0 && (
                <>
                  <p className="text-sm text-gray-500 mb-2">Search Results</p>
                  <div className="space-y-2 mb-4">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                        onClick={() => handleSearchSelect(result)}
                      >
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-gray-400" />
                          <span>{result.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {recentSearches.length > 0 && (
                <>
                  <p className="text-sm text-gray-500 mb-2">Recent searches</p>
                  <div className="space-y-2">
                    {recentSearches.map(
                      (search: { text: string; id: string }, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                          //@ts-expect-error idk
                          onClick={() => handleSearchSelect(search)}
                        >
                          <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-gray-400" />
                            <span>{search.text}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(removeSearch(search.id));
                            }}
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
