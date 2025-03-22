import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// get qilish uchun async thunk
export const getDoctor = createAsyncThunk(
  "doctor/getDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/doctors`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

// Slice yaratish
const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctor: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctor = action.payload;
      })
      .addCase(getDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;