import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a more specific type for a search object
interface Search {
  id: string;
  text: string; // Ensure consistency with your usage
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface RecentSearchState {
  searches: Search[]; // Use the defined Search type instead of 'any'
}
const initialState: RecentSearchState = {
  searches: [],
};

const recentSearchSlice = createSlice({
  name: "recentSearch",
  initialState: initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<Search>) => {
      const search = action.payload;
      if (!state.searches.some((s) => s.id === search.id)) {
        state.searches = [search, ...state.searches].slice(0, 5); // Keep max 5 searches
      }
    },
    removeSearch: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload;
      if (id) {
        // Remove a specific search by ID
        state.searches = state.searches.filter((s) => s.id !== id);
      } else {
        // Clear all searches
        state.searches = [];
      }
    },
  },
});

export const { addSearch, removeSearch } = recentSearchSlice.actions;
export default recentSearchSlice.reducer;
