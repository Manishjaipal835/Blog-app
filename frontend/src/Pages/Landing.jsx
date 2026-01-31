import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch blogs from backend
  const callApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/blog/home");

      if (res.data.status === 404) {
        alert("Something went wrong");
        return;
      }

      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  // Navigate to full blog page
  const handleBlog = (blog) => {
    navigate(`/readblog/${blog._id}`);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="w-full bg-gray-100 py-12 text-center">
        <h1 className="text-4xl font-bold font-serif text-gray-800">
          Daily Blogs
        </h1>
        <p className="mt-2 text-gray-600">
          Read stories, ideas & experiences from writers
        </p>
      </div>

      {/* Blog List */}
      <div className="w-full flex justify-center py-10 bg-gray-50">
        <div className="w-full max-w-4xl px-4">
          {blogs.length > 0 ? (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition duration-300"
                >
                  {/* Blog Image */}
                  <img
                    src={
                      blog.image && blog.image !== ""
                        ? blog.image
                        : "https://picsum.photos/800/400"
                    }
                    alt={blog.title}
                    className="w-full h-52 object-cover rounded-lg mb-4 block"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://picsum.photos/800/400";
                    }}
                  />

                  {/* Title */}
                  <h3 className="text-3xl font-bold font-serif text-gray-900 mb-3">
                    {blog.title}
                  </h3>

                  {/* Meta info */}
                  <div className="text-sm text-gray-500 mb-4">
                    Written by{" "}
                    <span className="font-semibold text-gray-700">
                      {blog.writtenBy}
                    </span>
                  </div>

                  {/* Content preview */}
                  <p className="text-gray-700 text-lg leading-relaxed text-justify mb-6">
                    {blog.content?.substring(0, 220)}...
                  </p>

                  {/* Read More button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleBlog(blog)}
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
              No blogs available
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Landing;
