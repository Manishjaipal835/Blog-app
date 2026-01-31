import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const profileApi = createAsyncThunk(
  "profile/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          withCredentials: true, // 🔥 THIS IS THE KEY
        }
      );

      console.log("PROFILE RESPONSE 👉", res.data);
      return res.data;
    } catch (error) {
      console.log("PROFILE ERROR 👉", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Unauthorized"
      );
    }
  }
);

const initialState = {
  status: "idle",
  data: null,
  blogList: [],
  error: null,
};

const ProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileApi.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(profileApi.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.user;     // ✅ backend sends `user`
        state.blogList = action.payload.blogs; // ✅ backend sends `blogs`
      })
      .addCase(profileApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default ProfileSlice.reducer;
