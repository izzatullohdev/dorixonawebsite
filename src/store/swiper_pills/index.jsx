import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// get qilish uchun async thunk
export const getSwiper = createAsyncThunk(
  "swiper/getSwiper",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/lasts-pills`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

// Slice yaratish
const swiperSlice = createSlice({
  name: "swiper",
  initialState: {
    swiper: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSwiper.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSwiper.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.swiper = action.payload;
      })
      .addCase(getSwiper.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default swiperSlice.reducer;