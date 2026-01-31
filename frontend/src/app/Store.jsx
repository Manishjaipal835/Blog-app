import { configureStore } from '@reduxjs/toolkit'
import AddBlogReducer from '../features/AddBlogSlice';
import ReadBlogReducer from '../features/ReadBlogSlice';
import ProfileReducer from '../features/ProfileSlice';
import RegistrationReducer from '../features/RegistrationSlice'
import LoginReducer  from '../features/LoginSlice';
import UpdateReducer from '../features/UpdatedSlice'

const Store = configureStore({
  reducer:{
    addBlog:AddBlogReducer,
    readBlog:ReadBlogReducer,
    userProfile:ProfileReducer,
    regUser:RegistrationReducer,
    loginUser:LoginReducer,
    updateBlog:UpdateReducer

  }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default Store
