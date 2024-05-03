const dotenv = require("dotenv");
dotenv.config();

const SPOONACULAR_API_ENDPOINT = "https://api.spoonacular.com/";

const apiKey = process.env.SPOONACULAR_API_KEY;

/**
 * @swagger
 * /recipes/complexSearch:
 *   get:
 *     summary: Fetch recipes based on filter criteria
 *     description: Retrieves a list of recipes based on the provided filter criteria such as diet, cuisine, intolerances, offset, and number of results.
 *     parameters:
 *       - in: query
 *         name: diet
 *         required: false
 *         description: List of dietary preferences to filter recipes (e.g., vegetarian, vegan).
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         example: ["vegetarian"]
 *       - in: query
 *         name: cuisine
 *         required: false
 *         description: List of cuisines to filter recipes (e.g., Italian, Mexican).
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         example: ["Italian"]
 *       - in: query
 *         name: intolerances
 *         required: false
 *         description: List of intolerances to filter recipes (e.g., gluten, dairy).
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         example: ["gluten"]
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Number of recipes to skip before fetching results.
 *         schema:
 *           type: integer
 *         example: 0
 *       - in: query
 *         name: number
 *         required: false
 *         description: Number of recipes to fetch.
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Successful response; returns a list of recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique ID of the recipe.
 *                       title:
 *                         type: string
 *                         description: Name of the recipe.
 *                       image:
 *                         type: string
 *                         description: URL of the recipe image.
 *
 *       400:
 *         description: Bad request due to invalid query parameters.
 *       500:
 *         description: Internal server error.
 */

const fetchRicipes = async ({
  diet = [],
  cuisine = [],
  intolerances = [],
  offset = 0,
  number = 10,
}) => {
  const dietString = diet.toString();
  const cuisineString = cuisine.toString();
  const intolerancesString = intolerances.toString();
  const parameters = `apiKey=${apiKey}&diet=${dietString}&cuisine=${cuisineString}&intolerances=${intolerancesString}&offset=${offset}&number=${number}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/complexSearch?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};
/**
 * @swagger
 * /recipes/{recipeId}/ingredientWidget.json:
 *   get:
 *     summary: Fetch ingredients for a specific recipe
 *     description: Retrieves the ingredient information for a specific recipe based on the provided recipe ID.
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         description: The unique ID of the recipe.
 *         schema:
 *           type: string
 *           example: "60d9f920f1c4b627b7f4a2d3"
 *     responses:
 *       200:
 *         description: Successful response; returns ingredient information for the recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the ingredient.
 *                       amount:
 *                         type: number
 *                         description: Amount of the ingredient needed.
 *                         example: 200
 *                       unit:
 *                         type: string
 *                         description: Unit of measurement for the ingredient.
 *                         example: "g"
 *       400:
 *         description: Bad request due to missing or invalid recipe ID.
 *       404:
 *         description: Recipe not found due to invalid recipe ID.
 *       500:
 *         description: Internal server error.
 */

const fetchIngredients = async ({ recipeId }) => {
  const parameters = `apiKey=${apiKey}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/${recipeId}/ingredientWidget.json?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};

/**
 * @swagger
 * /recipes/{recipeId}/ingredientWidget.json:
 *   get:
 *     summary: Fetch analyzed instructions for a specific recipe
 *     description: Retrieves the analyzed instructions for a specific recipe based on the provided recipe ID.
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         description: The unique ID of the recipe.
 *         schema:
 *           type: string
 *           example: "60d9f920f1c4b627b7f4a2d3"
 *     responses:
 *       200:
 *         description: Successful response; returns analyzed instructions for the recipe.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the instruction.
 *                     example: "Preheat the oven to 350°F."
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         number:
 *                           type: integer
 *                           description: Step number.
 *                           example: 1
 *                         step:
 *                           type: string
 *                           description: Description of the instruction step.
 *                           example: "Mix the dry ingredients together in a bowl."
 *       400:
 *         description: Bad request due to missing or invalid recipe ID.
 *       404:
 *         description: Recipe not found due to invalid recipe ID.
 *       500:
 *         description: Internal server error.
 */

const fetchInstructions = async ({ recipeId }) => {
  const parameters = `apiKey=${apiKey}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/${recipeId}/analyzedInstructions?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};

/**
 * @swagger
 * /recipes/{recipeId}/nutritionWidget.json:
 *   get:
 *     summary: Fetch nutritional information for a specific recipe
 *     description: Retrieves the nutritional information for a specific recipe based on the provided recipe ID.
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         description: The unique ID of the recipe.
 *         schema:
 *           type: string
 *           example: "60d9f920f1c4b627b7f4a2d3"
 *     responses:
 *       200:
 *         description: Successful response; returns nutritional information for the recipe.
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
 *                 sugar:
 *                   type: number
 *                   description: Amount of sugar in grams.
 *                   example: 12
 *                 servingSize:
 *                   type: string
 *                   description: Serving size of the recipe.
 *                   example: "1 cup"
 *       400:
 *         description: Bad request due to missing or invalid recipe ID.
 *       404:
 *         description: Recipe not found due to invalid recipe ID.
 *       500:
 *         description: Internal server error.
 */

const fetchNutritionalInfo = async ({ recipeId }) => {
  const parameters = `apiKey=${apiKey}`;
  const response = await fetch(
    `${SPOONACULAR_API_ENDPOINT}/recipes/${recipeId}/nutritionWidget.json?${parameters}`,
    { method: "GET" }
  );
  return await response.json();
};

module.exports = {
  fetchRicipes,
  fetchIngredients,
  fetchInstructions,
  fetchNutritionalInfo,
};
