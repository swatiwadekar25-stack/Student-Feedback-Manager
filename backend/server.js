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

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Student Feedback Manager Backend is running!");
});

app.use("/api/feedback", feedbackRoutes);

// Export the app for Vercel
export default app;

// Run locally only
if (process.env.NODE_ENV !== "production") {
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
}
