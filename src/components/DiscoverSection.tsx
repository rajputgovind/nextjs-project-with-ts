import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { addPropertySchools } from "@/app/redux/slice/propertyMetaDataSlice";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { getAllProperties } from "@/app/redux/slice/propertySlice";
import { Property } from "@/interfaces/propertyinterface";

export default function DiscoverSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { addressPinCodes } = useSelector(
    (state: RootState) => state.properties
  );
  const { property, loading } = useSelector(
    (state: RootState) => state.property
  );
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        await dispatch(addPropertySchools([]));
        const propertyRes = await dispatch(getAllProperties()).unwrap(); // Ensures errors are caught here
        console.log("proepr", propertyRes);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    loadProperties();
  }, [dispatch]);

  useEffect(() => {
    if (property || addressPinCodes.length) {
      filterProperty();
    }
  }, [property, addressPinCodes]);

  const filterProperty = () => {
    if (addressPinCodes.length === 0) {
      setFilteredProperties(property);
    } else {
      // Filter properties based on pin code
      const filtered = property?.filter((property: Property) =>
        addressPinCodes?.some(
          (pin) => Number(pin) === Number(property?.metadata[0]?.pin_code)
        )
      );
      setFilteredProperties(filtered);
    }
  };

  useEffect(() => {
    if (property && !addressPinCodes?.length) {
      setFilteredProperties(property);
    }
  }, [property]);

  return (
    <section className="container mx-auto md:py-[110px] lg:py-[110px] py-[45px] px-2">
      {loading === true ? <Loader /> : ""}
      <div className="">
        <div className="border-l-4 border-l-[#EF2BA0] px-3">
          <p className="leading-[45px] mb-[10px]">
            <span className="text-3xl md:text-4xl font-semibold text-[#120F30] mb-2">
              Discover Properties
            </span>
            <br />
            <span className="text-3xl md:text-4xl font-semibold text-[#EF2BA0] mb-4">
              Effortlessly
            </span>
          </p>
          <p className="text-[#3A3A3A] md:text-[18px] leading-[22px] max-w-4xl">
            Whether you&apos;re looking for a cozy apartment or a spacious
            family home, we simplify your journey to homeownership, ensuring you
            explore options that perfectly fit your lifestyle.
          </p>
        </div>

        <div className="mb-11 overflow-x-auto pb-4 sm:overflow-x-visible sm:pb-0 mt-[78px]">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties
              ?.slice(0, 8)
              ?.map((property: Property, index: number) => (
                <div key={index} className="w-72 sm:w-auto flex-shrink-0">
                  <PropertyCard
                    imageUrl={
                      property.images?.length > 0
                        ? `${process.env.NEXT_PUBLIC_API_URL}${property.images[0].path}`
                        : "/property-img.svg"
                    }
                    location={property?.full_address}
                    parking={property?.car_places_counting}
                    id={property?._id}
                    is_leasehold={property?.is_leasehold}
                    lease_year={property?.lease_year}
                    name={property?.name}
                  />
                </div>
              ))}
          </div>
        </div>

        <Link
          href="/properties"
          className="text-[#EF2BA0] hover:text-pink-600 font-medium text-[18px]"
        >
          Explore More Properties →
        </Link>

        <div className="md:pt-32 lg:pt-32 pt-[45px]">
          <div className="border-l-4 border-l-[#EF2BA0] px-3">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#120F30]  mb-2">
              Featured Homes in
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-[#EF2BA0] mb-8">
              Prime Locations
            </h3>
          </div>
          <div className="mb-8 overflow-x-auto pb-4 sm:overflow-x-visible sm:pb-0">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProperties &&
                filteredProperties.length > 0 &&
                filteredProperties
                  ?.filter((property: Property) => property.is_feature_property)
                  ?.slice(0, 4)
                  ?.map((property: Property, index: number) => (
                    <div key={index} className="w-72 sm:w-auto flex-shrink-0">
                      <PropertyCard
                        imageUrl={
                          property.images?.length > 0
                            ? `${process.env.NEXT_PUBLIC_API_URL}${property.images[0].path}`
                            : "/property-img.svg"
                        }
                        location={property?.full_address}
                        parking={property?.car_places_counting}
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
        <Link
          href="/featured-properties"
          className="text-[#EF2BA0] hover:text-pink-600 font-medium text-[18px]"
        >
          Explore More Properties →
        </Link>
      </div>
    </section>
  );
}
