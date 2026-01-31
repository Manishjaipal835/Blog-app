import React, { useEffect, useState } from "react";
import "../style/Update.css";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import {
  setContent,
  setImage,
  setTitle,
  getApiCall,
  updateApiCall,
} from "../features/UpdatedSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function UpdatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, content, image } = useSelector(
    (state) => state.updateBlog
  );

  // ✅ Local state for new images (DO NOT use Redux for files)
  const [updateImg, setUpdateImage] = useState([]);

  /* ================= FETCH BLOG DATA ================= */
  useEffect(() => {
    dispatch(getApiCall(id))
      .unwrap()
      .catch(() => {
        navigate("/profile");
      });
  }, [dispatch, id, navigate]);

  /* ================= HANDLE IMAGE INPUT ================= */
  const handleImages = (e) => {
    setUpdateImage([...e.target.files]);
  };

  /* ================= DELETE IMAGE ================= */
  const deleteImage = async (imageUrl) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/blog/deleteimage/${id}`,
      {
        data: { path: imageUrl },
        withCredentials: true,
      }
    );

    if (res.data?.blog) {  // ✅ backend returns `blog` on success
      const filteredImages = image.filter((img) => img !== imageUrl);
      dispatch(setImage(filteredImages));
      alert("Image deleted successfully");
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.error("Delete image error 👉", error);
    alert("Failed to delete image");
  }
};

  
  /* ================= UPDATE BLOG ================= */
 const handleSubmit = (e) => {
  e.preventDefault();

  if (title.length < 5 || content.length < 20) {
    alert("Title must be 5+ chars and content must be 20+ chars");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);

  updateImg.forEach((file) => {
    formData.append("image", file);
  });

  dispatch(updateApiCall({ id, formData }))
    .unwrap()
    .then(() => {
      navigate(`/readblog/${id}`);
    })
    .catch((err) => {
      alert(err || "Update failed");
    });
};


  /* ================= UI ================= */
  return (
    <div className="update-container">
      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <div className="update-title">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </div>

        {/* CONTENT */}
        <div className="update-content">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => dispatch(setContent(e.target.value))}
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="update-upload">
          <input type="file" multiple onChange={handleImages} />
          <button type="submit">Update Blog</button>
        </div>
      </form>

      {/* EXISTING IMAGES */}
      <label>Images</label>
      <div className="image-wrapper">
        {image &&
          image.length > 0 &&
          image.map((img, i) => (
            <div className="image-section" key={i}>
              <img src={img} alt="blog" />
              <button
                className="update-delbtn"
                onClick={() => deleteImage(img)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UpdatePage;
