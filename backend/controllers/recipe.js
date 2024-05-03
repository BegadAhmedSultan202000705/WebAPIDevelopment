const Recipe = require("../models/recipe");
const User = require("../models/user");
const myRecipes = require("../models/save_Recipes");
const {
  fetchRicipes,
  fetchIngredients,
  fetchNutritionalInfo,
  fetchInstructions,
} = require("../service/spoonacular");

const getRecipes = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const {
    diet = [],
    cuisine = [],
    intolerances = [],
    offset = 0,
    number = 10,
  } = req.body;
  try {
    const recipes = await fetchRicipes({
      diet,
      cuisine,
      intolerances,
      offset,
      number,
    });
    return res.status(200).json({ recipes });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const getIngredients = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const { recipeId } = req.query;
  try {
    const ingredients = await fetchIngredients({ recipeId });
    return res.status(200).json({ ingredients });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const getNutritionalInfo = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const { recipeId } = req.query;
  try {
    const nutritionalInfo = await fetchNutritionalInfo({ recipeId });
    return res.status(200).json({ nutritionalInfo });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const getInstructions = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const { recipeId } = req.query;
  try {
    const instructions = await fetchInstructions({ recipeId });
    return res.status(200).json({ instructions });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const saveRecipe = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const { spoonacularRecipeId, title, image, imageType } = req.body;

  const userId = req.id;
  try {
    const recipe = new Recipe({ spoonacularRecipeId, title, image, imageType });
    const { _id: recipeId } = await recipe.save();
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { savedRecipes: recipeId } }
    );
    return res.status(200).json({ msg: "Recipe saved successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const deleteRecipe = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const { recipeId } = req.query;
  if (!recipeId) {
    return res.status(400).json({ msg: "please provide a valid recipe id" });
  }
  const userId = req.id;
  try {
    const { _id } = await Recipe.findOne({ spoonacularRecipeId: recipeId });
    await Recipe.deleteOne({ _id });
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { savedRecipes: _id } }
    );
    return res.status(200).json({ msg: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const getSavedRecipes = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const userId = req.id;
  try {
    const { savedRecipes } = await User.findOne({ _id: userId }).populate(
      "savedRecipes"
    );
    return res.status(200).json({ savedRecipes });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const createRecipe = async (req, res) => {
  if (req.verified === false) {
    return res.status(403).json({ msg: req.msg });
  }

  const userId = req.id;

  try {
    const { name, category, instructions, ingredients, cookingTime } = req.body;

    const newRecipe = new myRecipes({
      creator: userId,
      name,
      category,
      instructions,
      ingredients,
      cookingTime,
    });

    const { _id: recipeId } = await newRecipe.save();

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { myrecipes: recipeId } }
    );

    return res.status(200).json({ msg: "Recipe created successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const getmyRecipes = async (req, res) => {
  if (req.verified === false) {
    return res.status(403).json({ msg: req.msg });
  }

  const userId = req.id;

  try {
    const { myrecipes } = await User.findOne({ _id: userId }).populate(
      "myrecipes"
    );

    if (!myrecipes || myrecipes.length === 0) {
      return res.status(404).json({ msg: "No recipes found" });
    }

    return res.status(200).json({ myRecipes: myrecipes });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = {
  getRecipes,
  getIngredients,
  saveRecipe,
  getInstructions,
  deleteRecipe,
  getNutritionalInfo,
  getSavedRecipes,
  createRecipe,
  getmyRecipes,
};
