const express = require("express");
const router = express.Router();

// middlewares
const { isLogin } = require("../controllers/Auth.controller");
const upload = require("../controllers/fileUploadController");

// controllers
const {
  getBlogs,
  readBlog,
  addBlog,
  updateController,
  deleteController,
  deleteImageController,
} = require("../controllers/Blog.controller");

/* ================= BLOG ROUTES ================= */

// get all blogs (HOME)
router.get("/home", getBlogs);

// get single blog
router.get("/readblog/:id", readBlog);

// add blog (protected)
router.post(
  "/addblog",
  isLogin,
  upload.array("image", 5),
  addBlog
);

// update blog
router.put(
  "/update/:id",
  isLogin,
  upload.array("image", 5),
  updateController
);

// delete blog
router.delete("/deleteblog/:id", isLogin, deleteController);

// delete blog image
router.delete("/deleteimage", deleteImageController);

module.exports = router;
