import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  status:'idle',
  title:'',
  content:'',
  image:[]
}

export const getApiCall = createAsyncThunk('getblogforupdate/post',async function (id,{rejectWithValue}) {
  try {
     const res = await axios.get(`/api/blog/readblog/${id}`);
              console.log(res.data);
              return res?.data;
  } catch (error) {
    console.log("there is an error in the updateApiCall");
    return rejectWithValue('there is an error in the getApiCall');
  }
})



export const updateApiCall = createAsyncThunk(
  'updateblog/put',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/blog/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("data fetched by updateApiCall", res.data);
      return res.data;
    } catch (error) {
      console.log("UPDATE ERROR 👉", error);
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);




const UpdateSlice = createSlice({
  name:"updateBlog",
  initialState,
  reducers:{
    setTitle:(state,action)=>{
      state.title = action.payload
    },
    setContent:(state,action)=>{
      state.content = action.payload
    },
    setImage:(state,action)=>{
      state.image = action.payload
    },
  },
  extraReducers:(builder)=>{
      builder
      .addCase(getApiCall.fulfilled,(state,action)=>{
        state.status = action.payload.status
        state.title = action.payload.blog.title
         state.content = action.payload.blog.content
          state.image = action.payload.blog.images
      })
      .addCase(getApiCall.pending,(state,action)=>{
        state.status = "pending"
      })
      .addCase(getApiCall.rejected,(state,action)=>{
        state.status = "rejected"
      })
      .addCase(updateApiCall.fulfilled,(state,action)=>{
        state.status = action.payload.status;
      })
      .addCase(updateApiCall.pending,(state,action)=>{
        state.status = "pending"
      })
      .addCase(updateApiCall.rejected,(state,action)=>{
        state.status = 'rejected'
      })
  }

})

export const {setContent,setImage,setTitle} = UpdateSlice.actions
export default UpdateSlice.reducer