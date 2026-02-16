import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { profileApi } from "../features/ProfileSlice";


function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const { data, blogList, status, error } = useSelector(
    (state) => state.userProfile
  );

  
  useEffect(() => {
    dispatch(profileApi());
  }, [dispatch]);

  
  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/logout",
        {},
      
      );

      if (res.data.status === 200) {
        navigate("/Login");
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  
  const handleBlog = (id) => {
    navigate(`/readblog/${id}`);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/blog/deleteblog/${id}`,
        { withCredentials: true }
      );

      
      dispatch(profileApi());
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  if (status === "pending") {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading...
      </p>
    );
  }

  
  if (status === "rejected") {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        {error || "Unauthorized. Please login again."}
      </p>
    );
  }

  if (!data) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        No profile data found
      </p>
    );
  }

  return (
  <>
    <div className="w-full bg-gray-100 py-12 text-center">
      <h1 className="text-4xl font-bold font-serif text-gray-800">
        Your Profile
      </h1>
      <p className="mt-2 text-gray-600">
        Manage your blogs & account settings
      </p>
    </div>

    <div className="w-full flex justify-center py-10 bg-gray-50">
      <div className="w-full max-w-4xl px-4 space-y-10">

        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
            {data.name?.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {data.name?.toUpperCase()}
          </h2>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/addblog")}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Add Blog
            </button>

            {/* <button
              onClick={handleLogOut}
              className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
             >
              Log Out
             </button>*/}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold font-serif text-gray-800 mb-8 text-center">
            Your Written Blogs
          </h2>

          {blogList && blogList.length > 0 ? (
            <div className="space-y-8">
              {blogList.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition duration-300"
                >
                  <img
                    src={
                      blog.image && blog.image !== ""
                        ? blog.image
                        : "https://picsum.photos/800/400"
                    }
                    alt={blog.title}
                    className="w-full h-52 object-cover rounded-lg mb-4"
                  />

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {blog.title}
                  </h3>

                  <div className="text-sm text-gray-500 mb-4">
                    Written by{" "}
                    <span className="font-semibold text-gray-700">
                      {blog.writtenBy}
                    </span>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed text-justify mb-6">
                    {blog.content?.substring(0, 200)}...
                  </p>

                  <div className="flex flex-wrap gap-4 justify-end">
                    <button
                      onClick={() =>
                        navigate(`/updateblog/${blog._id}`)
                      }
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleBlog(blog._id)}
                      className="text-indigo-600 font-semibold hover:underline text-lg"
                    >
                      Read full article →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl">
              You have not uploaded any blogs yet.
            </p>
          )}
        </div>
      </div>
    </div>
  </>
);
}

export default Profile;
