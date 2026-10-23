// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";

// import feedbackRoutes from "./routes/FeedbackRoutes.js";

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.static("../frontend"))

// app.get("/", (req, res) => {
//   res.send("Student Feedback Manager Backend is running!");
// });

// mongoose.connect(process.env.MONGODB_URL)
//     .then(() => {
//         console.log("MongoDB Connected");
//     })
//     .catch((error) => {
//         console.log("MongoDB Connection error:", error);
//     });

// app.use("/api/feedback", feedbackRoutes);

// // app.listen(4000, () => {
// //     console.log("Server is running on port 4000");
// // });
// // Local development
// if (process.env.NODE_ENV !== "production") {
//   app.listen(4000, () => {
//     console.log("Server is running on port 4000");
//   });
// }
// export default app



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import feedbackRoutes from "./routes/FeedbackRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).send(
    "Student Feedback Manager Backend is running!"
  );
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is working",
  });
});

// Feedback CRUD routes
app.use("/api/feedback", feedbackRoutes);

// Server port
const PORT = process.env.PORT || 4000;

// Start server
async function startServer() {
  try {
    const mongoUrl =
      process.env.MONGO_URL ||
      process.env.MONGODB_URI ||
      process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error(
        "MongoDB URL is missing. Add it in Render Environment settings."
      );
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();

export default app;
