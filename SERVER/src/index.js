const express = require("express");
const dotenv = require("dotenv").config();
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

// Enhanced CORS configuration for Vercel
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
      if (!origin) return callback(null, true);

      const allowedOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",")
        : [
            "http://localhost:3000",
            "https://your-frontend-app.vercel.app", // Replace with your actual frontend URL
          ];

      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();

    // Only listen if not in Vercel environment
    if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.log("Database connection failed: ", error);
  }
};

startServer();

// Simple route
app.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome to server!`,
    status: "Server is running successfully",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/v1/users/staff", userRoute);
app.use("/api/v1/users/student", studentRoute);
app.use("/api/v1/attendance", attendanceRoute);
app.use("/api/v1/hostel", hostelRoute);
app.use("/api/v1/fee", feeRoute);
app.use("/api/v1/studentfee", studentFeeRoute);

// Health check route for Vercel
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Export the app for Vercel
module.exports = app;
