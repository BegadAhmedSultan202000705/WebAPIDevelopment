import axios from "axios";

const API_URL = "http://localhost:3001/api";

// Function to fetch recipes
export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to register a new user
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
    });
    return response.data; // This usually includes a success message or user data
  } catch (error) {
    throw error.response.data; // Contains error message from server
  }
};

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Typically includes a JWT token
  } catch (error) {
    throw error.response.data; // Contains error message from server
  }
};
// Function to create a new recipe
export const createRecipe = async (recipeData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(`${API_URL}/recipes`, recipeData, config);
    return response.data; // Returns the created recipe object
  } catch (error) {
    throw error.response.data; // Contains error message from server
  }
};

// Function to update an existing recipe
export const updateRecipe = async (recipeId, recipeData, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(
      `${API_URL}/recipes/${recipeId}`,
      recipeData,
      config
    );
    return response.data; // Returns the updated recipe object
  } catch (error) {
    throw error.response.data; // Contains error message from server
  }
};

// Function to delete a recipe
export const deleteRecipe = async (recipeId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.delete(
      `${API_URL}/recipes/${recipeId}`,
      config
    );
    return response.data; // Typically a success message
  } catch (error) {
    throw error.response.data; // Contains error message from server
  }
};

// Function to fetch a single recipe by ID
export const fetchRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${recipeId}`);
    return response.data; // Returns the requested recipe object
  } catch (error) {
    throw error.response.data; // Contains error message from server
  }
};
