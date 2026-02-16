import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  name: "",
  email: "",
  phone: "",
  password: "",
};

export const regCallApi = createAsyncThunk(
  "reg/post",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("Sending registration data ", userData);

      const res = await axios.post(
        "http://localhost:4000/api/user/reg",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      return res.data;
    } catch (error) {
      console.log("REG API ERROR ", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const RegistrationSlice = createSlice({
  name: "regUser",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regCallApi.pending, (state) => {
        state.status = "pending";
      })
      .addCase(regCallApi.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(regCallApi.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { setName, setEmail, setPhone, setPassword } =
  RegistrationSlice.actions;

export default RegistrationSlice.reducer;
