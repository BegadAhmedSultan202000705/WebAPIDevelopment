const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Apply CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Import route files
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

// Use the route files for different API endpoints
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Define a general error handling middleware (optional)
// This can be useful for catching and handling errors globally
app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server and listen on the specified port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
