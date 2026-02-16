import React, { useEffect, useState } from "react";
import "../style/Update.css";
import { useNavigate, useParams } from "react-router-dom";
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

  const [updateImg, setUpdateImage] = useState([]);

  useEffect(() => {
    dispatch(getApiCall(id))
      .unwrap()
      .catch(() => {
        navigate("/profile");
      });
  }, [dispatch, id, navigate]);

  const handleImages = (e) => {
    setUpdateImage([...e.target.files]);
  };

  // ✅ FIXED DELETE FUNCTION
  const deleteImage = async (imageUrl) => {
    try {
      const res = await axios.delete(`/api/blog/deleteimage`, {
        data: { path: imageUrl, _id: id },
      });

      // ✅ Safer condition
      if (res.data) {
        const filteredImages = image.filter(
          (img) => img !== imageUrl
        );

        dispatch(setImage(filteredImages));
      } else {
        alert("Image not deleted from server");
      }
    } catch (error) {
      console.error("Delete image error:", error);
      alert("Failed to delete image");
    }
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

  return (

  <div className="update-container">
    <form onSubmit={handleSubmit} className="update-form">

      {/* TITLE */}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          placeholder="Enter blog title..."
        />
      </div>

      {/* CONTENT */}
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => dispatch(setContent(e.target.value))}
          placeholder="Write your blog content..."
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div className="form-group">
        <label>Add Images</label>
        <input type="file" multiple onChange={handleImages} />
      </div>

      <button type="submit" className="update-btn">
        Update Blog
      </button>
    </form>

    {/* OLD IMAGES */}
    <div className="image-section-wrapper">
      <h3>Existing Images</h3>
      <div className="image-wrapper">
        {image &&
          image.map((img) => (
            <div className="image-card" key={img}>
              <img src={img} alt="blog" />
              <button
                type="button"
                onClick={() => deleteImage(img)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>

    {/* NEW IMAGE PREVIEW */}
    {updateImg.length > 0 && (
      <div className="image-section-wrapper">
        <h3>New Selected Images</h3>
        <div className="image-wrapper">
          {updateImg.map((file, index) => (
            <div className="image-card" key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
}
export default UpdatePage;
