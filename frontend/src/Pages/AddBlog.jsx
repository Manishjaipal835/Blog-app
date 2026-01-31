import { useDispatch, useSelector } from "react-redux";
import { setContent,setTitle,addApiCall } from "../features/AddBlogSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../component/Loader";
import "./AddBlog.css";


function AddBlog() {
  const dispatch = useDispatch();
  const {content,title,status} = useSelector((state)=>state.addBlog);
  const [images,setImages] = useState([]);
  const navi = useNavigate();
  const handleImages = (e) => {
   setImages([...e.target.files])
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 5 || content.length < 20) {
      alert("Title must be 5+ chars and content must be 20+ chars");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((img) => {
      formData.append("image", img); 
    });
       
    dispatch(
      addApiCall(formData)).then((res)=>{
         if(res.payload?.status === 404){
          navi('/login');
         }else{
          navi('/home');
         }
      })

  
  };

  return (
    <div>
    {status === 'pending' && <Loader></Loader>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />

        <label htmlFor="">Content:</label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => dispatch(setContent(e.target.value))}
        />

        <label htmlFor="">Add images:</label>
        <input type="file" multiple onChange={handleImages} />

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddBlog() {
  
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [images, setImages] = useState([]);

//   const navi = useNavigate();

//   const handleImages = (e) => {
//     setImages([...e.target.files]);
//   };

//   async function callApi(data) {
//     try {
//       const res = await axios.post("/api/blog/addblog", data);

//       if (res.data.status === 404) {
//         navi("/login");
//         return;
//       }

//       navi("/home");
//     } catch (error) {
//       console.log("there is an error in add blog api");
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (title.length < 5 || content.length < 20) {
//       alert("Title must be 5+ chars and content must be 20+ chars");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);

//     images.forEach((img) => {
//       formData.append("image", img); 
//     });

//     console.log(formData)
//     callApi(formData);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="">Title:</label>
//         <input
//           type="text"
//           name="title"
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <label htmlFor="">Content:</label>
//         <textarea
//           name="content"
//           onChange={(e) => setContent(e.target.value)}
//         />

//         <label htmlFor="">Add images:</label>
//         <input type="file" multiple onChange={handleImages} />

//         <button type="submit">Add Blog</button>
//       </form>
//     </div>
//   );
// }

// export default AddBlog;



