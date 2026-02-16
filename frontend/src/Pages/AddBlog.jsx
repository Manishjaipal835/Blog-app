import { useDispatch, useSelector } from "react-redux";
import { setContent,setTitle,addApiCall } from "../features/AddBlogSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../component/Loader";



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
       
   dispatch(addApiCall(formData)).unwrap()
  .then(() => {
    navi("/home");
  })
  .catch((err) => {
    if (err?.message === "Unauthorized") {
      navi("/login");
    } else {
      alert(err?.message || "Blog failed");
    }
  });


  
  };

  return (

  <>
    
    <div className="w-full bg-gray-100 py-12 text-center">
      <h1 className="text-4xl font-bold font-serif text-gray-800">
        Create New Blog
      </h1>
      <p className="mt-2 text-gray-600">
        Share your thoughts, ideas & experiences
      </p>
    </div>

    
    <div className="w-full flex justify-center py-12 bg-gray-50">
      <div className="w-full max-w-3xl px-6">

        {status === "pending" && <Loader />}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm space-y-6"
        >
          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter blog title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => dispatch(setContent(e.target.value))}
              rows="6"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Write your blog content..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 font-medium">
              Add Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImages}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  </>
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



