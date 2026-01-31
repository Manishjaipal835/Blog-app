import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Reg from './Pages/Reg'
import Login from './Pages/Login'
import Landing from './Pages/Landing'
import Profile from './Pages/Profile'
import AddBlog from './Pages/AddBlog'
import ReadBlog from './Pages/ReadBlog'
import UpdatePage from './Pages/UpdatePage'

function App() {
  return (
    <>
  <Routes>
    <Route path='/reg' element={<Reg></Reg>}></Route>    
       <Route path='/login' element={<Login></Login>}></Route>
       <Route path='/' element={<Navigate to="/home" replace />} />
          <Route path='/home' element={<Landing></Landing>}></Route> 
              <Route path='/profile' element={<Profile></Profile>}></Route>
                   <Route path='/readblog/:id' element={<ReadBlog></ReadBlog>}></Route>
                   <Route path='/updateblog/:id' element={<UpdatePage></UpdatePage>}></Route>
                   <Route path='/addblog' element={<AddBlog></AddBlog>}></Route>
    </Routes>
    </>
  )
}

export default App