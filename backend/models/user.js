const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    myrecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "newRecipe" }],
  },
  { timestaps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
