import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  title: "",
  content: "",
  status: "idle",
  error: null,
};

export const addApiCall = createAsyncThunk(
  "addBlog/post",
  async (data, { rejectWithValue }) => {
    console.log("THUNK DATA 👉", data);

 try {

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      if (data.images && data.images.length > 0) {
        data.images.forEach((file) => {
          formData.append("image", file);
        });
      }

      const res = await axios.post(
        "http://localhost:4000/api/blog/addblog",
        formData,
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Add blog failed"
      );
    }
  }
);

const AddSlice = createSlice({
  name: "addBlog",
  initialState,
  reducers: {
    setTitle: (state, action) => {
  
      state.title = action.payload;
    },
    setContent: (state, action) => {
      console.log("the content is = ",action.payload)
      state.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addApiCall.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(addApiCall.fulfilled, (state) => {
        state.status = "success";
        state.title = "";
        state.content = "";
      })
      .addCase(addApiCall.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setTitle, setContent } = AddSlice.actions;
export default AddSlice.reducer;
