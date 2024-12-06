import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_CHAT_BOT_API_URL;

interface ChatBotState {
  chat: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatBotState = {
  chat: [],
  loading: false,
  error: null,
};

interface ChatBot {
  auth: string | null;
  question: string;
  ids: string;
}

export const handleChatBot = createAsyncThunk(
  "chatbot/postChatBot",
  async (data: ChatBot, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, data);
      return response?.data;
    } catch (error) {
      console.log("error in chatbot", error);
    }
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    testchatBot: (state, action) => {
      console.log("chatbot reducre called");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleChatBot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleChatBot.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(handleChatBot.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "An error occurred. Please try again.";
      });
  },
});

export const { testchatBot } = chatbotSlice.actions;
export default chatbotSlice.reducer;
