const express = require("express");
const recipeRoutes = express.Router();
const bodyParser = require("body-parser");
const {
  getRecipes,
  getIngredients,
  saveRecipe,
  deleteRecipe,
  getNutritionalInfo,
  getInstructions,
  getSavedRecipes,
  createRecipe,
  getmyRecipes,
} = require("../controllers/recipe");

recipeRoutes.use(bodyParser.urlencoded({ extended: false }));
recipeRoutes.use(bodyParser.json());

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Retrieve recipes
 *     description: Retrieves a list of recipes based on the filter criteria provided in the request body.
 *     requestBody:
 *       description: Filter criteria for retrieving recipes.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cuisine:
 *                 type: string
 *                 description: Cuisine type to filter recipes by (e.g., Italian, Mexican).
 *                 example: Italian
 *               diet:
 *                 type: string
 *                 description: Dietary preference to filter recipes by (e.g., vegetarian, vegan).
 *                 example: vegetarian
 *               prepTime:
 *                 type: integer
 *                 description: Maximum preparation time (in minutes) to filter recipes by.
 *                 example: 30
 *             required:
 *               - cuisine
 *               - diet
 *               - prepTime
 *     responses:
 *       200:
 *         description: List of recipes based on the filter criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique ID of the recipe.
 *                     example: "60d9f920f1c4b627b7f4a2d3"
 *                   name:
 *                     type: string
 *                     description: Name of the recipe.
 *                     example: "Spaghetti Carbonara"
 *                   cuisine:
 *                     type: string
 *                     description: Cuisine type of the recipe.
 *                     example: Italian
 *                   diet:
 *                     type: string
 *                     description: Dietary preference of the recipe.
 *                     example: vegetarian
 *                   prepTime:
 *                     type: integer
 *                     description: Preparation time in minutes.
 *                     example: 25
 *       400:
 *         description: Bad request due to missing or invalid filter criteria.
 *       500:
 *         description: Internal server error.
 */

recipeRoutes.post("/recipes", getRecipes);
/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     description: Retrieves a list of available ingredients in the recipe database.
 *     responses:
 *       200:
 *         description: Successful response; returns a list of ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique ID of the ingredient.
 *                     example: "1234abcd"
 *                   name:
 *                     type: string
 *                     description: Name of the ingredient.
 *                     example: "Tomato"
 *                   category:
 *                     type: string
 *                     description: Category of the ingredient (e.g., vegetable, fruit, dairy).
 *                     example: "Vegetable"
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

recipeRoutes.get("/ingredients", getIngredients);

/**
 * @swagger
 * /nutritionalInfo:
 *   get:
 *     summary: Retrieve nutritional information
 *     description: Retrieves the nutritional information for recipes in the database.
 *     parameters:
 *       - in: query
 *         name: recipeId
 *         required: true
 *         description: The unique ID of the recipe.
 *         schema:
 *           type: string
 *           example: "60d9f920f1c4b627b7f4a2d3"
 *     responses:
 *       200:
 *         description: Successful response; returns the nutritional information for the specified recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 calories:
 *                   type: number
 *                   description: Total calories in the recipe.
 *                   example: 450
 *                 protein:
 *                   type: number
 *                   description: Amount of protein in grams.
 *                   example: 25
 *                 fat:
 *                   type: number
 *                   description: Amount of fat in grams.
 *                   example: 15
 *                 carbohydrates:
 *                   type: number
 *                   description: Amount of carbohydrates in grams.
 *                   example: 60
 *                 fiber:
 *                   type: number
 *                   description: Amount of fiber in grams.
 *                   example: 8
 *       400:
 *         description: Bad request due to missing or invalid recipe ID.
 *       404:
 *         description: Recipe not found due to invalid recipe ID.
 *       500:
 *         description: Internal server error.
 */

recipeRoutes.get("/nutritionalInfo", getNutritionalInfo);

