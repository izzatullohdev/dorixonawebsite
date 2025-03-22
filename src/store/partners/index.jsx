import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// get qilish uchun async thunk
export const getPartner = createAsyncThunk(
  "partner/getPartner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/partners`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

// Slice yaratish
const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    partner: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPartner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPartner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.partner = action.payload;
      })
      .addCase(getPartner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default partnerSlice.reducer;