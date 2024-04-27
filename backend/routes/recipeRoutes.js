const express = require("express");
const recipeController = require("../controller/recipecontroller");
const authMiddleware = require("../mW/Auth");

const router = express.Router();

// Apply authentication middleware to all routes in this file
router.use(authMiddleware.authenticate);

// Route to fetch all recipes
router.get("/", recipeController.getRecipes);

// Route to fetch a recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Route to create a new recipe
router.post("/", recipeController.createRecipe);

// Route to update an existing recipe by ID
router.put("/:id", recipeController.updateRecipe);

// Route to delete an existing recipe by ID
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