/**
 * @swagger
 * /instructions:
 *   get:
 *     summary: Retrieve cooking instructions
 *     description: Retrieves cooking instructions for recipes in the database based on recipe ID.
 *     parameters:
 *       - in: query
 *         name: recipeId
 *         required: true
 *         description: The unique ID of the recipe.
 *         schema:
 *           type: string
 *           example: "60d9f920f1c4b627b7f4a2d3"
 *     responses:
 *       200:
 *         description: Successful response; returns cooking instructions for the specified recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipeId:
 *                   type: string
 *                   description: Unique ID of the recipe.
 *                   example: "60d9f920f1c4b627b7f4a2d3"
 *                 instructions:
 *                   type: string
 *                   description: Cooking instructions for the recipe.
 *                   example: "1. Boil water. 2. Add pasta and cook for 8 minutes. 3. Drain and mix with sauce."
 *       400:
 *         description: Bad request due to missing or invalid recipe ID.
 *       404:
 *         description: Recipe not found due to invalid recipe ID.
 *       500:
 *         description: Internal server error.
 */

recipeRoutes.get("/instructions", getInstructions);

/**
 * @swagger
 * /save:
 *   post:
 *     summary: Save a new recipe
 *     description: Saves a new recipe to the database.
 *     requestBody:
 *       description: Recipe data to be saved.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the recipe.
 *                 example: "Spaghetti Carbonara"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients in the recipe.
 *                 example: ["spaghetti", "egg", "pecorino cheese", "guanciale", "black pepper"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions for the recipe.
 *                 example: "1. Boil water and cook spaghetti. 2. In a separate pan, cook guanciale until crispy. 3. Mix egg, cheese, and pepper together, then combine with cooked spaghetti and guanciale."
 *               cuisine:
 *                 type: string
 *                 description: Type of cuisine.
 *                 example: "Italian"
 *               diet:
 *                 type: string
 *                 description: Dietary preference for the recipe (e.g., vegetarian, vegan, etc.).
 *                 example: "non-vegetarian"
 *             required:
 *               - name
 *               - ingredients
 *               - instructions
 *     responses:
 *       201:
 *         description: Recipe saved successfully, returns the created recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique ID of the saved recipe.
 *                   example: "60d9f920f1c4b627b7f4a2d3"
 *                 name:
 *                   type: string
 *                   description: Name of the recipe.
 *                   example: "Spaghetti Carbonara"
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of ingredients in the recipe.
 *                   example: ["spaghetti", "egg", "pecorino cheese", "guanciale", "black pepper"]
 *                 instructions:
 *                   type: string
 *                   description: Cooking instructions for the recipe.
 *                   example: "1. Boil water and cook spaghetti. 2. In a separate pan, cook guanciale until crispy. 3. Mix egg, cheese, and pepper together, then combine with cooked spaghetti and guanciale."
 *                 cuisine:
 *                   type: string
 *                   description: Type of cuisine.
 *                   example: "Italian"
 *                 diet:
 *                   type: string
 *                   description: Dietary preference for the recipe (e.g., vegetarian, vegan, etc.).
 *                   example: "non-vegetarian"
 *       400:
 *         description: Bad request due to missing or invalid recipe data.
 *       409:
 *         description: Conflict due to a duplicate recipe.
 *       500:
 *         description: Internal server error.
 */
recipeRoutes.post("/save", saveRecipe);

/**
 * @swagger
 * /savedRecipes:
 *   get:
 *     summary: Retrieve saved recipes
 *     description: Retrieves a list of recipes that have been saved by the user.
 *     responses:
 *       200:
 *         description: Successful response; returns a list of saved recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique ID of the saved recipe.
 *                     example: "60d9f920f1c4b627b7f4a2d3"
 *                   name:
 *                     type: string
 *                     description: Name of the saved recipe.
 *                     example: "Spaghetti Carbonara"
 */
recipeRoutes.get("/savedRecipes", getSavedRecipes);

