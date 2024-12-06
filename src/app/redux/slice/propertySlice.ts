import { Property } from "@/interfaces/propertyinterface";
import { PropertyMetaData } from "@/interfaces/propertyMetadataInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PropertyState {
  property: Property[];
  singleProperty: Property | null;
  propertyMetaData: PropertyMetaData[] | undefined;
  error: string | null;
  loading: boolean;
}

const initialState: PropertyState = {
  property: [],
  singleProperty: null,
  propertyMetaData: [],
  error: null,
  loading: false,
};

export const getAllProperties = createAsyncThunk(
  "property/getAllProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/property`);
      return response.data?.results;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch properties"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const getSingleProperty = createAsyncThunk(
  "property/getSingleProperty",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/property/get-single-property-details/${id}`
      );
      console.log("response", response);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch property"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const getPropertyByPincodes = createAsyncThunk(
  "property/getPropertyByPincodes",
  async (pincodes: string[], { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/property?addresses=${pincodes}`
      );
      console.log("responsedaata", response);
      return response?.data?.results;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch property"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const getPropertyMetaDataById = createAsyncThunk(
  "property/getMetaDataById",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/property-meta-data/meta-data-by-property-id/${id}`
      );
      console.log("responsegetMetadataById", response);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch property"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    test: () => {
      console.log("test property");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProperties.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.property = action.payload;
    });
    builder.addCase(getAllProperties.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getSingleProperty.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSingleProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProperty = action.payload;
    });
    builder.addCase(getSingleProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getPropertyByPincodes.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPropertyByPincodes.fulfilled, (state, action) => {
      state.loading = false;
      state.property = action.payload;
    });
    builder.addCase(getPropertyByPincodes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getPropertyMetaDataById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPropertyMetaDataById.fulfilled, (state, action) => {
      state.loading = false;
      state.propertyMetaData = action.payload;
    });
    builder.addCase(getPropertyMetaDataById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { test } = propertySlice.actions;
export default propertySlice.reducer;
