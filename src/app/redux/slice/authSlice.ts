import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  country: string;
  city: string;
  state: string;
  pin_code: string;
  images: { path: string }[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Replace with your API URL

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, credentials);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.status === 400) {
          return rejectWithValue(error.response.data.message);
        }
        if (error.response && error.response.status === 404) {
          return rejectWithValue(error.response.data.message);
        }
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

// Sign-Up Thunk
export const signUp = createAsyncThunk(
  "auth/signup",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/user/register`, userData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.status === 409) {
          return rejectWithValue("Email already exists");
        }
      }
      return rejectWithValue("something went wrong");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    { id, userData }: { id: string; userData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URL}/user/${id}`, userData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Update failed"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "auth/getSingleUser",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${_id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch user data"
        );
      } else {
        // Handle other types of errors, if necessary
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const contactUs = createAsyncThunk(
  "auth/contactUs",
  async (
    data: {
      full_name: string;
      email: string;
      contact_no: string;
      message: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/user/conatct-us`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Sign up failed";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Update failed";
      })
      // Get Single User Cases
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.[0];
        state.error = null;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(contactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactUs.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(contactUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
