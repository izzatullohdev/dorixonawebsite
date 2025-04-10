import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// get qilish uchun async thunk
export const getCommentaries = createAsyncThunk(
  "commentaries/getCommentaries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/commentaries`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xatolik yuz berdi");
    }
  }
);

// Slice yaratish
const commentariesSlice = createSlice({
  name: "commentaries",
  initialState: {
    commentaries: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentaries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentaries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.commentaries = action.payload;
      })
      .addCase(getCommentaries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default commentariesSlice.reducer;