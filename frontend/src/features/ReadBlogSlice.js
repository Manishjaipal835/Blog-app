import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const readCallApi = createAsyncThunk('readBlog/post',async function (id,{rejectWithValue}) {
    try {
      const res = await axios.get(`/api/blog/readblog/${id}`)

      return res?.data;
    } catch (error) {
      console.log("there is an error in readCallApi function",error)
     
     return rejectWithValue('something went wrong in readCallApi function') 
    }
})

const initialState = {
  status:"idle",
  ans:{}
}


const readSlice = createSlice({
  name:'readBlog',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(readCallApi.fulfilled,(state,action)=>{
      state.status = 'success'
      state.ans = {...state.ans,...action.payload.blog}
    })
    .addCase(readCallApi.pending,(state,action)=>{
      state.status = 'pending'
    })
    .addCase(readCallApi.rejected,(state,action)=>{
      state.status = 'rejected'
    })
  }
})


export default readSlice.reducer
