import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  preferences: {},
  savedRecipes: [],
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      const { recipes } = action.payload;
      state.recipes = recipes;
    },
    setPreferences: (state, action) => {
      const { preferences } = action.payload;
      state.preferences = preferences;
    },
    setSavedRecipes: (state, action) => {
      const { savedRecipes } = action.payload;
      state.savedRecipes = savedRecipes;
    },

    setSaveRecipe: (state, action) => {
      const { spoonacularRecipeId, title, image, imageType } = action.payload;

      const newRecipe = {
        spoonacularRecipeId,
        title,
        image,
        imageType,
      };

      state.savedRecipes.push(newRecipe);
    },
    setDeleteSavedRecipe: (state, action) => {
      const { recipeId } = action.payload;
      state.savedRecipes = state.savedRecipes.filter(
        ({ spoonacularRecipeId }) =>
          Number(spoonacularRecipeId) !== Number(recipeId)
      );
    },
    setMyRecipes: (state, action) => {
      const { myRecipes } = action.payload;
      state.myRecipes = myRecipes;
    },
  },
});

export const {
  setRecipes,
  setPreferences,
  setSavedRecipes,
  setSaveRecipe,
  setDeleteSavedRecipe,
  setMyRecipes,
} = recipesSlice.actions;

export default recipesSlice.reducer;
