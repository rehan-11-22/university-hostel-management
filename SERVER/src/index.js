const express = require("express");
const dotenv = require("dotenv").config(); //Used for loading || configure the env variables
const connectDB = require("./db/index");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const studentRoute = require("./routes/studentRoutes");
const hostelRoute = require("./routes/hostelRoutes");
const feeRoute = require("./routes/feeRoutes");
const attendanceRoute = require("./routes/attendanceRoute");
const studentFeeRoute = require("./routes/studentFeeRoute");
const cookieParser = require("cookie-parser");

const app = express();

// CORS configuration for Vercel
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong ", error);
  }
};

startServer();

// Simple route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome to server That is running on ${PORT} port` });
});

// API routes
app.use("/api/v1/users/staff", userRoute);
app.use("/api/v1/users/student", studentRoute);
app.use("/api/v1/attendance", attendanceRoute);
app.use("/api/v1/hostel", hostelRoute);
app.use("/api/v1/fee", feeRoute);
app.use("/api/v1/studentfee", studentFeeRoute);

// Export the app for Vercel
module.exports = app;
