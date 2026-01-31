import  { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import '../style/ReadBlog.css'
import { useDispatch, useSelector } from "react-redux";
import { readCallApi } from '../features/ReadBlogSlice';
import Loader from '../component/Loader';

function ReadBlog() {
  const {id} = useParams()
  const {status,ans} = useSelector(state => state.readBlog);
 
     const dispatch = useDispatch()

  useEffect(()=>{
      const res = dispatch(readCallApi(id));
  },[id])

  return (
    <>
    {status === 'pending' && <Loader></Loader>}



{ !ans ?"no blogs": <div className={`w-full p-[3rem] bg-[#f7e9e9] `}>
    
  <div className={`bg-pink-100 rounded-2xl p-3 shadow-2xl flex flex-col justify-center items-center gap-3`}>
 <div className={`shadow-xl font-mono `}>
    <h3>{ans.title}</h3>
   </div>

         {ans?.images && ans.images.length > 0 &&                  
           ( ans.images.map((val, index) => (
          <div key={index} className={`w-[50%] text-justify`} >
      <img src={val} alt="" />
   </div>
  )))}


   <div className="read-content">
    <p>{ans.content}</p>
   </div>
  </div>

  </div>}
    </>
  )
}

export default ReadBlog