/**
 * @swagger
 * /Myrecipes:
 *   get:
 *     summary: Retrieve user's recipes
 *     description: Retrieves a list of recipes that have been created by the user.
 *     responses:
 *       200:
 *         description: Successful response; returns a list of the user's recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique ID of the user's recipe.
 *                     example: "60d9f920f1c4b627b7f4a2d3"
 *                   name:
 *                     type: string
 *                     description: Name of the recipe.
 *                     example: "Spaghetti Carbonara"
 *                   cuisine:
 *                     type: string
 *                     description: Cuisine type of the recipe.
 *                     example: "Italian"
 *                   diet:
 *                     type: string
 *                     description: Dietary preference for the recipe (e.g., vegetarian, vegan, etc.).
 *                     example: "non-vegetarian"
 *                   prepTime:
 *                     type: integer
 *                     description: Preparation time in minutes for the recipe.
 *                     example: 25
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of ingredients in the recipe.
 *                     example: ["spaghetti", "egg", "pecorino cheese", "guanciale", "black pepper"]
 *                   instructions:
 *                     type: string
 *                     description: Cooking instructions for the recipe.
 *                     example: "1. Boil water and cook spaghetti. 2. In a separate pan, cook guanciale until crispy. 3. Mix egg, cheese, and pepper together, then combine with cooked spaghetti and guanciale."
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

recipeRoutes.get("/Myrecipes", getmyRecipes);

/**
 * @swagger
 * /newrecipe:
 *   post:
 *     summary: Create a new recipe
 *     description: Saves a new recipe to the database.
 *     requestBody:
 *       description: Recipe data to be saved.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the recipe.
 *                 example: "Spaghetti Carbonara"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients in the recipe.
 *                 example: ["spaghetti", "egg", "pecorino cheese", "guanciale", "black pepper"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions for the recipe.
 *                 example: "1. Boil water and cook spaghetti. 2. In a separate pan, cook guanciale until crispy. 3. Mix egg, cheese, and pepper together, then combine with cooked spaghetti and guanciale."
 *               cuisine:
 *                 type: string
 *                 description: Type of cuisine.
 *                 example: "Italian"
 *               diet:
 *                 type: string
 *                 description: Dietary preference for the recipe (e.g., vegetarian, vegan, etc.).
 *                 example: "non-vegetarian"
 *               prepTime:
 *                 type: integer
 *                 description: Preparation time in minutes for the recipe.
 *                 example: 25
 *             required:
 *               - name
 *               - ingredients
 *               - instructions
 *               - cuisine
 *               - diet
 *               - prepTime
 *     responses:
 *       201:
 *         description: Recipe created successfully; returns the created recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique ID of the created recipe.
 *                   example: "60d9f920f1c4b627b7f4a2d3"
 *                 name:
 *                   type: string
 *                   description: Name of the recipe.
 *                   example: "Spaghetti Carbonara"
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of ingredients in the recipe.
 *                   example: ["spaghetti", "egg", "pecorino cheese", "guanciale", "black pepper"]
 *                 instructions:
 *                   type: string
 *                   description: Cooking instructions for the recipe.
 *                   example: "1. Boil water and cook spaghetti. 2. In a separate pan, cook guanciale until crispy. 3. Mix egg, cheese, and pepper together, then combine with cooked spaghetti and guanciale."
 *                 cuisine:
 *                   type: string
 *                   description: Type of cuisine.
 *                   example: "Italian"
 *                 diet:
 *                   type: string
 *                   description: Dietary preference for the recipe (e.g., vegetarian, vegan, etc.).
 *                   example: "non-vegetarian"
 *                 prepTime:
 *                   type: integer
 *                   description: Preparation time in minutes for the recipe.
 *                   example: 25
 *       400:
 *         description: Bad request, possibly due to missing or invalid recipe data.
 *       409:
 *         description: Conflict, possibly due to a duplicate recipe.
 *       500:
 *         description: Internal server error.
 */

recipeRoutes.post("/newrecipe", createRecipe);

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete a recipe
 *     description: Deletes a recipe from the database based on recipe ID.
 *     parameters:
 *       - in: query
 *         name: recipeId
 *         required: true
 *         description: The unique ID of the recipe to be deleted.
 *         schema:
 *           type: string
 *           example: "60d9f920f1c4b627b7f4a2d3"
 *     responses:
 *       204:
 *         description: Recipe deleted successfully; no content returned.
 *       400:
 *         description: Bad request due to missing or invalid recipe ID.
 *       404:
 *         description: Recipe not found due to invalid recipe ID.
 *       500:
 *         description: Internal server error.
 */

recipeRoutes.delete("/delete", deleteRecipe);

module.exports = { recipeRoutes };
