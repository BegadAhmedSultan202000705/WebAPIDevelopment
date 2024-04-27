const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: [String], // Array of strings for ingredients list
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL of the recipe image
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who created the recipe
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add pre-save hook to update `updatedAt` before saving
recipeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Recipe model using the schema
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
