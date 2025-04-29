import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API;
console.log(api);

export const sendOffer = createAsyncThunk("offer/send", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${api}/offer/create/`, 
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Server error");
  }
});

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOffer.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendOffer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default offerSlice.reducer;