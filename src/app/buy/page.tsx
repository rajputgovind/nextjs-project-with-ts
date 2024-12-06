"use client";

import SearchContainer from "@/components/SearchContainer";
import ListingCard from "@/components/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Loader from "@/components/Loader";
import { useEffect } from "react";
import { removeSearch } from "../redux/slice/recentSearchSlice";
import MapComponent from "@/components/MapComponent";

const BuyPage = () => {
  const { property, loading } = useSelector(
    (state: RootState) => state.property
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(removeSearch(undefined));
  }, [dispatch]);

  return (
    <div className="mt-5 container mx-auto">
      {loading === true ? <Loader /> : ""}
      <div className="min-h-screen ">
        <div className="flex flex-col lg:flex-row h-auto md:h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)]">
          {/* Left Section - Search and Listings */}
          <div className="w-full lg:w-1/2   p-4 sticky top-0">
            <SearchContainer />

            {/* Listing Cards */}
            {property?.length > 0 ? (
              <div className="space-y-4 mt-8 custom-scrollbar h-[75vh]">
                {property?.map((property) => (
                  <ListingCard
                    key={property._id}
                    listing={{
                      id: property._id,
                      images: property?.images,
                      title: property.title,
                      location: property.full_address,
                      isFavorite: false,
                    }}
                  />
                ))}
              </div>
            ) : (
              <h1 className="text-3xl font-semibold text-gray-800 text-center pt-10">
                Property Not Found
              </h1>
            )}
          </div>

          {/* Right Section - Map */}
          <div className="w-full md:w-1/2 lg:w-1/2 relative">
            <div className=" m-auto buy-map pt-4">
              <MapComponent properties={property} isSchoolShow={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
