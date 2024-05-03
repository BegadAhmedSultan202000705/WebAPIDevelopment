const mongoose = require("mongoose");

const SavedrecipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  category: {
    type: String,
    required: false,
    trim: true,
  },
  instructions: {
    type: String,
    required: false,
    trim: true,
  },
  ingredients: { type: String },
  cookingTime: {
    type: Number,
    required: false,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const newRecipe = mongoose.model("newRecipe", SavedrecipeSchema);

module.exports = newRecipe;
