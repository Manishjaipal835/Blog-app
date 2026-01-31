const blog = require("../modals/Blog.modal");
const user = require("../modals/user.modal");
const fs = require("fs").promises;
const { asyncHandler } = require("../utils/asyncHandler.js");

/* ================= ADD BLOG ================= */
const addBlog = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { title, content } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const writer = await user
    .findOne({ email: req.user.email })
    .select("-password");

  if (!writer) {
    return res.status(404).json({ message: "User not found" });
  }

  const imageUrl = (req.files || []).map(
    (file) => `http://localhost:4000/uploads/${file.filename}`
  );

  const newBlog = await blog.create({
    title,
    content,
    userid: writer._id,
    writtenBy: writer.name,
    images: imageUrl,
  });

  res.status(201).json({
    message: "Blog added successfully",
    blog: newBlog,
  });
});

/* ================= GET ALL BLOGS ================= */
const getBlogs = asyncHandler(async (req, res) => {
  const blogArray = await blog.find({});

  res.status(200).json({
    status: 200,
    blogs: blogArray,
  });
});

/* ================= READ BLOG ================= */
const readBlog = asyncHandler(async (req, res) => {
  const blogData = await blog.findById(req.params.id);

  if (!blogData) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(200).json({ blog: blogData });
});

/* ================= DELETE BLOG ================= */
const deleteController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findBlog = await blog.findById(id);
  if (!findBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  for (const img of findBlog.images) {
    const fileName = img.split("/").pop();
    try {
      await fs.unlink(`uploads/${fileName}`);
    } catch (err) {
      if (err.code !== "ENOENT") console.error(err);
    }
  }

  await blog.findByIdAndDelete(id);

  res.status(200).json({ message: "Blog deleted successfully" });
});

/* ================= DELETE SINGLE IMAGE ================= */
const deleteImageController = asyncHandler(async (req, res) => {
  const { _id, path } = req.body;

  const updateDatabase = await blog.findByIdAndUpdate(
    _id,
    { $pull: { images: path } },
    { new: true }
  );

  if (!updateDatabase) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const fileName = path.split("/").pop();
  await fs.unlink(`uploads/${fileName}`);

  res.status(200).json({ message: "Image deleted successfully" });
});

/* ================= UPDATE BLOG ================= */
const updateController = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  const imgArray = (req.files || []).map(
    (file) => `http://localhost:4000/uploads/${file.filename}`
  );

  const findBlog = await blog.findById(id);
  if (!findBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const updatedArray = [...findBlog.images, ...imgArray];

  const updateData = await blog.findByIdAndUpdate(
    id,
    { title, content, images: updatedArray },
    { new: true }
  );

  res.status(200).json({
    message: "Blog updated successfully",
    updateData,
  });
});

module.exports = {
  addBlog,
  getBlogs,
  readBlog,
  deleteController,
  deleteImageController,
  updateController,
};
