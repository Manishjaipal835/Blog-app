import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { profileApi } from "../features/ProfileSlice";
import "../style/Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { data, blogList, status, error } = useSelector(
    (state) => state.userProfile
  );

  // Fetch profile on mount
  useEffect(() => {
    dispatch(profileApi());
  }, [dispatch]);

  // Logout
  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/logout",
        {},
        { withCredentials: true }
      );

      if (res.data.status === 200) {
        navigate("/login");
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Read blog
  const handleBlog = (id) => {
    navigate(`/readblog/${id}`);
  };

  // ✅ DELETE BLOG (FIXED)
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/blog/deleteblog/${id}`,
        { withCredentials: true }
      );

      // refresh profile after delete
      dispatch(profileApi());
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // Loading
  if (status === "pending") {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading...
      </p>
    );
  }

  // Error
  if (status === "rejected") {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        {error || "Unauthorized. Please login again."}
      </p>
    );
  }

  // No data
  if (!data) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        No profile data found
      </p>
    );
  }

  return (
    <div className="profile-body">
      <div className="profile-container">

        {/* PROFILE INFO */}
        <div className="profile-data">
          <div className="profile-letter">
            {data.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-name">
            {data.name?.toUpperCase()}
          </div>

          <div className="profile-actions">
            <button
              className="btn-add"
              onClick={() => navigate("/addblog")}
            >
              Add Blog
            </button>

            <button
              className="btn-logout"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* BLOG LIST */}
        <div className="profile-bloglist">
          <h2 className="blogs-heading">Your Written Blogs</h2>

          {blogList && blogList.length > 0 ? (
            <div className="blogs-grid">
              {blogList.map((blog) => (
                <div key={blog._id} className="blog-card">
                  <h3 className="blog-title">{blog.title}</h3>

                  <div className="blog-actions">
                    <button
                      className="btn-update"
                      onClick={() =>
                        navigate(`/updateblog/${blog._id}`)
                      }
                    >
                      Update
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn-read"
                      onClick={() => handleBlog(blog._id)}
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-blogs">
              You have not uploaded any blogs yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
