const ENDPOINT = "http://localhost:3000";

export const userLogin = async (userCredentials) =>
  await fetch(`${ENDPOINT}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials),
  });

export const userSignup = async (userCredentials) =>
  await fetch(`${ENDPOINT}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials),
  });

export const getRecipes = async ({ accessToken, preferences }) =>
  await fetch(`${ENDPOINT}/api/recipe/recipes`, {
    method: "POST",
    headers: {
      authorization: `OAT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  });

export const getSavedRecipes = async ({ accessToken }) =>
  await fetch(`${ENDPOINT}/api/recipe/savedRecipes`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const getIngredients = async ({ accessToken, recipeId }) =>
  await fetch(`${ENDPOINT}/api/recipe/ingredients?recipeId=${recipeId}`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const getInstructions = async ({ accessToken, recipeId }) =>
  await fetch(`${ENDPOINT}/api/recipe/instructions?recipeId=${recipeId}`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const getNutritionalInfo = async ({ accessToken, recipeId }) =>
  await fetch(`${ENDPOINT}/api/recipe/nutritionalInfo?recipeId=${recipeId}`, {
    method: "GET",
    headers: { authorization: `OAT ${accessToken}` },
  });

export const saveRecipe = async ({ recipeInfo, accessToken }) => {
  return await fetch(`${ENDPOINT}/api/recipe/save`, {
    method: "POST",
    headers: {
      authorization: `OAT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeInfo),
  });
};

export const fetchMyRecipes = async ({ accessToken }) => {
  try {
    const response = await fetch(`${ENDPOINT}/api/recipe/Myrecipes`, {
      method: "GET",
      headers: {
        authorization: `OAT ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const createRecipe = async ({ recipeInfo, accessToken }) => {
  const response = await fetch(`${ENDPOINT}/api/recipe/newrecipe`, {
    method: "POST",
    headers: {
      authorization: `OAT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeInfo),
  });

  if (!response.ok) {
    throw new Error("Failed to save the recipe");
  }

  const data = await response.json();
  return data;
};

export const deleteRecipe = async ({ recipeId, accessToken }) =>
  await fetch(`${ENDPOINT}/api/recipe/delete?recipeId=${recipeId}`, {
    method: "DELETE",
    headers: {
      authorization: `OAT ${accessToken}`,
    },
  });

export const destroyAccessToken = async ({ accessToken }) =>
  await fetch(`${ENDPOINT}/api/accessToken/destroy`, {
    method: "DELETE",
    headers: { authorization: `OAT ${accessToken}` },
  });
