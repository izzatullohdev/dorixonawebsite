import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// Ma'lumotlarni ID bo‘yicha olish thunk
export const getPills = createAsyncThunk(
  "pills/getPills",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/pills/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

const pillsSlice = createSlice({
  name: "pills",
  initialState: {
    pill: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pill = action.payload;
      })
      .addCase(getPills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default pillsSlice.reducer;