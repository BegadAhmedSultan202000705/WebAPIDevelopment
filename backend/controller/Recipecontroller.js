const Recipe = require("../models/Recipe");

async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getRecipeById(req, res) {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createRecipe(req, res) {
  try {
    const { title, ingredients, instructions, image } = req.body;

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      createdBy: req.userId,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateRecipe(req, res) {
  try {
    const recipeId = req.params.id;
    const { title, ingredients, instructions, image } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { title, ingredients, instructions, image },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipeId = req.params.id;

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
