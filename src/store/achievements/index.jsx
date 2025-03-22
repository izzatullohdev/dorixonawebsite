import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// get qilish uchun async thunk
export const getAchievement = createAsyncThunk(
  "achievement/getAchievement",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/achievements`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

// Slice yaratish
const achievementSlice = createSlice({
  name: "achievement",
  initialState: {
    achievements: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAchievement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAchievement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.achievements = action.payload;
      })
      .addCase(getAchievement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default achievementSlice.reducer;