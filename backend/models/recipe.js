const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    spoonacularRecipeId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String },
    imageType: { type: String },
  },
  { timestaps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
