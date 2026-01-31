const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authRouter = require("./router/Auth.router");
const blogRouter = require("./router/blogRouter");
const connection = require("./config/connections");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 4000;

/* ================= MIDDLEWARES ================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= DATABASE ================= */
connection();

/* ================= ROUTES ================= */
app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);

/* ================= SERVER ================= */
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
