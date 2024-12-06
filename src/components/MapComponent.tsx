"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { IoSchoolSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { addPropertySchools } from "@/app/redux/slice/propertyMetaDataSlice";

interface Location {
  latitude: number;
  longitude: number;
}

interface Property {
  location: Location;
}

interface Geometry {
  coordinates: [number, number];
}

interface School {
  text: string;
  geometry: Geometry;
}

const MapComponent = ({
  properties,
  isSchoolShow,
}: {
  properties: Property[];
  isSchoolShow: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [viewState, setViewState] = useState({
    latitude: 22.69463,
    longitude: 75.82974,
    zoom: 14,
  });
  const { propertySchools } = useSelector(
    (state: RootState) => state.properties
  );
  const [school, setSchool] = useState<School[]>(propertySchools);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (properties?.length > 0) {
      const getSchool = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/school.json?proximity=${properties[0]?.location?.longitude},${properties[0]?.location?.latitude}&types=poi&limit=10&access_token=pk.eyJ1Ijoib2x1ZmVtaWFkZW9qbyIsImEiOiJjbDRwcjhxMWMwazhuM2JzOGtmeDE0czRuIn0.elEZm1hX7feSZKZrXs88hQ`
          );
          const newSchools = response?.data?.features;
          if (
            isSchoolShow &&
            JSON.stringify(newSchools) !== JSON.stringify(propertySchools)
          ) {
            setSchool(newSchools);
          }
        } catch (error) {
          console.error("Error fetching schools:", error);
        }
      };

      setViewState({
        latitude: Number(properties[0]?.location?.latitude),
        longitude: Number(properties[0]?.location?.longitude),
        zoom: 14,
      });

      getSchool();
    }
  }, [properties, isSchoolShow, propertySchools, dispatch]);

  useEffect(() => {
    const addDistances = async () => {
      if (school?.length > 0) {
        const userLocation = properties[0]?.location;

        // Calculate updated distances
        const updatedSchools = school?.map((school) => {
          const distance = calculateDistance(
            userLocation?.latitude,
            userLocation?.longitude,
            school?.geometry?.coordinates[1],
            school?.geometry?.coordinates[0]
          );
          return { ...school, distance: distance.toFixed(2) };
        });

        await dispatch(addPropertySchools(updatedSchools));
      }
    };

    addDistances();
  }, [school?.length]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  return (
    <div className="w-full relative ">
      {/* Toggle Button */}
      {isSchoolShow && (
        <div
          className="flex items-center"
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 7,
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "30px",
            padding: "5px 15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>View Schools</span>
          <Switch
            className="ml-3"
            checked={showPopup}
            onCheckedChange={() => setShowPopup(!showPopup)}
          />
        </div>
      )}

      <Map
        mapboxAccessToken={
          "pk.eyJ1Ijoib2x1ZmVtaWFkZW9qbyIsImEiOiJjbDRwcjhxMWMwazhuM2JzOGtmeDE0czRuIn0.elEZm1hX7feSZKZrXs88hQ"
        }
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "700px", position: "relative" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {showPopup &&
          school.map((school, index) => (
            <div key={index}>
              <Marker
                key={index}
                longitude={school?.geometry?.coordinates[0]}
                latitude={school?.geometry?.coordinates[1]}
                anchor="top"
                color="blue"
              >
                <IoSchoolSharp size={30} color="#E29907" />
              </Marker>

              <Popup
                focusAfterOpen={false}
                longitude={school?.geometry?.coordinates[0]}
                latitude={school?.geometry?.coordinates[1]}
                anchor="bottom"
                // onClose={() => setShowPopup(false)}
              >
                {school?.text}
              </Popup>
            </div>
          ))}

        {properties?.map((property, index) => (
          <Marker
            key={index}
            latitude={Number(property?.location?.latitude)}
            longitude={Number(property?.location?.longitude)}
            anchor="bottom"
            color="red"
          >
            <img src="/map-pin.svg" width="35" height="35" />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapComponent;
