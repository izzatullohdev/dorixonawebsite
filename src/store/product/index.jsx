import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// get qilish uchun async thunk
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/pills`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

// Slice yaratish
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;