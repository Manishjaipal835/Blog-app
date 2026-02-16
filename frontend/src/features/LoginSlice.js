import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
  user: null,          
  isAuthenticated: false, 
  status: "idle",
  error: null
};


export const LoginCallApi = createAsyncThunk(
  "loginUser/post",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("LOGIN PAYLOAD SENT 👉", userData); // 👈 ADD THIS

      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        userData,
        { withCredentials: true }
      );

      console.log("LOGIN RESPONSE 👉", res.data); // 👈 ADD THIS

      return res.data;
    } catch (error) {
      console.log("LOGIN ERROR 👉", error.response?.data); // 👈 ADD THIS
      return rejectWithValue(
        error.response?.data || { message: "Network / Server error" }
      );
    }
  }
);


const LoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      state.status = "idle";
      state.error = null;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
      state.status = "idle";
      state.error = null;
    },
    logout: (state) => {   
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginCallApi.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(LoginCallApi.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user; 
        state.isAuthenticated = true;
      })
      .addCase(LoginCallApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || "Login failed";
      });
  }
});

export const { setEmail, setPassword ,logout} = LoginSlice.actions;
export default LoginSlice.reducer;
