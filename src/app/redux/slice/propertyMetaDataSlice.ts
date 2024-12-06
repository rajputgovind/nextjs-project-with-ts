// propertiesSlice.ts
import { PropertyData } from "@/components/CompareProperty";
import { RecommendedPropertyData } from "@/components/RecommendedProperty";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface Schools {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: {
    foursquare: string;
    landmark: boolean;
    address: string;
    category: string;
    maki: string;
  };
  text: string;
  place_name: string;
  center: [number, number]; // Longitude, Latitude
  geometry: {
    coordinates: [number, number]; // Longitude, Latitude
    type: string; // Geometry type (e.g., "Point")
  };

  distance?: string;
  context: {
    id: string;
    mapbox_id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }[];
}

// Define the structure of images
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

// Define the structure of property location
interface Location {
  longitude: number;
  latitude: number;
  city_address: string;
}

// Define the structure of property details
interface PropertyDetails {
  name: string;
  country: string;
  state: string;
  city: string;
  address: string;
}

// Define the structure of a property
interface Property {
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
  property_type: string;
  features: string[];
  status: string;
  construction_status: string;
  pin_code: string;
  floor: number;
  bhk: string;
  facing: string;
  flat_number: string;
  sold_out_date: string;
  is_leasehold: boolean;
  lease_year: number;
  deletedAt: string | null;
  propertyDetails: PropertyDetails;
  images: Image[];
}

// Update the PropertyState interface to use the new types
interface PropertyState {
  data: Property[]; // Array of properties
  singleProperty: Property | null; // Single property or null
  addressPinCodes: [];
  queries: string[]; // New array to store the queries
  addressLocations: string[];
  tagPincodeAndAddress: Record<string, number>;
  propertySchools: Schools[];
  compareProperties: Property[];
  recommendedProperties: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  data: [], // Array of properties
  singleProperty: null, // Single property state (initially null)
  addressPinCodes: [],
  queries: [], // Initialize queries as an empty array
  addressLocations: [],
  tagPincodeAndAddress: {},
  propertySchools: [],
  compareProperties: [],
  recommendedProperties: [],
  loading: false,
  error: null,
};

// API endpoint
const API_URL = process.env.NEXT_PUBLIC_API_URL; // Update with your actual API endpoint

// Async action to fetch properties
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/property-meta-data`);
      return response.data.data; // Adjust based on your response structure
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Failed to fetch properties"
        );
      } else {
        // Handle other types of errors, if necessary
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchSingleProperty = createAsyncThunk(
  "properties/fetchSingleProperty",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/property-meta-data/${id}`);
      return response.data; // Adjust based on the response structure
    } catch (error: unknown) {
      // Cast error to AxiosError to access Axios-specific properties
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch property metadata"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Async action to fetch properties based on multiple queries
export const fetchPropertiesByMultipleQuery = createAsyncThunk(
  "properties/fetchPropertiesByMultipleQuery",
  async (queries: string[], { rejectWithValue }) => {
    try {
      console.log("queries", queries);
      // Concatenate queries to a single query string
      const queryString = queries.join("-");
      const response = await axios.get(
        `${API_URL}/property-meta-data?addresses=${queries}`
      );
      return response.data.data; // Adjust based on the response structure
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch properties"
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchCompareProperties = createAsyncThunk(
  "properties/fetchCompareProperties",
  async (data: PropertyData | undefined, { rejectWithValue }) => {
    try {
      // console.log("dataaaaaa", data);
      const response = await axios.get(
        `${API_URL}/property-meta-data/property-compare?longitude=${
          data?.location?.longitude
        }&latitude=${data?.location?.latitude}&radius=${10}&minPrice=${
          data?.min_price
        }&maxPrice=${data?.max_price}&roomCount=${data?.room_counting}&area=${
          data?.area
        }`
      );
      return response.data;
    } catch (error: unknown) {
      // Cast error to AxiosError to access Axios-specific properties
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch property metadata"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchRecommendedProperty = createAsyncThunk(
  "properties/fetchRecommendedProperty",
  async (data: RecommendedPropertyData | undefined, { rejectWithValue }) => {
    try {
      // console.log("dataaaaaa", data);
      const response = await axios.get(
        `${API_URL}/property-meta-data/recommended-property?longitude=${
          data?.location?.longitude
        }&latitude=${data?.location?.latitude}&radius=${10}&minPrice=${
          data?.min_price
        }&maxPrice=${data?.max_price}`
      );
      return response.data;
    } catch (error: unknown) {
      // Cast error to AxiosError to access Axios-specific properties
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch property metadata"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Properties slice
const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addPinCodes: (state, action) => {
      state.addressPinCodes = action?.payload;
    },
    addAddressLocations: (state, action) => {
      state.addressLocations = action.payload;
    },
    addTagPincodeAndAddress: (state, action) => {
      state.tagPincodeAndAddress = action.payload;
    },
    addPropertySchools: (state, action) => {
      state.propertySchools = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchSingleProperty actions
      .addCase(fetchSingleProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProperty = action.payload;
      })
      .addCase(fetchSingleProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPropertiesByMultipleQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesByMultipleQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertiesByMultipleQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCompareProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompareProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.compareProperties = action.payload;
      })
      .addCase(fetchCompareProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecommendedProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedProperties = action.payload;
      })
      .addCase(fetchRecommendedProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addPinCodes,
  addAddressLocations,
  addTagPincodeAndAddress,
  addPropertySchools,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
