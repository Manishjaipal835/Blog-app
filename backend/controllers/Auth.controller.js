const user = require("../modals/user.modal");
const jwt = require("jsonwebtoken");
const blog = require("../modals/Blog.modal");
const { asyncHandler } = require("../utils/asyncHandler.js");

/* ================= REGISTRATION ================= */
const registrationController = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password required" });
  }

  const isExist = await user.findOne({ email });
  if (isExist) {
    return res.status(409).json({ message: "User already registered" });
  }

  const addUser = new user({ name, phone, email, password });
  await addUser.save();

  return res.status(201).json({
    message: "User registered successfully",
  });
});

/* ================= LOGIN ================= */
const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password required" });
  }

  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "Register first" });
  }

  const isMatch = await existingUser.decodePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = existingUser.jwtGenerate();

  // 🍪 COOKIE-BASED AUTH
  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    user: { id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,}
  });
});

/* ================= AUTH MIDDLEWARE ================= */
const isLogin = (req, res, next) => {
  const token = req?.cookies?.token;
   console.log('delete req')
  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    const decoded = jwt.verify(token, 'sona');
    console.log("decoded data is ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const profileController = asyncHandler(async (req, res) => {
  const existingUser = await user.findOne({ email: req.user.email });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const blogList = await blog.find({ userid: existingUser._id });

  return res.status(200).json({
    user: existingUser,
    blogs: blogList,
  });
});


const logoutController = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});


module.exports = {
  registrationController,
  loginController,
  isLogin,
  profileController,
  logoutController,
};
